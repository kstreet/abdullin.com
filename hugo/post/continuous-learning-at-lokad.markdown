---
aliases:
- /journal/2011/7/2/continuous-learning-at-lokad.html/index.html
date: 2011-07-02
tags:
- management
- Lokad
- Azure
title: Continuous Learning at Lokad
---
<blockquote>
  <p>I've been asked a few times recently about how Lokad approaches development from the high-level perspective. After giving it some thought, I've assembled a small article that provides a bit more detail on the subject. I hope you find it interesting or at least amusing.</p>
  
  <p>While reading, please keep in mind that these are merely personal thoughts or a person who has just started to learn the trade. If you need some solid professional advice or a guidance on the matters at hand - please go to Microsoft, Oracle or any consulting company. </p>
</blockquote>

<p><a href="http://lokad.com">Lokad</a>, once again, is a tiny SaaS company focused on providing forecasting services, while using some bleeding edge tech to deliver them in an efficient and cost-effective way (as in "<em>much cheaper and smarter, than any competitor would be able to come up with</em>", "<em>scalable beyond the wildest dreams of any customer</em>" and "<em>don't trust just my words on that and try-it-yourself-for-free</em>"). </p>

<p><strong>Heavy research background</strong> helps us a lot here to stay efficient and move forward. This works because the majority of people of the company got involved into PhDs or secondary education at some point. PhD is a nice practice of continuous self-guided research and study process. <strong>Continuous learning</strong> is actually what we are doing on everyday process here (this is in addition to work done by the interns and people who are actually working on their PhD within the walls of the company).</p>

<blockquote>
  <p>You'd be amazed to know, how much you would learn from you work in a continuous manner, if you <strong>perceived every task at hand as an opportunity to learn and improve</strong>.</p>
</blockquote>

<p>This approach is <strong>reflected in our formal practices</strong> (i.e. <em>writing weekly internal blog posts</em> on challenges encountered, things accomplished and planned for the next week). This is also reflected in <strong>informally adopted practices</strong> as well. Company culture encourages blogging (internal and public) which is a nice way to structure your own thoughts and do the planning (for example, blogs of <a href="http://vermorel.com">Joannes</a>, <a href="http://www.matthias-steinberg.com">Matthias</a> and <a href="http://christoph.ruegg.name/">Christoph</a>). Talks and presentations are also encouraged along with sharing non-core knowledge with the community in various forms (i.e. See our <a href="http://www.lokad.com/developers.ashx">open source strategy</a>). Even development projects are shaped around vigorous learning approach as well.</p>

<p>In development we try our best to <strong>avoid heavy planning and management approach</strong> (waterfall, PM, Agile, XP, Scrum or whatever other letter combination that is being sold by consultants these days). The reason being - we don't really care about the process or formalities of dev planning and management (as it is usually advocated by the thought leaders). The only trustworthy guide for us here is the real world - being able to deliver services and software that do the job, survive the beating and stress in the cloud environment, help to move the company move forward. They have to require as few man-hours as possible, of course.</p>

<p>No matter how good development practice is, it does not guarantee that the project will have a financial success in the real world. However, if the project did succeed and is capable of evolving efficiently, nobody would really care about the "properness" of the development practice employed to achieve that success (aside from <em>ivory-tower</em> architects and managers).</p>

<p>These are the additional reasons (fine-print for the previous statements), why our ignorance of any "proper formalized development planning" actually works out for us:</p>

<ul>
<li>we are still very disciplined in what we do at Lokad and how we approach planning and management; it just happens that we use approaches that are closer to the scientific fields with a lot of experimenting and unpredictable future;</li>
<li>projects are deliberately broken down and structured to make this approach work;</li>
<li>we avoid development and technology choices that would conflict with this approach;</li>
<li>multi-hat roles and a lot of interpersonal communication help to soften the rough edges as needed.</li>
</ul>

<p>Let's dive into a bit more detail.</p>

