"use strict";

function Story(spec, posts) {
	this.url = spec.url;
	this.title = spec.title;
	this.posts = posts;
	this.name = spec.name;
	this.description = spec.description;
}

Story.create = function(spec, posts) {

	if (spec.url === undefined) {
		throw new Error("URL must be defined");
	}

	if (spec.title === undefined) {
		throw new Error("Story title must be defined " + spec.url);
	}

	if (spec.name === undefined) {
		throw new Error("Story must have a name " + spec.url);
	}

	if (spec.description === undefined) {
		throw new Error("Define description for story " + spec.name);
	}

	if (posts === undefined) {
		throw new Error("Provide posts for story " + spec.url);
	}



	return new Story(spec, posts);
};


Story.prototype.indexPosts = function() {
	var self = this;

	this.posts.forEach(function(p) {
		p.story = self;
	});

	this.posts.sort(function(a, b) {
		return a.storyIndex - b.storyIndex;
	});

	var posts = this.posts;
	var i;
	for (i = 0; i < posts.length - 1; i++) {
		var current = posts[i];
		var next = posts[i + 1];

		current.next = next;
		next.previous = current;
	}
};


module.exports = Story;
