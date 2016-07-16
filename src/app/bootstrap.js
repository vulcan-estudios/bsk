// Load config parameters
const async     = require('async');

module.exports  = {

    init: function(cb) {

        async.parallel([

            // Load custom models
            function(callback) {
                callback();
            }

        ], cb);

    }

};
