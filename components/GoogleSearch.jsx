/** @jsx React.DOM */

var React = require("react");

var GoogleSearch = React.createClass({
	propTypes: {
	},

	render: function render() {
		var content =
		"<script>(function() {"+
	"var cx = '010196642800301066198:l1gf74sbtmq'; "+
	"var gcse = document.createElement('script'); "+
	"gcse.type = 'text/javascript'; "+
	"gcse.async = true; "+
	"gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + "+
	"    '//www.google.com/cse/cse.js?cx=' + cx; "+
	"var s = document.getElementsByTagName('script')[0]; "+
	"s.parentNode.insertBefore(gcse, s); "+
  "})();</script>"+
	  "<gcse:search></gcse:search>";


		return (
			<div dangerouslySetInnerHTML={{__html:content}} />
		);
	}
});


module.exports = GoogleSearch;
