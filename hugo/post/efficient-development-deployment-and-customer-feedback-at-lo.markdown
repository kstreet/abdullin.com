---
aliases:
- /journal/2009/10/19/efficient-development-deployment-and-customer-feedback-at-lo.html/index.html
date: 2009-10-19
tags:
- xLim
- Lokad
- Integration
title: Efficient Development, Deployment and Customer Feedback at Lokad
---
<p>A while ago I wrote about <a href="http://abdullin.com/journal/2009/7/8/deployment-and-updates-of-desktop-applications-wix-clickonce.html">deployment and updates of the desktop applications</a> and outlined the technology we use at <a href="http://lokad.com/" target="_blank" class="offsite-link-inline">Lokad</a> for rapid and efficient delivery of various updates to the customers.</p>

<p>Let's expand on the topic a little bit more, showing how a small company could create quite a bit of business value via some efficient development practices.</p>

<p><em>There will be a small questionnaire at the end of this article as well.</em></p>

<h2>Development and Deployment Experience</h2>

<p>Current application deployment and publication loop for <a href="http://www.lokad.com/products.ashx" target="_blank" class="offsite-link-inline">Lokad Client Applications</a> works like this: when developers commit new features or fixes to <a href="http://abdullin.com/wiki/version-control-system-vcs.html">version control repository</a> and hit a special build button on <a href="http://abdullin.com/wiki/continuous-integration.html">integration server</a>, following happens automatically:</p>

<ul>
<li>All <a href="http://abdullin.com/wiki/unit-testing.html">unit tests</a>, integration and code quality tests are executed against the latest codebase (build breaks if these fail).</li>
<li>New version of install package (and optional downloads) is deployed to publicly available location.</li>
<li>Download page is updated with the links to the new version.</li>
<li>Existing users of an application get a nice "Update Available!" notification in the corner of their toolbar. Clicking on it launches semi-automatic download and upgrade process.</li>
</ul>

<p>Note, that we are not using ClickOnce technology here, since it has important limitations we couldn't live with. Everything took a bit of time to setup once and then it is just started flowing.</p>

<h2>Customer Feedback Experience</h2>

<p>Recently, in order to enhance customer experience, yet another simple feature had been added to the client applications: integrated feedback reporting. Simply put, customer could click a button and send a message to the company. It will immediately show up in the customer support system. Additionally, all unhandled exceptions (should they happen) could be reported, too.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2009/10/2009-10-19_103122.png" alt="Feedback button in Lokad"/></span></span></p>

<p>Feedback reports  (if customers decide to) could include following anonymous information:</p>

<ul>
<li>system descriptor of the software (version, OS version);</li>
<li>versions of the assemblies loaded into the AppDomain;</li>
<li>latest portion of application log;</li>
<li>statistics of some performance counters showing client-side information about interactions with our servers (number of communication failures, retries, amount of data transferred);</li>
<li>exception counter statistics (information about unique exceptions handled by the application along with their counts).</li>
</ul>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2009/10/2009-10-19_103222.png" alt="Feedback reporting to Lokad Support"/></span></span></p>

<p>Note, that sources for the <em>SystemDescriptor</em>, <em>ExecutionCounter</em> and <em>ExceptionCounter</em> are available in <a href="http://abdullin.com/shared-libraries/">Lokad Shared Libraries</a>. Actual feedback reporting shard is shared with the community in the <a href="http://code.google.com/p/lokad-sdk/" target="_blank" class="offsite-link-inline">Lokad SDK</a></p>

