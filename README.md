<h2>Pre-requisites</h2>
<p>Reference jQuery and Quill on to your page.</p>
<ul>
	<li><a href="https://jquery.com/download/" target="_blank">jQuery</a></li>
	<li><a href="https://quilljs.com/docs/installation" target="_blank">Quill</a></li>
</ul>
<pre><code>&lt;script src="js/jquery.js"&gt;&lt;/script&gt;</code></pre>
<pre><code>&lt;link href="css/quill.snow.css" rel="stylesheet"&gt;&lt;/script&gt;
&lt;script src="js/quill.js"&gt;&lt;/script&gt;</code></pre>

<h2>SEEMS Reference</h2>
<p>
	Reference the SEEMS <a href="https://github.com/doylesee/seems/blob/main/css/seems.css" target="_blank">CSS</a> and <a href="https://github.com/doylesee/seems/blob/main/js/seems.js" target="_blank">JS</a> on to your page.<br />
	Ensure this is added after the jQuery and Quill references.
</p>
<pre><code>&lt;link href="css/seems.css" rel="stylesheet"&gt;&lt;/script&gt;
&lt;script src="js/seems.js"&gt;&lt;/script&gt;</code></pre>

<!-- ***** -->

<h2>Build your HTML Layouts via JS</h2>
<p>Ensure that the following classes are referenced in the HTML code:</p>
<ul>
	<li><strong>seems-page-section</strong>: the element wrapping the entire layout</li>
	<li><strong>seems-item-container</strong>: the element wrapping the entire list of featured items</li>
	<li><strong>seems-page-item</strong>: the element wrapping a featured item</li>
</ul>
<ul>
	<li><strong>seems-url-container</strong>: the <code>&lt;A /&gt;</code> element for the link</li>
	<li><strong>seems-image-container</strong>: the element for the image</li>
	<li><strong>seems-copy-container</strong>: the element wrapping the copy</li>
</ul>

<p>
	Ensure this JS is declared before seems.js<br />
	Ideally, this is how it would look like:
</p>

<pre><code>const LAYOUT_2-COLUMN_MEDIA_LEFT = `
&lt;section class="seems-page-section"&gt;
	&lt;img src="/img/sample-image.jpg" alt="" class="seems-image-container" /&gt;
	&lt;div class="seems-copy-container"&gt;
		&lt;p&gt;In skateparka et vert, the grinda is afoot. Manuals and nosegrinds, ollies and kickflips—each trick is a lexicon of the concrete. From the smooth transition of a bowl to the rough edge of a curb, the shredder carves their own story. The distant clatter of urethane on coping echoes through the park, a symphony of defiance and control. Heelflips and shuvits become the punctuation marks of a line, a fluid sentence written in motion. The griptape, coarse as a memory, holds fast to the board, a silent promise of connection between rider and wood. The pursuit is not of perfection, but of progression, the constant push against the limits of gravity and fear.&lt;/p&gt;
	&lt;/div&gt;
&lt;/section&gt;`;
const LAYOUT_CONTENT_WITH_BACKGROUND = `
&lt;section class="seems-page-section"&gt;
    &lt;div class="seems-image-container" style="background-image: url('../img/sample-image.jpg');"&gt;
        &lt;div class="seems-copy-container"&gt;
            &lt;p&gt;In skateparka et vert, the grinda is afoot. Manuals and nosegrinds, ollies and kickflips—each trick is a lexicon of the concrete. From the smooth transition of a bowl to the rough edge of a curb, the shredder carves their own story. The distant clatter of urethane on coping echoes through the park, a symphony of defiance and control. Heelflips and shuvits become the punctuation marks of a line, a fluid sentence written in motion. The griptape, coarse as a memory, holds fast to the board, a silent promise of connection between rider and wood. The pursuit is not of perfection, but of progression, the constant push against the limits of gravity and fear.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/section&gt;`;</code></pre>

<h3>For RM-specific users</h3>
<ul>
	<li>
		<strong>Build a Content Block for each layout</strong><br />
		<p>
			<code>/layout-content-with-background  </code><br />
			<code>/layout-2-column-media-left      </code>
		</p>
	</li>
	<li>
		<strong>Build the <code>/seems-layout-list</code> Content Block</strong><br />
		<p>This Content Blocks lists all of these layouts and its attributes following this format, <strong>separated by a semi-colon</strong>, and <strong>no semi-colon on the last item</strong>:</p>
		<p><code>Layout Content Block Name,Layout Label,Layout Item Content Block Name,Layout Item Column Number</code></p>
		<p>eg.:</p>
		<p><code>layout-content-with-background,Content with Background,,;layout-2-column-media-left,2-Column Media Left,,;layout-3-column-cta,3-Column CTA,layout-3-column-cta-items,3</code></p>
	</li>
	<li><strong>Add <a href="https://github.com/doylesee/seems/blob/main/js/theme.js" target="_blank">this code</a> to your <code>theme.js</code></strong></li>
</ul>

<!-- ***** -->

<h2>SEEMS UI</h2>
<p>Include the <a href="https://github.com/doylesee/seems/blob/main/seems-ui.liquid" target="_blank">SEEMS UI</a> code into your intended Page Builder page.</p>

<h3>For RM-specific users</h3>
<ul>
	<li>Input <a href="https://github.com/doylesee/seems/blob/main/seems-ui.liquid" target="_blank">SEEMS UI</a> code into a <code>/seems-ui</code> Content Block</li>
	<li>Reference <code>/seems-ui</code> in <code>pages.liquid</code> via inlcude (<code>{% include '/seems-ui' %}</code>)</li>
</ul>
