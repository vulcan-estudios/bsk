var view        = _.template(require('./templates/index.html'));

module.exports  = {

    render: function() {

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( view );

    }

};