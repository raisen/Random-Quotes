chrome.runtime.onInstalled.addListener(function (object) {
  chrome.tabs.create({url: "options.html?first-install=1"});
});