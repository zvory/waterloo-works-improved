

/*
If the click was on a link, send a message to the background page.
The message contains the link's URL.
*/
function notifyExtension(e) {
    console.log("NotifyExtention Called");
  var target = e.target;
  while ((target.tagName != "A" || !target.href) && target.parentNode) {
    target = target.parentNode;
  }
console.log("Right Before REturn");
  if (target.tagName != "A")
    return;

  console.log("content script sending message");
  console.log("Message");
  console.log("targetStringified", JSON.stringify(target));
  console.log("target", target);
  browser.runtime.sendMessage({"url": target.href});
}

/*
Add notifyExtension() as a listener to click events.
*/
window.addEventListener("click", notifyExtension);


