---
aliases:
- /journal/2013/8/6/one-example-of-using-message-driven-design-at-lokad.html/index.html
date: 2013-08-06
tags:
- Lokad
title: One Example of Using Message-Driven Design at Lokad
---
<p><strong>Lokad Salescast is an inventory optimisation platform for retail</strong>, capable of dealing with big datasets. It gets inventory and sales information and does <a href="http://www.lokad.com/quantile-forecasting-technology">some number crunching</a>. Produced reports tell when you need to reorder your products (and how much) in order to serve forecasted demand and avoid overstocking.</p>

<p>One of the objectives of Salescast is to make it available and affordable for small customers. Hence we introduced "Express Plan", which is free for small customers, but comes without any support. </p>

<p>Making software free is easy. Making software usable without support is much harder. So Lokad developers had to <strong>create complicated heuristics</strong> to help customers deal with the problems. TSV parsing is one of problematic regions.</p>

<p>Even though the major scenario for big data transfer at Lokad is "upload TSV-formatted text files to FTP", there are multiple things that can go wrong with this simple setup. No matter how precise is tech documentation, people can always miss seemingly unimportant things that are critical for computers. Here are some examples:</p>

<ul>
<li>text encoding of files;</li>
<li>culture-specific format of dates;</li>
<li>culture-specific format of numbers;</li>
<li>optional columns in invalid format;</li>
<li>required columns missing;</li>
<li>missing files;</li>
<li>non-standard separators.</li>
</ul>

<p>Yet, we are trying to provide the best experience out-of-the-box even with improperly formatted data. This would require doing <strong>a lot of smart TSV analysis</strong> in code. Here's how an output of one analysis process would look like (latest log entries at the top):</p>

<p><img src="/storage/uploads/2013/08/2013-08-06-image1.jpg" alt="Lokad Salescast Events" title="2013-08-06-SalescastEvents.png" border="0" width="550" height="501" style="border:1px solid gray;"/></p>

<p><strong>Message-driven design patterns help to develop and maintain such logic</strong>. Public contract of it in the code might look like a simple function (with complicated heuristic inside):</p>

<pre><code>static IMessage[] AnalyseInput(SomeInput input) { .. }
</code></pre>

<p>Here <strong>messages are strongly-typed classes that explain return results of that function</strong> (unlike event sourcing, they are not used for persistence). For example:</p>

<pre><code>public class UsedNonstandardExtension : ITsvFolderScanMessage
{
    public readonly string Extension;

    public UsedNonstandardExtension(string extension)
    {
        Extension = extension;
    }

    public virtual AdapterTweet ToHumanReadableTweet()
    {
        return new AdapterTweet
            {
                Severity = AdapterTweetSeverity.Hint,
                Tweet = String.Format("Salescast found Lokad TSV files using" 
                  + " non-standard extension {0}.", Extension),
            };
    }
}
</code></pre>

<p><strong>Function would return one or more event messages</strong>. Various input scenarios might be <strong>unit-tested using given-when-expect approach</strong>, where we express test case as:</p>

<ul>
<li><strong>given</strong> certain inputs ;</li>
<li><strong>when</strong> we invoke function;</li>
<li><strong>expect</strong> certain outcomes and assert them (e.g. verify that we get expected messages).</li>
</ul>

<p>Or in code:</p>

<pre><code>public sealed class given_compressed_files_in_txt_format 
    : tsv_folder_analysis_fixture
{
    public given_compressed_files_in_txt_format()
    {
        // setup all expectations in constructor, using helper methods
        // from the base class
        given_files(
            "Lokad_Items.txt.gzip",
            "Lokad_Orders.TXT.gzip"
            );
    }

    [Test]
    public void expect_detection_with_extension_warning_and_compression_hint()
    {
        // assert expectations, using helper methods from the base class
        expect(
            new TsvFolderScanMessages.UsedNonstandardExtension("TXT"),
            new TsvFolderScanMessages.CompressedFilesDetected(),
            new TsvFolderScanMessages.StorageDetectionSucceeded(
                TsvInputFile.Item("Lokad_Items.txt.gzip").WithGzip(),
                TsvInputFile.Order("Lokad_Orders.TXT.gzip").WithGzip()
                ));
    }
}
</code></pre>

<p>This is an example of a single test scenario. There could be many others for a single function, reflecting complexity of heuristics in it:</p>

<p><img src="/storage/uploads/2013/08/2013-08-06-image2.jpg" alt="2013 08 06 122329" title="2013-08-06_122329.png" border="0" width="550" height="340" style="border:1px solid gray;" /></p>

<p>Each of these test scenarios shares same "when" method and helpers to setup "given" and "expect", so they are pushed to the base fixture class, which can be as simple as:</p>

<pre><code>public abstract class tsv_folder_analysis_fixture
{
    readonly List&lt;string&gt; _folder = new List&lt;string&gt;();
    ITsvFolderScanMessage[] _messages = new ITsvFolderScanMessage[0];

    protected void given_files(params string[] files)
    {
        _folder.AddRange(files);
    }

    [TestFixtureSetUp]
    public void when_run_analysis()
    {
        // this is our "When" method. It will be executed once per scenario.
        _messages = TsvFolderScan.RunTestable(_folder);
    }

    static string TweetToString(ITsvFolderScanMessage message)
    {
        var tweet = message.ToHumanReadableTweet();
        var builder = new StringBuilder();
        builder.AppendFormat("{0} {1}", tweet.Tweet, tweet.Severity);
        if (!string.IsNullOrEmpty(tweet.OptionalDetails))
        {
            builder.AppendLine().Append(tweet.OptionalDetails);
        }
        return builder.ToString();
    }

    protected void expect(params ITsvFolderScanMessage[] msg)
    {
        CollectionAssert.AreEquivalent(msg
            .ToArray(TweetToString),_messages.ToArray(TweetToString));
    }
}
</code></pre>

<p>If you look closely, then you'll find a lot of resemblance with <a href="http://abdullin.com/journal/2012/9/18/specification-testing-for-event-sourcing.html">specification testing for event sourcing</a>. This is intentional. We already know that such tests based on event messages are non-fragile as long as events are designed properly.</p>

<p>This <strong>additional design effort pays off itself really quickly</strong> when we deal with complicated heuristics. It  makes development process incremental and iterative, without fear of breaking any existing logic. Step by step, one can walk around the world.</p>

<p>In essence, we go through all the hoops of expressing behaviours via messages just to:</p>

<ul>
<li><strong>express diverse outcomes</strong> of a single function;</li>
<li><strong>provide simple functional contract</strong> for this function;</li>
<li>make this function <strong>easily testable in isolation</strong>;</li>
<li>ensure that <strong>tests are easily maintainable and atomic</strong>.</li>
</ul>

<p>Downstream code (code which will use components like this one) might need to transform a bunch of event messages into a some value object before further use, but that is a rather straight-forward operation.</p>

<blockquote>
  <p>Interested to dive deeper into Lokad development approaches? We are <a href="http://www.lokad.com/careers">looking for developers</a> in Paris and Ufa. You can also learn some things by subscribing to <a href="http://beingtheworst.com/about">BeingTheWorst podcast</a> which explains development ways of Lokad.</p>
</blockquote>

