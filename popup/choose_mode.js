function listenForClicks() {
    function reportError(error) {
        console.error(`Couldn't run the extension: ${error}`)
    }

    function reset(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: 'reset'
        });
    }

    function lineant(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: 'lineant'
        });
    }

    function strict(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: 'strict'
        });
    }
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('none')) {
            browser.tabs.query({active: true, currentWindow: true})
                .then(reset)
                .catch(reportError);

        }
        else if (e.target.classList.contains('lineant')) {
            // The anchors are changed to span, you can't do anything about it
            // except reading the page.
            browser.tabs.query({active: true, currentWindow: true})
                .then(lineant)
                .catch(reportError);
        }
        else if (e.target.classList.contains('strict')) {
            // This one is WIP, mostly I'd like to remove videos
            // from the page.
            browser.tabs.query({active: true, currentWindow: true})
                .then(strict)
                .catch(reportError);
        }
    });
}

function reportExecuteScriptError(error) {
   console.error(`Failed to run Unshallow script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/unshallow.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
