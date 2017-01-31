/**
 *
 * Upload
 *
 */

var Form        = require('helpers/form/form');
var config      = require('../../config/config');
var template    = _.template(require('./templates/upload.html'));

module.exports   = {

    dropZone: '',

    accepted: '',

    maxSize: 5000000,

    humanSize: '',

    /**
     * Init
     *
     * @param {string} element class or id to make as component
     */
    init: function(element) {
        return this.bind(element);
    },

    bind: function(element) {

        var _this           = this;
        $(element).not('[data-plugin-loaded]').each(function() {

            let $input          = $(this);

            $input.attr('data-plugin-loaded', true);

            if($input.attr('id') === undefined) {
                $input.attr('id', 'file-upload__input-'+ Date.now());
            };

            let title           = $input.data('title') || 'Arrastra o selecciona una imagen';
            $input.after(template({id: $input.attr('id'), title: title }));

            $input.addClass('hide file-upload-initialized');

            var $inputTarget= $('[name="'+ $input.attr('data-target') +'"]', $input.parents('div:first'));
            if($inputTarget.val()) {

                if(_.contains(['gif', 'jpg', 'jpeg', 'png', 'jpe'], _this._extension($inputTarget.val()))) {
                    _this._loadImageToBackground($inputTarget.val(), $input.parent());
                } else {
                    _this._loadFileToLink({url: $inputTarget.val(), name: $inputTarget.val().split('/').pop()}, $input.parent());
                }

            }

            let dropZone    = $input.parent().find('.file-upload:first');
            let maxSize     = $input.data('data-maxsize') ? _this._sizeToBytes($input.data('maxsize'), true) : _this._sizeToBytes('2MB', true);

            $input.fileupload({

                dataType:           'html',
                acceptFileTypes:    /(\.|\/)(gif|jpe?g|png)$/i,
                maxFileSize:        maxSize,
                dropZone:           dropZone,
                url:                App.Filter.get(config.SERVER.host, 'rtrim', '/') + '/upload/?name='+ $input.attr('name'),
                singleFileUploads:  true,
                beforeSend: function(req) {
                    if(config.SERVER.headers) {
                        let i;
                        for(i in config.SERVER.headers) {
                            req.setRequestHeader(i, config.SERVER.headers[i]);
                        }
                    }
                },

                add: function(e, data) {

                    // Validate file
                    if(!_this._validate($input, data)) {
                        return false;
                    }

                    Form.inputValid($input);

                    // Start Transmition
                    _this.start($(this));

                    data.submit();

                }

            }).bind('fileuploadadd', function (e, data) {

            }).bind('fileuploadprogressall', function (e, data) {

                //Progress
                var progress = parseInt(data.loaded / data.total * 100, 10);
                _this.updateProgressBar($(this), progress);


            }).bind('fileuploadprocessalways', function (e, data) {

                // Append Preview

            }).bind('fileuploaddone', function(e, data) {

                _this.endProgressBar($(this));

                //Result
                try {
                    var tmp     = data.result.replace('<pre>', '').replace('</pre>', '');
                    var r       = JSON.parse(tmp);
                    if (r.success === true) {

                        $inputTarget.val(r.data.url).trigger('change');

                        if(_.contains(['gif', 'jpg', 'jpeg', 'png', 'jpe'], _this._extension(r.data.name))) {
                            _this._loadImageToBackground(r.data.url, $(this).parent());
                        } else {
                            _this._loadFileToLink(r.data, $(this).parent());
                        }

                        return r;
                    } else {
                        App.Flash.error((r.msg !== undefined) ? r.msg : 'El archivo no se pudo subir al sevidor. Intenta nuevamente.');
                    }
                } catch (e) {
                    console.log(e);
                    App.Flash.error('El archivo no se pudo subir al sevidor. Intenta nuevamente.');
                    return {};
                }

            }).bind('fileuploadfail', function (e, data) {

                //Show error
                App.Flash.error('El archivo no pudo ser subido al servidor.\nIntenta nuevamente.');
                _this.endProgressBar($(this));

            });

        });

        // Bind Drag Zone
        _this._bindDrag();

    },

    /**
     * Start transmition
     * @param {type} input
     * @returns {undefined}
     */
    start: function (input) {

        // Disable submit button
        var $form    = input.parents('form').first();
        $form.find(':submit').attr('disabled', 'disabled');

        // Reset proggres barr
        var container   = input.parent();
        var msg         = container.find('.file-upload__placeholder__msg');
        msg.text('Subiendo');
        container.find('.progress').removeClass('alert');
        container.find('.progress-meter:first').css('width', '0%');
        input.prop('disabled', true);

    },

    /**
     * Update proggres bar
     * @param {type} input
     * @param {type} progress
     * @returns {undefined}
     */
    updateProgressBar: function (input, progress) {

        var bar     = input.parent().find('.file-upload__progressbar');
        bar.find('.progress-meter:first').css('width', progress + '%');

    },

    //End Progress bar
    endProgressBar: function (input, alert) {

        // Remove attr disable
        var $form    = input.parents('form').first();
        $form .find(':submit').removeAttr('disabled');

        var container   = input.parent();
        var msg         = container.find('.file-upload__placeholder__msg');
        msg.text(input.data('title') || 'Arrastra o selecciona una imagen');

        var bar     = container.find('.file-upload__progressbar');
        bar.find('.progress-meter:first').fadeOut(700).css('width', '0%');

        input.prop('disabled', false);

    },

    /**
     * Load image
     * @param {type} image
     * @param {type} scope
     * @returns {undefined}
     */
    _loadImageToBackground: function(image, scope) {

        loadImage(image, function(img) {
            var height  = $(img).attr('height');
            if(height > 200) {
                height  = 200;
            }
            var container   = $('.file-upload__content', scope);
            container.css({'background-image': 'url('+ image +')', 'height': height+'px'});
            container.addClass('has-image');
        });

    },

    /**
     * Load File
     * @param {type} image
     * @param {type} scope
     * @returns {undefined}
     */
    _loadFileToLink: function(file, scope) {

        var container   = $('.file-upload__content', scope);
        container.addClass('has-file');
        container.find('.file-upload__placeholder__msg').html(`<a href="${file.url}" target="_blank">${file.name}</a>`);

    },

    /**
     * Convert size to bytes.
     * @param string size
     * @param boolean decimals
     * @returns number
     */
    _sizeToBytes: function (size, decimals) {
        var bytes = decimals ? {'B': 1, 'KB': 1000, 'MB': (1000 * 1000), 'GB': (1000 * 1000 * 1000), 'TB': (1000 * 1000 * 1000 * 1000), 'PB': (1000 * 1000 * 1000 * 1000 * 1000)} : {'B': 1, 'KB': 1024, 'MB': (1024 * 1024), 'GB': (1024 * 1024 * 1024), 'TB': (1024 * 1024 * 1024 * 1024), 'PB': (1024 * 1024 * 1024 * 1024 * 1024)};
        var matches = size.match(/([KMGTP]?B)/);
        size = parseFloat(size) * bytes[matches[1]];
        return size.toFixed(0);
    },

    /**
     * Convert bytes to human size
     * @param int bytes
     * @param boolean decimals
     * @returns string
     */
    _bytesToSize: function (bytes, decimals) {
        var thresh = decimals ? 1000 : 1024;
        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);
        return (decimals) ? bytes.toFixed(0) + ' ' + units[u] : bytes.toFixed(1) + ' ' + units[u];
    },

    /*
     * Get extensions
     */
    _extension: function (name) {
        var pattern = /^.+\.([^.]+)$/;
        var ext = pattern.exec(name);
        return ext === null ? "" : ext[1].toLowerCase();
    },

    /*
     * Validate Type
     *
     * //TODO migreate to abide validation pattern="image, video, file"
     * @returns boolean
     */
    _validate: function($input, data) {

        var _this           = this;

        // Validate images
        var acceptImageTypes= /(\.|\/)(gif|jpe?g|png)$/i;

        // Validate files
        var acceptFileTypes = /(\.|\/)(pdf)$/i;

        //Validate Video
        var acceptVideoTypes = /(\.|\/)?(mkv|flv|ogg|ogv|avi|mov|wmv|mp4|mpeg|mpg|3gp?p|m4v|x-msvideo|quicktime)$/i;

        //Validate Input
        if (data.originalFiles[0]['type'] !== undefined) {
            var dataType = data.originalFiles[0]['type'];
            if (dataType.length === 0) {
                dataType = _this._extension(data.originalFiles[0]['name']);
            }

            if ($input.attr('accept') === 'video/*') {
                if (!acceptVideoTypes.test(dataType)) {
                    Form.inputInvalid($input, 'El video no es válido (.' + dataType + ')');
                    return false;
                }
            } else if ($input.attr('accept') === 'image/*') {
                if (!acceptImageTypes.test(dataType)) {
                    Form.inputInvalid($input, 'El tipo de imagen no es válido.');
                    return false;
                }
            } else if(!acceptFileTypes.test(dataType)) {
                Form.inputInvalid($input, 'El tipo de archivo no es válido.');
                return false;
            }
            //Validate Size
            let size        = data.originalFiles[0]['size'];
            let maxSize     = $input.data('maxsize') ? _this._sizeToBytes($input.data('maxsize'), true) : _this._sizeToBytes('2MB', true);
            let humanSize   = _this._bytesToSize(maxSize, true);
            if (size > maxSize) {
                Form.inputInvalid($input, 'El tamaño del archivo supera el permitido ' + humanSize + '.');
                return false;
            }
        }

        return true;

    },


    /**
     * Bind drag
     */
    _bindDrag: function () {

        $(document).bind('drop dragover', function (e) {
            e.preventDefault();
        });

        $(document).bind('dragover', function (e) {

            var dropZone = $('.file-upload'), foundDropzone, timeout = window.dropZoneTimeout;
            if (!timeout) {
                dropZone.addClass('in');
            } else {
                clearTimeout(timeout);
            }
            var found = false, node = e.target;
            do {
                if ($(node).hasClass('file-upload')) {
                    found = true;
                    foundDropzone = $(node);
                    break;
                }
                node = node.parentNode;
            } while (node !== null);
            dropZone.removeClass('in hover');
            if (found) {
                foundDropzone.addClass('hover');
            }
            window.dropZoneTimeout = setTimeout(function () {
                window.dropZoneTimeout = null;
                dropZone.removeClass('in hover');
            }, 100);

        });

    }

};