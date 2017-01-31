/**
 *
 * Form
 *
 */


// Components
var Capitalize  = require('helpers/form/capitalize');
var Counter     = require('helpers/form/counter');
var Currency    = require('helpers/form/currency');
var Datepicker  = require('helpers/form/datepicker');
var Password    = require('helpers/form/password');
var Timepicker  = require('helpers/form/timepicker');
var Upload      = require('helpers/form/upload');
var Select2     = require('helpers/form/select2');

module.exports   = {

    /**
     * Init form elements with helpers
     * @param callback cb
     */
    init: function(cb) {

        let $input  = $('body').find(':input:visible').not('readonly').not('disabled').first();
        setTimeout(function() {
            $input.trigger('focus');
        }, ($input.parents('[data-datepicker]:first').size() > 0) ? 1000 : 500);

        setTimeout(function() {

            // Bind AutoCapitalize
            Capitalize.init();

            // Bind Counter
            Counter.init('[data-counter]');

            // Bind Currency
            Currency.init('[data-currency], [data-decimal]');

            // Bind datepicker
            Datepicker.init('[data-datepicker]');

            // Bind Password
            Password.init('[type="password"]');

            // Bind timepicker
            Timepicker.init('[data-timepicker]');

            // Bind Upload
            Upload.init('[type="file"]');

            // Bind Selcet2
            Select2.init('[data-select]');

            // Callback
            if(cb) {
                cb();
            }

        }, 500);

    }

};