/**
 * Filter
 *
 * Filter.get(' custom string', 'trim');
 * return 'custom
 *
 */

module.export   = {

    get: function(str, filter, opts) {

        var f   = this.load(filter);
        return f.exec(str, opts);

    },

    _load: function(filter) {
        return filter+'Filter';
    }

};