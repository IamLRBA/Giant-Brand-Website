// Initialize AOS animation library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Floating label effect
const floatLabels = document.querySelectorAll('.form-group.floating input, .form-group.floating textarea, .form-group.floating select');
floatLabels.forEach(input => {
    input.addEventListener('focus', () => {
        const label = input.nextElementSibling;
        label.classList.add('active');
    });
    
    input.addEventListener('blur', () => {
        if(input.value === '') {
            const label = input.nextElementSibling;
            label.classList.remove('active');
        }
    });
    
    // Initialize labels for prefilled values
    if(input.value !== '') {
        const label = input.nextElementSibling;
        label.classList.add('active');
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
            // Reset form after 2 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = '<span>Send Message</span><div class="submit-arrow"><i class="fas fa-arrow-right"></i></div>';
                submitBtn.disabled = false;
                
                // Reset floating labels
                floatLabels.forEach(input => {
                    const label = input.nextElementSibling;
                    label.classList.remove('active');
                });
            }, 2000);
        }, 1500);
    });
}

// Set current year in footer
document.querySelector('.current-year').textContent = new Date().getFullYear();