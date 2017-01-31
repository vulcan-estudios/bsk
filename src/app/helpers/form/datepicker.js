/**
 * Datepicker
 */
var templateIcon    = _.template(require('./templates/datepicker.html'));

module.exports  = {

    /**
     * Init
     *
     * @param {string} element class or id to make as datepicker
     */
    init: function(element) {
        return this.bind(element);
    },

    /**
     * Bind element class or id to datepicker
     * @param string element
     */
    bind: function(element) {

        var _this       = this;

        // All inputs into data-datepicker
        var $inputs      = $(element).find('input');

        // Foreach input
        $($inputs).not('[data-plugin-loaded]').each(function(i) {

            var $input      = $(this);
            $input.attr('data-plugin-loaded', true);

            // Prepen Icon
            $input.parent().prepend(templateIcon);

            var format      = $input.attr('data-format') || 'yyyy-mm-dd';
            $input.attr('data-format', format);
            var isCheckin   = $input.hasClass('datepicker-checkin');
            var isCheckout  = $input.hasClass('datepicker-checkout');
            var range       = (isCheckin || isCheckout) ? $input.parents('[data-datepicker]:first') : false;
            var placeholder = $input.attr('placeholder');
            var cb          = $input.attr('data-onchange');
            if(placeholder !== undefined && placeholder.length < 1) {
                $input.attr('placeholder', format.toUpperCase());
            }
            var maxToday    = ($input.data('max') !== undefined) ? true : false;
            var minToday    = ($input.data('min') !== undefined) ? true : false;
            if(range !== false && range.size() > 0) {
                if(isCheckin) {
                    $input.attr('data-validator', 'datepicker-range');
                }
                if(isCheckout) {
                    $input.attr('data-validator', 'datepicker-range');
                }
                if(range.find('[data-max]').size() > 0) {
                    maxToday    = true;
                }
                if(range.find('[data-min]').size() > 0) {
                    minToday    = true;
                }
            }

            var fdp;
            var nowTemp     = new Date();
            var now         = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
            fdp = $($input).fdatepicker({
                language: 'es',
                format: format.toLowerCase(),
                onRender: function (date) {
                    var este        = $('.datepicker-checkin', $($input).parents('[data-datepicker]:first'));
                    var value       = (este.size() > 0 && este.val()) ? este.val() : moment();
                    var checkin     = moment(value, format.toUpperCase()).subtract(1, 'days').toDate();
                    if(minToday) {
                        var tmpNow  = moment(now).subtract(1, 'days');
                        return date.valueOf() < tmpNow.valueOf() ? 'disabled' : '';
                    }
                    if(!maxToday) {
                        if(isCheckin) {
                            return '';
                        }
                        return (isCheckout &&  date.valueOf() < checkin.valueOf()) ? 'disabled' : '';
                    }
                    return date.valueOf() > now.valueOf() || (isCheckout &&  date.valueOf() < checkin.valueOf()) ? 'disabled' : '';
                }
            });

            fdp.on('changeDate', function(ev) {

                // Current datepicker
                var datepicker = $(this);

                // If has checkin or checkout (range)
                if (datepicker.hasClass('datepicker-checkin')) {

                } else if (datepicker.hasClass('datepicker-checkout')) {

                }

                if(cb !== undefined) {
                    cb.apply(datepicker);
                }

            });

        });

    }

};
