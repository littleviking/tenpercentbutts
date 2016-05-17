chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if ( request.message === "getSettings" ) {
    chrome.storage.local.get({
      auto: false,
      percent: 10
    }, function(settings) {
      sendResponse( { settings: settings } );
    });
    return true;
  }
});