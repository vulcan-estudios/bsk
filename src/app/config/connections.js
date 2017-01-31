/**
 * All Connections
 *
 * @type type
 */
const Storage   = require('libs/Storage');

module.exports = {

    development: {

        // API
        host:  '/api/',

        // Custom header to send into request
        headers: {
            'x-token-auth': Storage.get('token')
        }

    },

    production: {

        // API
        host:  '/api/',

        // Custom header to send into request
        headers: {
            'x-token-auth': Storage.get('token')
        }

    },

    ivanmel: {

        // API
        host:  '/api/',

        // Custom header to send into request
        headers: {
            'x-token-auth': Storage.get('token')
        }

    },

    kunturIP: {

        // API
        host:  '/api/',

        // Custom header to send into request
        headers: {
            'x-token-auth': Storage.get('token')
        }

    },

	kuntur: {

        // API
        host:  '/api/',

        // Custom header to send into request
        headers: {
            'x-token-auth': Storage.get('token')
        }

    }

};
