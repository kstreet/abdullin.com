/** @jsx React.DOM */

var React = require("react");
var Site = require("../lib/Site");
var PostLayout = require("./PostLayout");
var TagLink = require("./TagLink");
var YearlyList = require("./YearlyList");
var StoryList = require("./StoryList");
function buildTags(tags) {
	var list = [];
	Object.keys(tags).forEach(function (tag) {
		list.push(<li key={tag}><TagLink tag={tag} /> {tags[tag].length}</li>);
	});
	return list;
}



var ArchivePage = React.createClass({
	propTypes: {
		site: React.PropTypes.instanceOf(Site).isRequired
	},

	render: function render() {
		var site = this.props.site;
		var tags = Object.keys(site.tags);

		return (
			<PostLayout nav="archive" site={site} title="Archive">
				<article>
					<aside>
						<h2>Stories</h2>
						<StoryList stories={site.stories} />
						<h2>Tags</h2>
						<ul>{buildTags(site.tags)}</ul>
					</aside>
					<section>
						<p>Here is a list of all posts from this site, sorted chronologically. The tags are more convenient for browsing content, though. </p>
						<YearlyList posts={site.recent} />
					</section>
				</article>
			</PostLayout>
		);
	}
});


module.exports = ArchivePage;
