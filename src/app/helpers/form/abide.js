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