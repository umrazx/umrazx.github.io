const root = document.documentElement;
const reduce = root.classList.contains('reduce');
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- intro: counter, wipe, name rise ---------- */
function splitName() {
  const h1 = document.querySelector<HTMLElement>('[data-split]');
  if (!h1) return;
  const text = h1.textContent ?? '';
  h1.setAttribute('aria-label', text);
  h1.textContent = '';
  [...text].forEach((c, i) => {
    const s = document.createElement('span');
    s.className = 'ch';
    s.setAttribute('aria-hidden', 'true');
    s.style.setProperty('--i', String(i));
    s.textContent = c;
    h1.append(s);
  });
}

function intro() {
  if (!root.classList.contains('loading')) return;
  const loader = document.getElementById('loader');
  const count = loader?.querySelector<HTMLElement>('.loader-count');
  root.classList.add('intro');
  splitName();
  try { sessionStorage.setItem('intro', '1'); } catch {}
  if (!loader || !count) { root.classList.replace('loading', 'ready'); return; }

  const start = performance.now();
  const dur = 700;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    count.textContent = String(Math.round(p * p * (3 - 2 * p) * 100)).padStart(3, '0');
    if (p < 1) return requestAnimationFrame(tick);
    loader.classList.add('wipe');
    setTimeout(() => {
      loader.classList.add('out');
      root.classList.add('ready');
      setTimeout(() => root.classList.remove('loading'), 720);
    }, 560);
  };
  requestAnimationFrame(tick);
}
intro();

/* ---------- scroll reveals ---------- */
const revealables = document.querySelectorAll<HTMLElement>('[data-reveal], .rise');
if (reduce || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('in'));
} else {
  // stagger siblings that enter together
  document.querySelectorAll<HTMLElement>('.stats, .stack-cols, .achievements, .work-grid').forEach((group) => {
    [...group.children].forEach((el, i) => (el as HTMLElement).style.setProperty('--d', `${(i % 5) * 60}ms`));
  });
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        e.target.querySelector(':scope > .rise')?.classList.add('in');
        io.unobserve(e.target);
        const counter = e.target.querySelector<HTMLElement>('[data-count]');
        if (counter) countUp(counter);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );
  // A .rise line starts fully clipped by its parent, so watch the parent instead.
  revealables.forEach((el) => io.observe(el.classList.contains('rise') ? el.parentElement! : el));
}

/* ---------- numbers count up ---------- */
function countUp(el: HTMLElement) {
  const final = el.dataset.count ?? '';
  const m = final.match(/^(\d+)(.*)$/);
  if (!m || reduce) return;
  const target = Number(m[1]);
  const suffix = m[2];
  const start = performance.now();
  const dur = 1200;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = final;
  };
  requestAnimationFrame(tick);
}

/* ---------- marquee: constant drift, scroll adds speed and sets direction ---------- */
const marquee = document.querySelector<HTMLElement>('.marquee');
const track = marquee?.querySelector<HTMLElement>('.marquee-track');
if (marquee && track && !reduce) {
  track.style.animation = 'none'; // the CSS animation is only the no-JS fallback
  const BASE = 80; // px per second
  let half = track.scrollWidth / 2;
  let x = 0;
  let boost = 0;
  let dir = 1;
  let lastY = window.scrollY;
  let last = performance.now();
  let visible = true;
  let raf = 0;

  const frame = (now: number) => {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    boost *= 0.92;
    x -= dir * BASE * (1 + boost) * dt;
    if (half > 0) {
      if (x <= -half) x += half;
      else if (x > 0) x -= half;
    }
    track.style.transform = `translate3d(${x}px,0,0)`;
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const kick = () => {
    if (raf || !visible || document.hidden) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };
  const measure = () => { half = track.scrollWidth / 2; };

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) dir = dy > 0 ? 1 : -1;
      boost = Math.min(6, boost + Math.abs(dy) * 0.04);
    },
    { passive: true },
  );
  window.addEventListener('resize', measure, { passive: true });
  document.fonts?.ready.then(measure);
  document.addEventListener('visibilitychange', kick);
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    kick();
  }).observe(marquee);
  kick();
}

/* ---------- covers: real colours on touch once in view, cursor on desktop ---------- */
const covers = document.querySelectorAll<HTMLElement>('.cover');
if (!fine && 'IntersectionObserver' in window) {
  const cio = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('inview', e.isIntersecting)),
    { threshold: 0.6 },
  );
  covers.forEach((c) => cio.observe(c));
}

const cursor = document.querySelector<HTMLElement>('.cursor');
if (cursor && fine && !reduce) {
  let x = -200, y = -200, tx = -200, ty = -200, running = false;
  const loop = () => {
    x += (tx - x) * 0.2;
    y += (ty - y) * 0.2;
    cursor.style.setProperty('--x', `${x}px`);
    cursor.style.setProperty('--y', `${y}px`);
    if (Math.abs(tx - x) + Math.abs(ty - y) > 0.3) requestAnimationFrame(loop);
    else running = false;
  };
  window.addEventListener(
    'pointermove',
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!running) { running = true; requestAnimationFrame(loop); }
    },
    { passive: true },
  );
  covers.forEach((c) => {
    c.addEventListener('pointerenter', () => cursor.style.setProperty('--s', '1'));
    c.addEventListener('pointerleave', () => cursor.style.setProperty('--s', '0'));
  });
}

/* ---------- copy email ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  const label = btn.querySelector<HTMLElement>('[data-copy-label]');
  btn.addEventListener('click', async () => {
    const value = btn.dataset.copy ?? '';
    try {
      await navigator.clipboard.writeText(value);
      if (label) label.textContent = 'Copied';
    } catch {
      window.location.href = `mailto:${value}`;
    }
    setTimeout(() => label && (label.textContent = 'Copy email'), 1800);
  });
});

/* ---------- hero shader, loaded when the browser is idle ---------- */
const canvas = document.querySelector<HTMLCanvasElement>('.hero-canvas');
if (canvas) {
  const start = () =>
    import('./shader')
      .then((m) => m.initShader(canvas, reduce))
      .catch((err) => {
        canvas.dataset.shader = 'script-failed';
        console.warn('[hero background] script-failed', err);
      });
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1500 });
  else setTimeout(start, 400);
}
