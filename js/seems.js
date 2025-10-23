/* SEEMS v1.0 */
/* Developed by Doyle See / doylesee.com */

const SEEMS_IN_EDIT =`
<div class="seems-in-edit">
    <button class="seems-button seems-manage-button" data-action="move-up">
        <span class="up-down"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 16V4"/><path d="M4 10l6-6 6 6"/></svg></span>
        <span class="left-right"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 10H4"/><path d="M10 16L4 10 10 4"/></svg></span>
    </button>
    <button class="seems-button seems-manage-button" data-action="move-down">
        <span class="up-down"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4v12"/><path d="m16 10-6 6-6-6"/></svg></span>
        <span class="left-right"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h12"/><path d="m10 4 6 6-6 6"/></svg></span>
    </button>
    <button class="seems-button seems-manage-button" data-action="edit"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 3.5a1.41 1.41 0 0 1 2 2L6 14 3 15l1-3Z"/><path d="m10 6 4 4"/></svg></button>
    <button class="seems-button seems-manage-button" data-action="remove"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5 5 15"/><path d="m5 5 10 10"/></svg></button>
</div>`

var layoutHtmlInitial = '';

var selectedLayout = '';
var selectedLayoutComponent = '';
var currentModalLevel = 1;
var activeContent = 'section';

function captureLayout() {
    selectedLayout = $('.select-layout-js').val();
}
function captureComponent() {
    var layoutConfig = layouts[selectedLayout];
    if (typeof layoutConfig === 'object' && layoutConfig !== null && layoutConfig.component) {
        // If the checks pass, it's safe to assign the component.
        selectedLayoutComponent = layoutConfig.component_items;
    }
    else {
        selectedLayoutComponent = null; 
    }
}
function displaySection() {
    if (selectedLayout && layouts[selectedLayout]) {
        // Get the value associated with the selected layout
        var layoutValue = layouts[selectedLayout];
        let layoutComponent;

        // Check if the value is an object with a 'component' property
        if (typeof layoutValue === 'object' && layoutValue !== null && layoutValue.component) {
            // If it's an object, get the component from the property
            layoutComponent = layoutValue.component;

            // START: Handle Component Items
            const itemsCode = layoutValue.component_items;
            const itemsCount = layoutValue.component_items_count || 0; // Default to 0 if count is missing

            if (itemsCode && itemsCount > 0) {
                let allItemsHtml = '';
                // 1. Loop and generate the required number of component items
                for (let i = 0; i < itemsCount; i++) {
                    allItemsHtml += itemsCode;
                }
                
                // 2. Insert the generated HTML into the main component's placeholder.
                // We'll use a jQuery temporary element to safely manipulate the HTML string.
                const $tempEl = $('<div>').html(layoutComponent);
                
                // Find the container within the temporary element and add the items HTML
                $tempEl.find('.seems-item-container').html(allItemsHtml);
                
                // Get the final, updated HTML string
                layoutComponent = $tempEl.html(); 
            }
            // End logic
        } else {
            // Otherwise, the value itself is the component
            layoutComponent = layoutValue;
        }

        // Now, you can use layoutComponent which will always be the HTML string
        $('.seems-page-section').removeClass('active');
        layoutHtmlInitial = layoutComponent.replace('<section class="seems-page-section', '<section data-layout="'+selectedLayout+'" class="active seems-page-section');

        // Add new section HTML to page
        $('.seems-page').append(layoutHtmlInitial);
        $('.seems-page-section.active').prepend(SEEMS_IN_EDIT);
        $('.seems-page-section.active .seems-page-item').prepend(SEEMS_IN_EDIT);
    }
    else {
        /*alert("Please select a Layout.");*/
    }
}
function clearInputFields() {
    $('.seems-url-input').val('');
    $('.seems-url-input-target').val('');
    $('.seems-image-input').val('');
    $('.seems-image-input-alt').val('');
    $('.seems-copy-input').val('');
    sectionQuill.setContents([]);
}
function displayInputFields(activeElement) {
    $('.seems-url-input, .seems-image-input, .seems-image-input-alt').addClass('hide');
    const tempContentDiv = document.createElement('div');

    // Display item button
    switch (activeElement) {
        case 'section':
            tempContentDiv.innerHTML = layouts[selectedLayout];
            if (selectedLayoutComponent) {
                // The layout is an object and has a 'component' property
                $('.seems-item-input').removeClass('hide');
            }
            else {
                $('.seems-item-input').addClass('hide');
            }
        break;

        case 'item':
            $('.seems-item-input').addClass('hide');
            tempContentDiv.innerHTML = selectedLayoutComponent;
        break;
    }

    // Display URL field
    if (tempContentDiv.querySelector('a.seems-url-container')) {
        $('.seems-url-input').removeClass('hide');
    }

    // Display img fields
    if (tempContentDiv.querySelector('img.seems-image-container')) {
        $('.seems-image-input').removeClass('hide');
        $('.seems-image-input-alt').removeClass('hide');
    }
    else if (tempContentDiv.querySelector('.seems-image-container')) {
        $('.seems-image-input').removeClass('hide');
    }
}
function displayModal(layoutName,modalLevel) {
    if (layoutName != '') {
        $('.seems-modal').removeClass('active');
        $('.seems-modal--level-'+modalLevel).addClass('active');
    }
    currentModalLevel = modalLevel;
}

