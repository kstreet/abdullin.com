"use strict";



var tagging = {
	url: function(tag) {
		return "/tags/" + tag.replace(" ", "-").replace(/[^a-zA-Z0-9\-]/g, "") + "/";
	}
};

module.exports = tagging;
