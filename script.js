// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Modal functions
function openTributeForm() {
    document.getElementById('tributeModal').style.display = 'block';
}

function closeTributeForm() {
    document.getElementById('tributeModal').style.display = 'none';
}

function openPartnerForm() {
    // This can be linked to a real form or CRM
    alert('Thank you for your interest in partnering! Please contact us at partnerships@example.com');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('tributeModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const tributeForm = document.getElementById('tributeForm');
    if (tributeForm) {
        tributeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your birthday tribute! Your message has been received.');
            closeTributeForm();
            tributeForm.reset();
        });
    }

    // Registration form handler
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(registrationForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send this to your backend/API
            // For now, we'll show a success message
            alert('🎉 Registration Successful!\n\nThank you for registering for the Birthday Celebration & Wealth Conference. You will receive a confirmation email shortly with event details.\n\nWe look forward to seeing you there!');
            
            // Reset form
            registrationForm.reset();
            
            // Scroll to top of registration section
            scrollToSection('register');
        });
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all cards and content sections
    document.querySelectorAll('.tribute-card, .timeline-item, .quote-card, .wish-card, .speaker-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Parallax effect for hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-background');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add sparkle effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            createSparkle(e.currentTarget);
        });
    });
});

function createSparkle(element) {
    const sparkle = document.createElement('span');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '5px';
    sparkle.style.height = '5px';
    sparkle.style.background = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    
    const rect = element.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 500);
}

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeTributeForm();
    }
});