function pushSectionContent() {
    let $activeItem = null;
    let finalSelector = '';

    // Determine the active element
    if (activeContent === 'section') {
        $activeItem = $('.seems-page-section.active');
        // When editing the SECTION, we need the exclusion filter to ignore items.
        // We'll define the specific selector logic for section content here.
        
    } else if (activeContent === 'item') {
        $activeItem = $('.seems-page-item.active');
        // When editing an ITEM, we do NOT need the exclusion filter; 
        // we just target the element inside the item.
    }
    
    // Safety check: ensure we found an active element
    if (!$activeItem || $activeItem.length === 0) {
        return; 
    }

    // URL
    if (activeContent === 'section') {
        finalSelector = '.seems-url-container:not(.seems-item-container *)';
    } 
    else if (activeContent === 'item') {
        finalSelector = '.seems-url-container';
    }
    $activeItem.find(finalSelector).attr('href', $('.seems-url-input').val());

    // Image
    if (activeContent === 'section') {
        finalSelector = '.seems-image-container:not(.seems-item-container *)';
    } else if (activeContent === 'item') {
        finalSelector = '.seems-image-container';
    }
    // This handles both src/alt (for <img>) AND background-image (for <div>)
    const $imgContainer = $activeItem.find(finalSelector);
    if ($imgContainer.length > 0) {
        const imageUrl = $('.seems-image-input').val();
        const imageAlt = $('.seems-image-input-alt').val();
        
        // Check if the container is an <img> tag (to use src/alt)
        if ($imgContainer.is('img')) {
            $imgContainer.attr({ 'src': imageUrl, 'alt': imageAlt });
        } 
        // Otherwise, assume it's a div (to use background-image)
        else {
            $imgContainer.css({ 'background-image': 'url(' + imageUrl + ')' });
        }
    }
    
    // Copy
    if (activeContent === 'section') {
        // Use the :not() filter to find only the primary copy container
        finalSelector = '.seems-copy-container:not(.seems-item-container *)';
    } else if (activeContent === 'item') {
        // Simple selector for item copy
        finalSelector = '.seems-copy-container';
    }
    $activeItem.find(finalSelector).html(sectionQuill.root.innerHTML);
}
function addItems() {
    if (!$('.seems-item-input').hasClass('hide')) {
        const $input = $('.seems-item-input');
        // Get value and convert to integer
        const itemCount = parseInt($input.val()); 

        // Validate the input 
        if (isNaN(itemCount) || itemCount < 1) {
            console.error("Invalid number of items entered or SEEMS_IN_EDIT not defined.");
            return; 
        }

        let itemsHtml = '';

        // Loop and duplicate the HTML content
        for (let i = 0; i < itemCount; i++) {
            let $itemObject = $(selectedLayoutComponent); 
            $itemObject.prepend(SEEMS_IN_EDIT); 
            let singleItemHtml = $itemObject.prop('outerHTML');
            
            // 3. Append the complete item HTML to the itemsHtml string
            itemsHtml += singleItemHtml;
        }

        // Append the combined HTML content to the target container
        $('.seems-item-container').append(itemsHtml);
        
        // Optional: Clear the input field after successful addition
        $input.val('');
    }
}

