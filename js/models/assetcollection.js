AssetCollection = Backbone.Collection.extend({
    url : app.appRoot+'/business-objects/xr_asset/',
    model : Asset,
    parse : function(response){
        // xCP Collection is nested under the entries objects, here we just extract those entries
        this.totalItems = response.total ;
        return response.entries ;
    },
    initialize : function(){
        this.on('add',this.addItem,this);
        this.totalItems = 0 ;
        this.currentPage = 1 ;
    },
    addItem : function(item){
        item.set('id',item.get('id').split('/')[2]);
    },
    focusOnAsset : function(id){
        this.reset(this.get(id));
    }
});