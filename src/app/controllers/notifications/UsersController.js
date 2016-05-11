/**
 * UsersController
 *
 * @description
 */


module.exports = {

    routes: {

        'notification/users':                 'index',
        'notification/users/get/:id':         'get',
        'notification/users/list':            'list',
        'notification/users/test/:id':         'test'

    },

    // Callback before to run
    _beforeFilter: function() {

        console.log('before Filter Users');

    },

    // Index
    index: function() {

        console.log('Entró a index Users');

    },

    // List all elements
    list: function() {

        console.log('Entró a listar Users');

    },

    // Get with PAram
    get: function(param) {

        console.log('Entró al get del Users: ', param);

    }

};