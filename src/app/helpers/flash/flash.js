/**
 *
 * Helper Flash
 *
 * Flash.valid('Hello');
 *
 * Flash.error('Error');
 *
 */

var template    = require('./templates/default.html');

module.exports  = {

    target: '.flash-message',

    /**
     * Initialize
     */
    init: function(element) {
        this.target  = (element) || '.flash-message';
        if($(this.target+':first').size() < 1) {
            $('body').append('<div class="row"><div class="small-11 medium-9 small-centered columns"><div class="'+ this.target.replace('.', '') +'"></div></div></div>');
        }
        this.buffer();
        this.bind();
        return this;
    },

    /**
     * Bind Event
     */
    bind: function() {
        $('body').on('click', '.alert-box .close', function(e) {
            e.preventDefault();
            $(this).parents('.alert-box:first').hide();
        });
    },

    /**
     * Show Valid Message
     *
     * @param String msg
     * @param Mixing cb
     */
    valid: function(msg, cb) {
        this.display('valid', msg, cb);
    },

    /**
     * Show Info Message
     *
     * @param String msg
     * @param Mixing cb
     */
    info: function(msg, cb) {
        this.display('info', msg, cb);
    },

    /**
     * Show Warning Message
     *
     * @param String msg
     * @param Mixing cb
     */
    warning: function(msg, cb) {
        this.display('warning', msg, cb);
    },

    /**
     * Show Error Message
     *
     * @param String msg
     * @param Mixing cb
     */
    error: function(msg, cb) {
        this.display('alert', msg, cb);
    },

    /**
     *
     * @param String type
     * @param String msg
     * @param Mixing cb
     */
    display: function (type, msg, cb) {
        var data    = {
            id:     Math.floor(Math.random()*11),
            type:   type,
            text:   msg,
            delay:  7000
        };
        if(cb!==undefined) {
            if (typeof cb === "function") {
                $.cookie('flash-message', _.template(template)({msg: data}), { path: '/' });
                setTimeout(function() { cb(); }, 100);
                return;
            } else if(parseInt(cb) > 0) {
                data.delay  = cb;
            }
        }
        this.clear();
        $(this.target+':first').append(_.template(template)({msg: data}));
    },

    /**
     * Clear all flash
     */
    clear: function() {
        $(this.target).empty();
    },

    /**
     * Show Buffer Message
     */
    buffer: function() {
        if($.cookie('flash-message')) {
            $(this.target+':first').append($.cookie('flash-message'));
            $.removeCookie('flash-message', { path: '/' });
        }
    }

};