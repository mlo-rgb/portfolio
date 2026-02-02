// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
let scrollTimeout;
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    
    // Clear timeout if exists
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    // Use timeout for performance
    scrollTimeout = setTimeout(() => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 10);
});

// Improved Typing effect for hero title
const typingText = document.querySelector('.typing-text');
const typingCursor = document.querySelector('.typing-cursor');
const texts = ['Graphic Designer', 'Web Designer', 'Motion Designer', 'Brand Strategist'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeEffect() {
    if (isPaused) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isPaused = true;
        setTimeout(() => {
            isPaused = false;
            isDeleting = true;
            setTimeout(typeEffect, 100);
        }, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', function() {
    // Start typing effect
    setTimeout(typeEffect, 1000);
    
    // Initialize fancybox galleries
    initializeGalleries();
    
    // Setup gallery view buttons
    setupGalleryViewButtons();
    
    // Setup portfolio filtering
    setupPortfolioFiltering();
    
    // Setup contact form
    setupContactForm();
    
    // Setup lazy loading for images
    setupLazyLoading();
    
    // Update copyright year
    updateCopyrightYear();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Preload critical images
    preloadCriticalImages();
});

// Initialize fancybox galleries
function initializeGalleries() {
    // Initialize Fancybox globally
    $('[data-fancybox]').fancybox({
        buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "download",
            "thumbs",
            "close"
        ],
        animationEffect: "zoom",
        transitionEffect: "slide",
        loop: true,
        protect: true,
        hash: false,
        backFocus: false,
        afterShow: function(instance, slide) {
            // Add custom styling to captions
            const caption = slide.$caption;
            if (caption) {
                caption.css({
                    'background': 'rgba(255, 107, 53, 0.9)',
                    'color': 'white',
                    'padding': '15px 20px',
                    'border-radius': '8px',
                    'font-size': '16px',
                    'text-align': 'center',
                    'max-width': '80%',
                    'margin': '0 auto',
                    'font-weight': '500'
                });
            }
        }
    });
}

// Setup gallery view buttons
function setupGalleryViewButtons() {
    document.querySelectorAll('.view-gallery-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const galleryId = this.getAttribute('data-gallery');
            const gallerySelector = `[data-fancybox="${galleryId}"]`;
            const galleryElements = document.querySelectorAll(gallerySelector);
            
            if (galleryElements.length > 0) {
                // Find the first visible gallery element and click it
                let firstVisible = null;
                galleryElements.forEach(el => {
                    if (getComputedStyle(el).display !== 'none') {
                        firstVisible = el;
                    }
                });
                
                if (firstVisible) {
                    firstVisible.click();
                } else if (galleryElements[0]) {
                    galleryElements[0].click();
                }
            }
        });
    });
}

// Setup portfolio filtering
function setupPortfolioFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // In a real implementation, you would send this data to a server
            // For now, we'll show an alert and reset the form
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been received. I'll contact you at ${email} soon.`);
                
                // Reset form
                contactForm.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Setup lazy loading
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach((img) => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach((img) => {
            img.classList.add('loaded');
        });
    }
}

// Update copyright year
function updateCopyrightYear() {
    const yearSpan = document.querySelector('.copyright p:first-child');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate skill bars
                if (entry.target.classList.contains('about')) {
                    animateSkillBars();
                }
                
                // Animate portfolio items
                if (entry.target.id === 'portfolio') {
                    const portfolioItems = document.querySelectorAll('.portfolio-item');
                    portfolioItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        'SKYZ ART.jpg',
        'MOOD BOARD.webp',
        'SKETCHES FINAL.webp',
        'THIRD PROCESS.webp'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Add loading state for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    // Set initial state
    if (img.complete) {
        img.classList.add('loaded');
    }
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
        // Update any layout-dependent calculations here
    }, 250);
});

// Performance optimization: Prefetch links on hover
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#') {
            // Prefetch the target section
            const target = document.querySelector(href);
            if (target) {
                // Force style calculation to pre-render
                target.offsetHeight;
            }
        }
    });
});

// Fast click handling for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// Helper function to ensure all images in gallery work
function ensureGalleryImages() {
    // Find all hidden gallery links and make sure they're properly set up
    document.querySelectorAll('[data-fancybox]').forEach(link => {
        // Make sure all gallery images have proper data attributes
        if (!link.getAttribute('data-fancybox')) {
            const galleryId = link.closest('.portfolio-gallery') ? 
                link.closest('.portfolio-gallery').querySelector('[data-fancybox]').getAttribute('data-fancybox') : 
                'default-gallery';
            link.setAttribute('data-fancybox', galleryId);
        }
    });
}

// Call this function after page loads
setTimeout(ensureGalleryImages, 1000);