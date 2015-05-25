"use strict";


var path = require("path");


/**
 * determine if a string is contained within an array or matches a regular expression
 * @param   {String} str string to match
 * @param   {Array|Regex} match array or regular expression to match against
 * @returns {Boolean} whether there is a match
 */
function matches(str, match) {
	if (Array.isArray(match)) {
		return match.indexOf(str) > -1;
	}
	return match.test(str);
}

function provideDefaults(options) {
	if (options.fs === undefined) {
		options.fs = require("fs");
	}
	if (options.recursive === undefined) {
		options.recursive = true;
	}
	if (options.encoding === undefined) {
		options.encoding = "utf8";
	}
}

/**
 * read files and call a function with the contents of each file
 * @param  {String} dir path of dir containing the files to be read
 * @param  {String} encoding file encoding (default is "utf8")
 * @param  {Object} options options hash for encoding, recursive, and match/exclude
 * @param  {Function(error, string)} callback  callback for each files content
 * @param  {Function(error)}   complete  fn to call when finished
 */
function readFiles(dir, options, callback, complete) {
	if (typeof options === "function") {
		complete = callback;
		callback = options;
		options = {};
	}
	if (typeof options === "string") {
		options = {
			encoding: options
		};
	}

	provideDefaults(options);


	var fs = options.fs;

	var files = [];

	var done = function(err) {
		if (typeof complete === "function") {
			if (err) {
				return complete(err);
			}
			complete(null, files);
		}
	};

	fs.readdir(dir, function(err, list) {
		if (err) {
			return done(err);
		}
		var i = 0;

		if (options.reverse === true ||
			(typeof options.sort == "string" &&
			(/reverse|desc/i).test(options.sort))) {
			list = list.reverse();
		} else if (options.sort !== false) {
			list = list.sort();
		}

		(function next() {
			var filename = list[i++];
			if (!filename) {
				return done(null, files);
			}
			var file = path.join(dir, filename);
			fs.stat(file, function(err, stat) {
				if (err) {
					if (err.code === "ENOENT") {
						return next();
					}
					return done(err);
				}
				if (stat && stat.isDirectory()) {
					if (options.recursive) {
						if (options.matchDir && !matches(filename, options.matchDir)) {
							return next();
						}
						if (options.excludeDir && matches(filename, options.excludeDir)) {
							return next();
						}
						readFiles(file, options, callback, function(err, sfiles) {
							if (err) {
								return done(err);
							}
							files = files.concat(sfiles);
							next();
						});
					} else {
						next();
					}
				} else {
					if (options.match && !matches(filename, options.match)) {
						return next();
					}
					if (options.exclude && matches(filename, options.exclude)) {
						return next();
					}
					if (options.filter && !options.filter(filename)) {
						return next();
					}
					if (options.shortName) {
						files.push(filename);
					} else {
						files.push(file);
					}
					fs.readFile(file, options.encoding, function(err, data) {
						if (err) {
							return done(err);
						}
						if (callback.length > 3) {
							if (options.shortName) {
								callback(null, data, filename, next);
							} else {
								callback(null, data, file, next);
							}
						} else {
							callback(null, data, next);
						}
					});
				}
			});
		})();

	});
}
module.exports = readFiles;