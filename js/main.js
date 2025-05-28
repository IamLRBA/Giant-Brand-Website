document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle with ARIA attributes
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (hamburgerBtn && mainNav) {
        // Update hamburger button ARIA attributes
        hamburgerBtn.addEventListener('click', function() {
            const isExpanded = this.classList.toggle('active');
            mainNav.classList.toggle('active');
            this.setAttribute('aria-expanded', isExpanded);
            
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerBtn.classList.remove('active');
                mainNav.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
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
    
    // Current year in footer
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        }
    });

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});