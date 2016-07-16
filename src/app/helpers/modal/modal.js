/**
 * Utility functions to create interactive ui components for the application in
 * general.
 */

var templateBasic       = _.template(require('./templates/basic.html'));
var templateConfirm     = _.template(require('./templates/confirm.html'));
var templateDate        = _.template(require('./templates/filter-date.html'));

var Form                = require('helpers/form/form');

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
            case 'date':
                $el = $(templateDate(attrs));
                break;
            case 'custom':
                $el = $(attrs.template(attrs));
                break;
        }

        $($el).appendTo('body');

        $el.foundation();

        if (attrs.onAccept) {
            $el.find('.btn-confirm').on('click', attrs.onAccept);
        }
        if (attrs.onCancel) {
            $el.find('.btn-cancel').on('click', attrs.onCancel);
        }
        if (attrs.onSubmit) {
            $('body').on('submit', $el.find('form:first'), function(e) {
                e.preventDefault();
                attrs.onSubmit();
                return false;
            });
        }

        $el.foundation('open');

        $el.on('closed.zf.reveal', function(e) {

            $el.remove();

        });

        return $el;

    }

};
