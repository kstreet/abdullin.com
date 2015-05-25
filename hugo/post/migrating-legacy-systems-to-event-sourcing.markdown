---
aliases:
- /journal/2011/12/24/migrating-legacy-systems-to-event-sourcing.html/index.html
date: 2011-12-24
tags:
- xLim
- Cloud Computing
- DDD
- CQRS
- Domain Event
title: Migrating Legacy Systems to Event Sourcing
---
<p>These days I'm working on migrating really legacy system towards the simplified CQRS/DDD design with <a href="http://bliki.abdullin.com/event-sourcing/why">event sourcing</a> for the cloud. </p>

<p>As part of the migration process, I'm <strong>reverse engineering</strong> legacy SQL database into a stream of events. These events are not precise representation of what has happened in the past (this exact information is irreversibly lost, as in almost any data-driven system), but rather a pretty good estimate that could be used to prepopulate the new version.</p>

<p>Essentially, <strong>reverse engineering events</strong> is about writing a <em>throw-away utility</em> that will scan database tables (MS Access files or punch-cards) and spit out events that could be used to reproduce that state. </p>

<p>For instance, consider this customer record in DB table:</p>

<pre><code>Customer {
  Name : "GoDaddy",
  Id : SomeGuid,
  Created : 2008-13-12,
  Status : Deleted,
  Phone : "111-22-22",
  Reason : "Supporting SOPA was poor PR move"
}
</code></pre>

<p>This record could be reversed into the following events</p>

<pre><code>CustomerCreated!(
  Id: SomeGuid, 
  Name: "GoDaddy", 
  Created: 2008-13-12
)
CustomerPhoneSpecifid!(
  Id: SomeGuid, 
  Phone: "111-22-22"
)
CustomerDeleted!(
  Id: SomeGuid, 
  Reason: "Supporting SOPA was poor PR move", 
  Deleted: 2011-12-24
)
</code></pre>

<p>Note, that we actually had to improvise while coming up with this event stream: date of deletion was not stored in the original database (we were losing this information). So we are just substituting some predefined date here (i.e. date of upgrade to CQRS/DDD+ES).</p>

<p>When you have a system with a few years of history, quite a few events are generated. The system that I'm currently migrating has data that dates back to the early dates of <a href="http://www.lokad.com/">Lokad</a>, hence 300-400 thousand events is something expected.</p>

<p>As part of development process, these events are run through the <a href="http://bliki.abdullin.com/event-sourcing/aggregates">aggregate</a> state objects and also through the <a href="http://bliki.abdullin.com/event-sourcing/projections">projections</a>. The goal here is to pass all possible sanity checks and get read models that match exactly to the UI currently visible in the old system. If <strong>new system looks and behaves exactly like the old one</strong> (even if the guts are completely simplified), then we are moving in the right direction.</p>

<p>Obviously, during this process, a lot of problems show up, especially with logically inconsistent or corrupt data (i.e. accounting inconsistencies caused by race conditions and dead locks in the legacy database). These things are generally to be resolved manually - there is no magical silver bullet.</p>

