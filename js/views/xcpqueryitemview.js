XcpQueryItemView = Backbone.View.extend({
    // default tagName in backbone is div
    tagName : 'li',
    className : 'searchItem',
    template : _.template(
        '<a href="#detail" ><%= content.properties.object_name %>'+
        '<p class="ui-li-aside"><%= content.properties.r_object_type %><p>'+
        '</a>'
    ),

    render : function(){
        var self = this ;
        this.$el.attr('r_object_id',this.model.get('content.properties.id')) ;
        this.$el.attr('r_object_type',this.model.get('content.properties.r_object_type')) ;
        this.$el.html(this.template(this.model.attributes)) ;
        this.$el.bind('click',function(){
            app.searchItemClickedId = $(this).attr("r_object_id")  ;
            app.searchItemClickedType =  $(this).attr("r_object_type");
            
        });

        return this ;
    },
    initialize : function(){
        this.model.on('change',this.render,this) ;
    }
});