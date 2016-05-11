/**
 * BrandsController
 *
 * @description
 */


module.exports = {

    routes: {

        'brands':                 'index',
        'brands/get/:id':         'get',
        'brands/list':            'list'

    },

    // Callback before to run
    _beforeFilter: function() {

        console.log('before Filter Brands');

    },

    // List all elements
    list: function() {

        console.log('Entró a listar Brands');

    }

};