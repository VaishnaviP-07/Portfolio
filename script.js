// ============================================
// NAVIGATION & SCROLL HANDLING
// ============================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Update active nav link on scroll
function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll to sections
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update on scroll
window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to elements
const animatedElements = document.querySelectorAll(
    '.experience-card, .skill-card, .timeline-item, .stat-box, .achievement-box'
);

animatedElements.forEach(el => {
    el.classList.add('fade-in-on-scroll');
    observer.observe(el);
});

// ============================================
// BUTTON INTERACTIONS
// ============================================

// Hire Me button
const hireBtn = document.querySelector('.hire-btn');
hireBtn.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
});

// CTA buttons
const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
if (ctaButtons.length >= 2) {
    ctaButtons[0].addEventListener('click', () => {
        // Download Resume - In a real scenario, this would download a file
        alert('Download Resume feature coming soon!');
    });
    
    ctaButtons[1].addEventListener('click', () => {
        // View Portfolio
        const skillsSection = document.getElementById('skills');
        skillsSection?.scrollIntoView({ behavior: 'smooth' });
    });
}

// ============================================
// CONTACT LINKS
// ============================================

const contactLinks = document.querySelectorAll('.contact-link, .footer-link, .social-link');
const emailLink = document.querySelector('.contact-link[href^="mailto"]');

if (emailLink) {
    emailLink.addEventListener('click', e => {
        // Opens default email client
        const email = 'vaishnavi@example.com';
        window.location.href = `mailto:${email}?subject=Let's Work Together!`;
    });
}

// Handle other social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', e => {
        const title = link.getAttribute('title');
        if (title === 'LinkedIn') {
            window.open('https://linkedin.com', '_blank');
        } else if (title === 'GitHub') {
            window.open('https://github.com', '_blank');
        } else if (title === 'Dribbble') {
            window.open('https://dribbble.com', '_blank');
        }
    });
});

// ============================================
// SKILL BARS ANIMATION
// ============================================

const skillBars = document.querySelectorAll('.progress-fill');

const skillObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target;
            progressFill.style.width = progressFill.parentElement.parentElement.querySelector('.skill-level').textContent;
            skillObserver.unobserve(entry.target);
        }
    });
}, skillObserverOptions);

// Reset skill bars before animation
skillBars.forEach(bar => {
    bar.style.width = '0%';
    skillObserver.observe(bar);
});

// ============================================
// FLOATING ELEMENTS PARALLAX
// ============================================

const floatingCard = document.querySelector('.floating-card');
const floatingBadges = document.querySelectorAll('.floating-badge');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (floatingCard) {
        floatingCard.style.transform = `translateY(${scrollY * 0.05}px)`;
    }
    
    floatingBadges.forEach((badge, index) => {
        const offset = (index + 1) * 10;
        badge.style.transform = `translateY(${scrollY * 0.1 * offset}px)`;
    });
});

// ============================================
// CURSOR EFFECTS
// ============================================

// Create custom cursor elements
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
cursor.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: #fdbb3d;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    display: none;
    box-shadow: 0 0 10px rgba(253, 187, 61, 0.5);
`;
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.classList.add('cursor-follower');
cursorFollower.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #fdbb3d;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    display: none;
    opacity: 0.5;
`;
document.body.appendChild(cursorFollower);

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    cursor.style.display = 'block';
    
    // Smooth follower movement
    setTimeout(() => {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = (followerX - 10) + 'px';
        cursorFollower.style.top = (followerY - 10) + 'px';
        cursorFollower.style.display = 'block';
    }, 10);
});

document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
});

// Hide cursor when hovering over buttons/links
const interactiveElements = document.querySelectorAll('a, button');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.3';
        cursorFollower.style.borderColor = '#c68b00';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.borderColor = '#fdbb3d';
    });
});

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    // Animate hero content on load
    const heroLeft = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');
    
    if (heroLeft) {
        heroLeft.style.opacity = '0';
        heroLeft.style.transform = 'translateX(-30px)';
        heroLeft.style.animation = 'slideInUp 0.8s ease-out forwards';
        heroLeft.style.animationDelay = '0.2s';
    }
    
    if (heroRight) {
        heroRight.style.opacity = '0';
        heroRight.style.transform = 'translateX(30px)';
        heroRight.style.animation = 'slideInUp 0.8s ease-out forwards';
        heroRight.style.animationDelay = '0.4s';
    }
});

// ============================================
// SMOOTH SCROLL BEHAVIOR FOR ANCHORS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// RESPONSIVE NAVIGATION MENU
// ============================================

// Add mobile menu toggle if needed
const isMobile = window.innerWidth <= 768;
if (isMobile) {
    // Create mobile menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('mobile-menu-toggle');
    menuToggle.innerHTML = '☰';
    menuToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999;
        background: rgba(253, 187, 61, 0.2);
        border: 1px solid rgba(253, 187, 61, 0.3);
        color: #fdbb3d;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        font-size: 20px;
        cursor: pointer;
        display: none;
    `;
    
    document.body.appendChild(menuToggle);
}

// ============================================
// SCROLL TO TOP FUNCTIONALITY
// ============================================

// Create scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.classList.add('scroll-top-btn');
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 100;
    background: linear-gradient(135deg, #fdbb3d 0%, #c68b00 100%);
    color: #111;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    font-weight: bold;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    box-shadow: 0 10px 25px rgba(253, 187, 61, 0.3);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll-to-top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
        setTimeout(() => {
            scrollTopBtn.style.opacity = '1';
        }, 10);
    } else {
        scrollTopBtn.style.opacity = '0';
        setTimeout(() => {
            scrollTopBtn.style.display = 'none';
        }, 300);
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images if needed
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('loading');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// EVENT LOGGER (for debugging)
// ============================================

// Uncomment for debugging
// console.log('Portfolio script loaded successfully');
// console.log('Navigation links:', navLinks.length);
// console.log('Sections found:', sections.length);

// ============================================
// INITIALIZE ON DOM READY
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateActiveNavLink();
    });
} else {
    updateActiveNavLink();
}
