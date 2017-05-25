function sendNotif (title, message) {
    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/link-48.png"),
        "title": title,
        "message": message
    });
}


/*
   Log that we received the message.
   Then display a notification. The notification contains the URL,
   which we read from the message.
   */
function notify(message) {
//    var title = browser.i18n.getMessage("notificationTitle");
//    var content = browser.i18n.getMessage("notificationContent", message.script);


    function onExecuted(result) {
        sendNotif("Executed Successfully", "null");
    }

    function onError(error) {
        sendNotif("Filaed!", error.message );
    }

    if (message.script !== undefined ) {
        sendNotif ("executingScript", message.script);

        var script = `
            var __interval = setInterval (function () {
                console.log("WOWOW");
                console.log(window);
                console.log(window.orbisApp);
                if (typeof window.orbisApp != "undefined") { 
                    console.log("WE EXECUTING");
                    window.` + message.script + `
                    clearInterval(__interval);
                    console.log("WE EXECUTED");
                };
            }, 100);`

        sendNotif("script", script);
        var executing = browser.tabs.executeScript({
            code: script
        });
        executing.then(onExecuted, onError);
    }

   // function duplicateFirstTab(tabs) {
   //     var duplicating = browser.tabs.duplicate(tabs[0].id);
   //     duplicating.then(onDuplicated, onError);
   // }

    // Query for all open tabs
//    if (message.script !== undefined) {
//    }
}

/*
   Assign `notify()` as a listener to messages from the content script.
   */
browser.runtime.onMessage.addListener(notify);
