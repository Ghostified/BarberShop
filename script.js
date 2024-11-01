// Utility Functions
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = select('.theme-toggle');
        this.initTheme();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
    }
}

// Navigation Management
class Navigation {
    constructor() {
        this.header = select('header');
        this.menuBtn = select('#menuBtn');
        this.sideNav = select('#sideNav');
        this.navLinks = selectAll('.nav-links a');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        this.menuBtn.addEventListener('click', () => this.toggleMenu());
        window.addEventListener('scroll', () => this.handleScroll());
        this.setupSmoothScroll();
    }

    toggleMenu() {
        this.sideNav.classList.toggle('active');
        this.menuBtn.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            this.header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > this.lastScroll && !this.header.classList.contains('scroll-down')) {
            this.header.classList.remove('scroll-up');
            this.header.classList.add('scroll-down');
        } else if (currentScroll < this.lastScroll && this.header.classList.contains('scroll-down')) {
            this.header.classList.remove('scroll-down');
            this.header.classList.add('scroll-up');
        }
        this.lastScroll = currentScroll;
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = select(targetId);
                targetSection.scrollIntoView({ behavior: 'smooth' });
                this.sideNav.classList.remove('active');
                this.menuBtn.classList.remove('active');
            });
        });
    }
}

// Booking System
class BookingSystem {
    constructor() {
        this.modal = select('#bookingModal');
        this.form = select('#quickBookForm');
        this.serviceSelect = select('#serviceSelect');
        this.timeSelect = select('#timeSelect');
        this.init();
    }

    init() {
        this.setupDateConstraints();
        this.setupServiceChange();
        this.setupFormSubmission();
    }

    setupDateConstraints() {
        const dateInput = this.form.querySelector('input[type="date"]');
        const today = new Date().toISOString().split('T')[0];
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        
        dateInput.min = today;
        dateInput.max = maxDate.toISOString().split('T')[0];
    }

    setupServiceChange() {
        this.serviceSelect.addEventListener('change', () => this.updateTimeSlots());
    }

    updateTimeSlots() {
        const service = this.serviceSelect.value;
        // In a real application, this would fetch available time slots from the server
        const timeSlots = this.getAvailableTimeSlots(service);
        this.populateTimeSlots(timeSlots);
    }

    getAvailableTimeSlots(service) {
        // Simulate API call - replace with actual API call in production
        return [
            '09:00', '10:00', '11:00', '12:00', '13:00', 
            '14:00', '15:00', '16:00', '17:00', '18:00'
        ];
    }

    populateTimeSlots(slots) {
        this.timeSelect.innerHTML = '<option value="">Select Time</option>';
        slots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot;
            option.textContent = slot;
            this.timeSelect.appendChild(option);
        });
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBookingSubmission();
        });
    }

    async handleBookingSubmission() {
        const formData = new FormData(this.form);
        const bookingData = Object.fromEntries(formData);

        try {
            // Simulate API call - replace with actual API call in production
            await this.submitBooking(bookingData);
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            this.showErrorMessage(error);
        }
    }

    async submitBooking(data) {
        // Simulate API call - replace with actual API endpoint
        return new Promise((resolve) => {
            setTimeout(() => resolve({ success: true }), 1000);
        });
    }

    showSuccessMessage() {
        // Implementation for success message
        alert('Booking submitted successfully!');
    }

    showErrorMessage(error) {
        // Implementation for error message
        alert('Error submitting booking. Please try again.');
    }
}

// Testimonial Slider
class TestimonialSlider {
    constructor() {
        this.slider = select('.testimonial-slider');
        this.track = select('.testimonial-track');
        this.prevBtn = select('.prev-btn');
        this.nextBtn = select('.next-btn');
        this.slideWidth = 0;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.calculateSlideWidth();
        this.setupControls();
        window.addEventListener('resize', () => this.calculateSlideWidth());
    }

    calculateSlideWidth() {
        const slide = select('.testimonial-card');
        this.slideWidth = slide.offsetWidth;
        this.updateSlidePosition();
    }

    setupControls() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    updateSlidePosition() {
        this.track.style.transform = `translateX(-${this.currentIndex * this.slideWidth}px)`;
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlidePosition();
        }
    }

    nextSlide() {
        const maxIndex = this.track.children.length - 1;
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateSlidePosition();
        }
    }
}

// Cookie Consent
class CookieConsent {
    constructor() {
        this.consentBar = select('#cookieConsent');
        this.init();
    }

    init() {
        if (!this.getCookie('cookieConsent')) {
            this.showConsentBar();
        }
    }

    showConsentBar() {
        this.consentBar.classList.add('active');
    }

    acceptCookies() {
        this.setCookie('cookieConsent', 'true', 365);
        this.consentBar.classList.remove('active');
    }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    getCookie(name) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return cookieValue;
            }
        }
        return null;
    }
}

// Back to Top Button
class BackToTop {
    constructor() {
        this.button = select('#backToTop');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.toggleVisibility());
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    toggleVisibility() {
        if (window.pageYOffset > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new Navigation();
    new BookingSystem();
    new TestimonialSlider();
    new CookieConsent();
    new BackToTop();

    // Initialize AOS (Animate on Scroll) if included
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
});