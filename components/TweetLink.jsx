/** @jsx React.DOM */

var React = require("react");
var Post = require("../lib/Post");


function buildTags(ts){
	if (ts.length === 0) {
		throw new Error("No hashtags in a post");
	}
	if (ts.length > 2) {
		ts = ts.slice(0,2);
	}

	return ts.join(",");
}

function buildText(post) {
	if (post.idea) {
		return post.idea;
	}
	return post.title;

}

var TweetLink = React.createClass({
	propTypes: {
		post: React.PropTypes.instanceOf(Post).isRequired,
		title: React.PropTypes.string

	},




	render: function render() {
		var title = this.props.title || "Twitter";
		var post = this.props.post;

		var tags = buildTags(post.tags);
		var text = buildText(post);
		var len = text.length + tags.lengh + 5 + 22; // 22 for url
		if (len > 130) {
			throw new Error("This isn't a tweetable post " + post.title);
		}

		var url = "http://twitter.com/share?url=" + post.permalink +
				  "&text=" + text +
				  "&hashtags=" + tags;
		return (
			<a href={url}>{title}</a>
		);
	}
});


module.exports = TweetLink;
