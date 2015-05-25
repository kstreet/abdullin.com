/** @jsx React.DOM */

var React = require("react");
var Site = require("../lib/Site");
var Post = require("../lib/Post");
var TagList = require("./TagList");
var moment = require("moment");

var TweetLink = require("./TweetLink");
var l = require("../lib/lists");
var BookLayout = require("./BookLayout");

function links(posts) {
	var list = [];
	posts.forEach(function(p) {
		list.push(<li key={p.url}><a href={p.url}>{p.title}</a> </li>);
	});
	return list;
}


function makeTags(post) {
	var tags = post.tags.slice(0,5);
	return (
		<li key="tags">Tags: <TagList tags={tags} /></li>
	);
}

var PostPage = React.createClass({
	propTypes: {
		post: React.PropTypes.instanceOf(Post).isRequired,
		site: React.PropTypes.instanceOf(Site).isRequired
	},

	render: function render() {

		var post = this.props.post;
		var site = this.props.site;

		var date = moment(post.date).format("MMMM D, YYYY");
		var microDate = moment(post.date).format("YYYY-MM-DD");
		var relevant = links(l.relevant(site, post, 3));

		var title = post.title;
		if (post.draft) {
			title += " (DRAFT)";
		}
		return (
			<BookLayout title={post.title}
						site={site}
						description={post.idea}>

				<main role="main" >
					<article className="page__content"
							 itemScope
							 itemType="http://schema.org/Article">
						<header>
							<h1 className="post__title" itemProp="name">
								{title}
							</h1>
							<aside>
								<p>
									Discuss on <TweetLink title="Twitter" post={post}/>.
																			   Find similar posts in: <TagList tags={post.tags} />.
								</p>
							</aside>
						</header>
						<section dangerouslySetInnerHTML={{__html: post.html}}
								 itemProp="articleBody"></section>

						<p className="signature">
							<span itemProp="datePublished" content={microDate}>{date}</span> - by <span itemProp="author">Rinat Abdullin</span>.
						</p>
					</article>
				</main>


				<footer>
					<section className="footer__section">
						<h4>Related:</h4>
						<ul>
							{relevant}
							{makeTags(post)}
						</ul>
					</section>
				</footer>
			</BookLayout>
		);
	}
});


module.exports = PostPage;
