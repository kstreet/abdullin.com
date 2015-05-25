"use strict";

var Feed = require("feed");

var findSrc = /src=["'](.+?)["']/g;

function rootImages(site, html) {


	//console.log(html);
	var output = html.replace(findSrc, function(match, p1) {
		if (p1.indexOf("http") === 0) {
			return match;
		}
		if (p1[0] !== "/") {
			throw new Error("all images must be rooted " + match);
		}

		return "src=\"" + site.root + p1 + "\"";
		// verify image

	});
	return output;



}




function createFeed(site, posts) {
	if (posts.length === 0) {
		throw new Error("No posts for the feed");
	}
	var clone = posts.slice(0);
	clone.sort(function(a, b) {
		return b.date - a.date;
	});

	clone = site.feedLimiter(clone);


	var feed = new Feed({
		title: site.title,
		description: site.description,
		link: site.root,
		//image: 'http://example.com/logo.png',
		copyright: site.copyright,
		updated: clone[0].date,

		author: {
			name: "Rinat Abdullin",
			link: "http://abdullin.com"
		}
	});


	clone.forEach(function(p) {

		var rooted = rootImages(site, p.html);
		feed.addItem({
			title: p.title,
			link: p.permalink,
			date: p.date,
			description: rooted
			// image
		});

	});

	feed.renderAtom = function() {
		console.log("rendering");
		return feed.render("atom-1.0");
	};
	return feed;


}


module.exports = createFeed;
