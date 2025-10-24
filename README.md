<h1>SEEMS</h1>
<p>This is a simple page builder tool designed to help you create custom pages within an older, limited CMS user interface.</p>
<p>Developed by Doyle See / <a href="https://doylesee.com">doylesee.com</a>.</p>
<br />

<h2>1. Pre-requisites</h2>
<p>Reference jQuery and Quill on to your page.</p>
<ul>
	<li><a href="https://jquery.com/download/" target="_blank">jQuery</a></li>
	<li><a href="https://quilljs.com/docs/installation" target="_blank">Quill</a></li>
</ul>
<pre><code>&lt;script src="js/jquery.js"&gt;&lt;/script&gt;</code></pre>
<pre><code>&lt;link href="css/quill.snow.css" rel="stylesheet"&gt;&lt;/script&gt;
&lt;script src="js/quill.js"&gt;&lt;/script&gt;</code></pre>

<br />
<!-- ***** -->

<h2>2. SEEMS Reference</h2>
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

<br />
<!-- ***** -->

<h2>3. Build your HTML Layouts via JS</h2>
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

<p>Ensure this JS is declared before <code>seems.js</code>. Ideally, this is how it would look like:</p>

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

<br />
<!-- ***** -->

<h2>4. SEEMS UI</h2>
<p>
	Include the <a href="https://github.com/doylesee/seems/blob/main/seems-ui.html" target="_blank">SEEMS UI</a> code into your intended Page Builder page.<br />
	Update the select options with values from the <code>layouts</code> variable in your JS.
</p>
