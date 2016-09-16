/**
 * UsersController
 *
 * @description
 */


module.exports = {

    routes: {

        'notifications/users':                 'index',
        'notifications/users/get/:id':         'get',
        'notifications/users/list':            'list',
        'notifications/users/test/:id':         'test'

    },

    // Callback before to run
    _beforeFilter: function() {

        console.log('before Filter Users');

    },

    // Index
    index: function() {

        console.log('Entró a index Users');

        App.View.Render();

    },

    // List all elements
    list: function() {

        console.log('Entró a listar Users');

    },

    // Get with PAram
    get: function(param) {

        console.log('Entró al get del Users: ', param);

    },

    'test:form': function(param) {

        console.log('dispara el test form');

    }

};