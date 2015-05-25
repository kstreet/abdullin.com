"use strict";


function shuffle(arr) {
	var shuffled = arr.slice(0),
		i = arr.length, temp, index;
	while (i--) {
		index = Math.floor((i + 1) * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled;
}

function sortLatestFirst(arr) {
	var clone = arr.slice(0);
	clone.sort(function(a, b) {
		return b.date - a.date;
	});
	return clone;
}

function values(map) {

	var result = [];
	Object.keys(map).forEach(function(k) {
		result.push(map[k]);
	});
	return result;
}

function distinct(posts) {
	var map = {};
	posts.forEach(function(p) {
		map[p.url] = p;
	});
	return values(map);
}
function exclude(posts, post) {
	var clone = [];
	posts.forEach(function(p) {
		if (p.url !== post.url) {
			clone.push(p);
		}
	});
	return clone;
}


function findMatching(site, post) {
	var scores = {};

	var add = function(p) {

		if (post.url === p.url) {
			return;
		}
		var key = scores[p.url];
		if (key === undefined) {
			key = {
				score: 1,
				p: p
			};
			scores[p.url] = key;
		} else {

			key.score += 1;
		}

		//console.log(p.title + " " + key.score);
	};

	post.tags.forEach(function(t) {
		site.tags[t].forEach(add);
	});



	//console.log(post.title);
	//matching.forEach(function(p) {
	//	console.log("  " + p.title);
	//});

	var vals = [];
	Object.keys(scores).forEach(function(k) {
		vals.push(scores[k]);
	});


	vals.sort(function(a, b) {
		return b.score - a.score;
	});
	var out = [];
	vals.forEach(function(p) {
		out.push(p.p);
		//console.log(p.score);
	});
	return out;
}


function take(list, x) {
	if (list.length <= x) {
		return list.slice(0);
	}
	return list.slice(0, x);
}


function relevant(site, post, count) {
	// we take 25% from popular
	// 25% from recent
	// TODO: override by post recommendations, first or last
	// 50% from the tags


	var popular = take(exclude(site.tags.popular, post), count);
	var recent = take(exclude(site.recent, post), count);
	var matching = take(exclude(findMatching(site, post), post), count * 2);



	var pool = distinct(popular.concat(recent).concat(matching));
	var result = shuffle(pool).slice(0, count);


	return result;
}

function featured(site, count) {

	var popular = take(site.tags.popular, count);
	var recent = take(site.recent, count);


	var pool = distinct(popular.concat(recent));
	var result = shuffle(pool).slice(0, count);


	return result;
}

//function relevantByTags(site, tags, count) {
//	var used = tags || Object.keys(site.tags);
//}


module.exports = {
	shuffle: shuffle,
	sortLatestFirst: sortLatestFirst,
	relevant: relevant,
	featured: featured
};
