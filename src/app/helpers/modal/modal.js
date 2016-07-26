/**
 * Utility functions to create interactive ui components for the application in
 * general.
 */

var templateBasic       = _.template(require('./templates/basic.html'));
var templateConfirm     = _.template(require('./templates/confirm.html'));
var templateDate        = _.template(require('./templates/filter-date.html'));

var BindForm            = require('helpers/form/bind');
var Zurb                = require('libs/zurb/Zurb');

module.exports = {

    /**
     * Create a modal.
     *
     * @param  {String} type
     * @param  {Object} opts
     *
     * @return {jQuery}
     */
    render: function (type, opts) {

        var attrs   = _({}).extend({
            id:             'modal-' + Date.now(),
            title:          '',
            description:    '',
            data:           {},
            iconClose:      false,
            iconCloseLink:  false,
            button:         false,
            buttonText:     '',
            buttonLink:     false,
            buttonAccept:   'Aceptar',
            buttonCancel:   'Cancelar',
            onAccept:       null,
            onCancel:       null,
            onSubmit:       null,
            template:       null
        }, opts);

        var $el;

        switch (type) {
            case 'confirm':
                $el = $(templateConfirm(attrs));
                break;
            case 'basic':
                $el = $(templateBasic(attrs));
                break;
            case 'alert':
                $el = $(templateBasic(attrs));
                break;
            case 'date':
                $el = $(templateDate(attrs));
                break;
            case 'custom':
                $el = $(attrs.template(attrs));
                break;
        }

        $($el).appendTo('body');

        $('form[data-abide]').attr('novalidate', 'novalidate');

        $el.foundation();

        BindForm.init();

        if (attrs.onAccept) {
            $el.find('.btn-confirm').on('click', function(e) {
                e.preventDefault();
                attrs.onAccept($el);
            });
        }

        if (attrs.onCancel) {
            $el.find('.btn-cancel').on('click', attrs.onCancel);
        }

        if (attrs.onSubmit) {
            $el.on('submit', function(e) {
                e.preventDefault();
                attrs.onSubmit($(this), $el);
                return false;
            });
        }

        setTimeout(function() {

            $el.foundation('open');
            Zurb.reflow();

        }, 50);

        $el.on('closed.zf.reveal', function(e) {

            $el.off().remove();

        });

        $el.on('open.zf.reveal', function(e) {
            if(attrs.onRender) {
                attrs.onRender($el);
            }
        });

        return $el;

    }

};
