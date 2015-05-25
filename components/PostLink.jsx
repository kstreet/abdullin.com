/** @jsx React.DOM */

var React = require("react");

var Post = require("../lib/Post");
var PostLink = React.createClass({
	propTypes: {
		post: React.PropTypes.instanceOf(Post).isRequired
	},

	render: function render() {
		var post = this.props.post;
		var link = this.props.link || "smart";

		var sign;

		if (post.audio !== undefined) {
			sign = "♫";
		}

		if (post.story === undefined || link === "simple") {
			return (<span><a href={post.url}>{post.title}</a> {sign}</span>);
		}

		return (
			<span><a href={post.story.url}>{post.story.title}</a> &mdash; <a href={post.url}>{post.title}</a> {sign}</span>
		);
	}
});

module.exports = PostLink;
