"use strict";


module.exports = function(prod) {


	var root = prod ? "http://abdullin.com" : "http://localhost:3000";
	console.log("Building for " + root);

	return {
		root: root,
		production: prod ? true : false,
		title: "Software Design",
		subtitle: "by Rinat Abdullin",
		copyright: "© 2008-2015 Rinat Abdullin.",

		// hard configs
		atomUrl: "/atom.xml",
		notFoundUrl: "/404.html",

		feedLimiter: function(posts) {
			return posts.slice(0, 20);
		},

		stories: {
			"sku-vault": {
				description: "Evolving and scaling an online warehouse management system.",
				title: "SkuVault",
				url: "/sku-vault/"
			},
			"hpc": {
				description: "Scaling the largest dating website in Sweden.",
				title: "HappyPancake",
				url: "/happypancake/"
			},
			"gtd": {
				description: "Designing and building an event-driven task manager.",
				title: "GTD Project",
				url: "/gtd/"
			}

		}
	};
};
