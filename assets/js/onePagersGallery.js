/**
 * OnePageGallery Module
 * Handles an interactive image lightbox with zoom, pan, and keyboard navigation.
 * Uses the Panzoom library for touch and mouse interaction.
 */

let currentGallery = [];
let currentIndex = 0;
let pz;

/**
 * Initializes and displays the gallery overlay.
 * @param {string[]} imagesArray - Array of image URLs to display.
 */
function openGallery(imagesArray) {
    if (!imagesArray || imagesArray.length === 0) return;

    // State reset to avoid reference leaks
    currentGallery = [...imagesArray];
    currentIndex = 0;

    // Show overlay and disable body scrolling
    const overlay = document.getElementById('gallery-overlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Update UI components immediately
    updateGalleryImage();

    // Initialize interactive zoom with a slight delay to ensure DOM readiness
    setTimeout(initPanzoom, 50);
}

/**
 * Configures the Panzoom instance with specific constraints and behavior.
 */
function initPanzoom() {
    const elem = document.getElementById('gallery-img');
    if (pz) pz.dispose();

    pz = panzoom(elem, {
        maxZoom: 5,
        minZoom: 1,
        bounds: true,           // Prevents dragging the image outside the viewport
        boundsPadding: 0,


        initialZoom: 1,
        initialX: 0,
        initialY: 0,

        // Ensure UI buttons remain clickable within the panzoom container
        filterKey: function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.classList.contains('close-gallery')) {
                return true;
            }
        },
        beforeWheel: function(e) { return false; }
    });

    // Reset view for visual consistency
    setTimeout(() => {
        pz.moveTo(0, 0);
        pz.zoomAbs(0, 0, 1);
    }, 10);
}

/**
 * Global listener for Double Click interactions.
 * Toggles between reset view and smart zoom-in.
 */
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('gallery-overlay');
    const img = document.getElementById('gallery-img');

    if (overlay) {
        overlay.addEventListener('dblclick', (e) => {

            if (e.target.id === 'gallery-img' && pz) {
                e.preventDefault();
                e.stopPropagation();

                const transform = pz.getTransform();

                if (transform.scale > 1.05) {
                    pz.zoomAbs(0, 0, 1);
                    pz.moveTo(0, 0);
                    img.style.cursor = 'zoom-in';
                } else {
                    // Smooth zoom towards the cursor position
                    pz.smoothZoom(e.clientX, e.clientY, 2.5);
                    img.style.cursor = 'move';
                }
            }
        }, true);
    }
});

/**
 * Updates the image source and resets interaction state for the current slide.
 */
function updateGalleryImage() {
    const img = document.getElementById('gallery-img');
    const counter = document.getElementById('gallery-counter');

    img.src = currentGallery[currentIndex];

    // Synchronize the image counter (e.g., "1 / 5")
    if (counter) {
        counter.innerText = `${currentIndex + 1} / ${currentGallery.length}`;
    }

    if (pz) {
        // Prevent new images from inheriting the previous image's zoom level
        pz.zoomAbs(0, 0, 1);
        pz.moveTo(0, 0);
        img.style.cursor = 'zoom-in';
    }
}

/**
 * Navigates through the gallery.
 * @param {number} step - Direction of navigation (1 for next, -1 for previous).
 */
function changeImage(step) {
    currentIndex += step;
    if (currentIndex >= currentGallery.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentGallery.length - 1;
    updateGalleryImage();
}


/**
 * Closes the gallery, restores scrolling, and cleans up the Panzoom instance.
 */
function closeGallery() {
    document.getElementById('gallery-overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentIndex = 0; // Limpieza preventiva
    if (pz) {
        pz.dispose();
        pz = null;
    }
}

/**
 * Keyboard Accessibility: Escape to close, Arrows to navigate.
 */
document.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('gallery-overlay');
    if (overlay && overlay.style.display === 'flex') {
        if (e.key === "Escape") closeGallery();
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "ArrowLeft") changeImage(-1);
    }
});
