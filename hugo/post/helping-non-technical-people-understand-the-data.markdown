---
aliases:
- /journal/2013/6/27/helping-non-technical-people-understand-the-data.html/index.html
date: 2013-06-27
title: Helping non technical people understand the data
tags:
- essay
- event-driven
---
<p>I discovered this interesting question in Enterprise Architecture group in LinkedIn:</p>

<blockquote>
  <p>I'm curious what some of the best practices are to share what information is stored in our database. I am aware of an ERD. I am looking for a business friendly solution that I can show to non technical employees to make them aware what data is available. </p>
</blockquote>

<p>Assuming that we are talking about relational databases, <strong>database representation is just a historical way to store data in a way that is optimised to save expensive disk and RAM space</strong>. Unfortunately this optimisation makes data schema overly complicated by trying to reduce information duplication and used space (we normalize, overwrite and fragment data). </p>

<p>Curiously enough, <strong>prices on disk and RAM have dropped significantly</strong> during the last years. For example, Rackspace charges 0.15 USD for storing 1 Gigabyte of Data for 1 month on a hard drive (for that amount Windows Azure would even keep multiple replicas for you).</p>

<p>Yes, <strong>we still try to store our data in databases, while accepting all the imposed limitations and cryptic storage schema</strong>.</p>

<p>Slightly better way of storing business data (and sharing it) is to capture it as a sequence of documents which capture important business events. For example:</p>

<pre><code>NewCustomerCreated
{
 Id :  37659,
 SSN : 0274178654,
 FirstName : "Rinat",
 LastName : "Abdullin",
 ...
 Manager : "John Big",
 ManagerId : 707,
 CreatedOn : 2013-06-12 16:34:19,
 CreatedAtLocation : "Paris-345 SE HQ",
 CreatedAtLocationId : 921
}

AccountOpenedForCustomer
{
 CustomerId : 37659,
 AccountId : 227461382600000045,
 Currency : EUR,
 Type : Deposit
 ...
 ApprovedByManager : "Merry Shea",
 ApprovedByManagerId : 802,
 ...
}
</code></pre>

<p>You can put as much information to these documents, as you want without worrying about the schema, as long as you keep them documented. Storage is cheap, so we can even add some extra data that might be useful later.</p>

<p>This data is already more understandable by non-technical people than a schema in third normal form. People are used to documents and can read them. A sequence of such business documents can be automatically represented as a readable activity stream for a specific entity (e.g: "facebook wall of a customer"). </p>

<p>Human understanding story does not end here, though. When you need to help another team to use your data, all you need is to:</p>

<ul>
<li>Provide them with the dictionary of these change documents, where each document has a short summary describing its purpose and a detailed explanation of all the fields.</li>
<li>Provide team with the web service endpoint, from which they can retrieve a sequence of all events (for which they have access to) from any point in time and then stay updated in real time.</li>
</ul>

<p>If the team in question needs a database to work with that data, then they can easily transform these business change documents (or business events) into SQL schema that is populated with the data and then kept up-to-date. In essence they would have a persistent and up-to-date SQL cache of customer data on their side.</p>

<p>Obviously, a team might be interested in doing something more interesting like cross-referencing or scanning data for new fraud detection patterns. Then they could transform these business events into batches for Map Reduce jobs in Hadoop or into star schema for OLAP analysis. In my experience, writing such transformations is an extremely simple task.</p>

<p>Such team might eventually discover some new fraud patterns and would want to provide real-time alerts about these. They would just need to consume all new events in real-time, sending a notification when a match is detected.</p>

<blockquote>
  <p>I wouldn't go in detail into performance forces behind such approach. It's enough to say that LinkedIn was forced to switch some systems from Oracle to streams of change documents just for the sake of performance (and lower license costs). It's needless to say that Twitter uses streams of events as one of the cornerstones of it's architecture. And very few systems can drink from it's firehose without drowning.</p>

<p>At Lokad we had related experience through the use of <a href="https://github.com/Lokad/lokad-data-platform">Lokad Data Platform</a> - Cloud-hosted server for storage and querying gigabytes of business events.</p>
</blockquote>

<p>Exposing business data as sequences of documented events (with business semantics) seems to work in enterprise world much better than trying to share database schema. It definitely helps to unlock "data silos" and enable inter-team collaboration within the enterprise.</p>
