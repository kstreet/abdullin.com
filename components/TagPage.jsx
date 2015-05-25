/** @jsx React.DOM */

var React = require("react");
var PostLayout = require("./PostLayout");
var Site = require("../lib/Site");
var PostSummary = require("./PostSummary");
var lists = require("../lib/lists");
var PostList = require("./PostList");
var TagPage = React.createClass({
	propTypes: {
		site: React.PropTypes.instanceOf(Site).isRequired,
		tag: React.PropTypes.string.isRequired
	},

	render: function render() {
		var site = this.props.site;
		var title = "Articles in " + this.props.tag;
		var posts = site.tags[this.props.tag];
		var tagPosts = lists.sortLatestFirst(posts);

		return (
			<PostLayout title={title}
						site={this.props.site}
						nav="archive">
				<article>
					<PostList posts={tagPosts} date="short"/>
				</article>
			</PostLayout>
		);
	}
});


module.exports = TagPage;
