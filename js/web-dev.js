document.addEventListener('DOMContentLoaded', function() {
  // Generate random code lines for hero animation
  const heroAnimation = document.querySelector('.hero-animation');
  if (heroAnimation) {
    for (let i = 0; i < 15; i++) {
      const line = document.createElement('div');
      line.className = 'code-line';
      line.style.width = `${Math.random() * 80 + 20}%`;
      line.style.animationDelay = `${i * 0.2}s`;
      heroAnimation.appendChild(line);
    }
  }

  // Portfolio Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const webProjects = document.querySelectorAll('.web-project');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      webProjects.forEach(project => {
        if (filterValue === 'all' || project.classList.contains(filterValue)) {
          project.style.display = 'block';
          setTimeout(() => {
            project.style.opacity = '1';
          }, 50);
        } else {
          project.style.opacity = '0';
          setTimeout(() => {
            project.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Project Modal
  const viewButtons = document.querySelectorAll('.view-btn');
  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <div class="modal-body"></div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  viewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const project = this.closest('.web-project');
      const projectTitle = project.querySelector('h3').textContent;
      const projectDesc = project.querySelector('p').textContent;
      const projectImg = project.querySelector('img').src;
      const techStack = project.querySelector('.tech-stack').innerHTML;
      
      // Populate modal
      modal.querySelector('.modal-body').innerHTML = `
        <div class="modal-preview">
          <img src="${projectImg}" alt="${projectTitle}">
        </div>
        <div class="modal-info">
          <h2>${projectTitle}</h2>
          <p>${projectDesc}</p>
          <div class="modal-tech">
            <h4>Technologies Used:</h4>
            <div class="tech-stack">${techStack}</div>
          </div>
          <div class="modal-features">
            <h4>Key Features:</h4>
            <ul>
              <li>Responsive Design</li>
              <li>Custom CMS Integration</li>
              <li>SEO Optimized</li>
              <li>Performance Tuned</li>
            </ul>
          </div>
        </div>
      `;
      
      // Show modal
      modal.style.display = 'flex';
      
      // Close modal
      const closeBtn = modal.querySelector('.close-modal');
      closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
      });
      
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    });
  });

  // Animate tech stack items
  const techItems = document.querySelectorAll('.tech-stack span');
  techItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
});