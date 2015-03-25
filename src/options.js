if(window.location.href.indexOf("first-install") != -1) {
  document.getElementById("first-install").style.display = "block";
}

// Saves options using chrome.storage
function save_options() {
  var quotes = document.getElementById("quotes");
  var prefix = document.getElementById("prefix");
  
  chrome.storage.sync.set({
    quotes: get_array_from_multiple_lines(quotes.value),
    prefix: prefix.value
  }, function() {
    document.getElementById("status").style.display = "block";
    // Update status to let user know options were saved.
    var status = document.getElementById("status-text");
    status.textContent = "Options Saved.";
    setTimeout(function() {
      document.getElementById("status").style.display = "none";
      status.textContent = "";
    }, 2000);
  });
}

// Restores options using chrome.storage
function restore_options() {
  var quotes = chrome.storage.sync.get(["quotes", "prefix"], function(settings) {
    if(settings.quotes) {
      var tarea = document.getElementById("quotes");
      tarea.value = settings.quotes.join("\n");
    }
    if(settings.prefix) {
      var text = document.getElementById("prefix");
      text.value = settings.prefix;  
    }
  });
}

// Convert multiple lines separated by a newline into an array and remove blank lines
function get_array_from_multiple_lines(str) {
  var lines = str.split(/\n/);
  var arr = [];

  for (var i=0; i < lines.length; i++) {
    // only push this line if it contains a non whitespace character.
    if (/\S/.test(lines[i])) {
      arr.push(lines[i]);
    }
  }

  return arr;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
