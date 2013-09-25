// Did we find the composer div yet?
var compdiv_found=0;

function insert_quote_in_textarea(textarea, quote) {
	textarea.value = textarea.value + quote;
}


function find_div_with(attribute, value)
{
  var allDivs = document.getElementsByTagName('div');

  for (var i = 0; i < allDivs.length; i++)
  {
    if (allDivs[i].getAttribute(attribute) && allDivs[i].getAttribute(attribute) == value)
    {
    	return allDivs[i];
    }
  }
  return null;
}

function find_composer_div() {
	// Old gmail interface
	// var iframe = document.getElementById('canvas_frame');
	// var idoc = iframe.contentDocument;
	// console.log(idoc.getElementsByTagName('textarea'));
	// tareas = idoc.getElementsByTagName('textarea');
	// for (var i=0; i < tareas.length; i++) {
	// 	textarea = tareas[i];
	// 	if (textarea.getAttribute && (textarea.getAttribute('id') == ':n4' || textarea.getAttribute('id') == ':1h9' || textarea.name == 'body' )) {
	// 		return textarea;
	// 	}
	// }
	// return null;


	// New gmail interface
	var div = find_div_with('aria-label', 'Message Body');
	return div;
}

function insert_quote_in_composer_div(composer_div) {
	chrome.storage.sync.get(["quotes", "prefix"], function(settings) {
		if(settings.prefix) {
			composer_div.innerHTML += settings.prefix;
		}
		if(settings.quotes) {
			var quote = settings.quotes[Math.floor(Math.random()*settings.quotes.length)];
			composer_div.innerHTML += quote;
		}
	});
}

var iv = window.setInterval(function() {
	if (window.location.href.indexOf('compose') > 0) {
		console.log('compose window');

		if (!compdiv_found) {
			var composer_div = find_composer_div();
			if (composer_div) {
				compdiv_found=1;
				setTimeout(function(){
					insert_quote_in_composer_div(composer_div);
				}, 3000);
			}
		}	
	} else {
		compdiv_found=0;
	}
}, 2000);