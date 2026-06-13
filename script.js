// script.js

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Navbar Scroll Effect & Active Link
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Glass effect on scroll
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // 2. Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    }
  }

  hamburger.addEventListener('click', toggleMenu);
  closeMenu.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // 3. Countdown Timer
  // Placeholder target date: Modify this to the real event date
  const targetDate = new Date('2026-09-15T09:00:00+05:30').getTime();
  
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-minutes');
  const secsEl = document.getElementById('cd-seconds');
  const countdownContainer = document.getElementById('countdown');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      countdownContainer.innerHTML = '<h3 style="color: var(--gold); font-family: var(--font-display); font-size: 2rem;">WE\'RE LIVE!</h3>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minsEl.textContent = minutes.toString().padStart(2, '0');
    secsEl.textContent = seconds.toString().padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 4. Hero Bubbles
  const bubblesContainer = document.getElementById('bubbles-container');
  // Only generate bubbles if prefers-reduced-motion is not reduce
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion && window.innerWidth > 600) {
    const bubbleCount = 15;
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      
      const size = Math.random() * 32 + 4; // 4px to 36px
      const left = Math.random() * 100; // 0% to 100%
      const duration = Math.random() * 20 + 10; // 10s to 30s
      const delay = Math.random() * 10;
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animationDuration = `${duration}s, 4s`;
      bubble.style.animationDelay = `${delay}s, ${delay}s`;
      
      bubblesContainer.appendChild(bubble);
    }
  }

  // 5. Scroll Reveal with Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // once: true
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      
      // Close others (uncomment to allow only one open at a time)
      /*
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
        }
      });
      */
      
      header.setAttribute('aria-expanded', !isExpanded);
    });
  });

  // 7. Lightbox for Gallery & Standalone Images
  const galleryItems = document.querySelectorAll('.gallery-item');
  const aboutImages = document.querySelectorAll('.about-photos img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightboxBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  let currentImageIndex = 0;
  let isGalleryMode = false;
  const imageSources = Array.from(galleryItems).map(item => item.getAttribute('data-src'));

  function openLightbox(src, isGallery = false, index = 0) {
    if (isGallery && (imageSources.length === 0 || !imageSources[index])) return;
    
    isGalleryMode = isGallery;
    currentImageIndex = index;
    lightboxImg.src = src;
    
    if (isGalleryMode) {
      prevBtn.style.display = '';
      nextBtn.style.display = '';
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
    
    lightbox.classList.add('active');
    closeLightboxBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNextImage() {
    if (!isGalleryMode) return;
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    lightboxImg.src = imageSources[currentImageIndex];
  }

  function showPrevImage() {
    if (!isGalleryMode) return;
    currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
    lightboxImg.src = imageSources[currentImageIndex];
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(imageSources[index], true, index));
  });

  aboutImages.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, false));
  });

  closeLightboxBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNextImage);
  prevBtn.addEventListener('click', showPrevImage);

  // Close lightbox on click outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });

  // 8. Footer Year
  document.getElementById('year').textContent = new Date().getFullYear();
});
