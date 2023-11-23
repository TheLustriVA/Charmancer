// Create an object to store tags with textbox names as keys
let tagData = {};

// Get HTML elements
const tagInputs = document.querySelectorAll('.tag-input');
const exportButton = document.getElementById('export-button');
const jsonPreview = document.getElementById('json-preview');

// Function to add a tag
function addTag(tagInput, tagName) {
    const tagsDiv = tagInput.nextElementSibling;
    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.textContent = tagName;

    const removeButton = document.createElement('span');
    removeButton.classList.add('tag-remove');
    removeButton.innerHTML = '(x)';
    removeButton.addEventListener('click', () => {
        tagsDiv.removeChild(tag);
        const textboxId = tagInput.parentElement.id;
        tagData[textboxId] = tagData[textboxId].filter(t => t !== tagName);
        updateJSONPreview();
    });

    tag.appendChild(removeButton);
    tagsDiv.appendChild(tag);
    if (!tagData[tagInput.parentElement.id]) {
        tagData[tagInput.parentElement.id] = [];
    }
    tagData[tagInput.parentElement.id].push(tagName);
    tagInput.value = '';
    updateJSONPreview();
}

// Function to update the JSON preview
function updateJSONPreview() {
    const json = JSON.stringify(tagData, null, 2);
    jsonPreview.textContent = json;
}

// Event listener for the tag inputs
tagInputs.forEach(tagInput => {
    tagInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && tagInput.value.trim() !== '') {
            addTag(tagInput, tagInput.value.trim());
        }
    });
});

// Event listener for the pre-populated tags
const prePopulatedTags = document.querySelectorAll('.pre-tag');
prePopulatedTags.forEach(preTag => {
    preTag.addEventListener('click', () => {
        const tagInput = preTag.closest('.tag-box').querySelector('.tag-input');
        addTag(tagInput, preTag.textContent);
    });
});

// Event listener for the export button
exportButton.addEventListener('click', () => {
    // Replace this with your logic to export as JSON
    console.log(JSON.stringify(tagData, null, 2));
});