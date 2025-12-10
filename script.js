// ============================================
// PAGE TRANSITIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Remove page transition class after load
  setTimeout(() => {
    document.body.classList.remove('page-transition');
    document.body.classList.add('loaded');
  }, 100);
});

// Smooth page transitions for internal links
document.querySelectorAll('a').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('#')) {
    link.addEventListener('click', function(e) {
      const targetHref = this.getAttribute('href');
      if (targetHref && targetHref !== window.location.pathname.split('/').pop()) {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          window.location.href = targetHref;
        }, 300);
      }
    });
  }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ============================================
// SMOOTH SCROLL TO SECTION
// ============================================

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const navbarHeight = navbar.offsetHeight;
    const sectionPosition = section.offsetTop - navbarHeight - 20;
    
    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth'
    });
  }
}

// Add click handlers to anchor links (only on same page)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      e.preventDefault();
      scrollToSection(targetId);
    }
  });
});

// ============================================
// ACCORDION FUNCTIONALITY
// ============================================

const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  
  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all accordions
    accordionItems.forEach(accItem => {
      accItem.classList.remove('active');
    });
    
    // Open clicked accordion if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ============================================
// FAQ FUNCTIONALITY
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all FAQs
    faqItems.forEach(faqItem => {
      faqItem.classList.remove('active');
    });
    
    // Open clicked FAQ if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ============================================
// FORM VALIDATION AND SUBMISSION
// ============================================

const inscripcionForm = document.getElementById('inscripcionForm');

if (inscripcionForm) {
  inscripcionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(inscripcionForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.nombre || !data.email || !data.etapa || !data.rgpd) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Por favor, introduce un email válido.');
      return;
    }
    
    // Here you would normally send the data to a server
    // For now, we'll just show a success message
    showFormSuccess();
  });
}

function showFormSuccess() {
  const formContainer = document.querySelector('.form-container');
  const successMessage = document.createElement('div');
  successMessage.className = 'form-success';
  successMessage.innerHTML = `
    <div style="text-align: center; padding: 3rem;">
      <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
      <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--color-dark);">
        ¡Inscripción enviada correctamente!
      </h3>
      <p style="color: var(--color-gray); line-height: 1.7;">
        Recibirás un correo de confirmación con tu ruta y horario asignados en breve.
      </p>
    </div>
  `;
  
  formContainer.innerHTML = '';
  formContainer.appendChild(successMessage);
  
  // Scroll to top of form
  formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.card-animated, .card, .phase-card, .stand-card, .route-card, .info-card, .preview-card, .contact-card, .step-card, .stage-card, .info-item');
  
  animatedElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
});

// ============================================
// PARALLAX EFFECTS (Improved)
// ============================================

function initParallax() {
  const parallaxSections = document.querySelectorAll('.parallax-section');
  
  // Use requestAnimationFrame for smoother performance
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    parallaxSections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrolled;
      const sectionHeight = rect.height;
      
      // Only apply parallax if section is visible
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate how much of the section is visible
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibilityRatio = visibleHeight / sectionHeight;
        
        // Different speeds for different sections (subtle effect)
        const baseSpeed = 0.15;
        const speed = baseSpeed + (index % 3) * 0.05;
        
        // Calculate parallax offset based on scroll position relative to section
        const sectionScrollProgress = (scrolled - (sectionTop - windowHeight)) / (windowHeight + sectionHeight);
        const parallaxOffset = sectionScrollProgress * speed * 100;
        
        // Apply transform only if meaningful
        if (Math.abs(parallaxOffset) > 0.5) {
          section.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
        } else {
          section.style.transform = 'translate3d(0, 0, 0)';
        }
      } else {
        section.style.transform = 'translate3d(0, 0, 0)';
      }
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  
  // Initial call
  updateParallax();
}

// Initialize parallax on load
document.addEventListener('DOMContentLoaded', initParallax);

// ============================================
// FLOATING SHAPES ANIMATION
// ============================================

function animateShapes() {
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 100;
    const randomDuration = 15 + Math.random() * 10;
    
    shape.style.animation = `float ${randomDuration}s ease-in-out infinite`;
    shape.style.animationDelay = `${index * 2}s`;
  });
}

// Initialize shape animations
document.addEventListener('DOMContentLoaded', animateShapes);

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('.section, .hero-section');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveSection() {
  const scrollPosition = window.pageYOffset + 200;
  
  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightActiveSection);

// ============================================
// INPUT FOCUS EFFECTS
// ============================================

const formInputs = document.querySelectorAll('input, select, textarea');

formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.classList.remove('focused');
  });
});

// ============================================
// CHECKBOX STYLING
// ============================================

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      this.parentElement.classList.add('checked');
    } else {
      this.parentElement.classList.remove('checked');
    }
  });
});

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Animate hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.animation = 'fadeInUp 1s ease';
  }
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function createScrollToTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'scroll-to-top';
  button.setAttribute('aria-label', 'Volver arriba');
  
  document.body.appendChild(button);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  });
  
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Create scroll to top button
createScrollToTopButton();

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🎓 Colegio Santa María la Blanca', 'font-size: 20px; font-weight: bold; color: #7b1733;');
console.log('%cJornada de Puertas Abiertas', 'font-size: 14px; color: #6b7280;');

