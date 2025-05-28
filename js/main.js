document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle with ARIA attributes
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (hamburgerBtn && mainNav) {
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
    
    // Updated setActivePage function
    function setActivePage() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        // Reset all active states first
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Determine current page
        if (currentPath.includes('services/')) {
            // For service pages
            const servicesLink = document.querySelector(`.nav-link[data-page="services"]`);
            if (servicesLink) servicesLink.classList.add('active');
        } else if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
            if (currentHash === '#services') {
                const servicesLink = document.querySelector(`.nav-link[data-page="services"]`);
                if (servicesLink) servicesLink.classList.add('active');
            } else {
                const homeLink = document.querySelector(`.nav-link[data-page="home"]`);
                if (homeLink) homeLink.classList.add('active');
            }
        } else if (currentPath.endsWith('about.html')) {
            const aboutLink = document.querySelector(`.nav-link[data-page="about"]`);
            if (aboutLink) aboutLink.classList.add('active');
        } else if (currentPath.endsWith('contact.html')) {
            const contactLink = document.querySelector(`.nav-link[data-page="contact"]`);
            if (contactLink) contactLink.classList.add('active');
        }
    }

    setActivePage();
    
    // Search functionality
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchForm && searchInput && searchResults) {
        const searchData = [
            { title: 'Home', url: 'index.html', keywords: 'home main page' },
            { title: 'Graphic Design', url: 'services/graphic-design.html', keywords: 'graphic design branding logo print' },
            { title: 'Animations', url: 'services/animations.html', keywords: 'animation cartoon motion graphics video' },
            { title: 'Indoor/Outdoor', url: 'services/indoor-outdoor.html', keywords: 'signage banners vehicle wraps' },
            { title: 'Video & Photography', url: 'services/video-photography.html', keywords: 'video photography filming photos' },
            { title: 'Web Development', url: 'services/web-development.html', keywords: 'website web design development ecommerce' },
            { title: 'About Us', url: 'about.html', keywords: 'about company team history' },
            { title: 'Contact', url: 'contact.html', keywords: 'contact email phone address location' }
        ];
        
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch();
        });
        
        searchInput.addEventListener('input', function() {
            if (this.value.length > 2) {
                performSearch();
            } else {
                searchResults.style.display = 'none';
            }
        });
        
        function performSearch() {
            const query = searchInput.value.toLowerCase();
            const results = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.keywords.toLowerCase().includes(query)
            );
            displayResults(results);
        }
        
        function displayResults(results) {
            if (results.length === 0) {
                searchResults.innerHTML = '<div class="no-results">No results found</div>';
                searchResults.style.display = 'block';
                return;
            }
            
            searchResults.innerHTML = results.map(result => 
                `<a href="${result.url}">${result.title}</a>`
            ).join('');
            
            searchResults.style.display = 'block';
        }
        
        document.addEventListener('click', function(e) {
            if (!searchForm.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
    
    function isOnHomePage() {
        const currentPath = window.location.pathname;
        return currentPath === '/' || 
               currentPath === '/index.html' || 
               currentPath.endsWith('/index.html') ||
               currentPath === '' ||
               (currentPath.split('/').pop() === '' && currentPath !== '/');
    }
    
    // Smooth scrolling for anchor links and Services navigation
    document.querySelectorAll('a[href^="#"], a[href*="#services"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').includes('#services')) {
                if (!isOnHomePage()) {
                    window.location.href = 'index.html#services';
                    return;
                }
                e.preventDefault();
                const servicesSection = document.querySelector('#services');
                if (servicesSection) {
                    window.scrollTo({
                        top: servicesSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    history.pushState(null, null, '#services');
                    setActivePage();
                }
                return;
            }
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                history.pushState(null, null, targetId);
                setActivePage();
            }
        });
    });
    
    // Add this to handle service page navigation
    document.querySelectorAll('[data-service]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the link work normally
            // The active state will be handled by setActivePage
        });
    });
    
    // Update active page when navigating from footer
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(setActivePage, 100);
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

// Handle back/forward navigation
window.addEventListener('popstate', function() {
    setActivePage();
    
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
});

// Create and add navigation arrows
function createNavigationArrows() {
    const arrowsContainer = document.createElement('div');
    arrowsContainer.className = 'navigation-arrows';
    
    // Back to top arrow (shown on all pages)
    const backToTop = document.createElement('div');
    backToTop.className = 'nav-arrow back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.title = 'Back to Top';
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Back arrow (shown on all pages except home)
    const backArrow = document.createElement('div');
    backArrow.className = 'nav-arrow back-arrow';
    backArrow.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backArrow.title = 'Go Back';
    backArrow.addEventListener('click', () => {
        window.history.back();
    });
    
    // Forward arrow (shown on all pages except home)
    const forwardArrow = document.createElement('div');
    forwardArrow.className = 'nav-arrow forward-arrow';
    forwardArrow.innerHTML = '<i class="fas fa-arrow-right"></i>';
    forwardArrow.title = 'Go Forward';
    forwardArrow.addEventListener('click', () => {
        window.history.forward();
    });
    
    arrowsContainer.appendChild(backToTop);
    
    // Only show back/forward arrows if not on home page
    if (!isOnHomePage()) {
        arrowsContainer.appendChild(backArrow);
        arrowsContainer.appendChild(forwardArrow);
    }
    
    document.body.appendChild(arrowsContainer);
    
    // Show/hide back to top arrow based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
}

// Helper function to check if on home page
function isOnHomePage() {
    const currentPath = window.location.pathname;
    return currentPath === '/' || 
           currentPath === '/index.html' || 
           currentPath.endsWith('/index.html') ||
           currentPath === '' ||
           (currentPath.split('/').pop() === '' && currentPath !== '/');
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', createNavigationArrows);
