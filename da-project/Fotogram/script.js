/**
 * Handles keyboard accessibility (Esc key to close modal).
 * @param {KeyboardEvent} event - The keyboard event object.
 */
function handleKeyDown(event) {
    if (event.key === 'Escape') {
        closePhoto();
    }
}

// Register global keyboard event listener
window.addEventListener('keydown', handleKeyDown);

// Array containing relative image file paths
let photoFiles = [
    "./images/pic01.webp",
    "./images/pic02.webp",
    "./images/pic03.webp",
    "./images/pic04.webp",
    "./images/pic05.webp",
    "./images/pic06.webp",
    "./images/pic07.webp",
    "./images/pic08.webp",
    "./images/pic09.webp",
    "./images/pic10.webp",
    "./images/pic11.webp",
    "./images/pic12.webp"
];

// Stores current active photo index in modal
let currentPhotoIndex = 0;

/**
 * Returns HTML string template for a single thumbnail.
 * @param {number} i - Index of the photo.
 * @returns {string} HTML string.
 */
function getPhotoTemplate(i) {
    return `<img src="${photoFiles[i]}" alt="Photo ${i + 1}" onclick="openPhoto(${i})">`;
}

/**
 * Renders all photo thumbnails into the gallery container.
 */
function showPhoto() {
    let galleryRef = document.getElementById('gallery-root');
    galleryRef.innerHTML = ""; // Clear existing content

    for (let i = 0; i < photoFiles.length; i++) {
        galleryRef.innerHTML += getPhotoTemplate(i);
    }
}

showPhoto();
/**
 * Opens photo modal at specific index.
 * @param {number} index - Selected photo index.
 */

function openPhoto(index) {
    currentPhotoIndex = index;

    let overlayElement = document.getElementById('overlay');
    overlayElement.classList.remove('d-none');
    updateModal();
}

/**
 * Closes the photo modal overlay.
 */
function closePhoto() {
    let overlayElement = document.getElementById('overlay');
    overlayElement.classList.add('d-none');
}

/**
 * Navigates to the next photo in modal.
 */
function nextPhoto() {
    if (currentPhotoIndex == photoFiles.length - 1) {
        currentPhotoIndex = 0;
    }
    else {
        currentPhotoIndex = currentPhotoIndex + 1;
    }
    updateModal();
}

/**
 * Navigates to the previous photo in modal.
 */
function prevPhoto() {
    if (currentPhotoIndex == 0) {
        currentPhotoIndex = photoFiles.length - 1;
    }
    else {
        currentPhotoIndex = currentPhotoIndex - 1;
    }
    updateModal();
}

/**
 * Updates image source, filename, and photo counter in modal.
 */
function updateModal() {
    let imgElement = document.getElementById('overlay-img');
    imgElement.src = photoFiles[currentPhotoIndex];

    let imageFileName = photoFiles[currentPhotoIndex].split('/').pop();
    document.querySelector('#modal-filename').textContent = imageFileName;

    document.querySelector('#photo-counter').textContent =
        (currentPhotoIndex + 1) + ' / ' + photoFiles.length;

}

