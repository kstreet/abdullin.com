/** @jsx React.DOM */

var React = require("react");
var Site = require("../lib/Site");
var PostList = require("./PostList");
var l = require("../lib/lists");


var Footer = React.createClass({
	propTypes: {
		site: React.PropTypes.instanceOf(Site).isRequired
	},
	render: function render() {
		var site = this.props.site;
		var featured = l.featured(site, 4);

		return (
			<footer>
				<section className="footer__section">
					<h4>Featured:</h4>
					<PostList posts={featured} />
				</section>
			</footer>
		);
	}
});


module.exports = Footer;
