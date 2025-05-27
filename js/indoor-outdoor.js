document.addEventListener('DOMContentLoaded', function() {
  // Gallery Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter gallery items
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
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

  // Load More Functionality
  const loadMoreBtn = document.getElementById('load-more-btn');
  let visibleItems = 9; // Initial number of visible items
  
  if (loadMoreBtn) {
    // Hide items beyond initial count
    Array.from(galleryItems).slice(visibleItems).forEach(item => {
      item.style.display = 'none';
    });
    
    loadMoreBtn.addEventListener('click', function() {
      visibleItems += 9;
      
      // Show next set of items
      Array.from(galleryItems).slice(0, visibleItems).forEach(item => {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
        }, 50);
      });
      
      // Hide button if all items are visible
      if (visibleItems >= galleryItems.length) {
        loadMoreBtn.style.display = 'none';
      }
    });
  }

  // Image Lightbox
  const viewButtons = document.querySelectorAll('.view-btn');
  
  viewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const parentItem = this.closest('.gallery-item');
      const imgSrc = parentItem.querySelector('img').src;
      const title = parentItem.querySelector('h3').textContent;
      const description = parentItem.querySelector('p').textContent;
      
      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <span class="close-btn">&times;</span>
          <img src="${imgSrc}" alt="${title}">
          <div class="lightbox-info">
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
        </div>
      `;
      
      document.body.appendChild(lightbox);
      
      // Close lightbox
      const closeBtn = lightbox.querySelector('.close-btn');
      closeBtn.addEventListener('click', function() {
        lightbox.remove();
      });
      
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          lightbox.remove();
        }
      });
    });
  });
});