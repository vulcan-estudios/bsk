/**
 * Storage with polyfill
 *
 *
 * App.Storage.get('var');
 *
 * App.Storage.set('var', 'value');
 *
 * App.Storate.destroy('var';
 *
 */

require('libs/polyfills/localStorage');

module.exports  = {

    get: function(item) {

        return window.localStorage.getItem(item);

    },

    set: function(item, value) {

        return window.localStorage.setItem(item, value);

    },

    remove: function(item) {

        return window.localStorage.removeItem(item);

    },

    clear: function() {
        
        return window.localStorage.clear();

    },

    cookie: function(key, val) {
        if(val !== undefined) {
            return $.cookie(key, val, {path: '/'});
        } else {
            return $.cookie(key);
        }
    }

};
