XcpQueryCollectionView = Backbone.View.extend({
    tagName : 'ul',
    id : 'xcpQueryCollectionView',
    
    initialize : function(){
        this.collection.on('reset',this.render,this) ;
        this.collection.on('add',this.addOne,this) ;
    },
    events  : {
    },
    render : function(){
        this.addAll() ;
        this.$el.attr('data-role',"listview") ;
        this.$el.attr('data-inset',"true") ;
        return this ;
    },
    addOne : function(xcpItem){
        var xcpItemView = new XcpQueryItemView({model : xcpItem});
        this.$el.append(xcpItemView.render().el);
        $('#xcpQueryCollectionView').listview().listview('refresh');
    },
    addAll : function(){
        this.$el.empty() ;
        this.collection.forEach(this.addOne,this) ;
    }
});