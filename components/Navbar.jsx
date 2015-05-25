/** @jsx React.DOM */

var React = require("react");
var Site = require("../lib/Site");

var Navbar = React.createClass({
	propTypes: {
		site: React.PropTypes.instanceOf(Site).isRequired,
		className : React.PropTypes.string
	},

	render: function render() {

		var site = this.props.site;
		var name = this.props.className || "navbar";
		var item = name + "__item";
		return (
			<nav className={name}>
				<span>
					<a className={item} href="/">Blog</a>
					<a className={item} href="/tags/">Archive</a>
				</span>
				<span style={{float:"right"}}>

					<a className={item} href="/about-me/" rel="author">About Me</a>
					<a className={item} href={site.atomUrl}>Feed</a>
				</span>
			</nav>
		);
	}
});


module.exports = Navbar;
