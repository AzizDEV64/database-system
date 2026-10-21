// Küçük ERD çizici: Oracle (Barker) gösterimine göre SVG üretir.
//   - ilişki çizgisinin her yarısı kendi tarafındaki varlığa aittir:
//       must  → düz çizgi,  may → kesikli çizgi
//   - çizginin bir varlığa değdiği uçta:
//       many  → crow's foot (karga ayağı),  yoksa single toe (tek çizgi)
//   - bar: UID çubuğu,  diamond: nontransferable elması
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const LINE = 15, HEAD = 24, PAD = 8;

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  function boxHeight(b) {
    let h = HEAD + (b.attrs ? b.attrs.length * LINE : 0) + (b.attrs && b.attrs.length ? 6 : 6);
    if (b.subs) h += b.subs.reduce((s, sb) => s + boxHeight(sb) + 6, 0) + 4;
    return Math.max(h, b.minH || 38);
  }

  function drawBox(b, x, y, w, depth) {
    const h = b.h || boxHeight(b);
    let s = `<rect class="erd-ent${depth ? ' sub' : ''}${b.cls ? ' ' + b.cls : ''}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${depth ? 7 : 11}"/>`;
    s += `<text class="erd-name" x="${x + 9}" y="${y + 17}">${esc(b.name)}</text>`;
    let cy = y + 17;
    (b.attrs || []).forEach(a => {
      cy += LINE;
      // "~" ile başlayan attribute: taşındı (üstü çizili); "!" ile başlayan: sorunlu ya da yeni yerinde (kırmızı)
      let mark = '';
      if (a[0] === '~') { mark = ' erd-struck'; a = a.slice(1); }
      else if (a[0] === '!') { mark = ' erd-new'; a = a.slice(1); }
      const cls = a[0] === '#' || a[0] === '(' ? 'erd-uid' : a[0] === 'o' ? 'erd-opt' : '';
      s += `<text class="erd-attr ${cls}${mark}" x="${x + 9}" y="${cy}">${esc(a)}</text>`;
    });
    if (b.subs) {
      let sy = cy + 10;
      b.subs.forEach(sb => {
        const sh = boxHeight(sb);
        s += drawBox(sb, x + PAD, sy, w - PAD * 2, depth + 1);
        sy += sh + 6;
      });
    }
    return s;
  }

  function anchor(ent, side, off = 0) {
    const h = ent.h || boxHeight(ent);
    switch (side) {
      case 'l': return [ent.x, ent.y + h / 2 + off];
      case 'r': return [ent.x + ent.w, ent.y + h / 2 + off];
      case 't': return [ent.x + ent.w / 2 + off, ent.y];
      default:  return [ent.x + ent.w / 2 + off, ent.y + h];
    }
  }

  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const len = v => Math.hypot(v[0], v[1]);
  const unit = v => { const l = len(v) || 1; return [v[0] / l, v[1] / l]; };
  const add = (a, v, k = 1) => [a[0] + v[0] * k, a[1] + v[1] * k];
  const pts = p => p.map(q => q.map(n => +n.toFixed(1)).join(',')).join(' ');

  // polyline'ı uzunluğunun ortasından ikiye böl
  function split(P) {
    let total = 0;
    for (let i = 1; i < P.length; i++) total += len(sub(P[i], P[i - 1]));
    let half = total / 2, acc = 0;
    for (let i = 1; i < P.length; i++) {
      const seg = len(sub(P[i], P[i - 1]));
      if (acc + seg >= half) {
        const t = (half - acc) / seg;
        const M = [P[i - 1][0] + (P[i][0] - P[i - 1][0]) * t, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * t];
        return [P.slice(0, i).concat([M]), [M].concat(P.slice(i))];
      }
      acc += seg;
    }
    return [P, P];
  }

  function endDecor(E, d, end, cls) {
    const n = [-d[1], d[0]];
    let s = '';
    if (end.many) {
      const Q = add(E, d, 15);
      s += `<polyline class="erd-line ${cls}" points="${pts([add(E, n, 9), Q, add(E, n, -9)])}"/>`;
    }
    if (end.bar) {
      const B = add(E, d, end.many ? 22 : 12);
      s += `<line class="erd-line bar ${cls}" x1="${add(B, n, 8)[0]}" y1="${add(B, n, 8)[1]}" x2="${add(B, n, -8)[0]}" y2="${add(B, n, -8)[1]}"/>`;
    }
    if (end.diamond) {
      const C = add(E, d, end.many ? 30 : 22);
      s += `<polygon class="erd-diamond" points="${pts([add(C, d, 8), add(C, n, 6), add(C, d, -8), add(C, n, -6)])}"/>`;
    }
    if (end.label) {
      let x, y, a;
      if (Math.abs(d[0]) > Math.abs(d[1])) {           // yatay çizgi
        x = E[0] + d[0] * 8; y = E[1] - 7; a = d[0] > 0 ? 'start' : 'end';
      } else {                                         // dikey çizgi
        x = E[0] - 7; y = E[1] + d[1] * 22 + (d[1] > 0 ? 6 : 4); a = 'end';
      }
      if (end.lx != null) x = end.lx;
      if (end.ly != null) y = end.ly;
      if (end.anchor) a = end.anchor;
      s += `<text class="erd-label ${cls}" x="${x}" y="${y}" text-anchor="${a}">${esc(end.label)}</text>`;
    }
    return s;
  }

  function render(spec) {
    const byId = {};
    spec.ents.forEach(e => { e.h = e.h || boxHeight(e); byId[e.id] = e; });
    let body = '', over = '';

    // r.over: kutuların üstüne çizilir (ör. supertype içindeki bir subtype'a giden çizgi)
    (spec.rels || []).forEach(r => {
      const cls = r.cls || '';
      const A = anchor(byId[r.a.e], r.a.side, r.a.off);
      const B = anchor(byId[r.b.e], r.b.side, r.b.off);
      const P = [A].concat(r.via || [], [B]);
      const [pa, pb] = split(P);
      let s = `<polyline class="erd-line ${cls}${r.a.must ? '' : ' dash'}" points="${pts(pa)}"/>`;
      s += `<polyline class="erd-line ${cls}${r.b.must ? '' : ' dash'}" points="${pts(pb)}"/>`;
      s += endDecor(A, unit(sub(P[1], P[0])), r.a, cls);
      s += endDecor(B, unit(sub(P[P.length - 2], P[P.length - 1])), r.b, cls);
      if (r.over) over += s; else body += s;
    });

    // e.hidden: sadece bağlantı noktası, çizilmez (subtype kutusunun konumu)
    let boxes = '';
    spec.ents.forEach(e => { if (!e.hidden) boxes += drawBox(e, e.x, e.y, e.w, 0); });
    boxes += over;

    let notes = '';
    (spec.notes || []).forEach(n => {
      notes += `<text class="erd-note ${n.cls || ''}" x="${n.x}" y="${n.y}" text-anchor="${n.anchor || 'start'}">${esc(n.text)}</text>`;
    });

    return `<svg viewBox="0 0 ${spec.w} ${spec.h}" style="max-width:${spec.w}px;min-width:${Math.round(spec.w * 0.82)}px" role="img" aria-label="${esc(spec.label || 'ER diyagramı')}">${body}${boxes}${spec.extra || ''}${notes}</svg>`;
  }

  window.renderERDs = function (root) {
    root.querySelectorAll('[data-erd]').forEach(el => {
      const spec = window.ERDS[el.dataset.erd];
      el.innerHTML = spec ? render(spec) : `<p class="muted">Diyagram bulunamadı: ${el.dataset.erd}</p>`;
    });
  };
})();
