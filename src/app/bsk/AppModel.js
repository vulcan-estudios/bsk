/**
 * App Model
 *
 * @type type
 */

var TmpFolders  = require('bulk-require')(__dirname + '/..', ['./models/**/*.js']).models   || {};
var Models      = require('bulk-require')(__dirname + '/..', ['./models/*.js']).models      || {};

// Put only folders with objects
var Folders     = {};
for(let i in TmpFolders) {
    if(Models[i] === undefined) {
        Folders[i]  = TmpFolders[i];
    }
}

module.exports  = function() {

    var objs    = {};

    var toBackboneModel = function(model, key, folder) {

        var tmpModel    = Backbone.Model.extend(_({}).extend(model, {

            objCollection: null,

            setCollection: function(data) {
                var _this           = this;
                var tmpCollection   = Backbone.Collection.extend({
                    model: !folder ? Backbone.Model.extend(model) : Backbone.Model.extend(folder[key])
                });
                _this.objCollection = new tmpCollection(data);
                return true;
            },

            getCollection: function() {
                return this.objCollection;
            }

        }));

        return new tmpModel();

    };

    // Each Models
    _(Models).each(function(model, key) {

        objs[key]    = toBackboneModel(model, key);

    });

    // Each Folders
    _(Folders).each(function(models, folder) {

        // Set folder
        objs[folder] = {};

        // Each Models
        _(models).each(function(model, key) {

            objs[folder][key]   = toBackboneModel(model, key, folder);

        });

    });

    return objs;

};