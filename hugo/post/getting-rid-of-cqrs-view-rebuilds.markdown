---
aliases:
- /journal/2012/2/10/getting-rid-of-cqrs-view-rebuilds.html/index.html
date: 2012-02-10
tags:
- xLim
- management
- Lokad
- C#
- CQRS
- Domain Event
title: Getting Rid of CQRS View Rebuilds
---
<p>We all know that one of the coolest reasons of event-centric architectures is: <strong>you can always discard your persistent read models and rebuild them from scratch</strong>, optimizing for the specific UI. For instance you can replace that paginated list of users in your system with a list of the most active users along with their latest activities. You can also leverage this capability to change underlying technologies, introduce replication or in-memory caching.</p>

<p>We've been using this approach a lot recently, even created an in-house tool for that. It discovers <a href="http://bliki.abdullin.com/event-sourcing/projections">projections</a> in the code (projection is a class that is responsible for transforming an event stream to a specific type of view) and runs an event stream through them. </p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/02/2012-01-05_rebuild-views.png?" alt=""/></span></span></p>

<p>While doing that, first we save all views in memory (just makes things faster, especially when you have hundreds of thousands of events). When the entire rebuild is complete, we "dump" in-memory views to the actual persistent storage, overwriting the old version of views. </p>

<blockquote>
  <p>For .NET developers we've published a sample source code for that in <a href="http://lokad.github.com/lokad-cqrs/">Lokad.CQRS Sample Project</a> (you are interested in 'Audit'). </p>
</blockquote>

<p>Let's say, I have an event stream from production and want to see how my updated views will look like in local environment with the brand new UI:</p>

<ul>
<li>Start Audit tool.</li>
<li>Point it to the event stream for the specific bounded context.</li>
<li>Open views tab and pick the views I want to rebuild (more views to rebuild - longer it takes).</li>
<li>Wait for the rebuild to finish</li>
<li>copy materialized views from temp folder to the storage</li>
<li>Start system.</li>
</ul>

<p>This sounds good and useful, isn't it? Now you can let your UI developers go wild, developing various denormalized view models, that could be used for really non-conventional views, while staying extremely responsive. </p>

<p>However, there is a catch. Such functionality is a great enabler (it shortens UI-focused iterations), and its get's pushed to the extreme. Extreme is: you iterate UIs and and underlying views so often, that manually rebuilding views become tedious and time consuming.</p>

<blockquote>
  <p>If I were to rate ORM+SQL experience on that tediousness scale, I would need a logarithmic one.</p>
</blockquote>

<p>So a few days ago I went ahead and pushed further the idea of self managing projection servers. I discarded rebuild functionality completely in one of our projects. Instead, server is tasked with duty of tracking his own projections and rebuilding only the ones that have changed.</p>

<p>In normal production this would happen only once after a deployment that touches projections. In rapid development this happens whenever I edit some projections and restart the server. It will:</p>

<ul>
<li>Check if views exist. And if they don't - rebuild in memory and update before starting to process messages.</li>
<li>If views exist - check if projection code have changed since views were touched last time. If they have - rebuild corresponding views in memory and replace them in the stores.</li>
</ul>

<p>Obviously, server does not process any new events, while rebuilding views. </p>

<p>So I no longer have to worry about updating views either in production or in development - server tracks this for me. This is a major simplification. And since server rebuild only projections that have changed - it is always as fast as possible.</p>

<p><strong>How do we detect if projection code has changed?</strong></p>

<p>Answer is simple: we cheat by <strong>teaching the server how to decompile</strong> itself with the help from awesome <a href=".NET Reflection library">Mono.Cecil</a> (this is a trick I've learned from Greg and Svein and their awesome work on <a href="http://continuoustests.com/">MightyMoose</a>).</p>

<p>While doing that, to keep everything simple, we assume that no messy IoC containers are used and we explicitly wire and instantiate out projections <a href="http://abdullin.com/journal/2012/2/6/make-code-explicit-and-stupid.html">the stupid way</a>.</p>

<p>Given that, we just need to generate a decompiled snapshot of a projection from the very code that is being executed (while discarding IL offsets) and store it whenever we generate views. Decompiled snapshot is just a list of instructions:</p>

<pre><code>Void DomainIndexProjection::.ctor(IAtomicWriter`2&lt;unit,DomainIdentityVector&gt;)
IL_0000: ldarg.0
IL_0000: call Void Object::.ctor()
IL_0000: nop
IL_0000: nop
IL_0000: ldarg.0
IL_0000: ldarg.1
IL_0000: stfld IAtomicWriter`2&lt;unit,DomainIdentityVector&gt; DomainIndexProjection::_writer
IL_0000: nop
IL_0000: ret
</code></pre>

<p>Developers that use <a href="http://lokad.github.com/lokad-cqrs/">Lokad.CQRS Sample project</a> for their dark production purposes, would immediately notice familiar class names.</p>

<p>Actually the simplest code to generate something like this can start as:</p>

<pre><code>var builder = new StringBuilder();

foreach (var @class in projections.OrderBy(p =&gt; p.GetType().Name))
{
    var type = @class.GetType();
    builder.AppendLine(type.ToString());

    var typeDefinition = mod.GetType(type.FullName);

    foreach (var md in typeDefinition.Methods.OrderBy(m =&gt; m.ToString()))
    {
        builder.AppendLine("  " + md);
        foreach (var instruction in md.Body.Instructions)
        {
            // we don't care about offsets
            instruction.Offset = 0;
            builder.AppendLine("    " + instruction);
        }
    }
}
return builder.ToString();
</code></pre>

<p>So we just generate our representation of the executable code of the projections and compare it with the existing one. If some projections don't match - they need to be upgraded.</p>

<blockquote>
  <p>In practice it's slightly a bit more complicated, since I have to walk down the referenced classes in order to grab things expressed inside referenced anonymous methods. Once the approach is stable I'll push it to the Lokad.CQRS Sample.</p>
</blockquote>

<p>Once you have this thing delegated to the server, life suddenly becomes more simple and practical. Both the development and deployment experience are improved. There is even no need to track which projections have changed within the iteration, since server can do this better. This especially becomes useful, when you need to deploy to the cloud.</p>

<pre><code>[0001070]: Engine ready. Running rebuild
[0001071]: Projections in hub-domain-view are up-to-date
[0001109]: Projections in hub-client-view are up-to-date
[0001112]: Projections in hub-apiops-view are up-to-date
[0006684]: Started Version - 2572 (Hub.Engine)
</code></pre>

<p>Now if I could only figure the dead-simple simple way to automate VIP swaps between projection versions, so that they could be upgraded with no downtime at all…</p>

<p>PS: Yes I did use decompiled snapshot of projection .ctor in this listing. Methods are slightly longer and wouldn't make a big difference.</p>

