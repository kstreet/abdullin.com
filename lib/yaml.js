"use strict";


var yaml = require("js-yaml");
function mustGet(content, name) {

	var starts = content.indexOf("---");
	if (starts !== 0) {
		throw new Error("Unexpected start of content in " + name);
	}

	var ends = content.indexOf("---", 3);
	if (ends === -1) {
		throw new Error("Unexpected end of yaml in " + name);
	}
	var yamlBlock = content.substring(3, ends);
	var config = yaml.safeLoad(yamlBlock);
	var outgoing = content.substring(ends + 3, content.length);

	return {
		content: outgoing,
		config: config
	};
}


module.exports = mustGet;
