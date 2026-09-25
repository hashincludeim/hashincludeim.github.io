/* ==========================================================================
   Hashim Mohamed Salim — portfolio interactions
   Vanilla JS, no dependencies. Content comes from js/data.js (window.SITE).
   ========================================================================== */
(() => {
  'use strict';

  const S = window.SITE;
  if (!S) return;

  const root = document.documentElement;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
  const isTyping = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  const smooth = () => (reduceMotion.matches ? 'auto' : 'smooth');

  /* ------------------------------------------------------------------ */
  /*  Icons (Lucide, MIT)                                               */
  /* ------------------------------------------------------------------ */
  const ICONS = {
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    'arrow-up': '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    'graduation-cap': '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    'badge-check': '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    hash: '<path d="M4 9h16"/><path d="M4 15h16"/><path d="M10 3 8 21"/><path d="M16 3l-2 18"/>',
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    candles: '<path d="M9 5v4"/><rect width="4" height="6" x="7" y="9" rx="1"/><path d="M9 15v2"/><path d="M17 3v2"/><rect width="4" height="8" x="15" y="5" rx="1"/><path d="M17 13v3"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/>',
    cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    play: '<path d="M6 3.8v16.4a.8.8 0 0 0 1.2.7l13.4-8.2a.8.8 0 0 0 0-1.4L7.2 3.1a.8.8 0 0 0-1.2.7Z"/>',
  };

  const icon = (name, cls = '') =>
    `<svg class="icon${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;

  const hydrateIcons = () => $$('[data-icon]').forEach((el) => (el.outerHTML = icon(el.dataset.icon, el.className)));

  /* ------------------------------------------------------------------ */
  /*  Project illustrations: small generative SVGs, one per project     */
  /* ------------------------------------------------------------------ */
  const f = (n) => Math.round(n * 10) / 10;

  // Deterministic PRNG so every project always draws the same picture.
  function seeded(str) {
    let a = 2166136261;
    for (let i = 0; i < str.length; i++) a = Math.imul(a ^ str.charCodeAt(i), 16777619);
    return () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const VIZ = {
    // Audio fingerprint: spectrum bars with hashed peak pairs above them.
    spectrum(r) {
      const n = 46, x0 = 24, x1 = 296, cy = 80, step = (x1 - x0) / (n - 1);
      const peaks = [];
      let bars = '';
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1);
        const env = Math.pow(Math.sin(Math.PI * t), 0.7);
        const h = Math.min(106, 6 + env * (16 + 74 * (0.55 * Math.abs(Math.sin(i * 0.9)) + 0.45 * r())));
        const x = x0 + i * step;
        const peak = i % 6 === 3 && env > 0.3;
        bars += `<rect class="bar ${peak ? 'fa' : 'fb'}" x="${f(x - 1.6)}" y="${f(cy - h / 2)}" width="3.2" height="${f(h)}" rx="1.6" style="--i:${i}"/>`;
        if (peak) peaks.push([f(x), f(cy - h / 2 - 10)]);
      }
      let links = '';
      peaks.forEach(([x, y], i) => {
        [1, 2].forEach((k) => {
          const q = peaks[i + k];
          if (q) links += `<line class="ac thin" x1="${x}" y1="${y}" x2="${q[0]}" y2="${q[1]}"/>`;
        });
      });
      const nodes = peaks.map(([x, y]) => `<circle class="fa" cx="${x}" cy="${y}" r="2.4"/>`).join('');
      return `${links}${bars}${nodes}
        <text class="tx" x="${x0}" y="152">FINGERPRINT · SHA-1</text>
        <text class="tx tx-a" x="${x1}" y="152" text-anchor="end">MATCH 92%</text>`;
    },

    // Forecast: actual price (grey) vs model prediction (accent) with a confidence cone.
    forecast(r, id) {
      const n = 42, x0 = 18, x1 = 302, top = 34, bot = 124;
      const vals = [];
      let v = 0;
      for (let i = 0; i < n; i++) {
        v += (r() - 0.43) * 1.4;
        vals.push(v);
      }
      const lo = Math.min(...vals), hi = Math.max(...vals);
      const X = (i) => x0 + (i / (n - 1)) * (x1 - x0);
      const Y = (val) => bot - ((val - lo) / (hi - lo || 1)) * (bot - top);
      const pred = vals.map((_, i) => {
        const win = vals.slice(Math.max(0, i - 3), i + 1);
        return win.reduce((a, b) => a + b, 0) / win.length + (r() - 0.5) * 0.3;
      });
      const path = (arr, a = 0, b = arr.length) =>
        arr.slice(a, b).map((val, k) => `${k ? 'L' : 'M'}${f(X(a + k))} ${f(Y(val))}`).join(' ');
      const split = Math.round(n * 0.7);
      const spread = (hi - lo) * 0.2;
      const up = [], dn = [];
      for (let i = split - 1; i < n; i++) {
        const k = (i - split + 1) / (n - split);
        up.push(`${f(X(i))} ${f(Y(pred[i] + spread * k))}`);
        dn.unshift(`${f(X(i))} ${f(Y(pred[i] - spread * k))}`);
      }
      const sx = f(X(split - 1));
      const lx = f(X(n - 1)), ly = f(Y(pred[n - 1]));
      const grid = [0, 1, 2, 3]
        .map((k) => {
          const y = f(top + (k * (bot - top)) / 3);
          return `<line class="gl" x1="${x0}" x2="${x1}" y1="${y}" y2="${y}"/>`;
        })
        .join('');
      return `<defs><linearGradient id="fg-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".22"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>
        ${grid}
        <path d="${path(pred)} L${x1} ${bot + 16} L${x0} ${bot + 16} Z" fill="url(#fg-${id})"/>
        <path class="halo" d="M${up.join(' L')} L${dn.join(' L')} Z"/>
        <path class="ln" d="${path(vals, 0, split)}"/>
        <path class="ln dashed" d="${path(vals, split - 1)}"/>
        <path class="ac draw" pathLength="1" d="${path(pred)}"/>
        <line class="gl" x1="${sx}" x2="${sx}" y1="22" y2="${bot + 16}"/>
        <text class="tx" x="${f(sx + 6)}" y="28">FORECAST</text>
        <text class="tx" x="${x0}" y="154">RF · SVM · GBM</text>
        <circle class="halo pulse-ring" cx="${lx}" cy="${ly}" r="6"/>
        <circle class="fa" cx="${lx}" cy="${ly}" r="3"/>`;
    },

    // Candlesticks with a moving average and a live price tag.
    candles(r) {
      const n = 22, x0 = 22, x1 = 262, top = 30, bot = 130, step = (x1 - x0) / (n - 1);
      const data = [];
      let o = 50;
      for (let i = 0; i < n; i++) {
        const c = o + (r() - 0.42) * 12;
        data.push({ o, c, h: Math.max(o, c) + r() * 5, l: Math.min(o, c) - r() * 5 });
        o = c;
      }
      const lo = Math.min(...data.map((d) => d.l)), hi = Math.max(...data.map((d) => d.h));
      const Y = (val) => bot - ((val - lo) / (hi - lo || 1)) * (bot - top);
      let s = [0, 1, 2, 3]
        .map((k) => {
          const y = f(top + (k * (bot - top)) / 3);
          return `<line class="gl" x1="${x0 - 8}" x2="${x1 + 8}" y1="${y}" y2="${y}"/>`;
        })
        .join('');
      data.forEach((d, i) => {
        const x = f(x0 + i * step), up = d.c >= d.o;
        const yt = Y(Math.max(d.o, d.c)), yb = Y(Math.min(d.o, d.c));
        s += `<g class="cdl ${up ? 'up' : 'dn'}" style="--i:${i}"><line x1="${x}" x2="${x}" y1="${f(Y(d.h))}" y2="${f(Y(d.l))}" stroke-width="1.2"/><rect x="${f(x - 3.5)}" y="${f(yt)}" width="7" height="${f(Math.max(1.5, yb - yt))}" rx="1.5"/></g>`;
      });
      const ma = data.map((d, i) => {
        const w = data.slice(Math.max(0, i - 4), i + 1);
        return w.reduce((a, b) => a + b.c, 0) / w.length;
      });
      s += `<path class="ma draw" pathLength="1" d="${ma.map((val, i) => `${i ? 'L' : 'M'}${f(x0 + i * step)} ${f(Y(val))}`).join(' ')}"/>`;
      const last = data[n - 1].c, ly = f(Y(last));
      const chg = ((last - data[0].o) / Math.abs(data[0].o)) * 100;
      s += `<line class="ac dashed thin" x1="${x0}" x2="274" y1="${ly}" y2="${ly}"/>
        <rect class="tag" x="274" y="${f(ly - 9)}" width="40" height="18" rx="5"/>
        <text class="tag-tx" x="294" y="${f(ly + 3)}" text-anchor="middle">${chg >= 0 ? '+' : '−'}${Math.abs(chg).toFixed(1)}%</text>
        <text class="tx" x="${x0 - 8}" y="154">BACKTEST · CAPM</text>`;
      return s;
    },

    // Blocks linked into a chain, with a packet travelling across on hover.
    chain(r) {
      const s = 46, y = 50, xs = [22, 99, 176, 253];
      const hex = () => Math.floor(r() * 0xffff).toString(16).padStart(4, '0');
      let out = '';
      for (let i = 0; i < 3; i++) {
        const xa = xs[i] + s, xb = xs[i + 1], cy = y + s / 2;
        out += `<line class="ln" x1="${xa}" x2="${xb}" y1="${cy}" y2="${cy}"/><rect class="link" x="${f((xa + xb) / 2 - 6)}" y="${cy - 3}" width="12" height="6" rx="3"/>`;
      }
      xs.forEach((x, i) => {
        out += `<g class="blk" style="--i:${i}">
            <rect class="blk__box" x="${x}" y="${y}" width="${s}" height="${s}" rx="10"/>
            <rect class="${i === 3 ? 'fa' : 'fb'}" x="${x + 9}" y="${y + 10}" width="18" height="4" rx="2"/>
            <rect class="fl" x="${x + 9}" y="${y + 20}" width="28" height="3" rx="1.5"/>
            <rect class="fl" x="${x + 9}" y="${y + 27}" width="22" height="3" rx="1.5"/>
            <rect class="fl" x="${x + 9}" y="${y + 34}" width="14" height="3" rx="1.5"/>
          </g>
          <text class="tx" x="${x + s / 2}" y="${y - 10}" text-anchor="middle">${String(i).padStart(2, '0')}</text>
          <text class="tx" x="${x + s / 2}" y="${y + s + 18}" text-anchor="middle">0x${hex()}</text>`;
      });
      out += `<circle class="fa travel" cx="${xs[0] + s}" cy="${y + s / 2}" r="3" style="--dist:${xs[3] - xs[0] - s}px"/>
        <text class="tx" x="22" y="154">SMART CONTRACTS · SOLIDITY</text>`;
      return out;
    },

    // Source skeleton → GAN → target skeleton in a new pose.
    pose() {
      const A = {
        head: [0, -57], neck: [0, -45], ls: [-13, -40], rs: [13, -40], le: [-17, -21], re: [17, -21],
        lw: [-19, -3], rw: [19, -3], hc: [0, 0], lh: [-8, 0], rh: [8, 0], lk: [-10, 22], rk: [10, 22], la: [-11, 44], ra: [11, 44],
      };
      const B = {
        head: [3, -57], neck: [0, -45], ls: [-13, -40], rs: [13, -40], le: [-27, -53], re: [27, -30],
        lw: [-33, -69], rw: [42, -37], hc: [0, 0], lh: [-8, 0], rh: [8, 0], lk: [-19, 19], rk: [12, 22], la: [-30, 38], ra: [15, 44],
      };
      const bones = [
        ['neck', 'ls'], ['neck', 'rs'], ['ls', 'le'], ['le', 'lw'], ['rs', 're'], ['re', 'rw'], ['neck', 'hc'],
        ['hc', 'lh'], ['hc', 'rh'], ['lh', 'lk'], ['lk', 'la'], ['rh', 'rk'], ['rk', 'ra'],
      ];
      const fig = (P, ox, oy, target) => {
        const pt = (k) => [f(P[k][0] + ox), f(P[k][1] + oy)];
        const cls = target ? 'ac' : 'ln';
        let s = bones
          .map(([a, b]) => {
            const [x1, y1] = pt(a), [x2, y2] = pt(b);
            return `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
          })
          .join('');
        const [hx, hy] = pt('head');
        s += `<circle class="${cls}" cx="${hx}" cy="${hy}" r="7"/>`;
        s += Object.keys(P)
          .filter((k) => k !== 'head' && k !== 'hc')
          .map((k) => {
            const [x, y] = pt(k);
            return target
              ? `<circle class="halo" cx="${x}" cy="${y}" r="5"/><circle class="fa joint" cx="${x}" cy="${y}" r="2.2"/>`
              : `<circle class="jn" cx="${x}" cy="${y}" r="2.2"/>`;
          })
          .join('');
        return s;
      };
      return `${fig(A, 78, 96, false)}${fig(B, 242, 96, true)}
        <path class="ln flow" d="M112 84 H138"/>
        <rect class="box" x="140" y="75" width="40" height="18" rx="9"/>
        <text class="tx tx-a" x="160" y="87" text-anchor="middle">GAN</text>
        <path class="ac flow" d="M182 84 H204"/><path class="ac" d="M200 80 l4 4 -4 4"/>
        <text class="tx" x="78" y="155" text-anchor="middle">SOURCE</text>
        <text class="tx" x="242" y="155" text-anchor="middle">TARGET</text>`;
    },

    // Carbon credits flowing between corporations and individuals.
    exchange() {
      const cx = 160, cy = 80, ys = [40, 80, 120];
      let s = '';
      ys.forEach((y, i) => {
        s += `<path class="${i === 1 ? 'ac flow' : 'ln'}" d="M58 ${y} C 100 ${y}, 110 ${cy}, ${cx - 24} ${cy}"/>`;
        s += `<path class="${i === 0 ? 'ac flow' : 'ln'}" d="M${cx + 24} ${cy} C 210 ${cy}, 220 ${y}, 262 ${y}"/>`;
      });
      ys.forEach((y, i) => {
        s += `<rect class="${i === 1 ? 'box-a' : 'box'}" x="40" y="${y - 9}" width="18" height="18" rx="4"/>`;
        s += `<circle class="${i === 0 ? 'box-a' : 'box'}" cx="271" cy="${y}" r="9"/>`;
      });
      s += `<circle class="ln dashed spin" cx="${cx}" cy="${cy}" r="33"/>
        <circle class="core" cx="${cx}" cy="${cy}" r="22"/>
        <text class="tx tx-a" x="${cx}" y="${cy + 3}" text-anchor="middle">CO2</text>
        <text class="tx" x="49" y="150" text-anchor="middle">CORPORATES</text>
        <text class="tx" x="271" y="150" text-anchor="middle">PEOPLE</text>`;
      return s;
    },

    // Luggage route across airports (the ones from Hashim's own journey).
    network() {
      const N = { JFK: [34, 98], EMA: [108, 46], LHR: [128, 100], DOH: [206, 64], DXB: [240, 112], COK: [290, 122] };
      const edges = [['JFK', 'EMA'], ['JFK', 'LHR'], ['EMA', 'LHR'], ['EMA', 'DOH'], ['LHR', 'DXB'], ['DOH', 'DXB'], ['DXB', 'COK']];
      const route = ['COK', 'DOH', 'LHR', 'EMA'];
      const curve = (a, b) => {
        const [x1, y1] = N[a], [x2, y2] = N[b];
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
        let nx = -dy / len, ny = dx / len;
        if (ny > 0) { nx = -nx; ny = -ny; }
        const bend = len * 0.22;
        return `M${x1} ${y1} Q${f((x1 + x2) / 2 + nx * bend)} ${f((y1 + y2) / 2 + ny * bend)} ${x2} ${y2}`;
      };
      let s = edges
        .map(([a, b]) => `<line class="ln thin" x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}"/>`)
        .join('');
      s += route.slice(0, -1).map((a, i) => `<path class="ac flow" d="${curve(a, route[i + 1])}"/>`).join('');
      Object.entries(N).forEach(([code, [x, y]]) => {
        const on = route.includes(code);
        s += `${on ? `<circle class="halo" cx="${x}" cy="${y}" r="7"/>` : ''}<circle class="${on ? 'fa' : 'jn'}" cx="${x}" cy="${y}" r="3.5"/>
          <text class="tx${on ? ' tx-a' : ''}" x="${x}" y="${y - 12}" text-anchor="middle">${code}</text>`;
      });
      s += '<text class="tx" x="22" y="154">HYPERLEDGER · BAG TRACKING</text>';
      return s;
    },

    // A tiny storefront in a browser window.
    storefront() {
      let s = `<rect class="box" x="44" y="14" width="232" height="132" rx="10"/>
        <line class="gs" x1="44" x2="276" y1="32" y2="32"/>
        ${[56, 64, 72].map((x) => `<circle class="fb" cx="${x}" cy="23" r="2.4"/>`).join('')}
        <rect class="fl" x="110" y="18.5" width="100" height="9" rx="4.5"/>`;
      const cw = 64, ch = 42, gap = 8, ox = 56, oy = 42;
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
          const k = row * 3 + col, x = ox + col * (cw + gap), y = oy + row * (ch + gap), on = k === 1;
          s += `<g class="prod" style="--i:${k}">
              <rect class="${on ? 'box-a' : 'box'}" x="${x}" y="${y}" width="${cw}" height="${ch}" rx="6"/>
              <rect class="fl" x="${x + 6}" y="${y + 6}" width="${cw - 12}" height="18" rx="3"/>
              <rect class="fb" x="${x + 6}" y="${y + 29}" width="30" height="3.5" rx="1.75"/>
              <rect class="${on ? 'fa' : 'fl'}" x="${x + 6}" y="${y + 35}" width="16" height="3.5" rx="1.75"/>
            </g>`;
        }
      }
      s += `<circle class="fa" cx="192" cy="42" r="8"/><text class="tag-tx" x="192" y="45" text-anchor="middle">+1</text>
        <path class="cursor" d="M174 62 l0 13 l3.6 -3.4 l2.6 5.6 l2.4 -1.1 l-2.6 -5.5 l5 -.4 Z"/>`;
      return s;
    },
  };

  // "Top 20 of 800,000": a field of dots with one lit up.
  function dotField() {
    const cols = 44, rows = 12, g = 10, pad = 6, tx = 33, ty = 3;
    const w = (cols - 1) * g + pad * 2, h = (rows - 1) * g + pad * 2;
    let dots = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (x !== tx || y !== ty) dots += `<circle cx="${pad + x * g}" cy="${pad + y * g}" r="1.5"/>`;
      }
    }
    const cx = pad + tx * g, cy = pad + ty * g;
    return `<svg class="field" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false">
      <g class="field__dots">${dots}</g>
      <circle class="field__ring" cx="${cx}" cy="${cy}" r="6"/>
      <circle class="field__you" cx="${cx}" cy="${cy}" r="3.2"/>
    </svg>`;
  }

  /* ------------------------------------------------------------------ */
  /*  Rendering                                                          */
  /* ------------------------------------------------------------------ */
  const catLabel = (id) => (S.categories.find((c) => c.id === id) || {}).label || id;
  const tagList = (items) => `<ul class="tags" role="list">${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;

  function renderStatic() {
    const status = $('#status');
    if (S.status) $('#statusText').textContent = S.status;
    else status.hidden = true;

    $$('[data-email-link]').forEach((a) => (a.href = `mailto:${S.email}`));
    $$('[data-email-text]').forEach((a) => (a.textContent = S.email));
    $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
    $$('[data-kbd-mod]').forEach((el) => (el.textContent = isMac ? '⌘K' : 'Ctrl K'));
  }

  function renderStats() {
    $('#stats').innerHTML = S.stats
      .map(
        (s, i) => `<div class="stat reveal" style="--rd:${i * 90}ms">
          <p class="stat__value">${s.prefix ? `<span class="stat__affix stat__affix--pre">${esc(s.prefix)}</span>` : ''}<span data-count data-to="${s.value}">${s.value.toLocaleString('en-GB')}</span>${s.suffix ? `<span class="stat__affix">${esc(s.suffix)}</span>` : ''}</p>
          <p class="stat__label">${esc(s.label)}</p>
        </div>`
      )
      .join('');
  }

  function renderFocus() {
    $('#focus').innerHTML = S.focus
      .map(
        (x, i) => `<li class="focus__item spot reveal" style="--rd:${i * 80}ms">
          <span class="focus__icon">${icon(x.icon)}</span>
          <h3 class="focus__title">${esc(x.title)}</h3>
          <p class="focus__text">${esc(x.text)}</p>
        </li>`
      )
      .join('');
  }

  function renderExperience() {
    $('#timeline').innerHTML = S.experience
      .map(
        (e) => `<li class="tl-item reveal" id="exp-${slug(e.org)}">
          <div class="tl-item__meta"><span class="tl-period">${esc(e.period)}</span><span class="tl-loc">${esc(e.location)}</span></div>
          <div class="tl-item__dot" aria-hidden="true"></div>
          <article class="tl-card spot">
            <header class="tl-card__head">
              <div>
                <p class="tl-card__type"><span class="type-dot" data-type="${slug(e.type)}"></span>${esc(e.type)}${e.current ? '<span class="badge-live">Current</span>' : ''}</p>
                <h3 class="tl-card__role">${esc(e.role)}</h3>
                <p class="tl-card__org">${esc(e.org)}</p>
              </div>
              ${e.metric ? `<div class="tl-metric"><strong>${esc(e.metric.value)}</strong><span>${esc(e.metric.label)}</span></div>` : ''}
            </header>
            <ul class="points">${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
            ${tagList(e.stack)}
          </article>
        </li>`
      )
      .join('');
  }

  function renderProjects() {
    $('#projectGrid').innerHTML = S.projects
      .map((p, i) => {
        const draw = VIZ[p.visual] || VIZ.chain;
        const links = [
          p.links?.code && `<a class="link-pill" href="${esc(p.links.code)}" target="_blank" rel="noopener">${icon('github')}Code</a>`,
          p.links?.live && `<a class="link-pill" href="${esc(p.links.live)}" target="_blank" rel="noopener">${icon('arrow-up-right')}Live</a>`,
        ]
          .filter(Boolean)
          .join('');
        return `<article class="project spot reveal" id="project-${esc(p.id)}" data-cats="${esc(p.categories.join(' '))}" style="--rd:${(i % 3) * 90}ms">
          <div class="project__media">
            <svg class="viz viz--${esc(p.visual)}" viewBox="0 0 320 160" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">${draw(seeded(p.id), p.id)}</svg>
          </div>
          <div class="project__body">
            <div class="project__top">
              <span class="project__cat">${esc(p.categories.map(catLabel).join(' · '))}</span>
              ${p.metric ? `<span class="project__metric">${esc(p.metric)}</span>` : ''}
            </div>
            <h3 class="project__title">${esc(p.title)}</h3>
            <p class="project__blurb">${esc(p.blurb)}</p>
            <div class="project__foot">
              ${tagList(p.stack)}
              ${links ? `<div class="project__links">${links}</div>` : ''}
            </div>
          </div>
        </article>`;
      })
      .join('');

    // Closing card, only shown under the "All" filter.
    $('#projectGrid').insertAdjacentHTML(
      'beforeend',
      `<article class="project project--cta reveal" data-cats="__all" style="--rd:${(S.projects.length % 3) * 90}ms">
        <p class="kicker">${icon('code')}Behind the build</p>
        <h3 class="project-cta__title">Want a <em>deeper look?</em></h3>
        <p class="project-cta__text">I’m happy to walk through the code, architecture and trade-offs behind any of these projects.</p>
        <div class="project-cta__actions">
          <a class="btn btn--primary" href="#contact">Get in touch ${icon('arrow-right')}</a>
          ${S.links.github ? `<a class="btn btn--ghost" href="${esc(S.links.github)}" target="_blank" rel="noopener">${icon('github')}GitHub</a>` : ''}
        </div>
      </article>`
    );
  }

  function renderEducation() {
    $('#edu').innerHTML = S.education
      .map(
        (ed, i) => `<article class="edu__card spot reveal" id="edu-${slug(ed.degree)}" style="--rd:${i * 90}ms">
          <div class="edu__top"><span class="edu__icon">${icon('graduation-cap')}</span><span class="edu__period">${esc(ed.period)}</span></div>
          <h3 class="edu__degree">${esc(ed.degree)}</h3>
          <p class="edu__school">${esc(ed.school)} <span>· ${esc(ed.location)}</span></p>
          ${ed.honours ? `<p class="edu__honours">${icon('award')}${esc(ed.honours)}</p>` : ''}
          ${tagList(ed.modules)}
        </article>`
      )
      .join('');
  }

  function renderAchievements() {
    const A = S.achievements, h = A.hackathon, c = A.challenge;
    const pct = ((h.rank / h.of) * 100).toFixed(4).replace(/\.?0+$/, '');
    const list = (items) => `<ul class="dot-list" role="list">${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
    $('#bento').innerHTML = `
      <article class="bento__card bento__card--wide spot reveal hack">
        <div>
          <p class="kicker">${icon('award')}${esc(h.kicker)}</p>
          <p class="hack__num"><span class="hack__pre">Top</span><span data-count data-from="${h.of}" data-to="${h.rank}" data-scale="log">${h.rank}</span></p>
          <p class="hack__of">out of ${h.of.toLocaleString('en-GB')} participants</p>
          <p class="bento__text">${esc(h.text)}</p>
        </div>
        <div class="hack__field">${dotField()}<p class="hack__caption">Top ${pct}% of the field</p></div>
      </article>
      <article class="bento__card spot reveal" style="--rd:90ms">
        <p class="kicker">${icon('trophy')}${esc(c.kicker)}</p>
        <h3 class="bento__title">${esc(c.title)}</h3>
        <p class="bento__text">${esc(c.text)}</p>
        <p class="bento__foot">${esc(c.meta)}</p>
      </article>
      <article class="bento__card spot reveal">
        <p class="kicker">${icon('badge-check')}Certifications</p>
        <ul class="cert-list" role="list">${A.certifications.map((x) => `<li><h3>${esc(x.name)}</h3><p>${esc(x.text)}</p></li>`).join('')}</ul>
      </article>
      <article class="bento__card spot reveal" style="--rd:90ms">
        <p class="kicker">${icon('mic')}Leadership &amp; speaking</p>
        ${list(A.leadership)}
      </article>
      <article class="bento__card spot reveal" style="--rd:180ms">
        <p class="kicker">${icon('heart')}Volunteering</p>
        ${list(A.volunteering)}
      </article>`;
  }

  function renderContact() {
    $('#contactLinks').innerHTML = [
      S.links.linkedin && `<a class="btn btn--ghost magnetic" href="${esc(S.links.linkedin)}" target="_blank" rel="noopener">${icon('linkedin')}LinkedIn</a>`,
      S.links.github && `<a class="btn btn--ghost magnetic" href="${esc(S.links.github)}" target="_blank" rel="noopener">${icon('github')}GitHub</a>`,
      `<a class="btn btn--ghost magnetic" href="${esc(S.cv)}" download>${icon('file-text')}Download CV</a>`,
    ]
      .filter(Boolean)
      .join('');
  }

  /* ------------------------------------------------------------------ */
  /*  Navigation helpers                                                 */
  /* ------------------------------------------------------------------ */
  let setFilter = () => {};

  function goTo(target, { flash = false, block = 'start' } = {}) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    if (el.matches('.project') && el.hidden) setFilter('all', false);
    el.classList.add('is-in');
    el.scrollIntoView({ behavior: smooth(), block });
    if (!flash) return;
    const card = el.matches('.spot') ? el : $('.spot', el) || el;
    setTimeout(() => {
      card.classList.remove('flash');
      void card.offsetWidth;
      card.classList.add('flash');
      setTimeout(() => card.classList.remove('flash'), 1800);
    }, reduceMotion.matches ? 0 : 450);
  }

  // Place a sliding pill under the active button without animating the first time.
  function placePill(pill, target, animate = true) {
    if (!target) return;
    if (!animate) pill.style.transition = 'none';
    pill.style.width = `${target.offsetWidth}px`;
    pill.style.transform = `translateX(${target.offsetLeft}px)`;
    if (!animate) {
      void pill.offsetWidth;
      pill.style.transition = '';
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Theme                                                              */
  /* ------------------------------------------------------------------ */
  const currentTheme = () =>
    root.dataset.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function syncThemeColor() {
    const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
    $$('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', bg));
  }

  function setTheme(next, origin) {
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* storage unavailable, the theme still applies for this visit */
      }
      syncThemeColor();
      document.dispatchEvent(new CustomEvent('themechange'));
    };
    if (!document.startViewTransition || reduceMotion.matches) return apply();

    const x = origin ? origin.x : window.innerWidth / 2;
    const y = origin ? origin.y : 0;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = document.startViewTransition(apply);
    vt.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 700, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' }
        );
      })
      .catch(() => {});
  }

  function initTheme() {
    if (root.dataset.theme) syncThemeColor();
    $('#themeToggle').addEventListener('click', (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark', { x: r.left + r.width / 2, y: r.top + r.height / 2 });
    });
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => document.dispatchEvent(new CustomEvent('themechange')));
  }

  /* ------------------------------------------------------------------ */
  /*  Nav: scrolled state, active section pill, mobile menu              */
  /* ------------------------------------------------------------------ */
  function initNav() {
    const nav = $('#nav');
    const links = $$('.nav__links a');
    const pill = $('.nav__pill');
    let activeId = null;
    let placed = false;

    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const place = () => {
      const link = links.find((a) => a.hash === `#${activeId}`);
      links.forEach((a) => (a === link ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
      pill.style.opacity = link ? '1' : '0';
      if (link) {
        placePill(pill, link, placed);
        placed = true;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            activeId = en.target.id;
            place();
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    $$('main > section[id]').forEach((s) => io.observe(s));
    window.addEventListener('resize', place);

    // Mobile menu
    const menu = $('#mobileMenu');
    const btn = $('#menuBtn');
    let open = false;
    const setMenu = (next) => {
      if (next === open) return;
      open = next;
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('no-scroll', open);
      if (open) {
        menu.hidden = false;
        void menu.offsetWidth;
        menu.classList.add('is-open');
      } else {
        menu.classList.remove('is-open');
        setTimeout(() => {
          if (!open) menu.hidden = true;
        }, 320);
      }
    };
    btn.addEventListener('click', () => setMenu(!open));
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) setMenu(false);
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => {
      if (e.matches) setMenu(false);
    });
  }

  function initScrollProgress() {
    const bar = $('.scroll-progress span');
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? clamp(window.scrollY / max, 0, 1) : 0})`;
    };
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  /* ------------------------------------------------------------------ */
  /*  Hero: split title + interactive dot field                          */
  /* ------------------------------------------------------------------ */
  function splitTitle() {
    const el = $('[data-split]');
    if (!el) return;
    const text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.innerHTML = text
      .split(/\s+/)
      .map((w, i) => `<span class="w" aria-hidden="true"><span class="w__i" style="--d:${120 + i * 90}ms">${esc(w)}</span></span>`)
      .join(' ');
    el.classList.add('is-split');
  }

  function initHeroCanvas() {
    const canvas = $('.hero__canvas');
    const hero = $('.hero');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const TAU = Math.PI * 2, GAP = 28;
    let w = 0, h = 0, pts = new Float32Array(0), col = {}, raf = 0, running = false, inView = true;
    const p = { x: 0, y: 0, tx: 0, ty: 0, last: -Infinity, init: false };

    const readColors = () => {
      const cs = getComputedStyle(root);
      col = { dot: cs.getPropertyValue('--dot').trim(), accent: cs.getPropertyValue('--accent').trim() };
    };

    const draw = (t) => {
      // With no recent pointer movement, the lens drifts on a slow Lissajous path.
      if (performance.now() - p.last > 2600) {
        p.tx = w * (0.62 + 0.26 * Math.sin(t * 0.00023));
        p.ty = h * (0.42 + 0.2 * Math.sin(t * 0.00037 + 1.2));
      }
      if (!p.init) {
        p.x = p.tx;
        p.y = p.ty;
        p.init = true;
      }
      p.x += (p.tx - p.x) * 0.075;
      p.y += (p.ty - p.y) * 0.075;

      const R = clamp(w * 0.16, 140, 240), R2 = R * R;
      const hot = [];
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      for (let k = 0; k < pts.length; k += 2) {
        let x = pts[k], y = pts[k + 1], r = 0.85;
        const dx = x - p.x, dy = y - p.y, d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          const d = Math.sqrt(d2) || 1, q = 1 - d / R, e = q * q * (3 - 2 * q);
          x += (dx / d) * e * 7;
          y += (dy / d) * e * 7;
          r += e * 1.4;
          hot.push(x, y, r, e);
        }
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, TAU);
      }
      ctx.fillStyle = col.dot;
      ctx.fill();
      ctx.fillStyle = col.accent;
      for (let k = 0; k < hot.length; k += 4) {
        ctx.globalAlpha = hot[k + 3] * 0.9;
        ctx.beginPath();
        ctx.arc(hot[k], hot[k + 1], hot[k + 2], 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / GAP) + 1, rows = Math.ceil(h / GAP) + 1;
      const ox = (w - (cols - 1) * GAP) / 2, oy = (h - (rows - 1) * GAP) / 2;
      pts = new Float32Array(cols * rows * 2);
      let k = 0;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          pts[k++] = ox + i * GAP;
          pts[k++] = oy + j * GAP;
        }
      }
      if (!running) draw(performance.now());
    };

    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduceMotion.matches || !inView || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    readColors();
    resize();
    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(([en]) => {
      inView = en.isIntersecting;
      inView ? start() : stop();
    }).observe(hero);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    hero.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      p.tx = e.clientX - rect.left;
      p.ty = e.clientY - rect.top;
      p.last = performance.now();
    });
    document.addEventListener('themechange', () => {
      readColors();
      if (!running) draw(performance.now());
    });
    start();
  }

  /* ------------------------------------------------------------------ */
  /*  Hero code card: typed in, tilts with the pointer, "Run" prints     */
  /* ------------------------------------------------------------------ */
  let runCode = () => {};

  function initCodeCard() {
    const card = $('#codeCard');
    if (!card) return;
    const visual = card.parentElement;
    const lines = $$('.line', card);
    const caret = $('.caret', card);
    const lastLine = lines[lines.length - 1];
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    // Snapshot each line's text nodes so typing can rebuild them without losing the syntax spans.
    const jobs = lines.map((line) => {
      const nodes = [];
      const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) nodes.push({ node: walker.currentNode, text: walker.currentNode.nodeValue });
      return { line, nodes };
    });

    let typing = false;
    const finish = () => {
      typing = false;
      jobs.forEach(({ line, nodes }) => {
        nodes.forEach((n) => (n.node.nodeValue = n.text));
        line.classList.remove('is-pending', 'is-active');
      });
      lastLine.appendChild(caret);
      card.classList.remove('is-typing');
      card.classList.add('is-typed');
    };

    const type = async () => {
      typing = true;
      jobs.forEach(({ line, nodes }) => {
        nodes.forEach((n) => (n.node.nodeValue = ''));
        line.classList.add('is-pending');
      });
      lines[0].appendChild(caret); // blink on line 1 while the card settles in
      await sleep(1300);
      if (!typing) return;
      card.classList.add('is-typing');

      for (const { line, nodes } of jobs) {
        line.classList.remove('is-pending');
        line.classList.add('is-active');
        let leading = true;
        for (const n of nodes) {
          // Indentation appears instantly; only the code itself is typed.
          let i = 0;
          if (leading) {
            i = n.text.length - n.text.trimStart().length;
            if (n.text.trim()) leading = false;
          }
          n.node.nodeValue = n.text.slice(0, i);
          n.node.parentNode.insertBefore(caret, n.node.nextSibling);
          while (i < n.text.length) {
            i = Math.min(n.text.length, i + 2 + Math.round(Math.random()));
            n.node.nodeValue = n.text.slice(0, i);
            await sleep(14 + Math.random() * 10);
            if (!typing) return;
          }
        }
        await sleep(nodes.some((n) => n.text.trim()) ? 70 : 20);
        if (!typing) return;
        line.classList.remove('is-active');
      }
      finish();
    };

    // Skip the typing when motion is reduced or the page opened in a background tab.
    if (reduceMotion.matches || document.hidden) card.classList.add('is-typed');
    else type();
    // Background tabs throttle timers, so skip straight to the end.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && typing) finish();
    });

    // Gentle 3D tilt + glare. Measured on the untransformed wrapper to avoid feedback.
    if (finePointer.matches && !reduceMotion.matches) {
      visual.addEventListener('pointermove', (e) => {
        const r = visual.getBoundingClientRect();
        const x = clamp((e.clientX - r.left) / r.width, 0, 1);
        const y = clamp((e.clientY - r.top) / r.height, 0, 1);
        card.style.setProperty('--ry', `${((x - 0.5) * 8).toFixed(2)}deg`);
        card.style.setProperty('--rx', `${((0.5 - y) * 6).toFixed(2)}deg`);
        card.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
        card.classList.add('is-tilting');
      });
      visual.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.classList.remove('is-tilting');
      });
    }

    // "Run" opens a small REPL panel and prints the method's return value.
    const runBtn = $('#codeRun');
    const out = $('#codeOut');
    const outBody = $('.code-card__out-body', out);
    const label = $('span', runBtn);
    let running = false;
    runCode = async () => {
      if (running) return;
      running = true;
      if (typing) finish();
      const fast = reduceMotion.matches;
      runBtn.classList.add('is-running');
      label.textContent = 'Running';
      out.classList.add('is-open');
      outBody.innerHTML = '<span class="out-line"><span class="tk-p">&gt;&gt;&gt; </span><span class="out-cmd"></span></span>';
      const cmd = $('.out-cmd', outBody);
      const text = 'Hashim().collaborate()';
      for (let i = 1; i <= text.length; i++) {
        cmd.textContent = text.slice(0, i);
        if (!fast) await sleep(24);
      }
      if (!fast) await sleep(300);
      outBody.insertAdjacentHTML('beforeend', '<span class="out-line out-line--in tk-s">"Let’s build together."</span>');
      if (!fast) await sleep(260);
      outBody.insertAdjacentHTML('beforeend', '<span class="out-line out-line--in tk-cm"># next: <a href="#contact">say hello →</a></span>');
      runBtn.classList.remove('is-running');
      label.textContent = 'Run';
      running = false;
    };
    runBtn.addEventListener('click', runCode);
  }

  function initClock() {
    const els = $$('[data-clock]');
    if (!els.length) return;
    let fmt;
    try {
      fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: S.timezone, timeZoneName: 'short' });
    } catch (e) {
      fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' });
    }
    const tick = () => {
      const s = `${fmt.format(new Date())} local`;
      els.forEach((el) => (el.textContent = s));
    };
    tick();
    setInterval(tick, 15000);
  }

  /* ------------------------------------------------------------------ */
  /*  Scroll reveal, counters and text scramble                          */
  /* ------------------------------------------------------------------ */
  function animateCount(el) {
    const from = parseFloat(el.dataset.from) || 0;
    const to = parseFloat(el.dataset.to) || 0;
    const fmt = (n) => Math.round(n).toLocaleString('en-GB');
    if (reduceMotion.matches || from === to) {
      el.textContent = fmt(to);
      return;
    }
    // A log scale makes "800,000 → 20" feel like climbing a leaderboard.
    const log = el.dataset.scale === 'log' && from > 0 && to > 0;
    const dur = log ? 2400 : 1600;
    const ease = log ? (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) : (t) => 1 - Math.pow(1 - t, 4);
    const t0 = performance.now();
    const tick = (now) => {
      const t = clamp((now - t0) / dur, 0, 1), e = ease(t);
      const v = log ? Math.exp(Math.log(from) + (Math.log(to) - Math.log(from)) * e) : from + (to - from) * e;
      el.textContent = fmt(v);
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = fmt(from);
    requestAnimationFrame(tick);
  }

  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>';
  function scramble(el) {
    const text = el.dataset.text || el.textContent;
    el.dataset.text = text;
    if (reduceMotion.matches) return;
    let frame = 0;
    const tick = () => {
      frame++;
      let out = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += ch === ' ' || frame > 6 + i * 2 ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (frame <= 6 + text.length * 2) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initReveal() {
    const onReveal = (el) => {
      el.classList.add('is-in');
      $$('[data-count]', el).forEach(animateCount);
      $$('[data-scramble]', el).forEach(scramble);
    };
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(onReveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          onReveal(en.target);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------------ */
  /*  Experience timeline progress                                       */
  /* ------------------------------------------------------------------ */
  function initTimeline() {
    const wrap = $('.timeline-wrap');
    const fill = $('.timeline__fill');
    const items = $$('.tl-item');
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = window.innerHeight * 0.55;
      const r = wrap.getBoundingClientRect();
      fill.style.transform = `scaleY(${clamp((line - r.top) / r.height, 0, 1)})`;
      items.forEach((it) => it.classList.toggle('is-active', $('.tl-item__dot', it).getBoundingClientRect().top < line));
    };
    const request = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();
  }

  /* ------------------------------------------------------------------ */
  /*  Project filters with FLIP animation                                */
  /* ------------------------------------------------------------------ */
  function initFilters() {
    const wrap = $('#filters');
    const grid = $('#projectGrid');
    const pill = $('.filters__pill', wrap);
    const cats = [{ id: 'all', label: 'All' }, ...S.categories];

    wrap.insertAdjacentHTML(
      'beforeend',
      cats
        .map((c) => {
          const n = c.id === 'all' ? S.projects.length : S.projects.filter((p) => p.categories.includes(c.id)).length;
          return `<button class="filter" type="button" data-filter="${esc(c.id)}" aria-pressed="${c.id === 'all'}">${esc(c.label)}<span class="filter__count">${n}</span></button>`;
        })
        .join('')
    );
    const buttons = $$('.filter', wrap);
    const active = () => buttons.find((b) => b.getAttribute('aria-pressed') === 'true');

    setFilter = (cat, animate = true) => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === cat)));
      placePill(pill, active());

      const cards = $$('.project', grid);
      const flip = animate && !reduceMotion.matches && typeof grid.animate === 'function';
      const first = new Map();
      if (flip) cards.forEach((c) => !c.hidden && first.set(c, c.getBoundingClientRect()));

      cards.forEach((c) => {
        const show = cat === 'all' || c.dataset.cats.split(' ').includes(cat);
        c.hidden = !show;
        if (show) c.classList.add('is-in');
      });
      if (!flip) return;

      cards.forEach((c) => {
        if (c.hidden) return;
        const last = c.getBoundingClientRect();
        const prev = first.get(c);
        if (prev) {
          const dx = prev.left - last.left, dy = prev.top - last.top;
          if (dx || dy) {
            c.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], {
              duration: 600,
              easing: 'cubic-bezier(.2,.8,.2,1)',
            });
          }
        } else {
          c.animate([{ opacity: 0, transform: 'translateY(16px) scale(.97)' }, { opacity: 1, transform: 'none' }], {
            duration: 500,
            delay: 90,
            easing: 'cubic-bezier(.2,.8,.2,1)',
            fill: 'backwards',
          });
        }
      });
    };

    wrap.addEventListener('click', (e) => {
      const b = e.target.closest('.filter');
      if (!b || b === active()) return;
      setFilter(b.dataset.filter);
      if (wrap.scrollWidth > wrap.clientWidth) {
        wrap.scrollTo({ left: b.offsetLeft - (wrap.clientWidth - b.offsetWidth) / 2, behavior: smooth() });
      }
    });

    const reposition = () => placePill(pill, active(), false);
    reposition();
    window.addEventListener('resize', reposition);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(reposition);
  }

  /* ------------------------------------------------------------------ */
  /*  Skills explorer                                                    */
  /* ------------------------------------------------------------------ */
  function initSkills() {
    const groupsEl = $('#skillGroups');
    const panel = $('#skillPanel');
    const skills = S.skills.map((g) => ({
      group: g.group,
      items: g.items.map((it) => (typeof it === 'string' ? { name: it } : it)),
    }));

    const sources = [
      ...S.experience.map((e) => ({
        type: 'Role', title: e.role, sub: `${e.org} · ${e.period}`, stack: e.stack, target: `#exp-${slug(e.org)}`,
      })),
      ...S.projects.map((p) => ({
        type: 'Project', title: p.title, sub: p.categories.map(catLabel).join(' · '), stack: p.stack, target: `#project-${p.id}`,
      })),
      ...S.education.map((ed) => ({
        type: 'Study', title: ed.degree, sub: `${ed.school} · ${ed.period}`, stack: ed.stack, target: `#edu-${slug(ed.degree)}`,
      })),
    ];
    const evidenceFor = (skill) => {
      const names = [skill.name, ...(skill.aliases || [])].map((n) => n.toLowerCase());
      return sources.filter((src) => src.stack.some((s) => names.includes(s.toLowerCase())));
    };

    groupsEl.innerHTML = skills
      .map(
        (g, gi) => `<div class="skill-group">
          <h3 class="skill-group__title">${esc(g.group)}</h3>
          <div class="chips">${g.items
            .map((s, si) => {
              const n = evidenceFor(s).length;
              return `<button class="chip" type="button" data-g="${gi}" data-s="${si}" aria-pressed="false">${esc(s.name)}${n ? `<span class="chip__count">${n}</span>` : ''}</button>`;
            })
            .join('')}</div>
        </div>`
      )
      .join('');

    const show = (skill, animate) => {
      const ev = evidenceFor(skill);
      const summary = ev.length
        ? `Used in ${ev.length} ${ev.length === 1 ? 'place' : 'places'} across my work, projects and studies.`
        : skill.note || 'Part of my everyday toolkit.';
      panel.innerHTML = `
        <p class="panel__label">Where I’ve used it</p>
        <h3 class="panel__skill">${esc(skill.name)}</h3>
        <p class="panel__summary">${esc(summary)}</p>
        ${ev.length ? `<ul class="evidence" role="list">${ev
          .map(
            (src) => `<li><a class="ev" href="${src.target}" data-goto>
              <span class="ev__type" data-type="${src.type.toLowerCase()}">${src.type}</span>
              <span><span class="ev__title">${esc(src.title)}</span><span class="ev__sub">${esc(src.sub)}</span></span>
              ${icon('arrow-up-right', 'ev__arrow')}
            </a></li>`
          )
          .join('')}</ul>` : ''}`;
      if (!animate || reduceMotion.matches || !panel.animate) return;
      [$('.panel__skill', panel), $('.panel__summary', panel), ...$$('.evidence li', panel)].forEach((el, i) => {
        el.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], {
          duration: 450,
          delay: i * 35,
          easing: 'cubic-bezier(.2,.8,.2,1)',
          fill: 'backwards',
        });
      });
    };

    const select = (chip, animate = true) => {
      $$('.chip', groupsEl).forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      show(skills[chip.dataset.g].items[chip.dataset.s], animate);
    };

    groupsEl.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      select(chip);
      if (window.matchMedia('(max-width: 900px)').matches) panel.scrollIntoView({ behavior: smooth(), block: 'nearest' });
    });

    const first = $('.chip', groupsEl);
    if (first) select(first, false);
  }

  /* ------------------------------------------------------------------ */
  /*  Pointer effects: spotlight borders + magnetic buttons              */
  /* ------------------------------------------------------------------ */
  function initSpotlight() {
    if (!finePointer.matches) return;
    $$('.spot-group').forEach((group) => {
      let raf = 0, ev = null;
      group.addEventListener('pointermove', (e) => {
        ev = e;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          $$('.spot', group).forEach((card) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${ev.clientX - r.left}px`);
            card.style.setProperty('--my', `${ev.clientY - r.top}px`);
          });
        });
      });
    });
  }

  function initMagnetic() {
    if (!finePointer.matches || reduceMotion.matches) return;
    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      el.addEventListener('pointerleave', () => (el.style.transform = ''));
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Actions: copy email, download CV, toast                            */
  /* ------------------------------------------------------------------ */
  let toastTimer = 0;
  function toast(msg) {
    const t = $('#toast');
    t.innerHTML = `<span class="toast__check">${icon('check')}</span>${esc(msg)}`;
    t.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-visible'), 2200);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(S.email);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = S.email;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        /* nothing else to try */
      }
      ta.remove();
    }
    toast('Email copied to clipboard');
  }

  function downloadCV() {
    const a = document.createElement('a');
    a.href = S.cv;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function initActions() {
    $$('[data-copy-email]').forEach((btn) =>
      btn.addEventListener('click', async () => {
        await copyEmail();
        btn.classList.add('is-copied');
        setTimeout(() => btn.classList.remove('is-copied'), 1600);
      })
    );
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-goto]');
      if (!a) return;
      e.preventDefault();
      goTo(a.getAttribute('href'), { flash: true, block: 'center' });
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Command palette (⌘K / Ctrl K / "/")                                */
  /* ------------------------------------------------------------------ */
  function initPalette() {
    const pal = $('#palette');
    const input = $('#paletteInput');
    const list = $('#paletteList');
    let items = [], shown = [], active = 0, open = false, lastFocus = null;

    const build = () => {
      const dark = currentTheme() === 'dark';
      return [
        { group: 'Navigate', label: 'About', icon: 'user', run: () => goTo('#about') },
        { group: 'Navigate', label: 'Experience', icon: 'briefcase', run: () => goTo('#experience'), keywords: 'work jobs career' },
        { group: 'Navigate', label: 'Projects', icon: 'code', run: () => goTo('#projects'), keywords: 'portfolio work' },
        { group: 'Navigate', label: 'Skills', icon: 'layers', run: () => goTo('#skills'), keywords: 'stack tech' },
        { group: 'Navigate', label: 'Education', icon: 'graduation-cap', run: () => goTo('#education'), keywords: 'degree msc university' },
        { group: 'Navigate', label: 'Achievements & leadership', icon: 'award', run: () => goTo('#achievements'), keywords: 'hackathon certificates volunteering' },
        { group: 'Navigate', label: 'Contact', icon: 'mail', run: () => goTo('#contact'), keywords: 'hire email' },
        { group: 'Actions', label: 'Copy email address', icon: 'copy', hint: S.email, run: copyEmail },
        { group: 'Actions', label: 'Send an email', icon: 'mail', run: () => (window.location.href = `mailto:${S.email}`) },
        { group: 'Actions', label: 'Download CV (PDF)', icon: 'download', run: downloadCV, keywords: 'resume' },
        {
          group: 'Actions',
          label: 'Run hashim.py',
          icon: 'play',
          keywords: 'code python terminal',
          run: () => {
            goTo('#top');
            setTimeout(runCode, reduceMotion.matches ? 0 : 450);
          },
        },
        {
          group: 'Actions',
          label: dark ? 'Switch to light theme' : 'Switch to dark theme',
          icon: dark ? 'sun' : 'moon',
          keywords: 'theme mode colour color',
          delay: 220,
          run: () => setTheme(dark ? 'light' : 'dark'),
        },
        ...(S.links.linkedin ? [{ group: 'Links', label: 'LinkedIn', icon: 'linkedin', run: () => window.open(S.links.linkedin, '_blank', 'noopener') }] : []),
        ...(S.links.github ? [{ group: 'Links', label: 'GitHub', icon: 'github', run: () => window.open(S.links.github, '_blank', 'noopener') }] : []),
        ...S.projects.map((p) => ({
          group: 'Projects',
          label: p.title,
          icon: 'hash',
          hint: catLabel(p.categories[0]),
          keywords: `${p.stack.join(' ')} ${p.categories.join(' ')}`,
          run: () => goTo(`#project-${p.id}`, { flash: true, block: 'center' }),
        })),
        ...S.experience.map((e) => ({
          group: 'Experience',
          label: `${e.role} · ${e.org}`,
          icon: 'briefcase',
          hint: e.period,
          keywords: e.stack.join(' '),
          run: () => goTo(`#exp-${slug(e.org)}`, { flash: true, block: 'center' }),
        })),
      ];
    };

    const render = () => {
      const q = input.value.trim().toLowerCase();
      shown = q
        ? items
            .filter((it) => q.split(/\s+/).every((tok) => `${it.label} ${it.group} ${it.keywords || ''}`.toLowerCase().includes(tok)))
            .sort((a, b) => b.label.toLowerCase().startsWith(q) - a.label.toLowerCase().startsWith(q))
        : items;
      active = clamp(active, 0, Math.max(0, shown.length - 1));
      let html = '', group = null;
      shown.forEach((it, i) => {
        if (!q && it.group !== group) {
          group = it.group;
          html += `<li class="palette__group" role="presentation">${esc(group)}</li>`;
        }
        html += `<li class="palette__item${i === active ? ' is-active' : ''}" id="pi-${i}" role="option" aria-selected="${i === active}" data-index="${i}">
          ${icon(it.icon)}<span class="palette__label">${esc(it.label)}</span>${it.hint ? `<span class="palette__hint">${esc(it.hint)}</span>` : q ? `<span class="palette__hint">${esc(it.group)}</span>` : ''}
        </li>`;
      });
      list.innerHTML = html || `<li class="palette__empty">No results for “${esc(input.value)}”</li>`;
      if (shown.length) input.setAttribute('aria-activedescendant', `pi-${active}`);
      else input.removeAttribute('aria-activedescendant');
    };

    const setActive = (i) => {
      if (!shown.length) return;
      active = (i + shown.length) % shown.length;
      $$('.palette__item', list).forEach((li) => {
        const on = Number(li.dataset.index) === active;
        li.classList.toggle('is-active', on);
        li.setAttribute('aria-selected', String(on));
        if (on) li.scrollIntoView({ block: 'nearest' });
      });
      input.setAttribute('aria-activedescendant', `pi-${active}`);
    };

    const openPalette = () => {
      if (open) return;
      open = true;
      lastFocus = document.activeElement;
      items = build();
      input.value = '';
      active = 0;
      render();
      pal.hidden = false;
      void pal.offsetWidth;
      pal.classList.add('is-open');
      document.body.classList.add('no-scroll');
      input.focus();
    };

    // Focus only returns to the opener on dismiss; after an action it would
    // receive the same Enter keystroke and reopen the palette.
    const closePalette = (restoreFocus = true) => {
      if (!open) return;
      open = false;
      pal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      setTimeout(() => {
        if (!open) pal.hidden = true;
      }, 260);
      if (restoreFocus && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
      else input.blur();
    };

    const run = (i) => {
      const it = shown[i];
      if (!it) return;
      closePalette(false);
      if (it.delay) setTimeout(it.run, it.delay);
      else it.run();
    };

    input.addEventListener('input', () => {
      active = 0;
      render();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setActive(active + 1);
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setActive(active - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        run(active);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
      }
    });
    list.addEventListener('mousemove', (e) => {
      const li = e.target.closest('.palette__item');
      if (li && Number(li.dataset.index) !== active) setActive(Number(li.dataset.index));
    });
    list.addEventListener('click', (e) => {
      const li = e.target.closest('.palette__item');
      if (li) run(Number(li.dataset.index));
    });
    pal.addEventListener('click', (e) => {
      if (e.target.closest('[data-close-palette]')) closePalette();
    });
    $$('[data-open-palette]').forEach((b) => b.addEventListener('click', openPalette));
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open ? closePalette() : openPalette();
      } else if (e.key === '/' && !open && !isTyping(e.target)) {
        e.preventDefault();
        openPalette();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Boot                                                               */
  /* ------------------------------------------------------------------ */
  hydrateIcons();
  renderStatic();
  renderStats();
  renderFocus();
  renderExperience();
  renderProjects();
  renderEducation();
  renderAchievements();
  renderContact();

  splitTitle();
  initTheme();
  initNav();
  initScrollProgress();
  initHeroCanvas();
  initCodeCard();
  initClock();
  initFilters();
  initSkills();
  initTimeline();
  initReveal();
  initSpotlight();
  initMagnetic();
  initActions();
  initPalette();
})();
