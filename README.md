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
	Reference SEEMS on to your page.<br />
	Ensure this is added after the jQuery and Quill references.
</p>
<ul>
	<li><a href="https://github.com/doylesee/seems/blob/main/css/seems.css" target="_blank">seems.css</a></li>
	<li><a href="https://github.com/doylesee/seems/blob/main/js/seems.js" target="_blank">seems.js</a></li>
</ul>
<pre><code>&lt;link href="css/seems.css" rel="stylesheet"&gt;&lt;/script&gt;
&lt;script src="js/seems.js"&gt;&lt;/script&gt;</code></pre>

<!-- ***** -->

<h2>Build your HTML Layouts via JS</h2>
<p>Ensure that the following classes are referenced in the HTML code:</p>
<p>Please ensure the following classes are correctly referenced in the HTML code:</p>
<ul>
	<li><code>seems-page-section</code>: for the element wrapping the entire layout</li>
	<li><code>seems-item-container</code>: for the element wrapping the entire list of featured items</li>
	<li><code>seems-page-item</code>: for the element wrapping a single featured item</li>
</ul>
<ul>
	<li><code>seems-url-container</code>: for the <code>&lt;A&gt;</code> element of the link</li>
	<li><code>seems-image-container</code>: for the image element</li>
	<li><code>seems-copy-container</code>: for the element wrapping the copy text</li>
</ul>

<p>
	Ensure this JS is declared before <code>seems.js</code><br />
	Ideally, this is how it would look like:
</p>

<pre><code>// Layout constants
const LAYOUT_3_COLUMN_CTA = `
&lt;section class="seems-page-section"&gt;
    &lt;div class="seems-copy-container"&gt;
        &lt;p&gt;In skateparka et vert, the grinda is afoot. Manuals and nosegrinds, ollies and kickflips—each trick is a lexicon of the concrete.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="seems-item-container"&gt;
    &lt;/div&gt;
&lt;/section&gt;`;
const LAYOUT_3_COLUMN_CTA_ITEMS = `
&lt;div class="seems-page-item"&gt;
    &lt;a href="#" class="seems-url-container"&gt;
        &lt;img src="/img/sample-image.jpg" alt="" class="seems-image-container" /&gt;
        &lt;div class="seems-copy-container"&gt;
            &lt;p&gt;In skateparka et vert, the grinda is afoot. Manuals and nosegrinds, ollies and kickflips—each trick is a lexicon of the concrete.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/a&gt;
&lt;/div&gt;`;
const LAYOUT_CONTENT_WITH_BACKGROUND = `
&lt;section class="seems-page-section"&gt;
    &lt;div class="seems-image-container" style="background-image: url('../img/sample-image.jpg');"&gt;
        &lt;div class="seems-copy-container"&gt;
            &lt;p&gt;In skateparka et vert, the grinda is afoot. Manuals and nosegrinds, ollies and kickflips—each trick is a lexicon of the concrete.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/section&gt;`;

// Create an object to map option values to the variables
const layouts = {
    'layout-3-column-cta': {
        component: LAYOUT_3_COLUMN_CTA,
        component_items: LAYOUT_3_COLUMN_CTA_ITEMS,
        component_items_count: 3
    },
    'layout-content-with-background': LAYOUT_CONTENT_WITH_BACKGROUND
};</code></pre>

<h3>For RM-specific users</h3>
<ul>
	<li>
		<strong>Build a Content Block for each layout</strong><br />
		<p>
			<code>/layout-content-with-background</code><br />
			<code>/layout-2-column-media-left</code>
		</p>
	</li>
	<li>
		<strong>Build the <code>/seems-layout-list</code> Content Block</strong><br />
		<p>This Content Blocks lists all of these layouts and its attributes following this format, <strong>separated by a semi-colon</strong>, and <strong>no semi-colon on the last item</strong>:</p>
		<p><code>Layout Content Block Name,Layout Label,Layout Item Content Block Name,Layout Item Column Number</code></p>
		<p>eg.:</p>
		<p><code>layout-3-column-cta,3-Column CTA,layout-3-column-cta-items,3;layout-content-with-background,Content with Background,,</code></p>
	</li>
	<li><strong>Add <a href="https://github.com/doylesee/seems/blob/main/js/theme.js" target="_blank">this code</a> to your <code>theme.js</code></strong></li>
</ul>

<!-- ***** -->

<h2>SEEMS UI</h2>
<p>Include the <a href="https://github.com/doylesee/seems/blob/main/content-blocks/seems-ui.html" target="_blank">SEEMS UI</a> code into your intended Page Builder page.</p>

<h3>For RM-specific users</h3>
<ul>
	<li>Input <a href="https://github.com/doylesee/seems/blob/main/content-blocks/seems-ui.liquid" target="_blank">seems-ui.liquid</a> code into a <code>/seems-ui</code> Content Block</li>
	<li>Reference <code>/seems-ui</code> in <code>pages.liquid</code> via inlcude - <code>{% include '/seems-ui' %}</code></li>
</ul>
