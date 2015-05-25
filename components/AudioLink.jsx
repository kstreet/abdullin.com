/** @jsx React.DOM */

var React = require("react");

var AudioLink = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired
	},

	render: function render() {


		return (
			<audio width="450"
				   height="12"
				   controls="controls"
				   loop="loop"
				   preload="none"
				   src={this.props.src}>

			</audio>
		);
	}
});


module.exports = AudioLink;
