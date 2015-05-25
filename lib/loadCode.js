"use strict";

var path = require("path");
var readFiles = require("./readfiles");


function lang(filename) {
	var ext = path.extname(filename);
	if (ext === ".go") {
		return "go";
	}
	if (ext === ".jsx") {
		return "js";
	}
	if (ext === ".js") {
		return "js";
	}
	throw new Error("Unsupported extension " + ext);
}

function load(root, callback) {

	root = path.resolve(root);

	console.time("load-snippets");

	var examples = [];


	readFiles(
		root, {
			match: /.(go|js|jsx)$/
		}, function(err, content, filename, next) {
			if (err) {
				throw err;
			}
			var l = lang(filename);
			var relative = path.relative(root, filename);
			parseSnippets(l, content, relative).forEach(function(s) {
				examples.push(s);
			});
			next();
		}, function(err) {
			if (err) {
				throw err;
			}
			console.timeEnd("load-snippets");
			console.log("%d loaded", examples.length);
			callback(examples);
		});
}


function prefix(l, fix) {
	var trimmed = l.trim();
	if (trimmed.indexOf(fix) === 0) {
		return trimmed.substring(fix.length).trim();
	}
	return undefined;
}

function parseSnippets(language, content, relative) {
	var lines = content.split("\n");

	var snippet;
	var closed = [];


	lines.forEach(function(l) {

		var name = prefix(l, "// start example ");
		if (name !== undefined) {
			if (snippet) {
				throw new Error("overlapping snippets in " + relative);
			}
			// count indent
			var indent = l.indexOf("// start example");

			snippet = {
				name: name,
				lines: [],
				file: relative,
				lang: language,
				indent: indent
			};
			return;
		}

		var close = prefix(l, "// end example");
		if (close !== undefined) {
			if (snippet === undefined) {
				throw new Error("no snippet to close in " + relative);
			}

			closed.push(snippet);

			snippet = undefined;
			return;
		}
		if (snippet !== undefined) {
			var notFirst = snippet.lines.length > 0;
			if ((notFirst) || (l.trim().length > 0)) {
				snippet.lines.push(l.substr(snippet.indent));
			}
		}

	});

	if (snippet !== undefined) {
		throw new Error("nonclosed snippet " + snippet.name + " in " + relative);
	}
	return closed;




}

// snippet  lines. content, lang, id


module.exports = load;
