"use strict";


var readFiles = require("./readFiles");
var path = require("path");
var url = require("url");

var findSrc = /(src|href)=["'](.+?)["']/g;

function validate(fs, root, callback) {

	console.time("validate");

	var map = {};


	function logIssues() {
		var issues = [];
		Object.keys(map).forEach(function(key) {
			issues.push({
				name: key,
				places: map[key].places
			});
		});

		issues.sort(function(a, b) {
			return b.places.length - a.places.length;
		});

		issues.slice(0, 10).forEach(function(i) {
			console.log(i.name + " " + i.places.length);
		});
	}

	function fileIssue(name, location) {
		var issue = map[name];
		if (issue === undefined) {
			issue = {
				places: []
			};
			map[name] = issue;
		}
		issue.places.push(location);
	}

	function investigate(fs, content, relative) {

		var results;
		//console.log(relative);

		while ((results = findSrc.exec(content)) !== null) {
			var src = results[2];
			var uri = url.parse(src);

			if (uri.hostname) {
				// ok, we got a local link

				if (uri.hostname.indexOf("abdullin") !== -1) {
					fileIssue("BAD " + src, relative);
				}
			} else {
				if (!fs.existsSync(src)) {
					fileIssue("MISS " + src, relative);
				}
			}

		}

	}

	readFiles(
		root, {
			match: /.html$/,
			fs: fs
		}, function(err, content, filename, next) {
			if (err) {
				throw err;
			}
			var relative = path.relative(root, filename);
			investigate(fs, content, relative);



			next();
		}, function(err) {
			if (err) {
				throw err;
			}

			console.timeEnd("validate");
			logIssues();
			callback();

		});
}



module.exports = validate;
