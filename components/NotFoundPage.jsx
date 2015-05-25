/** @jsx React.DOM */

var React = require("react");
var Site = require("../lib/Site");

var Head = require("./Head");
var Footer = require("./Footer");
var Navbar = require("./Navbar");
var GoogleAnalytics = require("./GoogleAnalytics");
var GoogleSearch = require("./GoogleSearch");
var lo = require("lodash");
var TagLink = require("./TagLink");


function renderPopular(tags) {
	if (!tags.popular) {
		throw new Error("no popular articles");
	}

	var samples = lo.sample(tags.popular, 5);
	var list = lo.map(samples,function (p) {
		return <li key={p.url}><a href={p.url}>{p.title}</a></li>;
	});

	return (
		<aside>
			<h2>Popular Articles</h2>
			<ul>
				{list}
			</ul>
		</aside>
	);
}

function renderExploreTags(tags) {
	var list = [];

	Object.keys(tags).forEach(function(k,i) {
		if (i !==0) {
			list.push(<em key={k+"_"}>&nbsp;· </em>);
		}
		list.push(<TagLink tag={k} key={k} />);
	});

	return (
		<section>
			<h3>Explore tags</h3>
			<ul>
				{list}
			</ul>
		</section>
	);
}

var NotFoundPage = React.createClass({
	propTypes: {
		site: React.PropTypes.instanceOf(Site).isRequired
	},

	render: function render() {
		var site = this.props.site;
		var popularList = renderPopular(site.tags);
		var exploreList = renderExploreTags(site.tags);

		var apology = (
			<section>
				<p>
					I'm really sorry about that. You arrived at a page that
					was moved to another location.
				</p>
				<p>
					Ping me on <a href="http://twitter.com/abdullin">twitter</a> and
					I'll locate the article for you. Or just explore the tags.
				</p>
			</section>
		);

		return (


			<html lang="en">
				<Head title="Not Found" site={this.props.site} />
				<body>
					<div className="page">
						<Navbar site={this.props.site}/>

						<main role="main">

							<article className="page__content">
								<header>
									<h1 className="post__title">
										Page Not Found
									</h1>
								</header>

								{popularList}

								{apology}

								<GoogleSearch />
								{exploreList}
							</article>
						</main>
						<Footer site={this.props.site}/>
					</div>
					<GoogleAnalytics site={this.props.site}>
						ga("send", "event", "page", "404", document.URL);
					</GoogleAnalytics>
				</body>
			</html>


		);
	}
});


module.exports = NotFoundPage;
