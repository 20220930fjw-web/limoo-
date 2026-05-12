// ========== Common JavaScript for HUGO Portfolio ==========

// ========== Cursor Glow ==========
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ========== Navigation Scroll Effect ==========
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========== Mobile Menu ==========
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });
}

if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('open');
    }
}

// ========== Scroll Reveal ==========
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========== Utility Functions ==========

/**
 * Get URL parameter by name
 * @param {string} param - Parameter name
 * @returns {string|null} - Parameter value
 */
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector
 * @param {number} offset - Offset in pixels
 */
function smoothScrollTo(selector, offset = 80) {
    const target = document.querySelector(selector);
    if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

/**
 * Format date to Chinese format
 * @param {string|Date} date - Date string or object
 * @returns {string} - Formatted date
 */
function formatDate(date) {
    const d = new Date(date);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== Portfolio Filter ==========
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const catTitles = document.querySelectorAll('.portfolio-category-title');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Show/hide category titles
            catTitles.forEach(title => {
                const cat = title.dataset.catTitle;
                if (filter === 'all' || cat === filter) {
                    title.classList.remove('hidden');
                } else {
                    title.classList.add('hidden');
                }
            });

            // Filter cards
            portfolioCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}

// Initialize portfolio filter on DOM ready
document.addEventListener('DOMContentLoaded', initPortfolioFilter);

// ========== Active Nav Link ==========
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ========== Lazy Load Images ==========
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

document.addEventListener('DOMContentLoaded', initLazyLoad);

// ========== Smooth Scroll for Anchor Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            smoothScrollTo(href);
        }
    });
});

// ========== Console Welcome Message ==========
console.log('%c HUGO Portfolio ', 'background: linear-gradient(135deg, #e945a0, #8b5cf6); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
console.log('%c Designed by 冯江威 ', 'color: #9898b0; font-size: 14px;');
