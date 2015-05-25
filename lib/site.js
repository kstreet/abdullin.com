"use strict";

var Story = require("./Story");

function buildTags(posts) {
	var tags = {};

	posts.forEach(function(p) {
		p.tags.forEach(function(t) {
			var list = tags[t];
			if (list === undefined) {
				list = [];
				tags[t] = list;
			}

			list.push(p);
		});
	});
	return tags;
}


function buildCode(examples) {
	var dict = {};

	examples.forEach(function(s) {
		dict[s.name] = s;
	});
	return dict;
}

function buildStories(posts, storySpecs) {

	var dict = {};
	posts.forEach(function(p) {
		if (p.story === undefined) {
			return;
		}

		var stories = dict[p.story];
		if (stories === undefined) {
			stories = [];
			dict[p.story] = stories;
		}

		stories.push(p);
	});

	var storyList = [];

	Object.keys(storySpecs).forEach(function(name) {

		var spec = storySpecs[name];

		var storyPosts = dict[name];
		var instance = Story.create({
			name: name,
			url: spec.url,
			title: spec.title,
			description: spec.description
		}, storyPosts);

		instance.indexPosts();

		storyList.push(instance);
	});

	return storyList;



}


function validate(spec) {
	shouldBeDefined("tags", spec.tags);
	shouldBeDefined("title", spec.title);
	shouldBeDefined("subtitle", spec.subtitle);
	shouldBeDefined("root", spec.root);
	shouldBeDefined("posts", spec.posts);
	shouldBeDefined("copyright", spec.copyright);
	shouldBeDefined("atomUrl", spec.atomUrl);
	shouldBeDefined("stories", spec.stories);
}

function Site(spec, posts, examples) {

	if (examples === undefined) {
		throw new Error("examples must be defined");
	}

	// tags object. It's properties are tags, values - arrays of posts
	this.title = spec.title;
	this.subtitle = spec.subtitle;
	this.root = spec.root;
	this.copyright = spec.copyright;
	this.posts = posts;
	this.examples = examples;
	this.storySpecs = spec.stories;



	this.atomUrl = spec.atomUrl;
	this.notFoundUrl = spec.notFoundUrl;
	this.feedLimiter = spec.feedLimiter;
}

Site.prototype.buildIndexes = function() {
	this.tags = buildTags(this.posts);
	this.code = buildCode(this.examples);
	this.stories = buildStories(this.posts, this.storySpecs);

	this.recent = this.posts.slice(0);
	this.recent.sort(function(a, b) {
		return b.date - a.date;
	});
};

Site.prototype.validate = function() {
	validate(this);
};
Site.prototype.generatePermalinks = function() {
	var root = this.root;
	this.posts.forEach(function(p) {
		p.permalink = root + p.url;
	});

};


function shouldBeDefined(name, subj) {
	if (subj === undefined) {
		throw new Error(name + " is undefined");
	}
}


Site.create = function(spec, posts, examples) {
	return new Site(spec, posts, examples);
};

module.exports = Site;
