"use strict";

// allow reading react files
require("node-jsx").install({
	extension: ".jsx"
});

var path = require("path");
var loadHugo = require("./lib/loadHugo");
var loadFlow = require("./lib/loadFlow");
var loadCode = require("./lib/loadCode");

var io = require("./lib/io");
var serve = require("./lib/serve");
var Site = require("./lib/Site");
var config = require("./config");
var minify = require("./lib/minify");
var render = require("./lib/render");
var validate = require("./lib/validate");
var argv = require("yargs").argv;


var specs = config(argv.prod);

process.maxTickDepth = 20000;

console.log(argv);
loadHugo("./hugo", function(hugo) {

	loadCode("./content", function(examples) {
		// TODO: make flow load from the virutal folder

		loadFlow.loadAssets("./content", io, function() {
			loadFlow("./content", examples, specs, function(flow) {
				build(hugo.concat(flow), examples);
			});
		});
	});
});


function build(posts, examples) {
	var site = Site.create(specs, posts, examples);

	site.buildIndexes();
	site.generatePermalinks();
	site.validate();

	render(site, io, function() {
		assets("./static", io, function() {
			validate(io.fs, "/", function() {
				finish(site);
			});
		});
	});
}

function finish(site) {
	if (argv.save) {
		console.time("save");
		io.importFolder({
			root: "/",
			location: path.resolve("./build"),
			sourceFs: io.fs,
			targetFs: require("fs")
		}, function() {
				console.timeEnd("save");
			});
	}
	if (argv.serve) {
		serve(io.fs, site).listen(3000, function() {
			console.log("serving");
		});
	}
}

function assets(src, io, callback) {
	console.time("assets");

	var staticPath = path.resolve(src);

	io.importFolder({
		root: staticPath,
		location: "/"
	}, function() {
			minify(io.fs, "/css", function() {
				console.timeEnd("assets");
				callback();
			});
		});
}
