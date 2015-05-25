/** @jsx React.DOM */

var React = require("react");
var Site = require("../lib/Site");
var Head = require("./Head");
var Navbar = require("./Navbar");
var GoogleAnalytics = require("./GoogleAnalytics");

var BookLayout = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		description: React.PropTypes.string,
		site: React.PropTypes.instanceOf(Site).isRequired,
		children: React.PropTypes.node.isRequired
	},

	render: function render() {
		return (
			<html lang="en">
				<Head title={this.props.title} site={this.props.site} description={this.props.description} />
				<body>
					<div className="page">
						<Navbar selected={this.props.nav} site={this.props.site}/>
						{this.props.children}
					</div>
					<GoogleAnalytics site={this.props.site}/>
					<div className="copyright">{this.props.site.copyright}</div>
				</body>
			</html>
		);
	}
});


module.exports = BookLayout;
