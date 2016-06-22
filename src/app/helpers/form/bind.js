/**
 *
 * Form
 *
 */


// Components
var Counter     = require('helpers/form/counter');
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