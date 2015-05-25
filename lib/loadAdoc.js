"use strict";

var path = require("path");

var readFiles = require("./readFiles");
var Post = require("./Post");

var asciidoctor = require("asciidoctor.js")();
var Opal = asciidoctor.Opal;


var processor = asciidoctor.Asciidoctor(true);

function override(converter) {


	converter.$admonition = function(a) {
		if (a.blocks.length === 0) {
			return "<aside><p>" + a.$content() + "</p></aside>";
		}
		return "<aside>" + a.$content() + "</aside>";
	};

	converter.$paragraph = function(a) {
		var role = "";
		if (a.attributes.role) {
			role = " class=\"" + a.attributes.role + "\"";
		}
		return "<p " + role + ">" + a.$content() + "</p>";
	};

	converter.$section = function(a) {
		var h;
		if (a.level === 1) {
			h = "h2";
		} else if (a.level === 2) {
			h = "h3";
		} else if (a.level === 3) {
			h = "h4";
		} else {
			throw new Error("unexpected level");
		}

		//console.log(a.level + " " + a.title);
		return "<section><" + h + ">" + a.title + "</" + h + ">" + a.$content() + "</section>";
	};

	converter.$olist = function(a) {
		var items = "<ol>";
		a.$content().forEach(function(i) {
			items += "<li>" + i.$text() + "</li>";
			if (i.blocks.length > 0) {
				throw new Error("Didn't expect any blocks inside li");
			}
		});
		return items + "</ol>";
	};

	converter.$ulist = function(a) {
		var items = "<ul>";
		a.$content().forEach(function(i) {
			items += "<li>" + i.$text() + "</li>";
			if (i.blocks.length > 0) {
				throw new Error("Didn't expect any blocks inside li");
			}
		});
		return items + "</ul>";
	};

	// https://github.com/asciidoctor/asciidoctor/blob/master/lib/asciidoctor/converter/html5.rb
}

var options = Opal.hash2(
	["attributes"],
	{
		attributes: ["notitle"]
	});

module.exports = function(root, callback) {
	console.time("load-adoc");

	root = path.resolve(root);

	var parsed = [];
	readFiles(
		root, {
			match: /.adoc$/
		}, function(err, content, filename, next) {
			if (err) {
				throw err;
			}
			var relative = path.relative(root, filename);
			var name = "/" + path.basename(relative).replace(".adoc", "/");

			var doc = processor.$load(content, options);

			var attrs = {};
			doc.attributes.keys.forEach(function(key) {
				attrs[key] = doc.attributes.map[key];
			});

			if (attrs.draft) {
				next();
				return;
			}

			//console.log(doc);


			if (attrs.tags === undefined) {
				throw new Error("No tags specified for " + relative);
			}

			var tags = attrs.tags.split(",");

			override(doc.converter);

			var html = doc.$render();


			var post = Post.create({
				html: html,
				title: attrs.doctitle,
				url: name,
				date: new Date(attrs.revdate),
				tags: tags,
				aliases: []

			});
			parsed.push(post);



			//throw new Error("stop");
			//console.log(attrs.tags);




			//parsed.push(hugo);
			next();
		}, function(err) {
			if (err) {
				throw err;
			}
			console.timeEnd("load-adoc");
			callback(parsed);
		});
};
