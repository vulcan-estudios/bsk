/**
 * Filter ltrim
 *
 * Filter.get('custom string', 'ltrim', 'cus');
 * return 'tom string'
 *
 */
module.exports   = {

    exec: function(str, opt) {

        return App.Filter.get(str, ['rtrim','ltrim'], opt);

    }

};