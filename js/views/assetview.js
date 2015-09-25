AssetView = Backbone.View.extend({
    // default tagName in backbone is div
    className : "ui-corner-all custom-corners",
    template : _.template('<div>'+                       
                          '<h3><%= properties.object_name %></h3>'+
                          '</div>'+
                          '<div class="ui-body ui-body-a">'+
                          '<p><strong> EAM Id : <%= properties.eam_id %></strong><p>'+
                          '<p>Category : <%= properties.category %><p>'+
                          '<p>Sub category : <%= properties.sub_category %></p>'+
                          '<a class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all" href="#">No text</a>'
                         ),

    render : function(){
        this.$el.html(this.template(this.model.attributes)) ;
        return this ;
    },

    initialize : function(){
        this.model.on('change',this.render,this) ;
    },
    // Events
    events : {
        "click button" : "changeAssetName",
        "click a" : "loadThumbnails",
    },
    changeAssetName : function(evt){
        if (this.$el.find('#newNameInput').val()!=''){
            this.model.changeAssetName(this.$el.find('#newNameInput').val()) ;
        }
        else {
            alert('entrez un nouveau nom');
        }
    },
    loadThumbnails : function(evt){
        $.ajax({
            url : 'http://nkxcp22:8000/xRest/processes/xr_get_gallery_urls',
            data: {
                page : 1,
                start : 0,
                'items-per-page' : 10
            },
            type : 'POST',
            async : true,
            crossDomain: true,
            contentType : 'application/json;charset=UTF-8',
            success : function(collection, response, options){
                
                console.log($.cookie('x-csrf-token')) ;

                console.log(document.cookie) ;
            },
            beforeSend : function(xhr){
                xhr.withCredentials = true;
                xhr.setRequestHeader ("Accept",app.acceptHeader);
                xhr.setRequestHeader ("Authorization", app.authorizationHeader);
                xhr.setRequestHeader ("Access-Control-Allow-Headers" , "Set-Cookie");
            }
        });
    }
});