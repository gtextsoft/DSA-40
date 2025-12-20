document.addEventListener('DOMContentLoaded', () => {
    // Set target date for the countdown
    const targetDate = new Date('January 28, 2026 16:00:00').getTime();

    // Update the countdown every second
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const countdownTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                clearInterval(countdownTimer);
                countdownElement.innerHTML = "<h3>The Celebration Has Begun!</h3>";
            }
        }, 1000);
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Dynamic Balloon Generation
    const balloonContainer = document.querySelector('.balloons-container');
    if (balloonContainer) {
        // Clear existing static balloons if any
        balloonContainer.innerHTML = '';
        for (let i = 0; i < 15; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = `${Math.random() * 100}%`;
            balloon.style.animationDuration = `${10 + Math.random() * 10}s`;
            balloon.style.animationDelay = `${Math.random() * 5}s`;
            balloon.style.opacity = (0.2 + Math.random() * 0.3).toString();
            balloon.style.backgroundColor = i % 2 === 0 ? 'var(--primary)' : 'var(--primary-light)';
            balloonContainer.appendChild(balloon);
        }
    }

    // Modal Global Handling
    window.openRegistrationForm = function () {
        const modal = document.getElementById('registrationModal');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeRegistrationForm = function () {
        const modal = document.getElementById('registrationModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    };

    window.openTributeForm = function () {
        alert("The tribute form is being prepared. Thank you for your patience!");
    };

    // Close modal on click outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('registrationModal');
        if (e.target === modal) {
            closeRegistrationForm();
        }
    });
});

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
