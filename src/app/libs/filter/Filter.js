/**
 * Filter
 *
 * Filter.get(' custom string', 'trim');
 * return 'custom
 *
 */

var Filters     = require('bulk-require')(__dirname + '/filters', ['./**/*.js']);

module.exports  = {

    get: function(str, filters, opts) {

        var _this       = this;

        if(Array.isArray(filters)) {
            filters.forEach(function(filter) {
                var f   = _this.load(filter);
                str     = f.exec(str, opts);
            });
            return str;
        } else {
            var f       = _this.load(filters);
            return f.exec(str, opts);
        }

    },

    load: function(filter) {
        if(!Filters[filter+'Filter']) {
            console.error("FILTER", filter, "NOT FOUND INTO /libs/filter/filters");
        }
        return Filters[filter+'Filter'];
    }



};