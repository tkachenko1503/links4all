
document.addEventListener('DOMContentLoaded', function () {
    var currentTab = document.querySelector('#currentUrl');

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var tabUrl;

        if (!tabs || !tabs.length) {
          return;
        }

        tabUrl = tabs[0].url;

        currentTab.innerText = tabUrl;
    });
});
