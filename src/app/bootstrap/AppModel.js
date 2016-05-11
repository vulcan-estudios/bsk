/**
 * App Model
 *
 * @type type
 */

var Models  = require('bulk-require')(__dirname + '/..', ['./models/**/*.js']).models;

module.exports  = function() {

    var objs    = {};

    _(Models).each(function(model, key) {

        objs[key]   = Backbone.Model.extend(model);

    });

    return objs;

};