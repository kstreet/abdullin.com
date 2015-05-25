---
aliases:
- /journal/2010/8/8/windows-azure-storage-can-be-confusing.html/index.html
date: 2010-08-08
tags:
- Azure
- Cloud Computing
title: Windows Azure Storage Can Be Confusing
---
<p>I'm currently working on some blob storage abstractions needed for the <a href="http://code.google.com/p/lokad-cqrs/" target="_blank" class="offsite-link-inline">Lokad.CQRS project</a>. This involves writing some unit tests, which happen to be producing <strong>really strange results</strong>, while using <strong>conditional headers for the BLOB operations</strong>.</p>

<p>Conditional headers are part of HTTP RFC:</p>

<ul>
<li>if-match</li>
<li>if-modified-since</li>
<li>if-none-match</li>
<li>if-unmodified-since</li>
</ul>

<p>These headers are really important for implementing efficient storage operations (i.e.: caching large blobs locally) and performing reliable atomic updates (when write operation checks, if record was updated since the read).</p>

<p>Azure Blob Storage Rest API supports conditional headers. .NET Storage Client supports them as well in form of BlobRequestOptions that could be passed to methods.</p>

<p>That's the theory. <strong>In practice things get really confusing</strong> and tend to waste your day. Let's examine a single method <a href="http://msdn.microsoft.com/en-us/library/ee772923.aspx" target="_blank" class="offsite-link-inline">OpenRead</a>, which opens a stream for reading blob's contents. Look at this snippet:</p>

<pre><code>var options = new BlobRequestOptions()
{
  AccessCondition = AccessCondition.IfMatch(cachedTag)
};

using (var stream = _blob.OpenRead(options))
{    
  read(stream);
}
</code></pre>

<p>What would you expect the outcome to be? Documentation does not say anything special about the behavior of the BlobRequestOptions passed to the OpenRead.</p>

<p>Here's how it works on my machine:</p>

<ul>
<li>If item is stored properly in Azure Blob, then:
<ul>
<li>IfUnmodifiedSince results in exception, which makes sense.</li>
<li>IfModifiedSince is ignored (which might be step away from what is <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.25" target="_blank" class="offsite-link-inline">defined in RFC</a>)</li>
</ul></li>
<li>if blob (or the container) does not exist, then:
<ul>
<li>IfNoneMatch with non-existent ETag results in 404 (Not Found)</li>
<li>IfMatch with non-existent ETag results in 412 (precondition failed), which is a step away from the <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.24" target="_blank" class="offsite-link-inline">RFC</a>.</li>
</ul></li>
</ul>

<p>Now, since .NET documentation does not help us much, we could do some debugging and figure out the actual REST operations being performed underneath. This leads us to understanding that <em>OpenRead</em>, among the many other things, calls <a href="http://msdn.microsoft.com/en-us/library/dd179400.aspx" target="_blank" class="offsite-link-inline">Get Block List method</a>. Documentation says:</p>

<blockquote>
  <p>This operation also supports the use of conditional headers to read the blob only if a specified condition is met. For more information, see Specifying Conditional Headers for Blob Service Operations.</p>
</blockquote>

<p>However, if we look at the <a href="http://msdn.microsoft.com/en-us/library/dd179371.aspx" target="_blank" class="offsite-link-inline">Operations Supporting Conditional Headers</a>, then GetBlockList operation is not even listed there.</p>

<p>So we've got a few potential problems here:</p>

<ul>
<li>something could be completely wrong with my machine, producing constantly misleading results;</li>
<li>REST API documentation for Windows Azure Blob Storage might be a bit outdated and confusing;</li>
<li>Azure Dev Storage might produce really weird results depending on the type of the header passed;</li>
<li>.NET documentation for the StorageClient does not say a word about how methods are in fact supposed to work.</li>
</ul>

<p>And that's just a single method; there are more. I've started <a href="http://social.msdn.microsoft.com/Forums/fi-FI/windowsazure/thread/386afc5e-9bd3-490b-98d7-22fd03bda3a9" target="_blank" class="offsite-link-inline">creating</a> <a href="http://social.msdn.microsoft.com/Forums/fi-FI/windowsazure/thread/76e61e89-b2b2-429c-8590-d1c38b2edef3" target="_blank" class="offsite-link-inline">questions</a> on MSDN forum, but quickly gave up, since the next step should've been debugging into the server-side API implementation)).</p>

<p><strong>Update:</strong> it gets even more fun. Here's how a simple unit test suite for a single method (wrapper around blob reading) looks on the development fabric:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/08/2010-08-08_235523.jpg" alt=""/></span></span></p>

<p>Now if we switch the credentials to use real Windows Azure Fabric:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/08/2010-08-09_000014.jpg" alt=""/></span></span></p>

<p>As you can see, <strong>Windows Azure Dev Storage and Production Storage have behavior that differs</strong>. This should be accounted for, while developing and deploying applications (ensuring that the proper retry policies and delays are applied to give production storage some time for processing the operations like recreating container with the same name).</p>

<p>Hopefully Microsoft will clear up the situation. Meanwhile, it's recommended to <em>make sure to debug and double check every single method</em>. Or, as <a href="http://en.wikiquote.org/wiki/Lois_McMaster_Bujold" target="_blank" class="offsite-link-inline">L.M.Bujold</a> has said:</p>

<blockquote>
  <p>Check your assumptions. In fact, check your assumptions at the door.</p>
</blockquote>

