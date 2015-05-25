"use strict";

var path = require("path");
var feed = require("./feed");

var tagging = require("./tagging");

var React = require("react");
var PostPage = require("../components/PostPage");

var StoryPage = require("../components/StoryPage");
var StoryCoverPage = require("../components/StoryCoverPage");

var NotFoundPage = require("../components/NotFoundPage");
var HomePage = require("../components/HomePage");
var TagPage = require("../components/TagPage");
var ArchivePage = require("../components/ArchivePage");
var AboutPage = require("../components/AboutPage");

var sm = require("sitemap");
function render(site, io, callback) {

	var jobs = 0;
	console.time("render");

	function complete(err) {
		if (err) {
			throw err;
		}
		jobs -= 1;
	}


	function wait(cb) {
		if (jobs === 0) {
			console.timeEnd("render");
			cb();
			return;
		}
		setTimeout(function() {
			wait(cb);
		}, 100);
	}

	site.stories.forEach(function(s) {
		jobs += 1;
		var r = renderPage(StoryCoverPage, {
			site: site,
			story: s
		});
		var store = getStaticFileName(s.url);
		io.write(store, r, complete);
	});

	site.posts.forEach(function(p) {


		if (p.draft && site.production) {
			console.log("Skipping draft post " + p.url);
			return;
		}


		p.aliases.forEach(function(a) {
			jobs += 1;

			//console.log(a);
			var astore = getStaticFileName(a);
			//console.log(astore);
			var content = renderRedirect(p.url);
			io.write(astore, content, complete);
		});


		var store = getStaticFileName(p.url);
		if (p.form === "story") {
			jobs += 1;
			io.write(store, renderStory(site, p), complete);
		} else {
			jobs += 1;
			io.write(store, renderPost(site, p), complete);
		}
	});

	jobs += 7;
	var f = feed(site, site.posts).renderAtom();
	io.write(site.atomUrl, f, complete);
	// legacy
	io.write("/RinatAbdullin/index.html", f, complete);

	var props = {
		site: site
	};

	io.write(site.notFoundUrl, renderPage(NotFoundPage, props), complete);
	io.write("/index.html", renderPage(HomePage, props), complete);
	io.write("/tags/index.html", renderPage(ArchivePage, props), complete);
	io.write("/about-me/index.html", renderPage(AboutPage, props), complete);
	io.write("/sitemap.xml", createSiteMap(site), complete);
	Object.keys(site.tags).forEach(function(tag) {
		jobs += 1;
		var tagPath = tagging.url(tag) + "index.html";
		io.write(tagPath, renderTagPage(site, tag), complete);
	});



	wait(callback);

}

function createSiteMap(site) {
	var sitemap = sm.createSitemap({
		hostname: "http://abdullin.com",
		cacheTime: 600000
	});

	site.posts.forEach(function(p) {
		sitemap.add({
			url: p.url,
			changefreq: "monthly",
			priority: 0.7
		});
	});
	return sitemap.toString();
}

function getStaticFileName(target) {
	var endsWithSlash = target[target.length - 1] === "/";
	if (endsWithSlash) {
		return target + "index.html";
	}

	var base = path.basename(target);
	if (base === "index.html") {
		return target;
	}
	var ext = path.extname(target);
	if (ext !== "") {
		throw new Error("unexpected extension " + ext + " on " + target);
	}
	return path.join(target, "index.html");
}



function renderPage(component, props) {
	var el = React.createElement(component, props);
	var out = React.renderToStaticMarkup(el);
	return "<!DOCTYPE html>" + out;
}

function renderPost(site, p) {
	return renderPage(PostPage, {
		post: p,
		site: site
	});
}

function renderStory(site, post) {
	return renderPage(StoryPage, {
		post: post,
		site: site
	});
}





function renderTagPage(site, tag) {
	return renderPage(TagPage, {
		site: site,
		tag: tag
	});
}



function renderRedirect(url) {
	return "<!DOCTYPE html><html><head>" +
		"<link rel=\"canonical\" href=\"" + url + "\"/>" +
		"<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" />" +
		"<meta http-equiv=\"refresh\" content=\"0;url=" + url + "\" />" +
		"</head></html>";
}


module.exports = render;
