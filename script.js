let mousePosition = { x: 0, y: 0 };
let currentPosition = { x: 0, y: 0 };
const cursor = document.getElementById('cursor');
let animationFrameId;

// Track actual mouse position
document.addEventListener('mousemove', (event) => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
});

// Smooth animation function
function animateCursor() {
    // Calculate the distance between current position and target position
    const dx = mousePosition.x - currentPosition.x;
    const dy = mousePosition.y - currentPosition.y;
    
    // Update current position with smooth interpolation
    currentPosition.x += dx * 0.2; // Adjust this value to change smoothness
    currentPosition.y += dy * 0.2; // Lower = smoother but slower, higher = faster but less smooth
    
    // Apply the transform
    const x = currentPosition.x - 64; // Half of cursor width
    const y = currentPosition.y - 64; // Half of cursor height
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    
    // Continue the animation
    animationFrameId = requestAnimationFrame(animateCursor);
}

// Start the animation
animateCursor();

// Clean up on page hide/unload
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
    } else {
        animateCursor();
    }
});

// Smooth scrolling
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Initial animations
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (header) header.classList.add('animate-in');
    if (footer) footer.classList.add('animate-in');
});