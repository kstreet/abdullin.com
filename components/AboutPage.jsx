/** @jsx React.DOM */

var React = require("react");

var Site = require("../lib/Site");
var Post = require("../lib/Post");
var PostLayout = require("./PostLayout");

var AboutPage = React.createClass({
	propTypes: {
		site: React.PropTypes.instanceOf(Site).isRequired
	},

	render: function render() {
		var site = this.props.site;
		var hide = {
			display: "none",
			visibility:"hidden"
		};
		return (
			<PostLayout site={site} title="Rinat Abdullin">
				<article>
					<aside>
						<h2>Get in touch</h2>
						<ul>
							<li key="linkedIn"><a href="http://www.linkedin.com/in/abdullin">LinkedIn</a></li>
							<li key="github"><a href="https://github.com/abdullin">GitHub</a></li>
							<li key="twitter"><a href="https://twitter.com/abdullin">Twitter</a></li>
							<li key="email">Rinat<span style={hide}>[</span>@<span style={hide}>]</span>abdullin.com</li>

						</ul>
					</aside>
					<section>
						<h2>Bio</h2>
						<p>
							Rinat Abdullin is a software engineer who spent more than 10 years working on various projects in the field.
							Along the way he learned from awesome people, contributed to the IDDD book, designed architecture of a social website and helped to deliver big data analytics for retail in the cloud.</p>
						<p>
							Rinat helps teams to scale applications and deal with complex legacy software. He shares his experience in the blog at <a href="http://abdullin.com">abdullin.com</a>
						</p>
					</section>

					<section>
						<h2>Services</h2>
						<p>I'm available for collaboration on software projects, consulting and tutoring on software design.</p>
						<aside>
							<p>Check out some of the past classes and workshops for <a href="/tags/talks/">more detail</a>.</p>
						</aside>
						<p>I can also help to attract talented developers to your company or project by writing a story about it. See, for example: <a href="/long/happypancake/">HappyPancake</a> or <a href="/sku-vault/">SkuVault</a> projects.</p>
						<p> Don't hesitate to drop me a line, if you have any questions.</p>
					</section>
					<section>
						<h2>Recommendations</h2>


						<section>
						<h3>Pieter Joost van de Sande</h3>
						<aside>
							<p>Pieter is a passionate software developer with more than <a href="http://born2code.net/about/">a decade of experience</a>. I loved working with him on <a href="/long/happypancake/">HappyPancake</a>.</p>
						</aside>
						<blockquote>
							<p>Rinat knows how to break big into small and can turn complexity into simplicity. He masters the ability to deliver great value at a predictable and sustainable pace. His communication is crystal clear and he knows how to manage expectations. </p>
							<p>

								Rinat showed us how to grow software instead of designing it. It was great a bless to work with Rinat and I am looking forward to work with him again.</p>
						</blockquote>
						</section>
						<section>
							<h3>Tomas Roos</h3>
							<aside><p>We worked with <a href="https://www.linkedin.com/in/tomasroos">Tomas</a> at <a href="/long/happypancake/">HappyPancake project</a>, scaling and redesigning for the most popular dating website in Sweden. He is a great software developer with a talent for performance and scalability.</p> </aside>
							<blockquote>
							<p>Rinat is a very eager learner. He is always working very hard to make sure outcome and the feedback cycle is as short as possible. Strong focus and high value on quality by writing tests. </p>
							<p>
								Never afraid of solving problems that never have been thought about before. He has a very good view on architecture level as well as coding, from algorithms to web. </p>

							<p>It has been a pleasure to work with one of the best in the industry and I would recommend Rinat any day. He's openminded way of tackling suggestions, improvements and feedback is something which allows him to fit in to many constellations</p>
							</blockquote>
						</section>


						<p>You can find more references by checking out <a href="/tags/feedback/">event/project summaries with the feedback</a>.</p>

					</section>
				</article>
			</PostLayout>
		);
	}
});


module.exports = AboutPage;
