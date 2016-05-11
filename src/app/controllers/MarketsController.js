/**
 * MarketsController
 *
 * @description
 */


module.exports = {

    routes: {

        'markets':                 'index',
        'markets/get/:id':         'get',
        'markets/list':            'list'

    },

    // Callback before run
    _beforeFilter: function() {

        console.log('before Filter Markets');

    },

    // List all elements
    list: function() {

        console.log('Entró a listar Markets');

    }

};