// Did we find the composer div yet?
var compdiv_found=0;

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
	// New gmail interface
	return find_div_with('aria-label', 'Message Body');
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
		// console.log('compose window');

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