/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║          ALPHA ELITE — Facebook Profile Theme v1.0          ║
 * ║      Dark Power Aesthetic  •  Gold Accents  •  Dominance    ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * HOW TO USE:
 *   1. Open Facebook in Chrome / Edge / Firefox
 *   2. Press F12  (or Ctrl+Shift+I / Cmd+Option+I on Mac)
 *   3. Click the "Console" tab
 *   4. Paste this ENTIRE script and press Enter
 *   5. To remove: refresh the page (F5)
 *
 * FEATURES:
 *   • Deep obsidian + carbon background
 *   • Animated molten-gold accent ring on profile picture
 *   • Glowing golden border on cover photo
 *   • Custom lion watermark overlay
 *   • Power-glow text effects on name
 *   • Cinematic scan-line overlay
 *   • Floating particle constellation (stars)
 *   • Gold shimmer hover effects on all buttons
 *   • Custom scrollbar — tactical black + gold
 *   • Status bar with motivational quote rotator
 */

(function AlphaElite() {
  'use strict';

  /* ─────────────────────────────────────────
     CONSTANTS
  ───────────────────────────────────────── */
  const QUOTES = [
    '"Discipline is the bridge between goals and accomplishment."',
    '"Iron sharpens iron. So one man sharpens another."',
    '"Be the lion, not the sheep."',
    '"The wolf does not concern himself with the opinion of sheep."',
    '"Silence is the weapon of the strong."',
    '"Kings do not kneel. They build empires."',
    '"Your comfort zone is your enemy\'s playground."',
    '"Earn your rest. Never beg for respect."',
    '"The strongest steel is forged in the hottest fire."',
    '"Pressure creates diamonds. Stay uncomfortable."',
  ];

  const COLORS = {
    obsidian:    '#0a0a0f',
    carbon:      '#111118',
    steel:       '#1a1a2e',
    goldPrime:   '#c9a84c',
    goldLight:   '#f0c040',
    goldGlow:    '#ffd700',
    goldDark:    '#8b6914',
    crimson:     '#8b0000',
    silver:      '#b0b8c8',
    white:       '#e8e8f0',
  };

  /* ─────────────────────────────────────────
     INJECT STYLES
  ───────────────────────────────────────── */
  const style = document.createElement('style');
  style.id = 'alpha-elite-theme';
  style.textContent = `

    /* ── GLOBAL RESET ── */
    *, *::before, *::after {
      box-sizing: border-box;
    }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar { width: 8px; background: ${COLORS.obsidian}; }
    ::-webkit-scrollbar-track { background: ${COLORS.carbon}; }
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, ${COLORS.goldPrime}, ${COLORS.goldDark});
      border-radius: 4px;
      box-shadow: 0 0 6px ${COLORS.goldGlow}60;
    }
    ::-webkit-scrollbar-thumb:hover { background: ${COLORS.goldGlow}; }

    /* ── PAGE BACKGROUND ── */
    body, html {
      background: ${COLORS.obsidian} !important;
    }
    [data-pagelet="root"],
    [role="main"],
    .x78zum5, .x1iyjqo2, .x1n2onr6 {
      background: ${COLORS.obsidian} !important;
    }

    /* ── ALL CARDS / PANELS ── */
    div[class*="x1lliihq"],
    div[class*="x1n2onr6"],
    div[class*="xh8yej3"] {
      background: ${COLORS.carbon} !important;
      border-color: ${COLORS.goldDark}40 !important;
    }

    /* ── TEXT COLORS ── */
    span, p, a, div, h1, h2, h3, h4, h5 {
      color: ${COLORS.white} !important;
    }
    a:hover { color: ${COLORS.goldLight} !important; text-decoration: none !important; }

    /* ── PROFILE NAME GLOW ── */
    h1[class*="x1heor9g"],
    h1 > span {
      background: linear-gradient(135deg, ${COLORS.goldLight} 0%, ${COLORS.goldGlow} 40%, ${COLORS.white} 60%, ${COLORS.goldPrime} 100%);
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
      filter: drop-shadow(0 0 12px ${COLORS.goldGlow}80) !important;
      font-weight: 900 !important;
      letter-spacing: 1.5px !important;
      text-transform: uppercase !important;
    }

    /* ── COVER PHOTO WRAPPER ── */
    [data-pagelet="ProfileTilesFeed_0"],
    [data-pagelet="ProfileActions"],
    .x1qjc9v5 > div:first-child {
      border: 2px solid ${COLORS.goldPrime} !important;
      box-shadow:
        0 0 30px ${COLORS.goldGlow}40,
        0 0 80px ${COLORS.goldDark}30,
        inset 0 0 20px ${COLORS.goldGlow}10 !important;
    }

    /* ── COVER PHOTO OVERLAY ── */
    .x1a2a7pz > div[style*="background-image"],
    [data-imgperflogname="profileCoverPhoto"] {
      position: relative !important;
    }

    /* ── PROFILE PICTURE RING ── */
    [data-imgperflogname="profileCoverPhoto"] ~ * image,
    svg > image,
    img[alt*="profile picture"] {
      border-radius: 50% !important;
      border: 3px solid ${COLORS.goldGlow} !important;
      box-shadow:
        0 0 0 4px ${COLORS.obsidian},
        0 0 0 7px ${COLORS.goldPrime},
        0 0 25px ${COLORS.goldGlow},
        0 0 50px ${COLORS.goldGlow}60 !important;
      animation: alpha-ring-pulse 2.5s ease-in-out infinite !important;
    }

    @keyframes alpha-ring-pulse {
      0%, 100% {
        box-shadow:
          0 0 0 4px ${COLORS.obsidian},
          0 0 0 7px ${COLORS.goldPrime},
          0 0 20px ${COLORS.goldGlow},
          0 0 40px ${COLORS.goldGlow}50;
      }
      50% {
        box-shadow:
          0 0 0 4px ${COLORS.obsidian},
          0 0 0 9px ${COLORS.goldLight},
          0 0 35px ${COLORS.goldGlow},
          0 0 70px ${COLORS.goldGlow}70,
          0 0 100px ${COLORS.goldGlow}30;
      }
    }

    /* ── NAV BAR ── */
    [role="banner"],
    nav, header,
    div[data-pagelet="MWNavigation"] {
      background: linear-gradient(90deg, ${COLORS.obsidian} 0%, ${COLORS.steel} 50%, ${COLORS.obsidian} 100%) !important;
      border-bottom: 1px solid ${COLORS.goldDark} !important;
      box-shadow: 0 4px 20px ${COLORS.goldGlow}20 !important;
    }

    /* ── BUTTONS ── */
    div[role="button"],
    button,
    [role="button"] {
      background: linear-gradient(135deg, ${COLORS.steel} 0%, ${COLORS.carbon} 100%) !important;
      border: 1px solid ${COLORS.goldDark}80 !important;
      color: ${COLORS.goldLight} !important;
      transition: all 0.3s ease !important;
      position: relative !important;
      overflow: hidden !important;
    }
    div[role="button"]:hover,
    button:hover,
    [role="button"]:hover {
      background: linear-gradient(135deg, ${COLORS.goldDark} 0%, ${COLORS.goldPrime}40 100%) !important;
      border-color: ${COLORS.goldGlow} !important;
      box-shadow: 0 0 15px ${COLORS.goldGlow}50, 0 0 30px ${COLORS.goldGlow}20 !important;
      color: ${COLORS.goldGlow} !important;
      transform: translateY(-1px) !important;
    }

    /* ── BUTTON SHIMMER ON HOVER ── */
    div[role="button"]::after,
    button::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -75%;
      width: 50%;
      height: 200%;
      background: linear-gradient(
        to right,
        transparent 0%,
        ${COLORS.goldGlow}30 50%,
        transparent 100%
      );
      transform: skewX(-20deg);
      transition: left 0.6s ease;
      pointer-events: none;
    }
    div[role="button"]:hover::after,
    button:hover::after {
      left: 125%;
    }

    /* ── SIDEBAR SECTION HEADERS ── */
    div[class*="x1i10hfl"] > span,
    div[class*="x193iq5w"] {
      color: ${COLORS.goldPrime} !important;
      font-weight: 700 !important;
      letter-spacing: 1px !important;
      text-transform: uppercase !important;
      font-size: 11px !important;
    }

    /* ── STORY / POST CARDS ── */
    div[class*="x1yztbdb"],
    div[data-pagelet*="FeedUnit"] {
      background: ${COLORS.carbon} !important;
      border: 1px solid ${COLORS.goldDark}50 !important;
      border-radius: 12px !important;
      box-shadow: 0 2px 20px ${COLORS.obsidian}80 !important;
      transition: transform 0.3s ease, box-shadow 0.3s ease !important;
    }
    div[data-pagelet*="FeedUnit"]:hover {
      transform: translateY(-2px) !important;
      box-shadow:
        0 8px 30px ${COLORS.obsidian},
        0 0 15px ${COLORS.goldDark}40 !important;
      border-color: ${COLORS.goldPrime}80 !important;
    }

    /* ── INPUT FIELDS ── */
    input, textarea, [role="textbox"] {
      background: ${COLORS.steel} !important;
      border: 1px solid ${COLORS.goldDark}60 !important;
      color: ${COLORS.white} !important;
      border-radius: 8px !important;
    }
    input:focus, textarea:focus, [role="textbox"]:focus {
      border-color: ${COLORS.goldGlow} !important;
      box-shadow: 0 0 10px ${COLORS.goldGlow}40 !important;
      outline: none !important;
    }
    input::placeholder { color: ${COLORS.silver}80 !important; }

    /* ── SEPARATOR LINES ── */
    hr, [role="separator"] {
      border-color: ${COLORS.goldDark}40 !important;
      background: linear-gradient(90deg, transparent, ${COLORS.goldPrime}60, transparent) !important;
      height: 1px !important;
    }

    /* ── ICONS ── */
    svg { fill: ${COLORS.silver} !important; }
    svg:hover { fill: ${COLORS.goldLight} !important; }

    /* ── NOTIFICATION BADGE ── */
    [aria-label*="notification"],
    div[class*="x1n2onr6"] span[dir] {
      background: ${COLORS.goldPrime} !important;
      color: ${COLORS.obsidian} !important;
    }

    /* ── SCAN LINE CINEMATIC OVERLAY ── */
    #alpha-scanlines {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        ${COLORS.obsidian}18 2px,
        ${COLORS.obsidian}18 4px
      );
      pointer-events: none;
      z-index: 9998;
      animation: alpha-scanline-shift 8s linear infinite;
    }
    @keyframes alpha-scanline-shift {
      0%   { background-position: 0 0; }
      100% { background-position: 0 100vh; }
    }

    /* ── PARTICLE CANVAS ── */
    #alpha-particles {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 9997;
      opacity: 0.5;
    }

    /* ── WATERMARK CREST ── */
    #alpha-crest {
      position: fixed;
      bottom: 30px;
      right: 30px;
      font-size: 64px;
      opacity: 0.07;
      color: ${COLORS.goldGlow};
      pointer-events: none;
      z-index: 9996;
      animation: alpha-crest-breathe 4s ease-in-out infinite;
      user-select: none;
      filter: drop-shadow(0 0 10px ${COLORS.goldGlow});
    }
    @keyframes alpha-crest-breathe {
      0%, 100% { opacity: 0.05; transform: scale(1); }
      50%       { opacity: 0.12; transform: scale(1.05); }
    }

    /* ── STATUS BAR ── */
    #alpha-statusbar {
      position: fixed;
      bottom: 0; left: 0;
      width: 100vw;
      height: 32px;
      background: linear-gradient(90deg, ${COLORS.obsidian}, ${COLORS.steel}, ${COLORS.obsidian});
      border-top: 1px solid ${COLORS.goldDark};
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      pointer-events: none;
      gap: 12px;
      overflow: hidden;
    }
    #alpha-statusbar::before {
      content: '⚡';
      font-size: 12px;
      color: ${COLORS.goldGlow};
      animation: alpha-bolt 1.5s ease-in-out infinite alternate;
    }
    @keyframes alpha-bolt {
      from { transform: scale(1); opacity: 0.7; }
      to   { transform: scale(1.3); opacity: 1; }
    }
    #alpha-quote {
      font-family: 'Georgia', serif;
      font-size: 11px;
      color: ${COLORS.goldPrime};
      letter-spacing: 1.2px;
      animation: alpha-fadequote 6s ease-in-out;
      font-style: italic;
    }
    @keyframes alpha-fadequote {
      0%   { opacity: 0; transform: translateY(4px); }
      15%  { opacity: 1; transform: translateY(0); }
      80%  { opacity: 1; }
      100% { opacity: 0; }
    }
    #alpha-statusbar::after {
      content: 'ALPHA ELITE v1.0';
      font-size: 9px;
      color: ${COLORS.goldDark};
      letter-spacing: 2px;
      position: absolute;
      right: 16px;
    }

    /* ── TOOLTIP BADGE ── */
    #alpha-badge {
      position: fixed;
      top: 70px;
      right: 20px;
      background: linear-gradient(135deg, ${COLORS.obsidian}, ${COLORS.steel});
      border: 1px solid ${COLORS.goldPrime};
      border-radius: 8px;
      padding: 8px 14px;
      font-family: 'Arial', sans-serif;
      font-size: 11px;
      color: ${COLORS.goldLight};
      letter-spacing: 1px;
      z-index: 99998;
      box-shadow: 0 0 20px ${COLORS.goldGlow}30;
      animation: alpha-badge-enter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      cursor: pointer;
      user-select: none;
    }
    @keyframes alpha-badge-enter {
      from { opacity: 0; transform: translateX(30px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    #alpha-badge:hover { border-color: ${COLORS.goldGlow}; box-shadow: 0 0 30px ${COLORS.goldGlow}50; }
    #alpha-badge .alpha-badge-title {
      font-weight: 900;
      font-size: 13px;
      color: ${COLORS.goldGlow};
      display: block;
      margin-bottom: 2px;
      letter-spacing: 2px;
    }

    /* ── CORNER ACCENTS ── */
    body::before, body::after {
      content: '';
      position: fixed;
      width: 120px; height: 120px;
      border-color: ${COLORS.goldPrime};
      border-style: solid;
      opacity: 0.15;
      pointer-events: none;
      z-index: 9995;
    }
    body::before {
      top: 0; left: 0;
      border-width: 3px 0 0 3px;
      border-radius: 0 0 100% 0;
    }
    body::after {
      bottom: 32px; right: 0;
      border-width: 0 3px 3px 0;
      border-radius: 100% 0 0 0;
    }

  `;
  document.head.appendChild(style);

  /* ─────────────────────────────────────────
     SCAN-LINE OVERLAY
  ───────────────────────────────────────── */
  const scanlines = document.createElement('div');
  scanlines.id = 'alpha-scanlines';
  document.body.appendChild(scanlines);

  /* ─────────────────────────────────────────
     LION CREST WATERMARK
  ───────────────────────────────────────── */
  const crest = document.createElement('div');
  crest.id = 'alpha-crest';
  crest.textContent = '♛';
  document.body.appendChild(crest);

  /* ─────────────────────────────────────────
     FLOATING PARTICLE CONSTELLATION
  ───────────────────────────────────────── */
  const canvas = document.createElement('canvas');
  canvas.id = 'alpha-particles';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const PARTICLE_COUNT = 80;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:    Math.random() * canvas.width,
    y:    Math.random() * canvas.height,
    vx:   (Math.random() - 0.5) * 0.4,
    vy:   (Math.random() - 0.5) * 0.4,
    r:    Math.random() * 1.5 + 0.3,
    alpha: Math.random() * 0.6 + 0.2,
    phase: Math.random() * Math.PI * 2,
  }));

  function drawParticles(ts) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.phase += 0.01;
      const a = p.alpha * (0.6 + 0.4 * Math.sin(p.phase));

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${a})`;
      ctx.fill();

      /* draw connecting lines between close particles */
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(201,168,76,${0.15 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(drawParticles);
  }
  requestAnimationFrame(drawParticles);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  /* ─────────────────────────────────────────
     STATUS BAR + QUOTE ROTATOR
  ───────────────────────────────────────── */
  const statusBar = document.createElement('div');
  statusBar.id = 'alpha-statusbar';
  const quoteEl = document.createElement('span');
  quoteEl.id = 'alpha-quote';
  statusBar.appendChild(quoteEl);
  document.body.appendChild(statusBar);

  let qi = 0;
  function rotateQuote() {
    quoteEl.style.animation = 'none';
    void quoteEl.offsetWidth;
    quoteEl.textContent = QUOTES[qi % QUOTES.length];
    quoteEl.style.animation = 'alpha-fadequote 6s ease-in-out';
    qi++;
  }
  rotateQuote();
  setInterval(rotateQuote, 6500);

  /* ─────────────────────────────────────────
     ALPHA ELITE BADGE (top-right HUD)
  ───────────────────────────────────────── */
  const badge = document.createElement('div');
  badge.id = 'alpha-badge';
  badge.innerHTML = `
    <span class="alpha-badge-title">⚔ ALPHA ELITE</span>
    Theme Active &nbsp;|&nbsp; <span id="alpha-timer">00:00</span>
  `;
  document.body.appendChild(badge);

  /* session timer on badge */
  const start = Date.now();
  setInterval(() => {
    const s = Math.floor((Date.now() - start) / 1000);
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    const el = document.getElementById('alpha-timer');
    if (el) el.textContent = `${mm}:${ss}`;
  }, 1000);

  /* clicking badge removes the theme */
  badge.addEventListener('click', () => {
    if (confirm('Remove Alpha Elite theme?')) AlphaEliteRemove();
  });

  /* ─────────────────────────────────────────
     COVER PHOTO GOLDEN TINT OVERLAY
  ───────────────────────────────────────── */
  function applyCoverTint() {
    const cover = document.querySelector('[data-imgperflogname="profileCoverPhoto"]');
    if (cover && !cover.querySelector('#alpha-cover-tint')) {
      cover.style.position = 'relative';
      const tint = document.createElement('div');
      tint.id = 'alpha-cover-tint';
      Object.assign(tint.style, {
        position: 'absolute',
        inset: '0',
        background: `linear-gradient(
          135deg,
          ${COLORS.goldDark}30 0%,
          transparent 40%,
          transparent 60%,
          ${COLORS.goldDark}20 100%
        )`,
        pointerEvents: 'none',
        zIndex: '1',
        borderRadius: 'inherit',
        boxShadow: `inset 0 0 0 2px ${COLORS.goldPrime}80`,
      });
      cover.appendChild(tint);
    }
  }

  /* ─────────────────────────────────────────
     DYNAMIC OBSERVER — re-apply on SPA nav
  ───────────────────────────────────────── */
  const observer = new MutationObserver(() => {
    applyCoverTint();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  applyCoverTint();

  /* ─────────────────────────────────────────
     CLEANUP FUNCTION
  ───────────────────────────────────────── */
  window.AlphaEliteRemove = function () {
    ['alpha-elite-theme','alpha-scanlines','alpha-crest',
     'alpha-particles','alpha-statusbar','alpha-badge']
      .forEach(id => document.getElementById(id)?.remove());
    observer.disconnect();
    document.querySelectorAll('#alpha-cover-tint').forEach(el => el.remove());
    console.log('%c ALPHA ELITE theme removed.', 'color:#c9a84c;font-weight:bold;');
  };

  /* ─────────────────────────────────────────
     CONSOLE SIGNATURE
  ───────────────────────────────────────── */
  console.log(
    '%c\n  ⚔  ALPHA ELITE THEME ACTIVE  ⚔  \n',
    `
      background: linear-gradient(135deg, #0a0a0f, #1a1a2e);
      color: #ffd700;
      font-size: 14px;
      font-weight: 900;
      letter-spacing: 3px;
      padding: 12px 24px;
      border: 2px solid #c9a84c;
      border-radius: 6px;
      text-shadow: 0 0 10px #ffd700;
    `
  );
  console.log(
    '%c Type  AlphaEliteRemove()  to disable the theme.',
    'color:#c9a84c; font-style:italic;'
  );

})();
