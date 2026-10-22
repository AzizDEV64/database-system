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

  // ---------- Chen gösterimi (Türkçe bölüm) ----------
  // düğüm türleri: ent (varlık), weak (zayıf varlık), dep (bağımlı varlık),
  //   attr (nitelik), key (anahtar nitelik), derived (türetilmiş), multi (çok değerli),
  //   rel (ilişki), idrel (zayıf varlığın ilişkisi)
  // bağlantı: { a, b, card: '1' | 'n' | 'm', cf: kardinalitenin a'dan b'ye konumu (0-1), via: [[x,y]...], lx, ly }
  function chenNode(n) {
    const L = esc(n.label), len = String(n.label).length;
    let s = '';
    if (n.t === 'ent' || n.t === 'weak' || n.t === 'dep') {
      const w = n.w || Math.max(84, len * 8 + 26), h = 34, x = n.x - w / 2, y = n.y - h / 2;
      s += `<rect class="ch-ent${n.hl ? ' ch-hl' : ''}" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/>`;
      if (n.t === 'weak') s += `<rect class="ch-ent in" x="${x + 4}" y="${y + 4}" width="${w - 8}" height="${h - 8}" rx="1"/>`;
      if (n.t === 'dep') s += `<line class="ch-ent-l" x1="${x}" y1="${y + 7}" x2="${x + w}" y2="${y + 7}"/>`;
      return s + `<text class="ch-t e" x="${n.x}" y="${n.y + (n.t === 'dep' ? 3 : 0)}" dy=".35em" text-anchor="middle">${L}</text>`;
    }
    if (n.t === 'rel' || n.t === 'idrel') {
      const hw = n.w ? n.w / 2 : Math.max(44, len * 4.2 + 22), hh = 23;
      const poly = k => `${n.x - hw * k},${n.y} ${n.x},${n.y - hh * k} ${n.x + hw * k},${n.y} ${n.x},${n.y + hh * k}`;
      s += `<polygon class="ch-rel${n.hl ? ' ch-hl' : ''}" points="${poly(1)}"/>`;
      if (n.t === 'idrel') s += `<polygon class="ch-rel in" points="${poly(0.78)}"/>`;
      return s + `<text class="ch-t r" x="${n.x}" y="${n.y}" dy=".35em" text-anchor="middle">${L}</text>`;
    }
    const rx = n.w ? n.w / 2 : Math.max(32, len * 3.8 + 16), ry = 15;
    s += `<ellipse class="ch-attr${n.t === 'derived' ? ' dash' : ''}${n.hl ? ' ch-hl' : ''}" cx="${n.x}" cy="${n.y}" rx="${rx}" ry="${ry}"/>`;
    if (n.t === 'multi') s += `<ellipse class="ch-attr in" cx="${n.x}" cy="${n.y}" rx="${rx - 4}" ry="${ry - 4}"/>`;
    return s + `<text class="ch-t${n.t === 'key' ? ' k' : ''}" x="${n.x}" y="${n.y}" dy=".35em" text-anchor="middle">${L}</text>`;
  }

  function renderChen(spec) {
    const by = {};
    spec.nodes.forEach(n => { by[n.id] = n; });
    let lines = '', cards = '';
    (spec.links || []).forEach(k => {
      const A = by[k.a], B = by[k.b];
      const P = [[A.x, A.y]].concat(k.via || [], [[B.x, B.y]]);
      lines += `<polyline class="ch-line${k.hl ? ' ch-hl' : ''}" points="${pts(P)}"/>`;
      if (k.card) {
        let x, y;
        if (k.lx != null) { x = k.lx; y = k.ly; }
        else {
          // etiketi varlık kutusunun kenarının hemen dışına, çizginin üstüne (dikey çizgide sağına) koy
          const p0 = P[P.length - 2], p1 = P[P.length - 1];
          const d = unit(sub(p1, p0)), horiz = Math.abs(d[0]) >= Math.abs(d[1]);
          const w = B.w || Math.max(84, String(B.label).length * 8 + 26);
          const back = (horiz ? w / 2 : 17) + 14;
          x = p1[0] - d[0] * back + (horiz ? 0 : 11);
          y = p1[1] - d[1] * back - (horiz ? 11 : 0);
        }
        cards += `<text class="ch-card" x="${x.toFixed(1)}" y="${y.toFixed(1)}" dy=".35em" text-anchor="middle">${esc(k.card)}</text>`;
      }
    });
    const nodes = spec.nodes.map(chenNode).join('');
    const notes = (spec.notes || []).map(n => `<text class="ch-note" x="${n.x}" y="${n.y}" text-anchor="${n.anchor || 'middle'}">${esc(n.text)}</text>`).join('');
    return `<svg viewBox="0 0 ${spec.w} ${spec.h}" style="max-width:${spec.w}px;min-width:${Math.round(spec.w * 0.8)}px" role="img" aria-label="${esc(spec.label || 'Varlık-ilişki şeması')}">${lines}${nodes}${cards}${notes}</svg>`;
  }

  // Tablo hücresi için küçük bir Chen çizimi (birleşik nitelik gibi birkaç şekilli durumlar)
  window.chenSvg = spec => renderChen(spec).replace(/style="[^"]*"/, `class="chen-cell" width="${spec.w}" height="${spec.h}"`);

  // Tablo hücresi için tek bir Chen şekli: shape('derived', 'yaş')
  window.chenShape = function (t, label) {
    const len = String(label).length;
    const isEnt = t === 'ent' || t === 'weak' || t === 'dep', isRel = t === 'rel' || t === 'idrel';
    const w = isEnt ? Math.max(84, len * 8 + 26) : isRel ? Math.max(88, len * 8.4 + 44) : Math.max(64, len * 7.6 + 32);
    const h = isRel ? 48 : isEnt ? 36 : 32;
    return `<svg class="chen-cell" viewBox="0 0 ${w + 4} ${h + 4}" width="${w + 4}" height="${h + 4}" aria-hidden="true">${chenNode({ t, label, x: (w + 4) / 2, y: (h + 4) / 2 })}</svg>`;
  };

  window.renderERDs = function (root) {
    root.querySelectorAll('[data-erd]').forEach(el => {
      const spec = window.ERDS[el.dataset.erd];
      el.innerHTML = spec ? render(spec) : `<p class="muted">Diyagram bulunamadı: ${el.dataset.erd}</p>`;
    });
    root.querySelectorAll('[data-chen]').forEach(el => {
      const spec = window.CHEN[el.dataset.chen];
      el.innerHTML = spec ? renderChen(spec) : `<p class="muted">Diyagram bulunamadı: ${el.dataset.chen}</p>`;
    });
  };
})();