<p><strong>Projects and systems are broken down into smaller tactical apps</strong> (Joannes wrote a <a href="http://vermorel.com/journal/2010/1/11/scaling-down-for-tactical-apps-with-azure.html">bit more about the tactical approach</a>). Actual development is preceded by a series of rapid prototypes (spikes), if there are some unanswered technical questions. These prototypes stay forever in the trunk of the originating project for any future references. Usually the first version of the system is just a prototype that has gone too far.</p>

<p>We don't involve any external consulting companies whenever we need to solve an unknown dev problem. First, this would be hideously expensive and slow, compared to our own standards; second, I doubt it would bring us anywhere (i.e. given what is preached by consultants in enterprise and cloud systems, for example). Instead, usual scientific research process is being used, tapping on the infinite practical knowledge shared by the community (all, who have kindly and patiently answered our numerous questions on forums and emails - I thank you!). Results are structured, implemented and shared back with the community where possible, in a form of open source projects, blog posts and published articles. The latter is not only a way to give back something, but also a way to gain additional insights, feedback, ideas and inspiration to move forward. </p>

<p>First project iterations are pushed to production as soon as possible (often with few or no tests). This helps us to get real world feedback and correct the project at the stage, where correcting the project, business idea (or even discarding them altogether) is at it's cheapest - in the very beginning. After the first release, new discoveries and insights are incrementally incorporated into the codebase in the order of importance. This importance is prioritized by the business in form of Return on investment (ROI) in the mid-term (adjusted according to the priority of the project and it's positioning). Such factors as "reducing development friction" or "refactoring" play on the same table as "business features", since they all determine the capabilities of the project to survive, adapt and evolve with the minimum effort possible.</p>

<p>I've seen some remarks by thought leaders along the line of "<em>who put developers into the position to decide what technology they should use?</em>" (the context was about the event sourcing or doing any major refactorings at the cost of short-term feature development). Well, at Lokad we have a clear separation of concerns. <strong>Business decides and determines, what should be done</strong>; it comes up with the challenges and problems; it picks the direction (and is also encouraged to share wild dreams and things that may seem to be impossible to do these days). However, question of "<em>how it should be done to achieve the specified result with the maximum efficiency possible</em>" is handled by the development. It is the <strong>responsibility of the development to find the fastest and cheapest route towards the business objective</strong>, suggesting alternative routes if needed.</p>

<p>Hence such things as introducing a new tech, if it really proves worth it, are never the problem. Here are some examples that made a quick way in, because they were a tool to solve some problem at the point: </p>

<ul>
<li>elastic cloud deployments;</li>
<li>distributed version control systems;</li>
<li>different IOC containers;</li>
<li>new continuous integration platforms;</li>
<li>new versions of SDK or frameworks etc. </li>
</ul>

<p>These days we are making it into distributed cloud engines, event sourcing, new types of UI. A lot more cool stuff is considered down the road as well.</p>

<p>However, <strong>development does not run anarchist</strong> in it's work. We don't pick every single technology or jump at every opportunity. As you recall, it is the task of the dev to <em>solve business problem in the most efficient way</em>. "Most efficient" should, obviously, apply not only at the scope of a single project, but should cover the whole project portfolio of a company considering it's well-being, managing the risks and optimizing returns over both the present and foreseeable future. This forces Lokad development to be self disciplined and self-constraining.</p>

<p>This also makes it an interesting <strong>challenge to balance business problems with the technical and resource constraints</strong>, overlapping them over the major paths that the future might take us. <em>Probabilistic planning</em> and balancing of resource pools and tech choices can send your head spinning sometimes (try visualizing effect of a choice over the possible scenarios of future, weighted by their math expectation of ROI and colored by the distance from the currently selected course ), but it <em>allows development to be really efficient with resources and time</em>, while helping to set what is believed to be the best course for the company.</p>

<p>Here are some examples of the <strong>self-inflicted development constraints</strong>, that would  seem to be illogical choice if considered with the scope of a single project only. However they are really justified (as we want to believe), when the entire business is factored along with the major future scenarios and our real-world constraints:</p>

