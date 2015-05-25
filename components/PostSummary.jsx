/** @jsx React.DOM */

var React = require("react");
var moment = require("moment");
var Post = require("../lib/Post");

var PostSummary = React.createClass({
	propTypes: {
		post: React.PropTypes.instanceOf(Post).isRequired
	},

	render: function render() {
		var post = this.props.post;
		var date = moment(post.date).format("ddd MMM D, YYYY");
		return (
			<article className="post" key={post.url}>
				<header>
					<h3>
						<a href={post.url}>{post.title}</a>
					</h3>
					<span className="meta text-muted">{date}</span>
				</header>
			</article>
		);
	}
});


module.exports = PostSummary;
