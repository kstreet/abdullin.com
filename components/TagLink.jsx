/** @jsx React.DOM */

var React = require("react");
var tagging = require("../lib/tagging");
var TagLink = React.createClass({
	propTypes: {
		tag: React.PropTypes.string.isRequired
	},

	render: function render() {
		var link = tagging.url(this.props.tag);

		return (
			<a href={link}>{this.props.tag}</a>
		);
	}
});


module.exports = TagLink;
