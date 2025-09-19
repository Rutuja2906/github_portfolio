// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// Navbar class on scroll (matches CSS .navbar.scrolled styles)
const navbar = document.querySelector('.navbar');
const setNavbarState = () => {
  if (!navbar) return;
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
};
window.addEventListener('scroll', setNavbarState);
window.addEventListener('load', setNavbarState);

// Active navigation link highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.pageYOffset - 100;
    const height = section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .education-item, .contact-item, .skill-category-card');
  animatedElements.forEach(el => observer.observe(el));
});

// Typing animation for hero title (subtle)
function typeWriter(element, text, speed = 80) {
  let i = 0;
  element.textContent = '';
  (function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i++);
      setTimeout(type, speed);
    }
  })();
}

document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent.trim();
    setTimeout(() => typeWriter(heroTitle, originalText, 65), 400);
  }
});

// Hover effects for skill tags
document.addEventListener('DOMContentLoaded', () => {
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function () { this.style.transform = 'translateY(-2px) scale(1.05)'; });
    tag.addEventListener('mouseleave', function () { this.style.transform = 'translateY(0) scale(1)'; });
  });
});

// Fade-in for tech tags
document.addEventListener('DOMContentLoaded', () => {
  const techTags = document.querySelectorAll('.tech-tag');
  techTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('fade-in-tag');
  });
});

// Contact item subtle click effect
function handleContactForm() {
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(item => {
    item.addEventListener('click', function () {
      const link = this.querySelector('a');
      if (link && link.href.startsWith('mailto:')) {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => { this.style.transform = 'scale(1)'; }, 150);
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', handleContactForm);

// Add smooth reveal animation for sections
const revealSections = () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight * 0.8) section.classList.add('revealed');
  });
};
window.addEventListener('scroll', revealSections);
document.addEventListener('DOMContentLoaded', revealSections);

// Add CSS helper classes for animations injected at runtime
const style = document.createElement('style');
style.textContent = `
  .fade-in-tag { opacity: 0; animation: fadeInTag 0.5s ease forwards; }
  @keyframes fadeInTag { to { opacity: 1; } }
  .nav-link.active::after { width: 100%; }
  .revealed { opacity: 1; transform: translateY(0); }
  section { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .hamburger.active .bar:nth-child(2) { opacity: 0; }
  .hamburger.active .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .hamburger.active .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
`;
document.head.appendChild(style);
