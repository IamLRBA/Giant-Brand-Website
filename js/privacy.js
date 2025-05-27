// Initialize AOS animation library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Set current date
const options = { year: 'numeric', month: 'long', day: 'numeric' };
document.querySelector('.current-date').textContent = new Date().toLocaleDateString('en-US', options);

// Set current year in footer
document.querySelector('.current-year').textContent = new Date().getFullYear();