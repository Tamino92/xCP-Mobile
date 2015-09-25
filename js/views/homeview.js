HomeView = Backbone.View.extend({

    initialize: function () {
        // function initialize
    },

    template : _.template('<h1>Bonjour Domi</h1>'+
                          '<button type="button" class="btn btn-default">Scan QR Code</button>'),

    render: function () {
        this.$el.html(this.template({appReady : app.deviceready})) ;
        return this;
    },

    events: {
        "click button" : "scanQRCode"
    },

    scanQRCode : function(){
        //alert(' button clicked') ;
        cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
    }
});