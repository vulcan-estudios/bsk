/**
 *
 * Upload
 *
 */

var Form        = require('helpers/form/form');
var config      = require('../../config/config');
var template    = _.template(require('./templates/upload.html'));

$('body').on('click', '.file_upload__placeholder__delete', function(e) {
    e.preventDefault();
    var fileUpload  = $(this).parents('.file-upload');
    var inputReset  = fileUpload.parents('div:first').find('input');
    App.Modal.render('confirm', {
        title: 'Eliminar Imagen',
        description: 'Estás seguro de querer eliminar esta imagen cargada?',
        onAccept: function() {
            inputReset.val('');
            fileUpload.find('.file-upload__content:first').css({'background-image': 'none', 'height': 'auto'}).removeClass('has-image');
        }
    });
    return false;
});

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
        $(element).not('.file-upload-initialized').each(function() {

            $input          = $(this);
            if($input.attr('id') === undefined) {
                $input.attr('id', 'file-upload__input-'+ Date.now());
            };

            $input.addClass('hide file-upload-initialized');
            $input.after(template({id: $input.attr('id') }));

            var $inputTarget= $('[name="'+ $input.attr('data-target') +'"]', $input.parents('div:first'));
            if($inputTarget.val()) {
                _this._loadImageToBackground($inputTarget.val(), $input.parent());
            }

            _this.dropZone  = $input.parent().find('.file-upload:first');
            _this.accepted  = $input.attr('accept');
            if($input.attr('data-maxsize') !== undefined) {
                _this.maxSize   = _this._sizeToBytes($input.attr('data-maxsize'), true);
            }
            _this.humanSize = _this._bytesToSize(_this.maxSize, true);

            $input.fileupload({

                dataType:           'html',
                acceptFileTypes:    /(\.|\/)(gif|jpe?g|png)$/i,
                maxFileSize:        _this.maxSize,
                dropZone:           _this.dropZone,
                url:                App.Filter.get(config.SERVER.host, 'rtrim', '/') + '/upload/?name='+ $input.attr('name'),
                singleFileUploads:  true,
                beforeSend: function(req) {
                    if(config.SERVER.headers) {
                        for(i in config.SERVER.headers) {
                            req.setRequestHeader(i, config.SERVER.headers[i]);
                        }
                    }
                }

            }).bind('fileuploadadd', function (e, data) {

                // Validate file
                if(!_this._validate($input, data)) {
                    return false;
                }

                // Start Transmition
                _this.start($(this));

                data.submit();

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

                        $inputTarget.val(r.data.url);

                        _this._loadImageToBackground(r.data.url, $(this).parent());

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
        msg.text('Arrastra o selecciona una imagen');

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
        return ext === null ? "" : ext[1];
    },

    /*
     * Validate Type
     *
     * //TODO migreate to abide validation pattern="image, video, file"
     * @returns boolean
     */
    _validate: function($input, data) {

        var _this           = this;

        var acceptFileTypes = /(\.|\/)(gif|jpe?g|png)$/i;

        //Validate Video
        var acceptVideoTypes = /(\.|\/)?(mkv|flv|ogg|ogv|avi|mov|wmv|mp4|mpeg|mpg|3gp?p|m4v|x-msvideo|quicktime)$/i;

        //Validate Input
        if (data.originalFiles[0]['type'] !== undefined) {
            var dataType = data.originalFiles[0]['type'];
            if (dataType.length === 0) {
                dataType = _this._extension(data.originalFiles[0]['name']);
            }
            if (_this.accepted === 'video/*') {
                if (!acceptVideoTypes.test(dataType)) {
                    Form.inputInvalid($input, 'El video no es válido (.' + dataType + ')');
                    return false;
                }
            } else if (_this.accepted === 'image/*') {
                if (!acceptFileTypes.test(dataType)) {
                    Form.inputInvalid($input, 'El tipo de archio no es válido.');
                    return false;
                }
            }
            //Validate Size
            var size = data.originalFiles[0]['size'];
            if (size > _this.maxSize) {
                Form.inputInvalid($input, 'El tamaño del archivo supera el permitido ' + _this.humanSize + '.');
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