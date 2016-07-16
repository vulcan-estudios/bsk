/**
 *
 * Abide
 *
 * <form data-abide novalidate>
 *
 * </form>
 *
 */
module.exports   = {

    /*
     * CUSTOM PATTERNS
     *
     * Example
     * <input type="text" pattern="year" />
     */
    patterns: {

        // Only positives number
        'pint': /^[0-9]+$/,
        
        // Decimal number
        'decimal': /^(?!0\d|$)\d*(\.\d{1,4})?$/,

        // Year format
        'year': /^(19|20)\d\d/,

        // Month format
        'month': /^(0[1-9]|1[012])/,

        // Day format
        'day': /^(0[1-9]|[12][0-9]|3[01])/,

        // Currency format 1.00
        'currency': /^((\d+)|(\d{1,3})(\,\d{3}|)*)(\.\d{2}|)$/
    },

    /*
     * CUSTOM VALIDATORS
     *
     * Example:
     * <input type="text" data-validator="multi-email" />
     */
    validators: {

        // Datepicker Checkin
        'datepicker-range': function($el, required, parent) {

            if(!$el.val()) { // If not has val but is required
                return (required) ? false : true;
            }

            var container   = $el.parents('[data-datepicker]:first');
            var format      = ($el.attr('data-format') || 'YYYY-MM-DD').toUpperCase();

            // Checkin and checkout input
            var checkin     = ($el.hasClass('datepicker-checkin'))  ? $el   :   container.find('.datepicker-checkin:first');
            var checkout    = ($el.hasClass('datepicker-checkout')) ? $el   :   container.find('.datepicker-checkout:first');

            // Values
            var valCheckin  = checkin.val()     ? moment(checkin.val(), format)     : '';
            var valCheckout = checkout.val()    ? moment(checkout.val(), format)    : '';

            // Boolean Valid
            var valid       = true;

            if($el.hasClass('datepicker-checkin')) {

                if(container.size() > 0 && checkout.size() === 0) { // If not exist
                    console.log("Missing the datepicker-checkout class into data-datepicker");
                    return false;
                }

                // If has checkout
                if (checkout.size() > 0 && valCheckout) {
                    if( valCheckin > valCheckout ) {
                        valid   = false;
                    } else if(!valCheckout) {
                        setTimeout(function() {
                            container.find('.datepicker-checkout:first').trigger('focus');
                        }, 500);
                    }
                }

            } else {

                if(container.size() > 0 && checkin.size() === 0) { // If not exist
                    console.log("Missing the datepicker-checkin class into datepicker-range");
                    valid   = false;
                }

                // If has checkout
                if (checkin.size() > 0 && valCheckin && (valCheckin > valCheckout) ) {
                    valid   = false;
                }

            }

            return valid;

        },

        // Validator for input with multiple email: a@b.com, c@d.com, e@f.com
        'multi-email': function($el, required, parent) {

            if(!$el.val()) { // $el is jQuery selector
                return (required) ? false : true; // If not has val but is required
            }

            var valid   = true;

            if($el.val()) {
                var emails  = $el.val().split(',');
                var pattern = Foundation.Abide.defaults.patterns.email;
                $.each(emails, function(i, j) {
                    if(!pattern.test( $.trim(emails[i]) )) {
                        valid   = false;
                        return false;
                    }
                });
            }

            return valid;

        }
    }

};