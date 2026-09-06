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
const photoFiles = [
  "./images/Afternoon_Drift.webp",
  "./images/Cedric.webp",
  "./images/Sascha.webp",
  "./images/Dante.webp",
  "./images/Devon.webp",
  "./images/Maya.webp",
  "./images/Malik.webp",
  "./images/Marcus.webp",
  "./images/Otis.webp",
  "./images/Raven.webp",
  "./images/Trey.webp",
  "./images/Citycat.webp"
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
  const galleryRef = document.getElementById('gallery-root');
  galleryRef.innerHTML = ""; // Clear existing content

  for (let i = 0; i < photoFiles.length; i++) {
    galleryRef.innerHTML += getPhotoTemplate(i);
  }
}

/**
 * Opens photo modal at specific index.
 * @param {number} index - Selected photo index.
 */
function openPhoto(index) {
  currentPhotoIndex = index;

  const overlayElement = document.getElementById('overlay');
  overlayElement.classList.remove('d-none');
  // hide scroll Bar, when the modalwindow opened
  document.body.style.overflow = 'hidden';
  updateModal();
}

/**
 * Closes the photo modal overlay.
 */
function closePhoto() {
  const overlayElement = document.getElementById('overlay');
  overlayElement.classList.add('d-none');
  // show scroll Bar, when the modalwindow closed
  document.body.style.overflow = '';
}

/**
 * Navigates to the next photo in modal.
 */
function nextPhoto() {
  if (currentPhotoIndex == photoFiles.length - 1) {
    currentPhotoIndex = 0;
  } else {
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
  } else {
    currentPhotoIndex = currentPhotoIndex - 1;
  }
  updateModal();
}

/**
 * Updates image source, filename, and photo counter in modal.
 */
function updateModal() {
  const imgElement = document.getElementById('overlay-img');
  imgElement.src = photoFiles[currentPhotoIndex];
  /* File Processing: Remove File Extension */
  const imageFileName = photoFiles[currentPhotoIndex].split('/').pop().split('.')[0];
  document.querySelector('#modal-filename').textContent = imageFileName;

  document.querySelector('#photo-counter').textContent =
    (currentPhotoIndex + 1) + ' / ' + photoFiles.length;
}

// Initial rendering call
showPhoto();