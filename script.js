// Theme Toggling
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


// Typing Effect for the hero title
const roles = ["Principal QA Automation Architect", "Enterprise CI/CD Expert", "AI & Cloud Automator", "Team Leader"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;
const typedElement = document.getElementById('typed-text');

function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typedElement.innerText = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40; 
    } else {
        typedElement.innerText = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
}
document.addEventListener("DOMContentLoaded", () => {
    if(typedElement) setTimeout(type, 800);
});


// Animated Years Counter
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            return;
        }
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
    }
    
    updateCounter();
}

// Trigger counter when it becomes visible
const counterElement = document.getElementById('years-counter');
if (counterElement) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(counterElement, 15, 1500);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(counterElement.closest('.experience-counter'));
}


// Skill Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const skills = document.querySelectorAll('.skill-tag');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.getAttribute('data-filter');

        skills.forEach(skill => {
            if (filterVal === 'all' || skill.getAttribute('data-category') === filterVal) {
                skill.classList.remove('hide');
                skill.style.position = 'relative'; 
            } else {
                skill.classList.add('hide');
                setTimeout(() => {
                    if(skill.classList.contains('hide')) skill.style.position = 'absolute';
                }, 300);
            }
        });
    });
});


// Accordion Logic for Experience Section
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const body = header.parentElement.querySelector('.accordion-body');
        const icon = header.querySelector('.accordion-toggle i');
        
        if (body.classList.contains('active')) {
            body.classList.remove('active');
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        } else {
            // Close all others optionally
            /*
            document.querySelectorAll('.accordion-body.active').forEach(aBody => {
                aBody.classList.remove('active');
                aBody.parentElement.querySelector('.accordion-toggle i').classList.replace('fa-minus', 'fa-plus');
            });
            */
            body.classList.add('active');
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        }
    });
});


// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item:not([data-tilt])').forEach(item => {
    // only doing this to non tilt elements to avoid clash
    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});


// Philosophy cards stagger animation
const philosophyCards = document.querySelectorAll('.philosophy-card');
const philosophyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            philosophyObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

philosophyCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    philosophyObserver.observe(card);
});
