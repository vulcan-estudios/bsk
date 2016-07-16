/**
 * Keydown
 *
 */

module.exports = function() {

    /*
     * this swallows backspace keys on any non-input element.
     * stops backspace -> back
     */
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $('body').bind("keydown keypress", function(e) {

        var key = e.keyCode || e.which;

        if( key == 8) { // 8 == backspace or ENTER
            if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                e.preventDefault();
            }
        } else if(key == 13) {
            
        }

    });

};
