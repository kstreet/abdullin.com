"use strict";


var readFiles = require("./readFiles");

var CleanCSS = require("clean-css");

function minify(fs, root, done) {
	var cleaner = new CleanCSS();

	readFiles(
		root, {
			match: /.css$/,
			fs: fs
		}, function(err, content, filename, next) {
			if (err) {
				throw err;
			}
			var minimized = cleaner.minify(content);

			fs.writeFile(filename, minimized, function(err) {
				if (err) {
					throw err;
				}
				next();
			});
		}, function(err) {
			if (err) {
				throw err;
			}
			done();
		});

}


module.exports = minify;
