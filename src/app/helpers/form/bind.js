/**
 *
 * Form
 *
 */


// Components
var Counter     = require('helpers/form/counter');
var Currency    = require('helpers/form/currency');
var Datepicker  = require('helpers/form/datepicker');
var Password    = require('helpers/form/password');
var Timepicker  = require('helpers/form/timepicker');
var Upload      = require('helpers/form/upload');
var Switch      = require('helpers/form/switch');

module.exports   = {

    /**
     * Init form elements with helpers
     * @param callback cb
     */
    init: function(cb) {

        $(Switch);

        $('body').find('input:visible').not('readonly').not('disabled').first().trigger('focus');

        setTimeout(function() {

            // Bind Counter
            Counter.init('[data-counter]');

            // Bind Currency
            Currency.init('[data-currency], [data-decimal]');

            // Bind datepicker
            Datepicker.init('[data-datepicker]');

            // Bind Password
            Password.init('[type="password"]');

            // Bind timepicker
            Timepicker.init('[type="timepicker"]');

            // Bind Upload
            Upload.init('[type="file"]');

            // Callback
            if(cb) {
                cb();
            }

        }, 500);

    }

};