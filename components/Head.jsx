/** @jsx React.DOM */

var React = require("react");
var Site = require("../lib/Site");
var Head = React.createClass({
	propTypes: {
		site: React.PropTypes.instanceOf(Site).isRequired,
		title: React.PropTypes.string.isRequired,
		description: React.PropTypes.string
	},

	render: function render() {
		var site = this.props.site;
		var metas = [];

		if (this.props.description) {
			metas.push(<meta key="description"
							 name="description"
							 content={this.props.description} />);
		}

		return (
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{metas}
				<title>{ this.props.title }</title>
				<link href="https://fonts.googleapis.com/css?family=Merriweather:400,400italic,700,700italic|Source+Code+Pro|Source+Sans+Pro:200,300,400,600,400italic,600italic|Rock+Salt" rel="stylesheet" type="text/css" />
				<link rel="stylesheet" type="text/css" href="/css/styles.css" />

				<link rel="apple-touch-icon-precomposed"
					  href="/apple-touch-icon.png" />
				<link rel="shortcut icon"
					  href="/favicon.ico" />

				<link rel="alternate"
					  type="application/atom+xml"
					  href={site.atomUrl}
					  title={ site.title + " Feed"}/>

			</head>
		);
	}
});

module.exports = Head;
