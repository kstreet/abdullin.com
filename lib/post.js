"use strict";



function Post(spec) {
	this.html = spec.html;
	this.title = spec.title;
	this.date = spec.date;
	this.aliases = spec.aliases;
	this.url = spec.url;

	// list
	this.tags = spec.tags;
	this.draft = spec.draft;
	this.idea = spec.idea;
	this.form = spec.form;
	this.story = spec.story;
	this.storyIndex = spec.storyIndex;
	this.audio = spec.audio;


	validate(this);
}


function defined(name, subj) {
	if (subj === undefined) {
		throw new Error(name + " is undefined");
	}
}
function validate(post) {


	defined("title", post.title);

	if (post.form === undefined) {
		throw new Error("undefined form for " + post.title);
	}


	defined("form", post.form);

	defined("html", post.html);
	if (post.html.length < 10) {
		throw new Error("Post has a very short content");
	}

	defined("aliases", post.aliases);
	defined("date", post.date);

	if (post.date < new Date(2007, 1, 1)) {
		throw new Error("Early date " + post.date + " in " + post.title);
	}
	if (post.date > new Date()) {
		throw new Error("We aren't in the future, yet");
	}

	defined("tags", post.tags);
	if (post.tags.length === 0) {
		throw new Error("There are no tags defined for " + post.title);
	}

	defined("url", post.url);
}

function create(spec) {
	return new Post(spec);
}


module.exports = Post;
module.exports.create = create;
