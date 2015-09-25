AssetCollectionView = Backbone.View.extend({
    tagName : 'ul',
    id : 'assetslistview',
    initialize : function(){
        this.collection.on('reset',this.render,this) ;
        this.collection.on('add',this.addOne,this) ;
    },
    events  : {
        "click .btn-next" : "navigateNextPage",
        "click .btn-prev" : "navigatePrevPage"
    },
    render : function(){
        this.addAll() ;
        this.$el.attr('data-role',"listview") ;
        this.$el.attr('data-inset',"true") ;
        return this ;
    },
    addOne : function(assetItem){
        var assetView = new AssetView({model : assetItem});
        this.$el.append(assetView.render().el);
        $('#assetslistview').listview().listview('refresh');
    },
    addAll : function(){
        this.$el.empty() ;
        this.collection.forEach(this.addOne,this) ;
    },
    navigateNextPage : function(evt){
        console.log(this.collection.currentPage) ;
        Backbone.history.navigate("assets/p"+(Number(this.collection.currentPage)+Number(1)), {trigger : true});
        evt.preventDefault() ;
    },
    navigatePrevPage : function(evt){
        console.log(this.collection.currentPage) ;
        Backbone.history.navigate("assets/p"+(this.collection.currentPage-1), {trigger : true});
        evt.preventDefault() ;
    }
});