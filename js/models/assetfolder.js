AssetFolder = Backbone.DeepModel.extend({
    urlRoot : app.appRoot +'/folders/xr_asset_folder',
    contentType: "application/json",
    changeAssetName : function(newName){       
        var self = this ;
        self.set({'content.properties.object_name' : newName});
        self.save({ properties : {object_name : self.get('content.properties.object_name')}},{
            type: 'POST',
            async : true,
            beforeSend : function(xhr){
                xhr.withCredentials = true;
                xhr.setRequestHeader ("Accept", app.acceptHeader);
                xhr.setRequestHeader ("Authorization", app.authorizationHeader);
                xhr.setRequestHeader ("Content-Type", app.saveContentType);
            },
            crossDomain: true,
            success: function(data, status, xhr) {
                //xcp return always an error....
            },
            error: function(xhr, status, error) {
            }
        });
    }

});