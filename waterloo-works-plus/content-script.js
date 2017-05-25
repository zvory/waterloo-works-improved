/*
 * Oh man these are some disgusting hacks that make me feel no better than the people that made WaterlooWorks
 *
 */

// from stack overflow
function injectJs(script) {
    var scr = document.createElement('script');
    scr.type="text/javascript";
    scr.innerHTML=script;
    document.getElementsByTagName('head')[0].appendChild(scr)
}

if (location.hash.indexOf("orbisApp.buildForm") !== -1) {
    var orbisScript  = decodeURIComponent(location.hash.substring(1));
    location.hash = "";
    injectJs(orbisScript);
}
var list = document.getElementsByTagName("a");

// Because NodeList.forEach is not part of any spec, and [].forEach is a hack
var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
};


forEach(list, function callback (index, cur) {
    if (cur.href === undefined || cur.href === "javascript:void(0);") {
        cur.href = "#" + cur.getAttribute("onclick");
    }
});

//
///*
//   If the click was on a link, send a message to the background page.
//   The message contains the link's URL.
//   */
//function notifyExtension(e) {
//	var target = e.target;
//	while ((target.tagName != "A" || !target.href) && target.parentNode) {
//		target = target.parentNode;
//	}
//	if (target.tagName != "A")
//		return;
//
//    // If it's a middle click
//    if (e.which === 2) {
//        if (target.href === undefined || target.href=== "javascript:void(0);") {
//            console.log("Clicked on a with undefined href");
//            e.preventDefault();
//            var onclickscript= target.getAttribute("onclick");
//            browser.runtime.sendMessage({"url": target.href, "script":onclickscript});
//        }
//
//    } 
//}
//
///*
//   Add notifyExtension() as a listener to click events.
//   */
//window.addEventListener("click", notifyExtension, {"capture":true});
////window.addEventListener("onclick", notifyExtension, {"capture": true});
//
//
////
////console.log("Content script is running");
////
/////*
////   If the click was on a link, send a message to the background page.
////   The message contains the link's URL.
////   */
////function notifyExtension(e) {
////    var target = e.target;
////    while ((target.tagName != "A" || !target.href) && target.parentNode) {
////        target = target.parentNode;
////    }
////    if (target.tagName != "A")
////        return;
////
//////    if (e.which === 2) {
//////        e.preventDefault();
//////        var targetOnclick = target.getAttribute("onclick");
//////        console.log("target onclick:", targetOnclick);
//////
//////        browser.runtime.sendMessage({"url": target.href});
//////    } else {
//////        console.log("Left Click, Ignoring");
////        browser.runtime.sendMessage({"url": target.href});
//// //   }
////}
////
/////*
////   Add notifyExtension() as a listener to click events.
////   */
////window.addEventListener("onclick", notifyExtension, {"capture":true});
