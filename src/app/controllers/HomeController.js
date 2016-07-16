/**
 * HomeController
 *
 * @description
 */


module.exports = {

    // Internal Routes
    routes: {

        'home':                 'index',
        'home/get/:id':         'get',
        'home/list':            'list',
        'home/redirect':        'redirect'

    },

    // Home
    index: function() {

        console.log(App.Model.Example.get('id'));
        App.View.Render();

    },

    // List all elements
    list: function() {

        App.Model.Example.set({id: 000, name: 'Model'});

        App.Model.Example.setCollection([
            {id: 123, name: 'A'},
            {id: 456, name: 'B'},
            {id: 789, name: 'C'},
            App.Model.Example
        ]);

        App.Model.Example.toCollection().each(function (model, index, all) {
            console.log(model.get("name"));
            // A
            // B
            // C
        });

        App.Model.Example.on("change:id", function(model){
            var id = model.get("id");
            console.log("Changed my id to " + id );
        });

        App.Model.Example.set('id', 123);

        console.log(App.Model.Example.get('id'));

        App.View.Render({ data: App.Model.Example.getElements() });

    },

    // Get with Param
    get: function(id) {

        console.log('Entró al get del Home: ', id);

    },

    // Redirect to other url
    redirect: function() {

        App.Router.to('home/list', function() {
            App.Flash.valid('Redirect');
        });

    }

};