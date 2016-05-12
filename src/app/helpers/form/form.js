/**
 *
 * Form
 *
 */


// Components
var Abide       = require('helpers/form/abide');
var Counter     = require('helpers/form/counter');
var Currency    = require('helpers/form/currency');
var Datepicker  = require('helpers/form/datepicker');
var Password    = require('helpers/form/password');
var Timepicker  = require('helpers/form/timepicker');
var Upload      = require('helpers/form/upload');

module.exports   = {

    /**
     * Init form elements with helpers
     * @param callback cb
     */
    init: function(cb) {

        setTimeout(function() {

            // Bind Counter
            Counter.init('[data-counter]');

            // Bind Currency
            Currency.init('[data-currency]');

            // Bind datepicker
            Datepicker.init('[data-datepicker]');

            // Bind Password
            Password.init('[type="password"]');

            // Bind timepicker
            Timepicker.init('[type="timepicker"]');

            // Bind Upload
            Upload.init('[data-upload]');

            // Callback
            if(cb) {
                cb();
            }

        }, 500);

    },

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
    }

};