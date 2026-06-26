# SEEMS
This is a simple page builder tool designed to help you create custom pages within an older, limited CMS user interface.
<br />

## 1. Pre-requisites
Reference jQuery and Quill on to your page.
- <a href="https://jquery.com/download/" target="_blank">jQuery</a>
- <a href="https://quilljs.com/docs/installation" target="_blank">Quill</a>

```html
<script src="seems/js/jquery.js"></script>
```
```html
<link href="seems/css/quill.snow.css" rel="stylesheet" />
<script src="seems/js/quill.js"></script>
```

<br />

## 2. SEEMS Reference
Reference SEEMS on to your page. Ensure this is declared after jQuery and Quill.
- <a href="https://github.com/doylesee/seems/blob/main/css/seems.css" target="_blank">seems.css</a>
- <a href="https://github.com/doylesee/seems/blob/main/js/seems.min.js" target="_blank">seems.min.js</a>

```html
<link href="seems/css/seems.css" rel="stylesheet" />
<script src="seems/js/seems.js"></script>
```

<br />

## 3. Build your HTML Layouts via JS
Please ensure the following classes are correctly referenced in the HTML code:
| Class Name | Description |
| :--- | :--- |
| `seems-page-section` | for the element wrapping the entire layout |
| `seems-item-container` | for the element wrapping the entire list of featured items |
| `seems-page-item` | for the element wrapping a single featured item |
| `seems-url-container` | for the `<a>` element of the link |
| `seems-image-container` | for the image element |
| `seems-copy-container` | for the element wrapping the copy text |

Ensure these JS variable scripts are declared before `seems.js`. Ideally, this is how it would look like:

```javascript
// Layout constants
const LAYOUT_3_COLUMN_CTA = `
<section class="seems-page-section">
    <div class="seems-copy-container">
        <p>In skateparka et vert, the grinda is afoot. Manuals and nosegrinds, ollies and kickflips—each trick is a lexicon of the concrete.</p>
    </div>
    <div class="seems-item-container">
    </div>
</section>`;

const LAYOUT_3_COLUMN_CTA_ITEMS = `
<div class="seems-page-item">
    <a href="#" class="seems-url-container">
        <img src="/img/sample-image.jpg" alt="" class="seems-image-container" />
        <div class="seems-copy-container">
            <p>In skateparka et vert, the grinda is afoot. Manuals and nosegrinds, ollies and kickflips—each trick is a lexicon of the concrete.</p>
        </div>
    </a>
</div>`;

const LAYOUT_CONTENT_WITH_BACKGROUND = `
<section class="seems-page-section">
    <div class="seems-image-container" style="background-image: url('../img/sample-image.jpg');">
        <div class="seems-copy-container">
            <p>In skateparka et vert, the grinda is afoot. Manuals and nosegrinds, ollies and kickflips—each trick is a lexicon of the concrete.</p>
        </div>
    </div>
</section>`;

// Create an object to map option values to the variables
const layouts = {
    'layout-3-column-cta': {
        component: LAYOUT_3_COLUMN_CTA,
        component_items: LAYOUT_3_COLUMN_CTA_ITEMS,
        component_items_count: 3
    },
    'layout-content-with-background': LAYOUT_CONTENT_WITH_BACKGROUND
};
```

<br />

## 4. SEEMS UI
Include the <a href="https://github.com/doylesee/seems/blob/main/seems-ui.html" target="_blank">SEEMS UI</a> code into your intended Page Builder page.<br />
Update the select options with values from the <code>layouts</code> variable in your JS.