<ul>
<li>we still use svn and mercurial for version control (we know, that svn can't even be compared to dvcs and thar git is more flexible than git);</li>
<li>one of the current projects under work still uses ASP.NET web forms for the UI (although it's a pure drain of development time and effort);</li>
<li>we continuously push effort into open source projects (well, this is easily financially justified);</li>
<li>we make the effort to make systems at least 100 times more scalable, than the current actual stress (almost-infinite scaling is obviously the ultimate goal);</li>
<li>we gradually migrate from SQL to noSql and event sourcing (easily justifiable, but for some reason it's so hard to do in some other companies);</li>
<li>sometimes developers are assigned to projects and tasks that hold no real business value (aside from letting them learn and gain experience in  preparation for projects planned down the road);</li>
<li>a lot of times we restrain from using some tech approaches and solutions that would make our life easier (these tend to be the very same things that led us to big bowl of complex and expensive spaghetti code in the past).</li>
</ul>

<p>By the way, below are some widely accepted names, that we are either moving away from or ignoring altogether. </p>

<blockquote>
  <p>Please, keep in mind, that this is a <strong>highly opinionated list</strong>. With a lot of these items we were in deep love before (and still share a deep appreciation for their authors). But we eventually discovered that in our hands these do a lot more damage than good (this is probably caused by my lack of technical expertise and the lazy approach of trying to do as less work as possible).</p>
</blockquote>

<ul>
<li>NHibernate or any ORM;</li>
<li>all mocking frameworks;</li>
<li>anything more complex than basic NUnit for the unit testing;</li>
<li>anything that requires an SQL database to work with;</li>
<li>Azure compute and storage emulators for the cloud development, Azure bus and caching;</li>
<li>Reusable frameworks (getting rid of Lokad.Shared libraries was a major pain)
Any IOC container that is more complex than Autofac (although ideally we would boil to lambda-based IoCs);</li>
<li>Silverlight, WPF or any other ancestor that would show up in Windows 8;</li>
<li>MSMQ, or anything that has to do with DTC and System.Transactions;</li>
<li>anything that has to do with Aspect-oriented programming and code weaving.</li>
</ul>

<p>In addition to selective ignorance of widely used technologies, we try to <strong>find our own way around the architectures and development principles</strong> as well. Modern enterprise development by the books (i.e.: as in <a href="http://microsoftnlayerapp.codeplex.com/">N-Layer architectures</a> or <a href="http://msdn.microsoft.com/en-us/practices">patterns and practices</a>) might work for large enterprises that could dedicate multiple developers (even dozens) to work on a single project for multiple months (even years). We don't have this luxury and should seek something dead-simple, dead-cheap and extremely efficient (for examples see <a href="http://abdullin.com/journal/category/cqrs">CQRS</a> and <a href="http://abdullin.com/journal/category/xlim">xLim</a> series of articles within this blog). </p>

<p>This process of trial and error does not end up with the development only and covers the other areas of running a business - marketing, sales, customer support, product planning etc. The most interesting pieces are reflected in articles of this blog, as well as the blogs of the other members of <a href="http://www.lokad.com/AboutUs.ashx">Lokad team</a>.</p>

<blockquote>
  <p>As you have probably guessed, I find deep satisfaction and pride in working in such interesting environment. Man should be challenged, and all challenges should be answered.</p>
</blockquote>

<p>By the way, we are in a <strong>lookout for young talents and researchers</strong> who are interested in learning and working in such productive and efficient environment, continuously learning and pushing the state of the art. Not just for the money, but also because it is fun and helps to make the world a better place.</p>

<p><a href="http://www.lokad.com/careers.ashx">Internship opportunities</a> are offered in Paris, France (developers, statisticians and sales/marketing) and Ufa, Russia (strong focus on dev, but other options might also apply). And there is always a possibility of negotiating something more permanent if we get along really well.</p>

<p>Even if you just need advice or have a question in the field of forecasting, organizing and running start-ups, efficient development (CQRS/DDD/ES/Cloud etc), please don't hesitate to ask a question in our <a href="https://groups.google.com/forum/#!forum/lokad">community</a> or drop us a line in private. We will answer.</p>

