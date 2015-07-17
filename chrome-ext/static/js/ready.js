/* Copyright 2015 by the Ancestry.com SF interns.
 * This is a Chrome Extension for Ancestry Radio.
*/

// INITIALIZE GLOBALS

// $body = $("body");
// $(document).on({
//     ajaxStart: function() { $body.addClass("loading");    },
//      ajaxStop: function() { $body.removeClass("loading"); }
// });

// When the current web page loads, call STARTPROCESS (at bottom of this file).
// $(document).ready(startProcess);

//////////////////////////////////////////////////
////////////// HELPER FUNCTIONS //////////////////
//////////////////////////////////////////////////

/** Injects the js file specified by url into the head of the current website's
  * html. */
function inject_js_to_head(url) {
  (function() {
    // Create a new script node
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function() {
        // Cleanup onload handler
        script.onload = null;
    };
    // Add the script to the DOM
    $('head').append(script);
    // Set the `src` to begin transport
    script.src = chrome.extension.getURL(url);
  })();
}

//////////////////////////////////////////////////
//////// INJECTING STUFF INTO WEB PLAYER /////////
//////////////////////////////////////////////////

/** Injects scripts into the current web player at different times based on
  * which music player we are using. SYNCHRONOUS function, domain specific. */
// function inject_scripts_after_page_load(domain) {
//   // Keep calling itself until the album string is not empty
//   if (domain == 'pandora') {
//     $('.treatment.current').waitUntilExists(function() {
//     });
//   } else if (domain =='spotify') {
//     // $('#section-radio.stacked.active').waitUntilExists(function() {});
//     setTimeout(function()
//       {
//         inject_download_button(domain);
//         initiate_download_callbacks();
//       },
//       10000
//     );
//   }
// }

function get_birth_year() {
  return $('.userCardSubTitle')[0].textContent.split("–")[0];
}

function get_first_name() {
  return $('.userCardTitle')[1].textContent.split(" ")[0];
}

function get_last_name() {
  var name = $('.userCardTitle')[1].textContent.split(" ");
  return name[name.length - 1];
}

function inject_spotify_button() {
  $('#personPageStory').prepend('<div id="my_div" class="lifeStorySec"><img src="http://www.iconarchive.com/download/i76693/xenatt/the-circle/App-Spotify.ico" id="spotify_button" width="40" height="40" ><a>See what this person would have listened to.</a></div>');
  $('#spotify_button').click(function() { window.open("https://murmuring-crag-3933.herokuapp.com/radio?birthYear=1920&name=" + get_first_name() + "&lastName=" + get_last_name(), "_blank");} );
  
  $('#my_div').css("left", $('lifeStoryNarrative').css('left'));
}

inject_spotify_button();

/** Injects stylesheets into the current website's html so that we can use
  * things such as Bootstrap's modal. */
function inject_header_scripts() {
  $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', chrome.extension.getURL("static/css/bootstrap.css")) );
  $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', chrome.extension.getURL("static/css/app.css")) );
  $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', chrome.extension.getURL("static/css/bootstrap-toggle.min.css")) );
  $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'https://fonts.googleapis.com/css?family=Roboto'));
  $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'https://fonts.googleapis.com/css?family=Roboto+Condensed'));
  $('body').append('<div id="downloadModalWrapper"></div>');
  $('#downloadModalWrapper').load(chrome.extension.getURL("static/templates/songs.html"));

  inject_js_to_head('static/js/bootstrap.js');
  inject_js_to_head('static/js/utils.js');
}

(function ($) {

/**
* @function
* @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
* @param {function} handler A function to execute at the time when the element is inserted
* @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
* @example $(selector).waitUntilExists(function);
*/

$.fn.waitUntilExists    = function (handler, shouldRunHandlerOnce, isChild) {
    var found       = 'found';
    var $this       = $(this.selector);
    var $elements   = $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);

    if (!isChild)
    {
        (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
            window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce, true); }, 500)
        ;
    }
    else if (shouldRunHandlerOnce && $elements.length)
    {
        window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
    }

    return $this;
};

}(jQuery));


//////////////////////////////////////////////////
///////////// PROGRAM STARTS HERE ////////////////
//////////////////////////////////////////////////

/** Creates a user in the db and injects scripts and download button into the
  * webpage. */
function startProcess() {

    // We need to inject our scripts at different times based on the music player
    // SYNCHRONOUS function, domain specific.
    //inject_scripts_after_page_load(domain);

    // Injects relevant html, css, javascript into the page. Domain specific.
    inject_header_scripts();

    // Place the download button in the right place, depending on the domain.
    inject_spotify_button();

    // Initiates the 'if download button clicked, do this action' listener.
    initiate_download_callbacks();

}
