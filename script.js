/* ═══════════════════════════════════
   PORTFOLIO JS — Animations & Interactions
═══════════════════════════════════ */

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');

let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
// Trail with slight delay
function updateTrail() {
  trail.style.left = mx + 'px';
  trail.style.top  = my + 'px';
  requestAnimationFrame(updateTrail);
}
updateTrail();

// ── PARTICLES CANVAS ──
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height;
    this.size  = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.alpha  = Math.random() * 0.4 + 0.1;
    this.color  = Math.random() > 0.6
      ? `rgba(255, 45, 120, ${this.alpha})`
      : `rgba(189, 147, 249, ${this.alpha})`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const particles = Array.from({ length: 80 }, () => new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── BURGER MENU ──
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close on link click
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── INTERSECTION OBSERVER — fade in up + skill bars ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars inside the card
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        setTimeout(() => bar.classList.add('animated'), 200);
      });
    }
  });
}, { threshold: 0.12 });

// Add fade-in-up to major elements
const animTargets = [
  '.skill-card', '.projet-card', '.apropos-grid',
  '.contact-grid', '.synthese-table', '.synthese-intro',
  '.section-title', '.section-tag'
];
animTargets.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = (i * 0.08) + 's';
    observer.observe(el);
  });
});

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--pink)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ── TABLE ROW HOVER GLOW ──
document.querySelectorAll('.synthese-table tbody tr').forEach(row => {
  row.addEventListener('mouseenter', () => {
    row.style.background = 'rgba(255,45,120,0.06)';
  });
  row.addEventListener('mouseleave', () => {
    row.style.background = '';
  });
});

// ── CONTACT FORM ──
const form = document.querySelector('.contact-form');
if (form) {
  const btn = form.querySelector('button');
  btn.addEventListener('click', () => {
    const inputs = form.querySelectorAll('.form-input');
    let valid = true;
    inputs.forEach(i => {
      if (!i.value.trim()) { i.style.borderColor = 'var(--pink)'; valid = false; }
      else i.style.borderColor = '';
    });
    if (valid) {
      btn.textContent = '✅ Message envoyé !';
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.textContent = 'Envoyer ✉️';
        btn.style.background = '';
        inputs.forEach(i => i.value = '');
      }, 3000);
    }
  });
}

// ── TYPING EFFECT on hero badge ──
const badge = document.querySelector('.hero-badge');
if (badge) {
  const text = badge.textContent;
  badge.textContent = '';
  let i = 0;
  const typeInterval = setInterval(() => {
    badge.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typeInterval);
  }, 50);
}

console.log('%c✨ Portfolio BTS SIO — chargé avec succès !', 'color: #ff2d78; font-family: monospace; font-size: 14px;');
