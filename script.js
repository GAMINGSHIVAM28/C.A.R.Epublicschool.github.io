// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-list a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = document.querySelector('.site-header').offsetHeight; // Get height of sticky header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close the mobile menu after clicking a link
            const navList = document.getElementById('main-menu');
            const menuToggle = document.querySelector('.menu-toggle');
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Mobile Navigation Toggle (Hamburger Menu)
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.getElementById('main-menu');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
        const expanded = navList.classList.contains('active') ? 'true' : 'false';
        menuToggle.setAttribute('aria-expanded', expanded);
    });

    // Highlight active navigation link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list .nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Adjust this to when you want the link to become active
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add 'active' class to the corresponding link
                const currentSectionId = entry.target.id;
                const activeLink = document.querySelector(`.nav-list a[href="#${currentSectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Special handling for the 'Home' link when at the very top of the page
    const heroSection = document.querySelector('.hero-section');
    const homeLink = document.querySelector('.nav-list a[href="index.html"]'); // Adjust if your home link is different

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (homeLink) {
                    homeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed for when "home" is active

    if (heroSection && homeLink) {
        heroObserver.observe(heroSection);
    }
});