function pushToClipboard() {
    // Push HTML content (with user's input) to textarea for copyying to clipboard
    /*$('.page-html-js').val($('.seems-page').html().replace(/\s+/g, ' ').trim());*/

    // Clone the HTML content to avoid modifying the live DOM
    let tempHtml = $('.seems-page').html();

    // Create a temporary jQuery object from the cloned HTML
    let $tempDiv = $('<div>').html(tempHtml);

    // Find and remove the div with the .seems-in-edit class from the temporary object
    $tempDiv.find('.seems-in-edit').remove();

    // Get the cleaned HTML, replace multiple spaces with a single space, and trim
    let cleanedHtml = $tempDiv.html().replace(/\s+/g, ' ').trim();

    // Set the value of the textarea
    $('.page-html-js').val(cleanedHtml);
}
function pushToInputFields() {
     // Image
    if ($('.active img.seems-image-container').length > 0) {
        $('.seems-image-input').val($('.active .seems-image-container').attr('src'));
        $('.seems-image-input-alt').val($('.active .seems-image-container').attr('alt'));
    }
    else if ($('.active .seems-image-container').length > 0) {
        let fullUrl = $('.active .seems-image-container').css('background-image');
        let imageUrl = fullUrl.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');

        $('.seems-image-input').val(imageUrl);
    }

    // Copy
    sectionQuill.clipboard.dangerouslyPasteHTML(0, $('.active').find('.seems-copy-container').html());
}

function setActive(thisObject) {
    $('.active').removeClass('active');

    if (thisObject != 0) {
        if (thisObject.parents().hasClass('seems-page-item')) {
            thisObject.parents('.seems-page-item').addClass('active');
            activeContent = 'item';
        }
        else {
            thisObject.parents('.seems-page-section').addClass('active');
            activeContent = 'section';
        }
    }
}
function removeActive(thisObject) {
    if (activeContent == 'section') {
        thisObject.parents('.seems-page-section').remove();
    }
    else {
        thisObject.parents('.seems-page-item').remove();
    }
}

function moveUp(buttonElement) {
    var moveElement = '.seems-page-section';
    if (activeContent == 'item') {
        moveElement = '.seems-page-item';
    }

    // Find the parent section of the clicked button
    const currentSection = buttonElement.closest(moveElement);
    
    // Find the section immediately before the current one
    const prevSection = currentSection.prev(moveElement);
    
    // Check if there is a previous section to move before
    if (prevSection.length) {
      // Move the current section before the previous one
      currentSection.insertBefore(prevSection);
    }
}
function moveDown(buttonElement) {
    var moveElement = '.seems-page-section';
    if (activeContent == 'item') {
        moveElement = '.seems-page-item';
    }

    // Find the parent section of the clicked button
    const currentSection = buttonElement.closest(moveElement);
    
    // Find the section immediately after the current one
    const nextSection = currentSection.next(moveElement);
    
    // Check if there is a next section to move before
    if (nextSection.length) {
      // Move the current section after the previous one
      currentSection.insertAfter(nextSection);
    }
}

function copyToClipboard() {
    var copiedText = $('.page-html-js')[0];

    /* Select the text area's content */
    copiedText.select();
    copiedText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text area */
    document.execCommand('copy');

    $('.copy-to-clipboard-button-js').text('Copied!');

    setTimeout(function(){
        $('.copy-to-clipboard-button-js').text('Copy to Clipboard');
    }, 3000);
}

