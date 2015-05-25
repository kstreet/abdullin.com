"use strict";


var marked = require("marked");




// in my old code I used blockquotes for asides
var renderer = new marked.Renderer();

renderer.blockquote = function(quote) {
	return "<aside>\n" + quote + "</aside>\n";
};

var highlight = require("./highlight");

marked.setOptions({
	highlight: highlight,
	renderer: renderer
});


module.exports = marked;
