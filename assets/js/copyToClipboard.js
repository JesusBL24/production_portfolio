/**
 * Handles copying text content from a specific DOM element to the system clipboard.
 * Supports internationalization by fetching messages from switchLanguage.
 * * @param {string} elementId - The unique ID of the element containing the text to copy.
 * @param {Event} [event] - The click event object to prevent default anchor behavior.
 */
function copyToClipboard(elementId, event) {
    // Prevent default behavior if an event is provided
    if (event) {
        event.preventDefault();
    }

    // Retrieve content to copy
    const element = document.getElementById(elementId);
    if (!element) return;

    const textToCopy = element.textContent.trim();

    // Use the asynchronous Clipboard API
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Handle success: Detect language and fetch translation
        const currentLang = document.documentElement.lang || 'en';
        const message = translations[currentLang]['copy_success'];

        showFeedback(element, message);
    }).catch(err => {
        // Handle error (e.g., permission denied)
        const currentLang = document.documentElement.lang || 'en';
        const errorMessage = translations[currentLang]['copy_error'];
        showFeedback(element, errorMessage);
    });
}

/**
 * Creates and displays a temporary floating UI element to provide user feedback.
 * * @param {HTMLElement} targetElement - The element used as a reference point for the feedback.
 * @param {string} message - The text content to be displayed in the feedback bubble.
 */
function showFeedback(targetElement, message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;

    // Apply styles via CSS-in-JS (Ensure the parent has 'position: relative')
    feedback.style.cssText = `
        position: absolute;
        top: -30px; 
        left: 50%;
        transform: translateX(-50%);
        background: #dcd0fe; 
        color: black;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 1.5em;
        font-family: 'Roboto', sans-serif;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        z-index: 9999;
        pointer-events: none;
    `;

    // Append to the parent container (typically an <li>)
    targetElement.parentNode.appendChild(feedback);

    // Trigger transition
    setTimeout(() => {
        feedback.style.opacity = 1;
    }, 10);

    // Auto-remove the element after the animation
    setTimeout(() => {
        feedback.style.opacity = 0;
        feedback.addEventListener('transitionend', () => feedback.remove());
    }, 1500);
}