/*
 * Oh man these are some hacks that make me feel no better than the people that made WaterlooWorks
 */

// modified from stack overflow
// WebExtension API doesn't let us access the webpage's JS, only the DOM, so this is necessary for our approach
function injectJs(script) {
    var scr = document.createElement('script');
    scr.type="text/javascript";
    scr.innerHTML=script;
    document.getElementsByTagName('head')[0].appendChild(scr)
}

// If we have a hash of an orbis script, we run it
if (location.hash.indexOf("orbisApp.buildForm") !== -1) {
    var orbisScript  = decodeURIComponent(location.hash.substring(1));
    location.hash = "";
    injectJs(orbisScript);
}

// get all anchor tabs
var list = document.getElementsByTagName("a");

// Because NodeList.forEach is not part of any spec, and [].forEach is a hack, we write our own
var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
};

// replace the href of all invalid anchor tags with something more useful
forEach(list, function callback (index, cur) {
    if (cur.href === undefined || cur.href === "javascript:void(0);" || cur.href === "javascript:void(0)") {
        cur.href = "#" + cur.getAttribute("onclick");
    } 
});
// haha remember when we were going to use the WebExtension API to do things neatly but
// after hours of work we find out what we wnat is impossible in WebExtensions
