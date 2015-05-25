"use strict";



var hljs = require("highlight.js");
hljs.configure({
	//useBR: true,
	tabReplace: "    "
});


function buildSpaces() {
	var list = [];
	var nbsps = "";
	for (var i = 0; i < 40; i++) {
		list[i] = nbsps;
		nbsps += "&nbsp;";
	}
	return list;
}
var spaces = buildSpaces();

function highlight(code, lang) {
	var subset;
	if (lang) {
		subset = [lang];
	}

	var result = hljs.highlightAuto(code, subset).value;
	var fixed = hljs.fixMarkup(result);
	// indent with nbsps;
	var indented = fixed.replace(/^[^\S\r\n]+/mg, function(match) {
		return spaces[match.length];
	});

	return indented.replace(/\n/mg, "<br/>");
}

module.exports = highlight;
