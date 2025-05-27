document.addEventListener('DOMContentLoaded', function() {
  // Portfolio Filtering
  const portfolioBtns = document.querySelectorAll('.portfolio-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioBtns.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      portfolioBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const category = this.getAttribute('data-category');
      
      // Filter portfolio items
      portfolioItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Video Play Functionality
  const videoContainers = document.querySelectorAll('.video-container');
  
  videoContainers.forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.play-btn');
    
    container.addEventListener('click', function() {
      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'video-lightbox';
      lightbox.innerHTML = `
        <div class="video-lightbox-content">
          <span class="close-lightbox">&times;</span>
          <video controls autoplay>
            <source src="${video.querySelector('source').src}" type="video/mp4">
          </video>
        </div>
      `;
      
      document.body.appendChild(lightbox);
      
      // Close lightbox
      const closeBtn = lightbox.querySelector('.close-lightbox');
      closeBtn.addEventListener('click', function() {
        lightbox.remove();
      });
      
      // Close when clicking outside
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          lightbox.remove();
        }
      });
    });
    
    // Play button hover effect
    container.addEventListener('mouseenter', function() {
      video.play();
    });
    
    container.addEventListener('mouseleave', function() {
      video.pause();
      video.currentTime = 0;
    });
  });
});