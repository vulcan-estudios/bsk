/**
 * Example model
 *
 * @description
 */

module.exports = {

    defaults: {
        id: '',
        name: ''
    },

    // Method constuctor
    initialize: function() {

    },

    getElements: function() {
        return ['red', 'blue', 'orange', 'black', 'white', 'yellow'];
    }

};