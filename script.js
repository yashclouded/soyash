// Cursor effect
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

// Scroll animations
const observerOptions = {
    threshold: 0.25,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initial animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate header and footer
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (header) header.classList.add('animate-in');
    if (footer) footer.classList.add('animate-in');
    
    // Set up scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Navbar shrink on scroll
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.padding = '0.6rem 0';
            nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.padding = '1rem 0';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Portfolio hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.portfolio-overlay').style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('.portfolio-overlay').style.transform = 'translateY(100%)';
        });
    });
    
    // Contact form submit event
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', (event) => {
    mousePosition.x = event.touches[0].clientX;
    mousePosition.y = event.touches[0].clientY;
});

document.addEventListener('touchmove', (event) => {
    mousePosition.x = event.touches[0].clientX;
    mousePosition.y = event.touches[0].clientY;
});