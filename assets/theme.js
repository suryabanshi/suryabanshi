/* =====================================================================
   SmartSphere — Main JavaScript
   ===================================================================== */

'use strict';

/* ── Sticky nav ─────────────────────────────────────────────────────── */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile menu ────────────────────────────────────────────────────── */
(function () {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('mobile-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('mobile-open');
      hamburger.setAttribute('aria-expanded', 'false');
    })
  );
})();

/* ── Scroll reveal ──────────────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 80}ms`;
    io.observe(el);
  });
})();

/* ── Animated counters ──────────────────────────────────────────────── */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const format = (n, suffix) => {
    if (suffix === 'k+') return Math.round(n) + 'k+';
    if (suffix === '%') return Math.round(n) + '%';
    if (suffix === '+') return Math.round(n) + '+';
    return Math.round(n).toLocaleString() + suffix;
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(eased * target, suffix);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
})();

/* ── Progress bars ──────────────────────────────────────────────────── */
(function () {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.width = e.target.dataset.width;
      io.unobserve(e.target);
    });
  }, { threshold: 0.3 });

  bars.forEach(b => { b.style.width = '0%'; io.observe(b); });
})();

/* ── Product filter tabs ─────────────────────────────────────────────── */
(function () {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card[data-category]');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      cards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
        if (show) card.classList.add('reveal', 'visible');
      });
    });
  });
})();

/* ── Add to cart feedback ───────────────────────────────────────────── */
(function () {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;

    const original = btn.innerHTML;
    btn.innerHTML = '✓ Added!';
    btn.style.background = 'linear-gradient(135deg, var(--accent-green), #00b37e)';

    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const n = (parseInt(badge.textContent) || 0) + 1;
      badge.textContent = n;
      badge.style.transform = 'scale(1.5)';
      setTimeout(() => { badge.style.transform = ''; }, 300);
    }

    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
    }, 1800);
  });
})();

/* ── Wishlist toggle ────────────────────────────────────────────────── */
(function () {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.action-btn.wishlist');
    if (!btn) return;
    btn.classList.toggle('wishlisted');
    btn.textContent = btn.classList.contains('wishlisted') ? '❤️' : '🤍';
  });
})();

/* ── Newsletter form ────────────────────────────────────────────────── */
(function () {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn   = form.querySelector('button[type="submit"]');
    if (!input || !input.value.trim()) return;

    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Subscribed!';
    btn.disabled = true;
    input.value = '';

    setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 3000);
  });
})();

/* ── Particle canvas (hero background) ──────────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function initParticles() {
    const count = Math.min(Math.floor(canvas.width / 12), 90);
    particles = Array.from({ length: count }, () => ({
      x:   randomBetween(0, canvas.width),
      y:   randomBetween(0, canvas.height),
      r:   randomBetween(0.8, 2.2),
      vx:  randomBetween(-0.3, 0.3),
      vy:  randomBetween(-0.25, 0.25),
      alpha: randomBetween(0.2, 0.7),
      color: ['#00d4ff', '#7b2ff7', '#f5c842'][Math.floor(Math.random() * 3)],
    }));
  }
  initParticles();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      /* connect nearby particles */
      particles.slice(i + 1).forEach(q => {
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      });

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    animId = requestAnimationFrame(draw);
  }
  draw();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId); else draw();
  });
})();

/* ── Smooth scroll for anchor links ─────────────────────────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ── Typed hero text ────────────────────────────────────────────────── */
(function () {
  const el = document.getElementById('hero-typed');
  if (!el) return;

  const phrases = ['Smarter Living', 'Task Mastery', 'Global Reach', 'Real Results'];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; return setTimeout(type, 1800); }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 55 : 95);
  }
  type();
})();
