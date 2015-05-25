/** @jsx React.DOM */

var React = require("react");

var Site = require("../lib/Site");
var Post = require("../lib/Post");
var Story = require("../lib/Story");
var BookLayout = require("./BookLayout");
var YearlyList = require("./YearlyList");

function buildStories(stories, current){
	var dom = [];

	stories.forEach(function(s) {
		if (s !== current) {
			dom.push(<li><a href={s.url}>{s.title}</a> - {s.description}</li>);
		}
	});

	if (dom.length === 0) {
		return undefined;
	}

	return (
		<aside>
			<h2>Other Stories</h2>
			<ul>{dom}</ul>
		</aside>
	);
}

var StoryCoverPage = React.createClass({
	propTypes: {
		story: React.PropTypes.instanceOf(Story).isRequired,
		site: React.PropTypes.instanceOf(Site).isRequired
	},

	render: function render() {
		var site = this.props.site;
		var story = this.props.story;
		var title = story.title;
		var description = story.description;
		return (
			<BookLayout title={title} site={site} description={description} >
				<main role="main">
					<article className="page__content">
						<header>
							<h1 className="post__title">
								{title}
							</h1>
							<p>{description}</p>
						</header>
						{buildStories(site.stories, story)}
						<section>
							<YearlyList posts={story.posts} link="simple"/>
						</section>
					</article>
				</main>
			</BookLayout>

		);
	}
});


module.exports = StoryCoverPage;
