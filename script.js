// ============================================================
// Theme Toggle
// ============================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(currentTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
}

themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});

// ============================================================
// Mobile Nav Toggle
// ============================================================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ============================================================
// Obfuscated Email
// ============================================================
function setEmailLinks() {
    const user = 'aec.prakash';
    const domain = 'gmail.com';
    const addr = user + '@' + domain;
    const mailto = 'mailto:' + addr;

    const emailLink = document.getElementById('email-link');
    const footerEmail = document.getElementById('footer-email');

    if (emailLink) {
        emailLink.href = mailto;
        emailLink.title = addr;
    }
    if (footerEmail) {
        footerEmail.href = mailto;
        footerEmail.textContent = addr;
    }
}

document.addEventListener('DOMContentLoaded', setEmailLinks);

// ============================================================
// Animated Stat Counters
// ============================================================
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);

    function update() {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            return;
        }
        element.textContent = Math.floor(start);
        requestAnimationFrame(update);
    }

    update();
}

const statNumbers = document.querySelectorAll('.stat-number[data-target]');

if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                animateCounter(el, target, 1500);
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    statNumbers.forEach(el => statsObserver.observe(el));
}

// ============================================================
// Scroll Animations (Intersection Observer)
// ============================================================
const fadeElements = document.querySelectorAll('.fade-in-up');

if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));
}

// ============================================================
// Strength Cards Stagger Animation
// ============================================================
const strengthCards = document.querySelectorAll('.strength-card');

if (strengthCards.length > 0) {
    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    strengthCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardsObserver.observe(card);
    });
}

// ============================================================
// Timeline Items Animation
// ============================================================
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
    const tlObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                tlObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        tlObserver.observe(item);
    });
}

// ============================================================
// Active Nav Highlight on Scroll
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function highlightNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navAnchors.forEach(a => {
                a.style.color = '';
                a.style.background = '';
                if (a.getAttribute('href') === '#' + id) {
                    a.style.color = 'var(--accent-color)';
                    a.style.background = 'var(--accent-glow)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);
document.addEventListener('DOMContentLoaded', highlightNav);
