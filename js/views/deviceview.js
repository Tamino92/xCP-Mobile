DeviceView = Backbone.View.extend({

    initialize: function () {

    },

    templateEmpty : _.template('<h1>La vue device</h1>'+
                              '<h3>Device not ready ! </h3>'),
    
    templateWithDevice : _.template('<h1>La vue device</h1>'+
                                    '<h3>Model : <% device.model %></h3>'),

    render: function () {
        if (!app.deviceready){
            this.$el.html(this.templateEmpty()) ;
        }
        else {
            //this.$el.html(this.templateEmpty()) ;
            this.$el.html(this.templateWithDevice(device)) ;
        }
        return this;
    },

    events: {
    }
});