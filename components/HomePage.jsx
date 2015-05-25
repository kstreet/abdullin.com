/** @jsx React.DOM */

var React = require("react");

var Site = require("../lib/Site");
var TagLink = require("./TagLink");
var PostSummary = require("./PostSummary");
var PostLayout = require("./PostLayout");
var moment = require("moment");
var PostList = require("./PostList");
var StoryList = require("./StoryList");

function buildTags(tags, selected) {
	var list = [];
	selected.forEach(function (tag) {
		list.push(<li key={tag}><TagLink tag={tag} /> {tags[tag].length}</li>);
	});
	return list;
}

function filterSmallTags(site) {

	var count = 0;
	var tags = Object.keys(site.tags);
	tags.forEach(function(t) {
		count += site.tags[t].length;
	});

	var average = count / tags.length;


	var good = [];
	tags.forEach(function(t) {
		if (site.tags[t].length > average) {
			good.push(t);
		}
	});
	return good;
}


var HomePage = React.createClass({
	propTypes: {
		site:React.PropTypes.instanceOf(Site).isRequired
	},

	render: function render() {
		var site = this.props.site;
		var tags = Object.keys(site.tags);
		var filtered = filterSmallTags(site);

		var featured = site.recent.slice(0, 10);
		if (featured.length < 5) {
			throw new Error("Must have at least 5 recent posts");
		}

		return (
			<PostLayout site={site} title={site.title}>
				<aside>
					<h2>Read Stories</h2>
					<StoryList stories={site.stories} />
					<h2>Explore tags</h2>
					<ul>{buildTags(site.tags, filtered)}</ul>
				</aside>
				<section>
					<h2>Recent</h2>
					<PostList posts={featured} date="short" />
				</section>
			</PostLayout>
		);
	}
});


module.exports = HomePage;
