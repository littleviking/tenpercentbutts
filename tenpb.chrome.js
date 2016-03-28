var updateSettings,
    settings = {
      auto: false,
      percent: 10
    }
;

updateSettings = function(callback) {
  chrome.runtime.sendMessage({ message: "getSettings" }, function(response) {
    settings = response.settings;
    if (typeof callback === "function") {
      callback();
    }
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if ( request.message === "clickedBrowserAction" ) {
      updateSettings(function() {
        if ( document.body.classList.contains('tenpb-on') ) {
          tenpb.detachModule( document.body );
        }
        else {
          tenpb.initModule( document.body, settings );
        }
      });
    }
  }
);

updateSettings(function() {
  if (settings.auto) {
    tenpb.initModule( document.body, settings );
  }
});