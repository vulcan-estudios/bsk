/**
 * App Model
 *
 * @type type
 */

var Models  = require('bulk-require')(__dirname + '/..', ['./models/**/*.js']).models;

module.exports  = function() {

    var objs    = {};

    _(Models).each(function(model, key) {

        var collection  = function(data) {
            var tmpCollection   = Backbone.Collection.extend({
                model: App.Model[key]
            });
            return new tmpCollection(data);
        };

        objs[key]   = Backbone.Model.extend( _({}).extend(model, {Collection: collection}) );

    });

    return objs;

};