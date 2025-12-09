// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80; // Navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

// Modal functions
function openTributeForm() {
    document.getElementById('tributeModal').style.display = 'block';
}

function closeTributeForm() {
    document.getElementById('tributeModal').style.display = 'none';
}

function openRegistrationForm() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeRegistrationForm() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function openPartnerForm() {
    // This can be linked to a real form or CRM
    alert('Thank you for your interest in partnering! Please contact us at partnerships@example.com');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const tributeModal = document.getElementById('tributeModal');
    const registrationModal = document.getElementById('registrationModal');
    
    if (event.target === tributeModal) {
        tributeModal.style.display = 'none';
    }
    
    if (event.target === registrationModal) {
        closeRegistrationForm();
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });

        lastScroll = currentScroll;
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

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
            
            // Validate interests checkboxes
            const interests = document.querySelectorAll('input[name="interests"]:checked');
            if (interests.length === 0) {
                alert('Please select at least one interest.');
                return;
            }
            
            // Collect interests into a comma-separated string
            const interestsArray = Array.from(interests).map(cb => cb.value);
            const interestsValue = interestsArray.join(', ');
            
            // Remove all checkbox inputs temporarily to avoid duplicate submission
            const checkboxes = document.querySelectorAll('input[name="interests"][type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.disabled = true;
            });
            
            // Create a hidden input for interests
            let interestsInput = document.querySelector('input[name="interests"][type="hidden"]');
            if (interestsInput) {
                interestsInput.remove();
            }
            
            interestsInput = document.createElement('input');
            interestsInput.type = 'hidden';
            interestsInput.name = 'interests';
            interestsInput.value = interestsValue;
            registrationForm.appendChild(interestsInput);
            
            // Show loading state
            const submitButton = registrationForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Submit form to Formspree
            const formData = new FormData(registrationForm);
            
            fetch('https://formspree.io/f/mwpgnjaj', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you for your registration! We will be in touch soon.');
                    registrationForm.reset();
                    closeRegistrationForm();
                } else {
                    return response.json().then(data => {
                        if (data.errors) {
                            alert('There was an error submitting the form. Please try again.');
                        } else {
                            alert('Thank you for your registration!');
                            registrationForm.reset();
                            closeRegistrationForm();
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again later.');
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                // Re-enable checkboxes
                checkboxes.forEach(cb => {
                    cb.disabled = false;
                });
            });
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
        closeRegistrationForm();
    }
});
