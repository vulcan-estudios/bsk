/**
 *
 * TinyMCE
 *
 * <textarea data-tinymce></textarea>
 * <textarea data-tinymce="minimal"></textarea>
 * <textarea data-tinymce="basic"></textarea>
 * <textarea data-tinymce="full"></textarea>
 */

module.exports   = {

    /**
     * Init
     *
     * @param {string} element class or id to make as tinymce
     */
    init: function(element) {
        return this.bind(element);
    },

    /**
     * Bind element class or id to tinymce
     * @param string element
     */
    bind: function(element) {

        var _this       = this;
        // Bind elements
        $(element).not('[data-plugin-loaded]').each(function() {

            var este    = $(this);
            var type    = este.data('tinymce');

            if(type === 'basic') {
                _this.basic(este);
            } else if(type === 'full') {
                 _this.full(este);
            } else {
                 _this.minimal(este);
            }

            este.attr('data-plugin-loaded', true);

        });

    },

    minimal: function($input) {

        var height  = parseInt($input.css('height'));
        $input.tinymce({
            plugins: ["link textcolor colorpicker textpattern paste" ],
            setup: function (editor) {
                editor.on('change', function () {
                    tinymce.triggerSave();
                });
            },
            menubar: false,
            statusbar: false,
            paste_as_text: true,
            skin : 'light',
            height : height,
            force_br_newlines : true,
            force_p_newlines : false,
            forced_root_blocks: false,
            toolbar1: "bold italic | forecolor",
            fontsize_formats: "0.675rem 0.75rem 0.875rem 1rem 1.125rem 1.2rem 1.3rem 1.5rem 1.75rem 2rem 2.25rem 2.5rem"
        });

    },

    basic: function($input) {

        var height  = parseInt($input.css('height'));
        $input.tinymce({
            plugins: ["link textcolor colorpicker textpattern paste" ],
            setup: function (editor) {
                editor.on('change', function () {
                    tinymce.triggerSave();
                });
            },
            menubar: false,
            statusbar: false,
            paste_as_text: true,
            skin : 'light',
            height : height,
            force_br_newlines : true,
            force_p_newlines : false,
            forced_root_blocks: false,
            toolbar1: "bold italic underline | forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | link",
            fontsize_formats: "0.675rem 0.75rem 0.875rem 1rem 1.125rem 1.2rem 1.3rem 1.5rem 1.75rem 2rem 2.25rem 2.5rem"
        });

    },

    full: function($input) {

        var height  = parseInt($input.css('height'));
        $input.tinymce({
            plugins: ["link textcolor colorpicker textpattern paste" ],
            setup: function (editor) {
                editor.on('change', function () {
                    tinymce.triggerSave();
                });
            },
            menubar: false,
            statusbar: false,
            paste_as_text: true,
            skin : 'light',
            height : height,
            force_br_newlines : true,
            force_p_newlines : false,
            forced_root_blocks: false,
            toolbar1: "bold italic underline | forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | link",
            fontsize_formats: "0.675rem 0.75rem 0.875rem 1rem 1.125rem 1.2rem 1.3rem 1.5rem 1.75rem 2rem 2.25rem 2.5rem"
        });

    }

};