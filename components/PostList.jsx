/** @jsx React.DOM */

var React = require("react");
var Post = require("../lib/Post");
var PostLink = require("./PostLink");
var moment = require("moment");

var PostList = React.createClass({
	propTypes: {
		posts: React.PropTypes.array,
		min: React.PropTypes.number,
		date: React.PropTypes.oneOf(["none", "short"]),
		link: React.PropTypes.oneOf(["none", "smart", "simple"])
	},

	dateElement: function(post) {
		var option = this.props.date || "none";
		if (option === "none") {
			return undefined;
		}
		if (option === "short") {
			var date = moment(post.date).format("MMM D");
			return (<span className="post-list__date">&nbsp;&middot; {date}</span>);
		}
		throw new Error("Unhandled option " + option);
	},

	render: function render() {
		var posts = this.props.posts;
		var min = this.props.min;


		if (min  && posts.length < min) {
			throw new Error("Must have at least " + min + " posts");
		}

		var dom = [];
		var self = this;
		var link = this.props.link || "smart";
		posts.forEach(function(p) {
			var dateSpan = self.dateElement(p);




			dom.push(<li key={p.url}><PostLink post={p} link={link} />{dateSpan}</li>);
		});

		return (
			<ul className="post-list">
				{dom}
			</ul>
		);
	}
});


module.exports = PostList;
