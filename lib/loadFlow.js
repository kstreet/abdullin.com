"use strict";
var yaml = require("./yaml");
var readFiles = require("./readFiles");
var path = require("path");
var markdown = require("./markdown");
var Post = require("./Post");


function getTarget(filename) {
	return "/" + path.basename(filename).replace(".md", "/");
}

function prefix(l, fix) {
	if (l.indexOf(fix) === 0) {
		return l.substring(fix.length).trim();
	}
	return undefined;
}

function pipe(content, examples) {

	var lines = content.split("\n");

	var i = 0;
	for (i = 0; i < lines.length; i++) {
		var code = prefix(lines[i], "!! include example ");
		if (code !== undefined) {
			var example = examples[code];
			if (example === undefined) {
				throw new Error("Unknown snippet " + code);
			}
			// insert markdown snippet
			var block = ["```" + example.lang].concat(example.lines, ["```"]);
			Array.prototype.splice.apply(lines, [i, 1].concat(block));
		}
	}

	lines = dropComments(lines);

	var piped = lines.join("\n");

	return piped;
}

function dropComments(lines) {
	var out = [];
	lines.forEach(function(l) {
		if (l.trim().indexOf("//") === 0) {
		} else {
			out.push(l);
		}
	});
	return out;
}


var parse = function(content, filename, examples, specs) {

	var info = yaml(content, filename);
	var config = info.config;

	var outgoing = pipe(info.content, examples);

	var form = config.form;
	var idea = config.idea;
	var story = config.story;
	var storyIndex = config.storyIndex;
	// by default we take base file name

	var target = getTarget(filename);
	if (form === "essay") {
		if (idea === undefined) {
			throw new Error("Essays MUST specify an idea they focus on. " + filename);
		}

		if (config.url !== undefined) {
			target = config.url;
		}
	} else if (form === "bio") {
	} else if (form === "story") {
		if (story === undefined) {
			throw new Error("Stories must always have story ID" + filename);
		}
		var spec = specs.stories[story];
		if (spec === undefined) {
			throw new Error("Story must be defined in config " + story);
		}

		if (storyIndex === undefined) {
			throw new Error("Specify index for page in story " + story);
		}

		var ext = path.extname(filename);
		var base = path.basename(filename, ext);

		target = spec.url + base + "/";


	} else {
		throw new Error("Only essays are expected. Got " + form);
	}

	if (config.title === undefined || config.title === "") {
		throw new Error("title must be specified");
	}

	//console.log(config);
	var tags = config.tags || [];
	tags.forEach(function(t, i) {
		tags[i] = t.toLowerCase();
	});


	// TODO: strip comments and insert snippets
	var html = markdown(outgoing);


	return Post.create({
		html: html,
		date: config.date,
		title: config.title,
		aliases: config.aliases || [],
		tags: tags,
		url: target,
		draft: config.draft,
		idea: config.idea,
		form: config.form,
		story: story,
		storyIndex: storyIndex,
		audio: config.audio
	});

};


function assets(root, io, callback) {
	root = path.resolve(root);

	var isImage = function(relative) {
		var ext = path.extname(relative);
		if (ext === undefined) {
			return false;
		}
		ext = ext.toLowerCase();

		return (ext === ".png" || ext === ".jpg");

	};


	io.importFolder({
		root: path.resolve(root),
		location: "/",

		filter: function(relative) {
			if (isImage(relative)) {
				return path.join("/images/", path.basename(relative));
			}
			return undefined;
		}
	}, callback);
}

function reader(root, examples, spec, callback) {
	root = path.resolve(root);

	var map = {};
	examples.forEach(function(e) {
		map[e.name] = e;
	});

	console.time("load-flow");

	var parsed = [];
	readFiles(
		root, {
			match: /.md$/
		}, function(err, content, filename, next) {
			if (err) {
				throw err;
			}

			if (filename.indexOf(".#") !== -1) {
				next();
				return; // ignore emacs work in progress
			}

			var relative = path.relative(root, filename);
			var item = parse(content, relative, map, spec);

			if (item.draft && spec.production) {
				console.log("Skipping draft " + item.title);

			} else {
				parsed.push(item);
			}

			next();
		}, function(err) {
			if (err) {
				throw err;
			}
			console.timeEnd("load-flow");
			callback(parsed);
		});
}


module.exports = reader;
module.exports.loadAssets = assets;
