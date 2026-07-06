// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Hero background lazy load + subtle zoom-in (home page only)
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  const img = new Image();
  img.src = 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1920&q=80';
  img.onload = () => {
    heroBg.style.backgroundImage = `url('${img.src}')`;
    heroBg.classList.add('loaded');
  };
}

// Smooth scroll for same-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Quote form — mailto fallback (replace with real backend when ready)
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(this);
    const firstName = data.get('firstName');
    const lastName  = data.get('lastName');
    const company   = data.get('company');
    const phone     = data.get('phone');
    const email     = data.get('email');
    const category  = data.get('category');
    const message   = data.get('message');

    const subject = encodeURIComponent(`Quote Request from ${firstName} ${lastName}${company ? ' — ' + company : ''}`);
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\nCompany: ${company || 'N/A'}\nPhone: ${phone}\nEmail: ${email}\nProduct Category: ${category || 'Not specified'}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:MarshallSouthernincAZ@gmail.com?subject=${subject}&body=${body}`;

    quoteForm.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  });
}

// Intersection Observer for fade-in animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.product-card, .deal-card, .why-card, .cat-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
  observer.observe(el);
});
