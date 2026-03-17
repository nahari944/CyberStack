// ═══════════════════════════════════════
//  CyberStack — Shared JS
// ═══════════════════════════════════════

// ─── MATRIX RAIN ───
function initMatrix() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let cols, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 20);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(5,7,10,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#7CFF4F';
    ctx.font = '13px Share Tech Mono';
    drops.forEach((y, i) => {
      const ch = String.fromCharCode(0x30A0 + Math.random() * 96);
      ctx.fillText(ch, i * 20, y * 20);
      if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 55);
}

// ─── LANGUAGE ───
const LANG_KEY = 'cs_lang';

function getLang() {
  return localStorage.getItem(LANG_KEY) || 'en';
}

function applyLang(lang) {
  const isAR = lang === 'ar';
  document.documentElement.lang = lang;
  document.body.dir = isAR ? 'rtl' : 'ltr';
  document.body.classList.toggle('ar', isAR);

  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = isAR ? (el.dataset.ar || el.dataset.en) : el.dataset.en;
  });

  document.querySelectorAll('[data-en-href]').forEach(el => {
    el.href = isAR ? (el.dataset.arHref || el.dataset.enHref) : el.dataset.enHref;
  });

  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = isAR ? 'EN' : 'AR';

  document.querySelectorAll('.en-only').forEach(el => { el.style.display = isAR ? 'none' : ''; });
  document.querySelectorAll('.ar-only').forEach(el => { el.style.display = isAR ? '' : 'none'; });

  // Mark active nav link
  markActiveNav();
}

function toggleLang() {
  const cur = getLang();
  const next = cur === 'en' ? 'ar' : 'en';
  localStorage.setItem(LANG_KEY, next);
  applyLang(next);
}

// ─── ACTIVE NAV ───
function markActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('active', href === path || href === `./${path}`);
  });
}

// ─── NAVBAR SCROLL ───
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ─── MOBILE MENU ───
function initMobileMenu() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileNav');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('open');
  });
}

// ─── SCROLL ANIMATIONS ───
function initFadeUp() {
  const els = document.querySelectorAll('.fade-up');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ─── NAV HTML GENERATOR ───
function buildNav() {
  const pages = [
    { href: 'index.html', en: 'Home', ar: 'الرئيسية' },
    { href: 'programming.html', en: 'Programming', ar: 'البرمجة' },
    { href: 'learn.html', en: 'Learn', ar: 'تعلم' },
    { href: 'specialties.html', en: 'Specialties', ar: 'التخصصات' },
    { href: 'technology.html', en: 'Technology', ar: 'التقنية' },
    { href: 'news.html', en: 'News', ar: 'الأخبار' },
    { href: 'discord.html', en: 'Discord', ar: 'الديسكورد' },
    { href: 'about.html', en: 'About', ar: 'من نحن' },
    { href: 'contact.html', en: 'Contact', ar: 'تواصل' },
  ];

  const navHtml = `
  <canvas id="matrix-bg"></canvas>
  <div class="scanline"></div>
  <div class="grid-bg"></div>

  <nav>
    <a href="index.html" class="nav-logo"><span class="bracket">[</span>Cyber<span style="color:var(--white)">Stack</span><span class="bracket">]</span></a>
    <ul class="nav-links">
      ${pages.map(p => `<li><a href="${p.href}" data-en="${p.en}" data-ar="${p.ar}">${p.en}</a></li>`).join('')}
    </ul>
    <div class="nav-right">
      <button class="btn-lang" id="langBtn" onclick="toggleLang()">AR</button>
      <a href="discord.html" class="btn-discord-nav" data-en="Join Discord" data-ar="انضم إلى الديسكورد">Join Discord</a>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <div class="mobile-nav" id="mobileNav">
    ${pages.map(p => `<a href="${p.href}" data-en="${p.en}" data-ar="${p.ar}">${p.en}</a>`).join('')}
    <a href="discord.html" class="btn btn-primary" style="margin-top:8px;text-align:center;justify-content:center;" data-en="Join Discord" data-ar="انضم إلى الديسكورد">Join Discord</a>
  </div>`;

  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) placeholder.innerHTML = navHtml;

  initMatrix();
  initNavScroll();
  initMobileMenu();
}

// ─── FOOTER HTML ───
function buildFooter() {
  const fp = document.getElementById('footer-placeholder');
  if (!fp) return;
  fp.innerHTML = `
  <footer>
    <div class="footer-grid">
      <div>
        <span class="footer-logo">[CyberStack]</span>
        <p class="footer-desc en-only">The ultimate bilingual community for programmers, hackers, and technology enthusiasts. Learn. Build. Connect.</p>
        <p class="footer-desc ar-only" style="display:none">المجتمع الأمثل للمبرمجين والهاكرز وعشاق التكنولوجيا. تعلّم. ابنِ. تواصل.</p>
        <div class="footer-socials">
          <a href="discord.html" class="footer-social" title="Discord">💬</a>
          <a href="#" class="footer-social" title="Twitter">🐦</a>
          <a href="#" class="footer-social" title="GitHub">⚡</a>
          <a href="#" class="footer-social" title="YouTube">▶</a>
          <a href="#" class="footer-social" title="Instagram">📸</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title en-only">Pages</div>
        <div class="footer-col-title ar-only" style="display:none">الصفحات</div>
        <ul class="footer-links">
          <li><a href="index.html" data-en="Home" data-ar="الرئيسية">Home</a></li>
          <li><a href="programming.html" data-en="Programming" data-ar="البرمجة">Programming</a></li>
          <li><a href="learn.html" data-en="Learn Programming" data-ar="تعلم البرمجة">Learn Programming</a></li>
          <li><a href="specialties.html" data-en="Specialties" data-ar="التخصصات">Specialties</a></li>
          <li><a href="technology.html" data-en="Technology" data-ar="التقنية">Technology</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title en-only">Community</div>
        <div class="footer-col-title ar-only" style="display:none">المجتمع</div>
        <ul class="footer-links">
          <li><a href="news.html" data-en="News" data-ar="الأخبار">News</a></li>
          <li><a href="discord.html" data-en="Discord" data-ar="الديسكورد">Discord</a></li>
          <li><a href="about.html" data-en="About Us" data-ar="من نحن">About Us</a></li>
          <li><a href="contact.html" data-en="Contact" data-ar="تواصل معنا">Contact</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title en-only">Connect</div>
        <div class="footer-col-title ar-only" style="display:none">تواصل</div>
        <ul class="footer-links">
          <li><a href="discord.html">Discord Server</a></li>
          <li><a href="#">Twitter / X</a></li>
          <li><a href="#">GitHub</a></li>
          <li><a href="#">YouTube</a></li>
          <li><a href="#">Instagram</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2025 CYBERSTACK — ALL RIGHTS RESERVED</div>
      <div class="footer-copy" style="color:var(--green)">BUILT FOR THE COMMUNITY ⚡</div>
    </div>
  </footer>`;
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildFooter();
  applyLang(getLang());
  initFadeUp();
});
