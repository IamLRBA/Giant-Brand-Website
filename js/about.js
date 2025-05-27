// Initialize AOS animation library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Animate stats counting
const statNumbers = document.querySelectorAll('.stat-number');
const speed = 200;

statNumbers.forEach(stat => {
    const target = +stat.getAttribute('data-count');
    const count = +stat.innerText;
    const increment = target / speed;
    
    if(count < target) {
        stat.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 1);
    } else {
        stat.innerText = target;
    }
    
    function updateCount() {
        const current = +stat.innerText;
        if(current < target) {
            stat.innerText = Math.ceil(current + increment);
            setTimeout(updateCount, 1);
        } else {
            stat.innerText = target;
        }
    }
});

// Set current year in footer
document.querySelector('.current-year').textContent = new Date().getFullYear();