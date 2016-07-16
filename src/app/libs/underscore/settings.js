var Config      = require('../../config/config');
var mixing      = require('./mixing');


module.exports = function() {
   
    // Underscore Templates
    _.templateSettings  = Config.TEMPLATE_SETTINGS;

    // Underscore Mixing
    _.mixin(mixing || {});

};
