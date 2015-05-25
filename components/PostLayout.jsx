/** @jsx React.DOM */

var React = require("react");
var Site = require("../lib/Site");
var Footer = require("./Footer");
var BookLayout = require("./BookLayout");
var PostLayout = React.createClass({
	propTypes: {
		site:React.PropTypes.instanceOf(Site).isRequired,
		nav: React.PropTypes.string,
		title: React.PropTypes.string.isRequired,
		children: React.PropTypes.node.isRequired
	},

	render: function render() {
		return (
			<BookLayout title={this.props.title} site={this.props.site} >
				<main role="main">

					<article className="page__content">
						<header>
							<h1 className="post__title">
								{this.props.title}
							</h1>
						</header>

						{this.props.children}
					</article>
				</main>
				<Footer site={this.props.site}/>
			</BookLayout>
		);
	}
});


module.exports = PostLayout;
