---
aliases:
- /journal/2008/9/23/some-tips-on-writing-event-handling-code-in-c-net.html/index.html
date: 2008-09-23
tags:
- Lokad
- C#
title: Some tips on writing event handling code in C# .NET
---
<p><a href="http://www.dev102.com/about/" rel="external nofollow">Shahar</a> has <a href="http://www.dev102.com/2008/09/22/eventargsempty-do-you-use-it/">posted</a> on using <em>EventArgs.Empty</em>. Let's be a bit more efficient with the events than that.</p>

<p>How often do you write repetitive code like this?</p>

<pre><code>public delegate void MessageEventHandler(object sender, MessageEventArgs e);

[Serializable]
public sealed class MessageEventArgs : EventArgs
{
  // some class contents
}
// ...
event MessageEventHandler OnMessageArrived;

private void RaiseOnMessageArrived(string message)
{
  // BTW, what about thread-safety of this call?
  if (OnMessageArrived != null)
  {
    OnMessageArrived(this, new MessageEventArgs(message));
  }
}
</code></pre>

<p>Let's drop the entire <em>RaiseOnMessageArrived</em> method, <em>MessageEventArgs</em> class, the delegate and replace them by:</p>

<pre><code>event EventHandlerFor&lt;string&gt; OnMessageArrived = (sender,e) =&gt; {};

OnMessageArrived.Raise(this, message)
</code></pre>

<p>In order to do that we have to follow simple rules.</p>

<p><strong>1. Apply good citizenship rules to events, too</strong> and always initialize them with empty handler. This rule is optional, but new syntax makes this a breeze with <em>(sender, args) => {};</em></p>

<p><strong>2. Leverage generics</strong> were it is appropriate (i.e. see EventHandlerFor{T} and EventArgs{T} from the Lokad.Shared library within <a href="/photon/">Photon.NET</a>):</p>

<pre><code>/// &lt;summary&gt;
/// Represents the method that will handle a typed event.
/// Associated data is read-only
/// &lt;/summary&gt;
public delegate void EventHandlerFor&lt;T&gt;(object sender, EventArgs&lt;T&gt; args);

[NoCodeCoverage]
[Serializable]
public class EventArgs&lt;T&gt; : EventArgs
{
  /// &lt;summary&gt; Read-only data associated with the event &lt;/summary&gt;
  public T Data { get; private set; }

  /// &lt;summary&gt;
  /// Initializes a new instance of the &lt;see cref="EventArgs{T}"/&gt; class.
  /// &lt;/summary&gt;
  /// &lt;param name="data"&gt;The data.&lt;/param&gt;
  public EventArgs(T data)
  {
    Data = data;
  }
}
</code></pre>

<p><strong>3. Use extension methods</strong> to streamline your code. One of these extensions might look like this one (there are more extensions in Lokad.Shared):</p>

<pre><code>public static void Raise&lt;T&gt;(this EventHandler&lt;EventArgs&lt;T&gt;&gt; handler,
  object sender, T data)
{
  Enforce.ArgumentNotNull(handler, "handler");
  handler(sender, new EventArgs&lt;T&gt;(data));
}
</code></pre>

<p><strong>Note:</strong> if you do not initialize your events with non-null empty block, the <em>Enforce</em> call has to be replaced with null check.</p>

<p><strong>Update:</strong> here's one thing reminded by Denis. If you follow the good citizenship principle and initialize your event with non-null empty block (and do not do null assignments), then you are pretty much thread-safe. Enforce statement can be ignored from the thread-safety point of view, since it is just an sanity check to help you enforce good citizenship code. It even could be dropped from the production code by simply adding conditional attribute on the method.</p>

<p>But if you allow your event statements to be null and use the event field directly, then you have to take possible threading issues into account.</p>

<p>By the way, there is an open source <a href="/lokad-shared/">Lokad Shared Libraries</a> project that contains these helper routines (as well as lots of other things that help me in my everyday C# development)</p>

