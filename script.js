/* ===========================
   ERENAV — Premium Scripts
=========================== */

// Page Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1500);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  const isOpen = navMenu.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close nav on link click
document.querySelectorAll('.nav-link:not(.has-dropdown > .nav-link)').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.3 });
sections.forEach(s => observer.observe(s));

// Counter animation
function animateCount(el) {
  const target = parseInt(el.dataset.target || el.textContent);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 16);
}

// Intersection observer for counters
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCount(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count, .hstat-num').forEach(el => {
  countObserver.observe(el);
});

// Back to top
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.svc-card, .infra-card, .ref-card, .news-card, .metric, .pillar').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
  btn.style.background = '#28a745';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<span>Envoyer la demande</span> <i class="fas fa-paper-plane"></i>';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3500);
});

// Particles (simple decorative)
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(232,160,32,${Math.random() * 0.4 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
    container.appendChild(p);
  }
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
    50% { transform: translateY(-${20 + Math.random() * 30}px) scale(1.2); opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);
createParticles();