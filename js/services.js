// Service page interactions
document.addEventListener('DOMContentLoaded', function() {
  // Service card animations
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.service-content').style.transform = 'translateY(0)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.service-content').style.transform = 'translateY(100%)';
    });
  });

  // Service filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceItems = document.querySelectorAll('.service-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter services
      serviceItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Service inquiry form handling
  const serviceForms = document.querySelectorAll('.service-form');
  
  serviceForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const serviceType = this.getAttribute('data-service');
      
      // Add service type to form data
      formData.append('service', serviceType);
      
      // Here you would normally send the data to your server
      console.log('Service inquiry:', Object.fromEntries(formData.entries()));
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Your ${serviceType} inquiry has been received! We'll contact you shortly.</p>
      `;
      
      this.parentNode.appendChild(successMsg);
      this.reset();
      
      // Remove message after 5 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 5000);
    });
  });
});