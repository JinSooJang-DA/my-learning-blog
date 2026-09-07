// Array containing photo file paths and accurate descriptive alt texts
const photoData = [
  { 
    path: "./images/Afternoon_Drift.webp", 
    alt: "Pink doughnut tube floating in a pool with a cat relaxing under sunset sky" 
  },
  { 
    path: "./images/Cedric.webp", 
    alt: "Cedric in a green velvet jacket playing red electric guitar and singing into a microphone on stage" 
  },
  { 
    path: "./images/Sascha.webp", 
    alt: "Sascha in a green velvet jacket and purple trousers singing into a vintage stand microphone" 
  },
  { 
    path: "./images/Dante.webp", 
    alt: "Dante in a green suit playing dark electric guitar on stage under spotlight" 
  },
  { 
    path: "./images/Devon.webp", 
    alt: "Devon in a blue jacket playing trumpet under spotlight" 
  },
  { 
    path: "./images/Maya.webp", 
    alt: "Maya in a green velvet jacket singing into a golden microphone under spotlight" 
  },
  { 
    path: "./images/Malik.webp", 
    alt: "Malik in a purple jacket playing white grand piano on glowing stage" 
  },
  { 
    path: "./images/Marcus.webp", 
    alt: "Marcus in a green velvet jacket singing passionately into a vintage stand microphone" 
  },
  { 
    path: "./images/Otis.webp", 
    alt: "Otis in a burgundy suit singing into a vintage microphone under spotlight" 
  },
  { 
    path: "./images/Raven.webp", 
    alt: "Raven in a green suit playing red bass guitar in front of neon light background" 
  },
  { 
    path: "./images/Trey.webp", 
    alt: "Trey in a burgundy jacket playing a drum set with CITYCAT logo" 
  },
  { 
    path: "./images/Citycat.webp", 
    alt: "Cat producer Cian wearing headphones and sunglasses operating audio mixing console in studio" 
  }
];

// Stores current active photo index in modal
let currentPhotoIndex = 0;

// ==========================================
// Keyboard Navigation & Accessibility Helpers
// ==========================================

/**
 * Opens photo via Enter or Space key for keyboard accessibility.
 * @param {KeyboardEvent} event 
 * @param {number} index 
 */
function handleKeyOpen(event, index) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openPhoto(index);
  }
}

/**
 * Handles keyboard accessibility (Esc to close, Arrow keys to navigate, Tab focus trap).
 * @param {KeyboardEvent} event - The keyboard event object.
 */
function handleKeyDown(event) {
  const overlayElement = document.getElementById('overlay');
  
  if (overlayElement.classList.contains('d-none')) return;

  if (event.key === 'Escape') {
    closePhoto();
    return;
  } 

  if (event.key === 'ArrowRight') {
    nextPhoto();
    return;
  } 

  if (event.key === 'ArrowLeft') {
    prevPhoto();
    return;
  }

  if (event.key === 'Tab') {
    const focusableElements = overlayElement.querySelectorAll('button, [tabindex="0"]');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) { 
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else { 
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
}

// Register global keyboard event listener
window.addEventListener('keydown', handleKeyDown);

// ==========================================
// Gallery & Modal Functions
// ==========================================

/**
 * Returns HTML string template for a single thumbnail.
 * @param {number} i - Index of the photo.
 * @returns {string} HTML string.
 */
function getPhotoTemplate(i) {
  return `<img src="${photoData[i].path}" 
               alt="${photoData[i].alt}" 
               tabindex="0" 
               onclick="openPhoto(${i})" 
               onkeydown="handleKeyOpen(event, ${i})">`;
}

/**
 * Renders all photo thumbnails into the gallery container.
 */
function showPhoto() {
  const galleryRef = document.getElementById('gallery-root');
  galleryRef.innerHTML = ""; 

  for (let i = 0; i < photoData.length; i++) {
    galleryRef.innerHTML += getPhotoTemplate(i);
  }
}

/**
 * Opens photo modal at specific index and disables background scrolling via CSS class.
 * @param {number} index - Selected photo index.
 */
function openPhoto(index) {
  currentPhotoIndex = index;

  const overlayElement = document.getElementById('overlay');
  overlayElement.classList.remove('d-none');
  
  // Refactored: Uses CSS class instead of direct JS inline styles
  document.body.classList.add('no-scroll');
  
  updateModal();

  const closeBtn = overlayElement.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.focus();
  }
}

/**
 * Closes the photo modal overlay and restores background scrolling.
 */
function closePhoto() {
  const overlayElement = document.getElementById('overlay');
  overlayElement.classList.add('d-none');
  
  // Refactored: Removes CSS class to restore scrolling
  document.body.classList.remove('no-scroll');
}

/**
 * Navigates to the next photo in modal.
 */
function nextPhoto() {
  if (currentPhotoIndex === photoData.length - 1) {
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
  if (currentPhotoIndex === 0) {
    currentPhotoIndex = photoData.length - 1;
  } else {
    currentPhotoIndex = currentPhotoIndex - 1;
  }
  updateModal();
}

/**
 * Updates image source, alt text, filename, and photo counter in modal.
 */
function updateModal() {
  const imgElement = document.getElementById('overlay-img');
  imgElement.src = photoData[currentPhotoIndex].path;
  imgElement.alt = photoData[currentPhotoIndex].alt;

  const imageFileName = photoData[currentPhotoIndex].path.split('/').pop().split('.')[0];
  document.querySelector('#modal-filename').textContent = imageFileName;

  document.querySelector('#photo-counter').textContent =
    (currentPhotoIndex + 1) + ' / ' + photoData.length;
}

// Initial rendering call
showPhoto();