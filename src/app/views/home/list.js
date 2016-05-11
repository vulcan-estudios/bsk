var view        = _.template(require('./templates/list.html'));

module.exports  = {

    render: function() {

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( view(this.data) );

    }

};