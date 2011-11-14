var iv_triggered=0;
function insert_quote_in_textarea(textarea, quote) {
	textarea.value = textarea.value + quote;
}
function find_text_area() {
	var iframe = document.getElementById('canvas_frame');
	var idoc = iframe.contentDocument;
	console.log(idoc.getElementsByTagName('textarea'));
	tareas = idoc.getElementsByTagName('textarea');
	for (var i=0; i < tareas.length; i++) {
		textarea = tareas[i];
		if (textarea.getAttribute && (textarea.getAttribute('id') == ':n4' || textarea.getAttribute('id') == ':1h9' || textarea.name == 'body' )) {
			return textarea;
		}
	}
	return null;
}

function get_quote(textarea) {
	chrome.extension.sendRequest({method: "get_quote"}, function(response) {
		if (response && response.quote) {
			quote=response.quote;
			insert_quote_in_textarea(textarea, quote);
		}
	});
}

var iv = window.setInterval(function() {
	if (window.location.href.indexOf('#compose') > 0) {
		if (!iv_triggered) {
			iv_triggered=1;
			tarea = find_text_area();
			if (tarea) get_quote(textarea);
		}	
	} else {
		iv_triggered=0;
	}
}, 2000);

