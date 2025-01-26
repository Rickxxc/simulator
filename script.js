// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const body = document.body;

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  mainNav.classList.toggle('active');
  body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (mainNav.classList.contains('active') && 
      !mainNav.contains(e.target) && 
      !menuToggle.contains(e.target)) {
    mainNav.classList.remove('active');
    body.style.overflow = '';
  }
});

// Handle escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mainNav.classList.contains('active')) {
    mainNav.classList.remove('active');
    body.style.overflow = '';
  }
});

// Update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="go:"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const section = this.getAttribute('href').replace('go:', '');
    // Implement navigation logic here
    console.log(`Navigating to section: ${section}`);
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '50px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .category-card, .hero-section').forEach(element => {
  observer.observe(element);
});

// Ad Integration
const initAds = () => {
  const adBanner = document.getElementById('ad-banner');
  // Implement ad loading logic here
  console.log('Initializing ads...');
};

// Initialize ads when DOM is ready
document.addEventListener('DOMContentLoaded', initAds);
