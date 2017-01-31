/**
 * ACL
 *
 */

module.exports = {

    init: function(role) {

        $('body').find('[data-role]').hide(0, function() {
            $('body').find('[data-role="'+role+'"]').show();
        });

    }

};