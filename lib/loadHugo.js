"use strict";
var yaml = require("./yaml");
var readFiles = require("./readFiles");
var _ = require("lodash");
var path = require("path");
var markdown = require("./markdown");
var Post = require("./Post");

var images = /{{%.+src="([\w\.\-\/]+)".+%}}/g;


function replaceImageTags(content, target) {

	// got to replace hugo image tags
	var outgoing = content.replace(images, function(match, p1) {
		var replacement = "<p><img src=\"" + target +
		p1 +
		"\" class=\"img-thumbnail img-responsive center-block\" ></p>";
		return replacement;
	});


	// guard
	var loc = outgoing.indexOf("{{");
	if (loc !== -1) {
		throw new Error("expected to cleanup all hugo tags: " +
		outgoing.substring(loc - 10, loc + 50)
		);
	}
	return outgoing;
}

var parseHugo = function(content, filename) {

	var info = yaml(content, filename);
	var config = info.config;
	var outgoing = info.content;


	var target = getTarget(filename);
	outgoing = replaceImageTags(outgoing, target);

	if (config.title === undefined || config.title === "") {
		throw new Error("title must be specified");
	}

	//console.log(config);
	var tags = config.tags || [];
	tags = _.map(tags, function(s) {
		return s.toLowerCase();
	});



	var html = markdown(outgoing);


	return Post.create({
		html: html,
		date: config.date,
		title: config.title,
		aliases: config.aliases || [],
		tags: tags,
		url: target,
		form: "post"
	});

};

function getTarget(filename) {
	// has / at the start
	var dirpath = path.dirname(filename);
	var file = path.basename(filename, path.extname(filename));
	if (file === "index") {
		return "/" + dirpath + "/";
	}
	return "/" + path.join(dirpath, file) + "/";
}


function reader(root, callback) {
	root = path.resolve(root);

	console.time("load-hugo");

	var parsed = [];
	readFiles(
		root, {
			match: /.markdown$/
		}, function(err, content, filename, next) {
			if (err) {
				throw err;
			}
			var relative = path.relative(root, filename);
			var hugo = parseHugo(content, relative);
			parsed.push(hugo);
			next();
		}, function(err) {
			if (err) {
				throw err;
			}
			console.timeEnd("load-hugo");
			callback(parsed);
		});
}


module.exports = reader;
