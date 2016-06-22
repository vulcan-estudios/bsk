/**
 *
 * Form
 *
 */

module.exports   = {

    /**
     * Method to get form elements
     *
     * @param jQuery $form
     * @param string field
     * @returns Object
     */
    get: function($form, field) {

        var data    = $form.find(':input').filter(function () {
            if($(this).data('currency') !== undefined) {
                return $.number( this.value, 2, '.', '' );
            }
            return $.trim(this.value);
        }).serializeJSON();

        return (field) ? data[field] : data;

    },

    /**
     * Autoload form with a model or values
     *
     * @param String model
     * @param Object attrs
     * @example Form.autoload('user', { name: 'John Doe', email: 'jhondoe@example.com' }
     *
     */
    autoload: function(model, attrs) {

        // Each values
        $.each(attrs, function(key, value) {

            //
            // key: value
            //
            // key: {
            //     id: value (id is required)
            // }
            //
            // Input: name="model[attribute]" value="value"
            //

            if(value === null) {
                value   = '';
            } else if(typeof value === 'object' && value.id) {
                value   = value.id;
            }

            $input  = (model) ? $('[name="'+ model +'['+ key +']"]') : $('[name="'+key+'"]');

            // If exist
            if($input.size() > 0 ) {

                // is checkbox
                if ($input.is(':checkbox')) {
                    (value) ? $input.prop('checked', true) : $input.prop('checked', false);
                } else {

                    // if is datepicker
                    if($input.data('datepicker') !== undefined) {
                        var tmpFormat   = $input.attr('data-format') || 'MM/DD/YYYY';
                        if(value.indexOf("Z") > 0) {
                            value           = (value) ? moment(value).format(tmpFormat) : '';
                        } else if(value.length > 10) {
                            value           = (value) ? moment(value, 'YYYY-MM-DD hh:ii:ss').format(tmpFormat) : '';
                        } else {
                            value           = (value) ? moment(value, 'YYYY-MM-DD').format(tmpFormat) : '';
                        }
                    }

                    // if is currency
                    if($input.data('currency') !== undefined) {
                        value               = (value)   ? $.number(value, 2, '.', '' ) : '0';
                    }

                    $input.val(value);

                }
            }

        });
    },

    /**
     * Remove input error
     * @param JQuery Object object
     */
    inputValid: function($input, timeout) {
        var $container  = $input.parents('div:first');
        setTimeout(function() {
            $container.find('label').removeClass('is-invalid-label');
            $container.find('.form-error').removeClass('is-visible');
            $input.removeAttr('data-invalid').removeAttr('aria-invalid').removeClass('is-invalid-input');
        }, (timeout > 0) ? timeout : 500);
    },

    /**
     * Show input error
     * @param JQuery Object object
     */
    inputInvalid: function($input, msg, timeout) {
        var $container  = $input.parents('div:first');
        var $inputError = $container.find('.form-error');
        setTimeout(function() {
            $container.find('label').addClass('is-invalid-label');
            if(msg) {
                $inputError.html(msg);
            }
            $inputError.addClass('is-visible');
            $input.attr('data-invalid', '').attr('aria-invalid', 'true').addClass('is-invalid-input');
            $input.parents('form:first').attr('data-invalid', '');
        }, (timeout > 0) ? timeout : 500);
    }


};