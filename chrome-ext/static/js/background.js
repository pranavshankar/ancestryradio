// Array to hold callback functions
var callbacks = [];

//var app_url = "http://www.findthe.link/copyright/";
var app_url = "localhost:5000";

// This function is called onload in the popup code
function getPageInfo(callback) {
    // Add the callback to the queue
    callbacks.push(callback);
    // Inject the content script into the current page
    chrome.tabs.executeScript(null, { file: 'content_script.js' });
};

// Perform the callback when a request is received from the content script
chrome.extension.onMessage.addListener(function(request)  {
    if (request.download_info) {
        chrome.downloads.download(
            {
                url:request.download_info['url'],
                filename:request.download_info['filename'],
                saveAs:request.download_info['saveas']
            },
            function(id){});
    }
    // Get the first callback in the callbacks array
    // and remove it from the array
    var callback = callbacks.shift();
    // Call the callback function
    callback(request);
});

/** Used to retrieve localStorage values of this extensions, such as whether
  * a setting is on or off. This gets called when the getLocalStorageValue is
  * called from ready.js. */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
        sendResponse({
            data: localStorage[request.key]
        });
    } else if (request.method == "setLocalStorage") {
        localStorage[request.key] = request.value;
    } else if (request.method == "registerEvent") {
        _gaq.push(['_trackEvent', request.key, 'clicked']);
        _gaq.push(['_setCustomVar',5,'VisitorID',request.visitorId,1]);
    } else if (request.method == "openCopyrightPage") {
        chrome.tabs.create({
            url: app_url + "/copyright"
        });
    } else {
        sendResponse({});
    }
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-53082629-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
