// İçerik dosyalarında kullanılan küçük "bileşenler".
// Her biri HTML metni döndürür; ders içerikleri bunları birleştirerek yazılır.
window.SECTIONS = [];
window.ERDS = {};
window.QUIZZES = {};

const h2 = (text, id) => `<h2${id ? ` id="${id}"` : ''}>${text}</h2>`;

// Terim
//   en   : İngilizce terim (sınavda bu geçer)
//   tr   : Türkçe karşılığı
//   body : 1-3 cümlelik açıklama
//   o    : { ex: 'örnek', exam: 'slayttaki İngilizce ifade' | [...], star: true (anahtar terim, # ile işaretlenir) }
function term(en, tr, body, o = {}) {
  const exams = o.exam ? [].concat(o.exam) : [];
  return `
  <section class="term${o.star ? ' is-key' : ''}" data-en="${en.replace(/"/g, '&quot;')}" data-tr="${tr}">
    <h3 class="term-head"><span class="term-mark" aria-hidden="true">${o.star ? '#' : '*'}</span><span class="term-en">${en}</span> <span class="term-tr">${tr}</span>${o.star ? '<span class="sr"> (anahtar terim)</span>' : ''}</h3>
    <div class="term-body">${body}</div>
    ${o.ex ? `<p class="term-ex"><b>Örnek:</b> ${o.ex}</p>` : ''}
    ${exams.map(e => `<p class="exam"><span class="exam-tag">Sınavda</span> <span class="exam-text">${e}</span></p>`).join('')}
  </section>`;
}

// Sık karışan iki kavram
const mix = (title, body) => `
  <aside class="callout mix"><p class="callout-title">Karıştırma: ${title}</p><div>${body}</div></aside>`;

// Bilgi notu (slaytta olmayan açıklama ya da slayt hatası düzeltmesi)
const note = (body, title = 'Not') => `
  <aside class="callout info"><p class="callout-title">${title}</p><div>${body}</div></aside>`;

// Hafıza ipucu
const tip = (body, title = 'Aklında tutmanın yolu') => `
  <aside class="callout tip"><p class="callout-title">${title}</p><div>${body}</div></aside>`;

// Sıralı adımlar
const steps = items => `
  <ol class="steps">${items.map((s, i) => `
    <li><span class="step-no" aria-hidden="true">${i + 1}</span><div><strong>${s[0]}</strong><p>${s[1]}</p></div></li>`).join('')}
  </ol>`;

// Zaman çizelgesi
const timeline = items => `
  <ol class="timeline">${items.map(t => `
    <li><span class="tl-year">${t[0]}</span><div class="tl-text">${t[1]}</div></li>`).join('')}
  </ol>`;

// Basit tablo
const table = (head, rows, cls = '') => `
  <div class="table-wrap"><table class="${cls}">
    <thead><tr>${head.map(c => `<th>${c}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;

// Gerçek veritabanı tablosu görünümü
//   cols: ['deptno:PK', 'name', 'deptno:FK']  (":PK" / ":FK" anahtar etiketi)
//   hl  : vurgulanacak satırların sırası
const dbTable = (name, cols, rows, hl = []) => `
  <div class="dbt">
    <div class="dbt-name">${name}</div>
    <div class="dbt-scroll"><table class="dbt-grid">
      <thead><tr>${cols.map(c => {
        const [col, key] = c.split(':');
        return `<th>${col}${key ? ` <span class="key ${key.toLowerCase()}">${key}</span>` : ''}</th>`;
      }).join('')}</tr></thead>
      <tbody>${rows.map((r, i) => `<tr${hl.includes(i) ? ' class="hl"' : ''}>${r.map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>
  </div>`;

// ERD diyagramı yer tutucusu (çizim erd.js içinde yapılır)
const erd = (id, caption) => `
  <figure class="figure"><div class="erd" data-erd="${id}"></div>${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;

// Serbest figür (HTML)
const figure = (inner, caption) => `
  <figure class="figure">${inner}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;

// Ders sonu kısa özet
const recap = items => `
  <section class="recap"><h2>Akılda kalsın</h2><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></section>`;

// İngilizce cümle + altında Türkçesi (ERDish cümleleri vb.)
const say = (en, tr) => `<p class="say"><span class="say-en">${en}</span>${tr ? `<span class="say-tr">${tr}</span>` : ''}</p>`;
