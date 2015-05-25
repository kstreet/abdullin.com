/** @jsx React.DOM */

var React = require("react");

var Site = require("../lib/Site");
var GoogleAnalytics = React.createClass({
	propTypes: {

		site: React.PropTypes.instanceOf(Site).isRequired
	},

	render: function render() {
		var site = this.props.site;

		if (site.root !== "http://abdullin.com") {
			return <p>Google Analytics disabled.<pre>
{this.props.children}
</pre></p>;
		}

		// This isn't a proper react component. But we are building a static site

		var ga ="(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){"+
"(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),"+
"m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)"+
"})(window,document,'script','//www.google-analytics.com/analytics.js','ga');"+

"ga('create', 'UA-2545434-3', 'abdullin.com');"+
	"ga('send', 'pageview');" + this.props.children;

		return (
			<script dangerouslySetInnerHTML={{__html:ga}} />
		);
	}
});


module.exports = GoogleAnalytics;