$(document).ready(function() {
    // Prepend SEEMS logo
    $('#seems').prepend('<button class="seems-logo"><svg height=50px preserveAspectRatio=none version=1.1 viewBox="0 0 300 100" x=0px xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><defs><g id=Layer0_0_FILL><path d=" M 51.45 24.15 L 49.8 22.25 Q 48.55 23.65 47.35 25.05 40.65 21.1 29.2 24.4 14.95 29.85 12.7 44.4 11.5 54.05 23.8 51.8 L 31.35 49.85 Q 30.65 51.5 30 53.2 L 23.05 54.95 Q 12.25 56.9 10.55 51.4 5.15 61.7 13.95 64.8 17.25 65.7 25.75 63.4 23.25 68.9 20.95 70.25 19.5 67.1 16.55 67.7 9.7 69.75 11.05 75.35 12.55 78.05 17.85 76.55 23.2 75.25 29.45 62.35 32.45 61.4 35.95 60.15 48.05 56.65 45.95 64.8 50.15 61.55 51.05 55.4 51.25 47.8 40.3 50.55 L 33.65 52.25 Q 33.85 51.7 34.05 51.15 34.45 50.05 34.95 48.95 L 41.3 47.3 Q 53.45 44.75 54.05 53.4 53.55 59.3 44.95 71.8 19.3 69.9 6.45 93.5 23.1 79.2 41.55 84.4 46.9 75.05 56.05 61.1 65.15 47.1 59.45 40.3 55.1 35.55 40.05 39.65 L 39.65 39.75 Q 44.35 31.95 51.45 24.15 M 26.45 30 Q 35.3 27.75 40.2 34.25 37.95 37.4 36.05 40.7 L 26.95 43.05 Q 18.6 44.15 18.2 39.3 18.15 33.3 26.45 30 M 83.55 30.95 Q 83.3 27.05 85.25 24 74 28.65 73.75 37.15 L 73.75 39.15 Q 64.4 41.45 64.2 48.6 64.2 53.95 68.15 54.2 68.35 50.25 73.75 49 L 73.75 67.75 Q 83.25 62.15 83.55 55.6 L 83.55 30.95 M 90.45 11.5 Q 87.2 13.9 82.35 13.15 76.65 11 70.8 14.55 63.5 19.45 63.95 25.6 65.95 21.95 73.2 22.35 L 79.6 22.2 Q 86.95 21.15 90.45 11.5 M 114.35 11.6 L 112 10.4 111.4 11.6 Q 102.75 7.45 95.3 12.1 88.5 16.85 86.65 24.85 L 86.65 62 Q 77.3 66.2 69.9 76.65 89.1 65.75 106.95 72.15 L 113.8 61.45 111.2 60 110 61.45 Q 102.5 58.1 92.95 59.95 91.3 60.3 89.7 60.85 L 89.7 45.6 Q 95.8 39.85 102.3 45 L 101.35 46.55 103.25 47.75 111 34.8 109.05 33.65 108.05 35.35 Q 98.6 29.2 89.7 40.5 L 89.7 26.25 Q 90.7 20 98 19.25 103.95 18.9 106.05 21.75 L 105.35 23.1 107.7 24.35 114.35 11.6 M 135.45 24.25 Q 135.3 21.4 136.55 19.35 125.5 21.75 125.1 31.45 L 125.1 33.85 Q 116.75 34.5 115.35 40.15 114.5 45.2 119.15 47.95 120.35 43.65 125.15 44.25 L 125.15 62 Q 134.65 58.6 135.45 50.55 L 135.45 24.25 M 123.65 16.5 Q 128.65 17.4 132.8 16.9 140.4 15.6 142.5 7 138.3 9.55 132.3 7.85 126.1 6.1 121.25 8.8 115.4 12.15 114.7 19.45 117.9 15.25 123.65 16.5 M 166.25 9.95 L 164.3 8.8 163.5 10.2 Q 154.7 4.4 145.85 9.3 140.3 12.25 138.8 20 L 138.8 57.65 Q 128.35 60.15 121.6 70.3 142.05 61.8 159 70.3 L 165.5 59.9 163.15 58.4 162.15 59.9 Q 150.65 55.95 141.7 57.15 L 141.7 41.55 Q 147.85 36.25 153.95 42.95 L 153 44.45 155.2 45.85 163 32.7 160.95 31.35 159.95 33.05 Q 149.4 25.55 141.7 36.5 L 141.7 21.1 Q 142.6 15.85 150.1 15.9 155.2 16.2 158.15 19.45 L 157.5 20.55 159.6 21.75 166.25 9.95 M 234.5 18.45 Q 228.75 18.7 224.65 12.15 219.35 17.45 214.6 17.4 214.55 17.45 214.45 17.5 L 214.45 10.7 212 10.45 212 18.5 Q 207.1 19.2 202.5 9 L 180.75 19.6 Q 177 21.15 176.85 25.75 L 176.85 34.2 174.1 34.25 Q 168.05 34.95 168.6 40.25 169.15 45.5 173.45 46.25 173.5 42.45 176.85 43.7 L 176.85 53.4 Q 176.55 55.1 175.1 56 181.65 56.45 186.5 50.6 L 186.5 21.9 190.25 19.7 190.25 58.5 Q 187.85 62.6 183.45 60.6 179.3 58 174.95 58.3 166.25 59.15 165.8 69.05 170.15 64.55 178.6 69.05 185.95 72.75 191.05 65.25 192.75 62.5 193.5 57.45 L 193.5 43.65 Q 196.75 43.55 199.05 44.65 L 199.05 61.3 Q 195.25 63.2 193.65 67.25 199.2 64.25 204.7 69.95 L 207.1 72.55 217.7 65.85 216.3 63.7 214.45 65.15 214.45 45.8 Q 218.15 46.1 220.9 47.15 L 220.9 62.8 Q 221.1 73.35 229.95 76.25 L 236.65 68.2 234.95 66.5 234.15 67.35 Q 230.8 66.2 230.2 61.7 L 229.95 23.85 Q 233.65 22.15 234.5 18.45 M 208.2 22.1 Q 210.05 22.05 212 21.8 L 212 62.65 Q 210.3 61.85 208.2 61.35 L 208.2 22.1 M 214.45 21.35 Q 215.15 21.2 215.9 21 217.7 23.85 220.9 24.7 L 220.9 39.5 Q 218.05 38.2 214.45 38 L 214.45 21.35 M 193.5 17.8 L 193.95 17.55 Q 196.4 19.35 199.05 20.4 L 199.05 36.45 Q 196.75 35.75 193.5 35.65 L 193.5 17.8 M 261.65 21.5 Q 252.6 20.6 248.7 23.85 244.95 26.75 244.2 31.65 243.45 41.55 256.8 45.55 L 263.1 47.3 Q 262.45 48.9 261.8 50.4 L 259.7 49.9 Q 255.05 48.75 250.1 46.55 244.65 44 241.9 38.7 237.8 46.1 242.6 51.3 247.7 56.5 258.25 57.45 255.15 62.55 252.35 63.4 251.9 60.05 248.55 58.25 245.55 56.95 243.55 59 241.5 62.05 244.5 65.2 247.2 67.2 250.1 67.1 255.4 67.2 260.95 57.95 269.3 59.75 274.55 62.6 278.6 64.85 277.9 70.1 290.3 57.9 271.4 52.55 L 264.6 51 Q 265.4 49.55 266.25 48.15 L 274.55 50.45 Q 285.05 54.35 285.8 62.4 286.45 69.35 277.05 76.35 251.35 61.75 237.1 78.65 255.45 72.35 273.25 87.05 277.1 82 283.25 76.25 L 291.05 68.1 Q 296.1 60.6 291.05 51.9 286.2 44.3 270.95 41.6 276.1 35.5 283 31.5 L 281.4 29.55 Q 280.35 30.05 279.4 30.65 270.3 22.3 261.65 21.5 M 252.6 34.75 Q 248.45 31.2 250.4 27.15 252.6 23.45 259.4 24.95 268.25 28.35 271.85 35.95 269.3 38.2 267.2 40.9 257.2 38.75 252.6 34.75 Z"fill=#000000 stroke=none /></g></defs><g transform="matrix( 1, 0, 0, 1, 0,0) "><use xlink:href=#Layer0_0_FILL /></g></svg><span>V.1.1</span></button>');

    $(document).on('click', '.seems-logo', function(e){
        $('#seems').toggleClass('inactive');
    });

    // Add Section Content buttons!
    $(document).on('click', '.seems-manage-button', function() {
        switch ($(this).attr('data-action')) {
            // Render existing code
            case 'render-code':
                $('.seems-page').html($('.page-html-js').val());
                $('.seems-page .seems-page-section').each(function() {
                    $(this).prepend(SEEMS_IN_EDIT);
                    $(this).find('.seems-page-item').prepend(SEEMS_IN_EDIT);
                });
            break;

            // Copy to clipboard
            case 'copy-to-clipboard':
                copyToClipboard();
            break;

            // Go back one level up
            case 'back':
                levelUp = currentModalLevel - 1;
                displayModal('level-up',levelUp);
            break;

            // Add new Section
            case 'add-section':
                captureLayout();
                captureComponent();
                displaySection();
                pushToClipboard();

                clearInputFields();
                displayInputFields('section');
                displayModal(selectedLayout,2);
            break;

            // Save Section
            case 'save':
                pushSectionContent();
                addItems();
                pushToClipboard();
            break;

            // Remove Section
            case 'remove':
                setActive($(this));
                removeActive($(this));
                
                pushToClipboard();

                clearInputFields();
                displayModal('level-up',1);
            break;

            // Edit Section
            case 'edit':
                $('#seems').removeClass('inactive');
                setActive($(this));
                
                selectedLayout = $(this).parents('.seems-page-section').attr('data-layout');
                captureComponent();
                
                clearInputFields();
                displayInputFields(activeContent);
                pushToInputFields();
                displayModal(selectedLayout,2);
            break;

            // Move section up
            case 'move-up':
                setActive($(this));
                moveUp($(this));
                
                clearInputFields();
                displayModal('level-up',1);

                pushToClipboard();
            break;

            // Move section down
            case 'move-down':
                setActive($(this));
                moveDown($(this));
                
                clearInputFields();
                displayModal('level-up',1);

                pushToClipboard();
            break;

            // Add new Item
            case 'add-item':
                clearInputFields();
                displayInputFields('item');
                displayModal(selectedLayout,2);
            break;
        }
    })
});