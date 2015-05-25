/** @jsx React.DOM */

var React = require("react");

var StoryList = React.createClass({
	propTypes: {
	},



	render: function render() {
		var stories = this.props.stories;
		var dom = [];

		stories.forEach(function(s) {
			dom.push(
				<li id={s.url}>
					<a href={s.url}>{s.title}</a> - {s.description}
				</li>
			);
		});

		if (dom.length === 0) {
			throw new Error("no stories to display");
		}

		return (
			<ul>{dom}</ul>
		);
	}
});


module.exports = StoryList;
