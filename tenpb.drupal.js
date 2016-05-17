(function() {
  Drupal.behaviors.tenpb = {
    attach: function(context) {
      tenpb.initModule(context);
    },
    detach: function(context) {
      tenpb.detachModule(context);
    }
  };
})();