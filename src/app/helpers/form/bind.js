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
var Select2     = require('helpers/form/select2');
var TinyMCE     = require('helpers/form/tinymce');

module.exports   = {

    /**
     * Init form elements with helpers
     * @param callback cb
     */
    init: function(cb) {

        let $input  = $('body').find(':input:visible').not('readonly').not('disabled').first();
        let $modal  = $('body').find('.reveal-modal');
        setTimeout(function() {
            if($modal.is(':visible')) {
                $input = $modal.find(':input:visible').not('readonly').not('disabled').first();
            }
            $input.trigger('focus');
        }, ($input.parents('[data-datepicker]:first').size() > 0) ? 1000 : 500);

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
            Timepicker.init('[data-timepicker]');

            // Bind Upload
            Upload.init('[type="file"]');

            // Bind Selcet2
            Select2.init('[data-select]');

            // Bind TinyMCE
            TinyMCE.init('[data-tinymce]');

            // Callback
            if(cb) {
                cb();
            }

        }, 500);

    }

};