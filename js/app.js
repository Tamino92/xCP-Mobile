// This method prevent to see rax html before rendering
$( document ).on( "pageinit", "#home", function( event ) {
    $("body").show();
});

// Initialization of favorites pages
$( document ).on( "pageinit", "#favorites", function( event ) {
    console.log('page init on favorite page') ;
    if (!app.assetCollection) {
        app.assetCollection = new AssetCollection() ;
        app.assetCollectionView = new AssetCollectionView({collection : app.assetCollection});     
    }
    app.assetCollection.reset() ;
    app.assetCollection.fetch({ 
        data: { inline : true,
               view : ':all',
               'include-total' : true,
               //'items-per-page' : 3,
               'page' : app.assetCollection.currentPage
              } ,
        type : 'GET',
        async : true,
        contentType : 'application/json;charset=UTF-8',
        beforeSend : function(xhr){
            xhr.setRequestHeader ("Accept",app.acceptHeader);
            xhr.setRequestHeader ("Authorization", app.authorizationHeader);
        }
    });
    $('#favorites_content').html(app.assetCollectionView.el);

});


// Fetching object detail before page show
$( document ).on( "pagebeforeshow", "#detail", function( event,data ) {
    // selecting the model/view to generate regarding object type
    var model, view ;
    if (app.searchItemClickedType=='xr_asset'){
        model = new Asset({id : app.searchItemClickedId}) ;
        view = new AssetView({model : model}) ;
    }
    else {
    }
    model.fetch({
        data: $.param({ inline : true,
                       view : ':all'
                      }) ,
        type : 'GET',
        success : function(model,response,options) {
            console.log(_.find(model.attributes.links, function(link){ return link.type == 'types/relationships/xr_asset_folder_asset'; })) ;
            $('#detail_content').html(view.el);
        },
        beforeSend : function(xhr){
            xhr.setRequestHeader ("Accept", app.acceptHeader);
            xhr.setRequestHeader ("Authorization", app.authorizationHeader);
        }
    });


});


$( document ).on( "pageinit", "#search", function( event ) {
    // Manage click on search page
    $("#search_button").on('click',function(){
        // creating a collection for this query
        var xcpQueryCollection = new XcpRtQueryCollection({queryName : 'xr_search_assets',
                                                           queryFetchData : {
                                                               inline : true,
                                                               view : ':all',
                                                               'include-total' : true,
                                                               'items-per-page' : 10,
                                                               page : 1,
                                                               input_eam_id : $("#search_input").val()
                                                           }}) ;

        xcpQueryCollectionView = new XcpQueryCollectionView({collection : xcpQueryCollection});     
        xcpQueryCollection.fetch({ 
            data: xcpQueryCollection.queryFetchData,
            type : 'GET',
            async : true,
            crossDomain: true,
            contentType : 'application/json;charset=UTF-8',
            success : function(collection, response, options){
                //alert.log(document.cookie);
            },
            beforeSend : function(xhr){
                xhr.withCredentials = true;
                xhr.setRequestHeader ("Accept",app.acceptHeader);
                xhr.setRequestHeader ("Authorization", app.authorizationHeader);
            }
        });
        $('#search_content').html(xcpQueryCollectionView.el);
    });
});
