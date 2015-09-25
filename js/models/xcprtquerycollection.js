XcpRtQueryCollection = Backbone.Collection.extend({
    constructor: function(params) {
        this.queryName = params.queryName ;
        this.queryFetchData = params.queryFetchData ;
        this.url = app.appRoot+'/realtime-queries/'+this.queryName ;
        Backbone.Collection.apply(this, arguments);
    },
    model : XcpRtQueryItem,
    parse : function(response){
        // xCP Collection is nested under the entries objects, here we just extract those entries
        this.totalItems = response.total ;
        return response.entries ;
    },
    initialize : function(){
        //this.on('add',this.addItem,this);
        this.totalItems = 0 ;
        this.currentPage = 1 ;
    },
    addItem : function(item){
        item.set('id',item.get('id').split('/')[2]);
    }
});
