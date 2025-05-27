document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simple validation
            if (!formValues.name || !formValues.email || !formValues.message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would normally send the data to a server
            // For this example, we'll just log it and show a success message
            console.log('Form submitted:', formValues);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            successMessage.style.color = 'green';
            successMessage.style.marginTop = '20px';
            successMessage.style.padding = '15px';
            successMessage.style.backgroundColor = '#f0fff0';
            successMessage.style.borderRadius = '4px';
            
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
});