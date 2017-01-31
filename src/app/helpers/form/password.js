/**
 * Password
 */

var tpl         = _.template(require('./templates/password.html'));

module.exports  = {


    // <i class="icon-visibility"></i>
    show: '<span style="font-size: 0.8rem; padding-top: 0.125rem;">Show</span>',

    // <i class="icon-visibility-off"></i>
    hide: '<span style="font-size: 0.8rem; padding-top: 0.125rem;">Hide</span>',

    /**
     * Init
     *
     * @param {string} element class or id to make as datepicker
     */
    init: function(element) {
        return this.render(element);
    },

    /**
     * Bind element class or id to render html into password
     * @param string element
     */
    render: function(element) {

        var _this           = this;

        $(element).not('[data-password-ignore]').each(function() {

            var $input      = $(this);
            var $container  = $(this).parent();
            var $el         = $(tpl({ hide: _this.hide, show: _this.show }));

            $input.attr('autocomplete', 'off');
            $container.prepend($el);

            $container.find('.input-group-label__password').on('click', function(e) {
                $(this).toggleClass('is-active').promise().done(function() {
                    $input.attr('type', ($(this).hasClass('is-active')) ? 'text' : 'password');
                });
            });

        });

        $(element).not('[data-password-ignore]').on('keyup', function(e) {
            var $input      = $(this);
            var $container  = $input.parent();
            var $el         = $container.find('.input-group-float:first');
            if($.trim($input.val()).length < 1) {
                $el.addClass('hide');
            } else {
                if($el.is(':hidden')) {
                    $el.removeClass('hide');
                }
            }
        });

    }

};
