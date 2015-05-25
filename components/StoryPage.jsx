/** @jsx React.DOM */

var React = require("react");
var Site = require("../lib/Site");
var Post = require("../lib/Post");
var TagList = require("./TagList");
var moment = require("moment");
var PostLink = require("./PostLink");
var Footer = require("./Footer");
var TweetLink = require("./TweetLink");
var BookLayout = require("./BookLayout");
var AudioLink = require("./AudioLink");
var l = require("../lib/lists");


function links(posts) {
	var list = [];
	posts.forEach(function(p) {
		list.push(
			<li key={p.url}>
				<PostLink post={p} />
			</li>
		);
	});
	return list;
}


function makeTags(post) {
	var tags = post.tags.slice(0,5);
	return (
		<li key="tags">Tags: <TagList tags={tags} /></li>
	);
}

function buildAside(post) {
	var dom = [];


	if (post.previous !== undefined) {
		dom.push(
			<p id="previous"><span>Previously in </span>
				<a href={post.story.url}>{post.story.title}</a>
				<span>&nbsp;&mdash; </span>
				<a href={post.previous.url}>{post.previous.title}</a>
			</p>);
	}

	if (dom.length === 0) {
		return undefined;
	}


	return (<aside>{dom} </aside>);
}


function audioSectionIfNeeded(post) {
	if (post.audio === undefined) {
		return undefined;
	}
	var url = "http://media.abdullin.com" + post.audio;

	return (
		<section>
			<p>
				<AudioLink src={url} />
			</p>
			<p>
				Download <a href={url}>{post.title}</a> (MP3).
			</p>

		</section>
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

		var story = post.story;

		if (story === undefined) {
			throw new Error("Story must be defined for a post");
		}

		var date = moment(post.date).format("MMMM D, YYYY");
		var relevant = links(l.relevant(site, post, 3));

		var title = post.title;
		if (post.draft) {
			title += " (DRAFT)";
		}


		var next;
		if (post.next !== undefined) {
			next = (
				<span style={{float:"right"}}>
					Next: <a href={post.next.url}>{post.next.title}</a> &rarr;
				</span>
			);
		}
		var aside = buildAside(post);



		return (
			<BookLayout title={post.title + " | " + story.title}
					  site={site}
					  description={post.idea}>

				<main role="main">
					<article className="page__content"
							 itemScope
							 itemType="http://schema.org/Article">
						<header>
							<h1 className="post__title"
								itemProp="name">
								{title}
							</h1>
							{aside}
						</header>
						{audioSectionIfNeeded(post)}
						<section dangerouslySetInnerHTML={{__html: post.html}}
								 itemProp="articleBody"></section>
					</article>
				</main>
				<footer>
					<p style={{padding:10}}>
						<span>
							<a href={post.story.url}>Table of Contents</a> for <em>{post.story.title}</em>
						</span>
						{next}
					</p>


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
