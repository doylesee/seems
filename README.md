<h2>Pre-requisites</h2>
<ul>
	<li><a href="https://jquery.com/download/" target="_blank">jQuery</a></li>
	<li><a href="https://quilljs.com/docs/installation" target="_blank">Quill</a></li>
</ul>
<pre><code>&lt;script src="js/jquery.js"&gt;&lt;/script&gt;</code></pre>
<pre><code>&lt;link href="css/quill.snow.css"  rel="stylesheet"&gt;&lt;/script&gt;
&lt;script src="js/quill.js"&gt;&lt;/script&gt;</code></pre>

<h2>SEEMS</h2>
<p>Reference the SEEMS <a href="https://github.com/doylesee/seems/blob/main/css/seems.css" target="_blank">CSS</a> and <a href="https://github.com/doylesee/seems/blob/main/js/seems.js" target="_blank">JS</a> on to your page.</p>
<p>Ensure this is added after the jQuery and Quill references.</p>
<pre><code>&lt;link href="css/seems.css"  rel="stylesheet"&gt;&lt;/script&gt;
&lt;script src="js/seems.js"&gt;&lt;/script&gt;</code></pre>

<h2>Build your HTML + JS for your Layouts</h2>
<p>Ensure that the following classes are referenced in the HTML code:</p>
<ul>
	<li><strong>seems-page-section</strong>: the element wrapping the entire layout</li>
	<li><strong>seems-item-container</strong>: the element wrapping the entire list of featured items</li>
	<li><strong>seems-page-item</strong>: the element wrapping a featured item</li>
</ul>
<ul>
	<li><strong>seems-url-container</strong>: the element with the link - usually an <code>&lt;A /&gt;</code> tag.</li>
	<li><strong>seems-image-container</strong>: the element for the image</li>
	<li><strong>seems-copy-container</strong>: the element wrapping the copy</li>
</ul>

<p>Ideally, this is how your JS would look like:</p>
<p>Ensure this JS is declared before seems.js</p>
<pre><code>
const LAYOUT_2-COLUMN_MEDIA_LEFT = `
<section class="seems-page-section">
	<img src="/img/sample-image.jpg" alt="" class="seems-image-container" />
	<div class="seems-copy-container">
		<p>In skateparka et vert, the grinda is afoot. Manuals and nosegrinds, ollies and kickflips—each trick is a lexicon of the concrete. From the smooth transition of a bowl to the rough edge of a curb, the shredder carves their own story. The distant clatter of urethane on coping echoes through the park, a symphony of defiance and control. Heelflips and shuvits become the punctuation marks of a line, a fluid sentence written in motion. The griptape, coarse as a memory, holds fast to the board, a silent promise of connection between rider and wood. The pursuit is not of perfection, but of progression, the constant push against the limits of gravity and fear.</p>
	</div>
</section>`;
const LAYOUT_CONTENT_WITH_BACKGROUND = `
<section class="seems-page-section">
    <div class="seems-image-container" style="background-image: url('../img/sample-image.jpg');">
        <div class="seems-copy-container">
            <p>In skateparka et vert, the grinda is afoot. Manuals and nosegrinds, ollies and kickflips—each trick is a lexicon of the concrete. From the smooth transition of a bowl to the rough edge of a curb, the shredder carves their own story. The distant clatter of urethane on coping echoes through the park, a symphony of defiance and control. Heelflips and shuvits become the punctuation marks of a line, a fluid sentence written in motion. The griptape, coarse as a memory, holds fast to the board, a silent promise of connection between rider and wood. The pursuit is not of perfection, but of progression, the constant push against the limits of gravity and fear.</p>
        </div>
    </div>
</section>`;
</code></pre>

<h3>For RM-users</h3>
<p>If using RM, the cleanest way to do this is to:</p>
<ul>
	<li>
		Build a Content Block for each layout
		<pre><code>/layout-content-with-background</code></pre>
		<pre><code>/layout-2-column-media-left</code></pre>
	</li>
	<li>
		Build the <code>/seems-layout-list</code> Content Block that lists all of these layouts and its attributes following this format, and separated by a semi-colon:
		<pre><code>Layout Content Block Name,Layout Label,Layout Item Content Block Name,Layout Item Column Number</code></pre>
		eg.:
		<pre><code>layout-content-with-background,Content with Background,,;layout-2-column-media-left,2-Column Media Left,,;layout-3-column-cta,3-Column CTA,layout-3-column-cta-items,3</code></pre>
	</li>
</ul>


<p>Here's an example of these Layouts being referenced elsewhere.</p>
<p>
	In this example, we are using Content Blocks - one Content Block for each Layout.<br />
	These Content Blocks can be referenced in the code using Liquid Include, ie.: <code>{% include '/layout-content-with-background' %}</code>
</p>
<p>
	And another Content Block to list all of these Layouts and its attributes.<br />
</p>

<h2>SEEMS UI</h2>
<p>Include the <a href="https://github.com/doylesee/seems/blob/main/seems-ui.liquid" target="_blank">SEEMS UI</a> code into your intended Page Builder page.</p>

<h3>For RM-specific users</h3>
<p>Create a <code>/seems-ui</code> Content Block and reference this in the <code>pages.liquid</code> via inlcude (<code>{% include '/seems-ui' %}</code>).</p>

<ul style="color: #fff;">
	<li>Create Content Blocks for Layouts</li>
	<li><strong>content-blocks</strong> .seems-page-section</li>
	<li><strong>content-blocks</strong> .seems-page-item</li>
	<li><strong>content-blocks</strong> .seems-item-container</li>
	<li><strong>content-blocks</strong> .seems-url-container</li>
	<li><strong>content-blocks</strong> .seems-image-container</li>
	<li><strong>content-blocks</strong> .seems-copy-container</li>
	<li>/seems-layout-list</li>
	<li>/seems-ui</li>
	<li><strong>pages</strong> {% include '/seems-ui' %}</li>
</ul>
