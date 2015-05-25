/** @jsx React.DOM */

var React = require("react");
// Inline?
var TagLink = require("./TagLink");

var TagList = React.createClass({
	propTypes: {
		tags:React.PropTypes.arrayOf(React.PropTypes.string).isRequired
	},

	render: function render() {
		var tags = this.props.tags;

		if (tags.length===0) {
			throw new Error("Post has now tags!!!");
		}


		var links = [];
		tags.forEach(function(t, i){
			if (i!==0) {
				links.push(<span key={t + "span"}>, </span>);
			}
			links.push(<TagLink tag={t} key={t}/>);
		});


		return (
			<span>{links}</span>
		);
	}
});


module.exports = TagList;
