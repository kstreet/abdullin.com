/** @jsx React.DOM */

var React = require("react");
var PostList = require("./PostList");
function group(posts, link) {
	var dom = [];

	var map = {	};
	var years = [];
	var push = function (p) {
		var year = p.date.getFullYear();
		var list = map[year] || [];
		if (list.length === 0){
			map[year] = list;
			years.push(year);
		}
		list.push(p);
	};


	posts.forEach(push);

	// var keys = Object.keys(map);
	// keys.reverse();

	years.forEach(function (k){
		dom.push(
			<div key={k}>
				<h3>{k}</h3>
				<PostList posts={map[k]} date="short" link={link} />
			</div>
		);
	});
	return dom;
}
var YearlyList = React.createClass({
	propTypes: {
		posts: React.PropTypes.array,

	},



	render: function render() {
		var posts = this.props.posts;
		return <div>{group(posts, this.props.link)}</div>;

	}
});


module.exports = YearlyList;