<p>Feedback system had been implemented as an infrastructure shard within the shared codebase. This implied IoC-friendly <a href="http://abdullin.com/wiki/component-driven-development.html">component-driven design</a> and allowed to efficiently reuse all components in multiple applications (even in these that didn't have any IoC infrastructure around). All improvements and fixes to the shared components, in such scenario, automatically benefit all applications that use them.</p>

<p>Additionally, since the feedback system is implemented as an independent infrastructure shard, it can be used to trap and report possible exceptions that take place on the application startup (even before the <a href="http://abdullin.com/wiki/inversion-of-control-ioc.html">Inversion of Control</a> Container is setup). Later, when the application and composite UI elements are ready, we switch stand-alone feedback handler for integrated handler (that uses, application's Viewspace and action policies, for instance)</p>

<p>This reduced feedback friction for the customers and made issue reports a lot more useful and helpful for the development team. Since all feedback reports get routed to the internal customer support system, we could feel the change really fast and resolve problems and provide solutions more efficiently.</p>

<h2>New Challenge - Update Flood</h2>

<p>This kind of automatic and tight integration between development, deployment and customer support spawns new possibilities and brings forth new challenges. First of all, it definitely affects the way we think about the development and plan future changes.</p>

<p>Second, since it is too easy to deploy an update, we've got to start thinking about protecting customers from being flooded with a number of updates (software should solve the problems, not create new ones), since theoretically we could fire the deployment update after every single verified fix that is landed in the trunk.</p>

<p>Here's how one of the implementation scenarios looks like right now.</p>

<p>All software updates (packaged as a complete version, as usually) could be described with a:</p>

<ul>
<li>version;</li>
<li>download url;</li>
<li>tags (Critical, RC, Test, Major etc)</li>
<li>optional description.</li>
</ul>

<p>Primary download page is automatically updated with the links only when "Critical" and "Major" versions are released.</p>

<p>Customers are unformed about the Major updates to the installed software with a usual manner (i.e.: toolbar notification). Less-important updates are not shown to them explicitly but could be pulled (i.e.: from the menu), if customer needs that.</p>

<p>This scenario should work if we are facing scenario, when there is a minor fix affecting only a single customer. We could deploy an update via the normal procedure, but it does not make a lot of sense to push updates to every single customer.</p>

<p><strong>Implementation should be rather straightforward:</strong> </p>

<ul>
<li>Instead of updating simple txt on the server per every update, we could update an XML file in the RSS/Atom format with the build version, url, description and tags.</li>
<li>By default every application filters out all non-Primary updates, displaying the rest on the toolbar. This way we deliver important functionality to customers, while saving them from the barrage of less important builds.</li>
<li>Customers might explicitly look into the update stream, picking and firing the specific update they need (i.e. when informed about the fix by the customer support).</li>
<li>Beta testers and partners might update application settings to be notified about RC and Minor deployments</li>
<li>Developers and Testers might switch their filtering settings to include Beta and Minor updates.</li>
</ul>

<p><strong>Potential synergy effects:</strong> </p>

<ul>
<li>Updates could be subscribed to via a mere RSS reader and mashed with a company news (automagically).</li>
<li>Since we are already tracking Delivery-Build labels for issues, this information could be pasted to the description dialog, providing customers and testers with more context (could be available from the application and from the web/RSS).</li>
<li>It is possible to push the idea even further and let customers set simple filter in their application ("inform me when ticket #X is fixed"). Then, whenever the next deployment is detected, a simple regex could scan the description for the ticket number, raising friendly alert, whenever it is mentioned there.</li>
<li>If we have a critical update at hand (i.e.: breaking API change or an important security vulnerability) we can block the entire app and insist on updating.</li>
</ul>

<p>Everything might get even more interesting as extensible and composable application architectures (with extensions being developed and delivered concurrently) get into the picture, allowing fine-grained and yet automated customer-company interactions.</p>

<h2>Summary</h2>

<p>In this short article we've walked over some development practices adopted in Lokad. These practices help the company to resolve customer problems and provide new solutions to their business challenges.</p>

<p>In short the outlined practices include:</p>

<ul>
<li>efficient software deployment and updates;</li>
<li>efficient customer support and feedback collection;</li>
<li>considering synergy effects and automation, whenever possible and feasible.</li>
</ul>

<p>Of course, there's a lot more in efficient development, than these few practices. I'll address them eventually. You can <a href="/atom.xml">subscribe to this journal</a> to get all the updates. <a href="http://abdullin.uservoice.com/" target="_blank" class="offsite-link-inline">Voting for the next article to be written</a> is also possible.</p>

<p>As always, all feedback to the article is welcome and appreciated. Here are also a few questions, if you are willing to share your experience with the community around this Journal:</p>

<ul>
<li>How much time does it takes for the customer to report a problem and get an update in your development environment?</li>
<li>Does your company share the code with the community?</li>
<li>Are you a customer of Lokad? What do you think about this development approach? How could it be improved?</li>
<li>Are you a competitor of Lokad? What do you think? ))</li>
</ul>

