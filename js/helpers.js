// İçerik dosyalarında kullanılan küçük "bileşenler".
// Her biri HTML metni döndürür; ders içerikleri bunları birleştirerek yazılır.
window.SECTIONS = [];
window.ERDS = {};
window.QUIZZES = {};

// İki bölüm (department): İngilizce bölüm Oracle Academy dersini, Türkçe bölüm VTYS dersini görür.
// İngilizce bölümün dosyaları SECTIONS / QUIZZES'e, Türkçe bölümünkiler TR_SECTIONS / TR_QUIZZES'e yazar.
window.TR_SECTIONS = [];
window.TR_QUIZZES = {};
window.COURSES = {
  en: {
    dept: 'İngilizce bölüm',
    name: 'Veritabanı Tasarımı',
    title: 'Veritabanı Tasarımı vize notları',
    source: 'Database Design (Oracle Academy)',
    unit: 'Bölüm',
    lead: 'Oracle Academy “Database Design” dersinin Türkçe özeti. Her İngilizce terimin ne demek olduğunu sade bir dille anlatıyor, sınavda karşına çıkacak İngilizce ifadeyi de yanına yazıyor. Her bölümün sonunda, sınavdaki gibi İngilizce bir test var.',
    examTag: 'Sınavda',
    examLegend: 'Sınavda geçen İngilizce ifade. Sınav İngilizce olduğu için bunu tanıman lazım; zor kelimelerin Türkçesi parantez içinde.',
    scope: '1-1 (Oracle Academy tanıtımı, maaşlar, sertifikalar) veritabanı konusu içermediği için alınmadı. 7. ve 8. bölümler şu an sitede yok.',
    quizLang: 'İngilizce',
    quizSub: n => `Section ${n} quiz`,
    tf: ['True', 'False'],
    searchHint: 'Terim ara, ör. cardinality',
    glossaryOrder: 'İngilizce alfabeye göre',
    locale: 'en',
    get sections() { return window.SECTIONS; },
    get quizzes() { return window.QUIZZES; },
    keyPrefix: '',
  },
  tr: {
    dept: 'Türkçe bölüm',
    name: 'Veri Tabanı Yönetimi',
    title: 'Veri Tabanı Yönetim Sistemleri notları',
    source: 'Veri Tabanı Yönetim Sistemleri',
    unit: 'Hafta',
    lead: 'Veri Tabanı Yönetim Sistemleri dersinin haftalık sade özeti. Her terimin yanında İngilizce karşılığı da yazıyor. Her haftanın sonunda Türkçe bir test var.',
    examTag: '',
    examLegend: '',
    scope: 'Şu an 1., 4., 5. ve 6. haftalar var (4. hafta: iki H4 dersi ve H4.2); diğer haftalar sonra eklenecek.',
    quizLang: 'Türkçe',
    quizSub: n => `${n}. hafta testi`,
    tf: ['Doğru', 'Yanlış'],
    searchHint: 'Terim ara, ör. hiyerarşik',
    glossaryOrder: 'alfabetik sırayla',
    locale: 'tr',
    get sections() { return window.TR_SECTIONS; },
    get quizzes() { return window.TR_QUIZZES; },
    keyPrefix: 'tr-',
  },
};

const h2 = (text, id) => `<h2${id ? ` id="${id}"` : ''}>${text}</h2>`;

// Terim
//   en   : İngilizce terim (sınavda bu geçer)
//   tr   : Türkçe karşılığı
//   body : 1-3 cümlelik açıklama
//   o    : { ex: 'örnek', exam: 'slayttaki İngilizce ifade' | [...], star: true (anahtar terim, # ile işaretlenir) }
function term(en, tr, body, o = {}) {
  const exams = o.exam ? [].concat(o.exam) : [];
  return `
  <section class="term${o.star ? ' is-key' : ''}${o.cls ? ' ' + o.cls : ''}" data-en="${en.replace(/"/g, '&quot;')}" data-tr="${tr}">
    <h3 class="term-head"><span class="term-mark" aria-hidden="true">${o.star ? '#' : '*'}</span><span class="term-en">${en}</span>${tr ? ` <span class="term-tr">${tr}</span>` : ''}${o.star ? '<span class="sr"> (anahtar terim)</span>' : ''}</h3>
    <div class="term-body">${body}</div>
    ${o.ex ? `<p class="term-ex"><b>Örnek:</b> ${o.ex}</p>` : ''}
    ${o.more ? more(o.more) : ''}
    ${exams.map(e => `<p class="exam"><span class="exam-tag">${o.tag || 'Sınavda'}</span> <span class="exam-text">${e}</span></p>`).join('')}
  </section>`;
}

// İki katmanlı okuma: görünür kısım tek bir tam cümle, örnek ve ayrıntılar bu kutuda kapalı durur.
// term(..., { more: '...' }) ya da düz metinde more('...') olarak kullanılır.
function more(html) {
  return `<details class="more"><summary><span class="more-open">Devamını oku</span><span class="more-close">Kapat</span></summary><div class="more-body">${html}</div></details>`;
}

// Türkçe bölüm için terim: ana terim Türkçe, yanındaki küçük yazı İngilizce karşılığı (boş bırakılabilir).
// Görünen tek açıklama body'dir. Slayttaki cümle (exam) sitede gösterilmez; veride sadece kaynak olarak durur.
const tterm = (tr, en, body, o = {}) => term(tr, en, body, Object.assign({}, o, { exam: undefined, cls: 'tterm' }));

// SQL kodu: anahtar kelimeler, metinler ve yorumlar renklendirilir
const SQL_KW = 'CREATE|DATABASE|SCHEMA|TABLE|ALTER|ADD|DROP|COLUMN|MODIFY|TYPE|CONSTRAINT|PRIMARY|FOREIGN|KEY|REFERENCES|UNIQUE|CHECK|NOT|NULL|DEFAULT|SET|USING|EXTRACT|FROM|SELECT|WHERE|ORDER|BY|ASC|DESC|AND|OR|ENCODING|LC_COLLATE|LC_CTYPE|OWNER|TEMPLATE';
function sql(code, caption) {
  const esc = code.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const re = new RegExp(`(--[^\\n]*)|('[^']*')|("[^"]*")|\\b(${SQL_KW})\\b`, 'g');
  const out = esc.replace(re, (m, c, s, id, kw) =>
    c ? `<span class="sql-c">${c}</span>` : s ? `<span class="sql-s">${s}</span>` : id ? `<span class="sql-i">${id}</span>` : `<span class="sql-k">${kw}</span>`);
  return `${caption ? `<p>${caption}</p>` : ''}<figure class="sql-fig"><pre class="sql"><code>${out}</code></pre></figure>`;
}

// Sık karışan iki kavram
const mix = (title, body) => `
  <aside class="callout mix"><p class="callout-title">Karıştırma: ${title}</p><div>${body}</div></aside>`;

// Bilgi notu (konuyu anlamaya yardım eden kısa açıklama)
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
//   o   : { add: sütun sırası (yeni eklenen sütun, yeşil), drop: sütun sırası (silinecek sütun, kırmızı ve üstü çizili),
//           note: tablonun altında, tabloda neye bakılacağını anlatan kısa açıklama }
const dbTable = (name, cols, rows, hl = [], o = {}) => {
  const colCls = j => (j === o.add ? ' class="col-add"' : j === o.drop ? ' class="col-drop"' : '');
  const tag = j => (j === o.add ? ' <span class="col-tag add">+ yeni</span>' : j === o.drop ? ' <span class="col-tag drop">silinecek</span>' : '');
  const cell = v => (v === '' || v == null ? '<span class="null">NULL</span>' : v);
  return `
  <div class="dbt${o.add != null || o.drop != null ? ' dbt-change' : ''}">
    <div class="dbt-name">${name}</div>
    <div class="dbt-scroll"><table class="dbt-grid">
      <thead><tr>${cols.map((c, j) => {
        const [col, key] = c.split(':');
        return `<th${colCls(j)}>${j === o.drop ? `<s>${col}</s>` : col}${key ? ` <span class="key ${key.toLowerCase()}">${key}</span>` : ''}${tag(j)}</th>`;
      }).join('')}</tr></thead>
      <tbody>${rows.map((r, i) => `<tr${hl.includes(i) ? ' class="hl"' : ''}>${r.map((v, j) => `<td${colCls(j)}>${o.add === j ? cell(v) : o.drop === j ? `<s>${v}</s>` : v}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>
    ${o.note ? `<p class="dbt-note">${o.note}</p>` : ''}
  </div>`;
};

// ERD diyagramı yer tutucusu (çizim erd.js içinde yapılır).
// Kimlik CHEN içindeyse Chen gösterimiyle (dikdörtgen, elips, baklava) çizilir.
window.CHEN = {};
// look: görselin ALTINDA duran "neye bakmalısın" açıklaması (dbTable'daki note ile aynı görünüm)
const lookNote = html => (html ? `<p class="dbt-note look-note">${html}</p>` : '');
// Alt yazı ayrı bir gri satır olmaz; görselin altındaki açıklama kutusunun sonuna eklenir.
const joinNote = (look, caption) => [look, caption].filter(Boolean).join(' ');
const erd = (id, caption, look) => `
  <figure class="figure"><div class="erd" ${window.CHEN[id] ? 'data-chen' : 'data-erd'}="${id}"></div>${lookNote(joinNote(look, caption))}</figure>`;

// Tablo hücresine küçük bir Chen şekli koyar (erd.js'teki chenShape ile çizilir)
const shape = (t, label) => window.chenShape(t, label);
const chenSvg = spec => window.chenSvg(spec);

// Katılım kısıtı işareti: ilişki çizgisinin varlık ucunda düz çizgi (zorunlu) ya da yuvarlak (kısmi)
const participation = kind => `<svg class="chen-cell" viewBox="0 0 170 40" width="170" height="40" aria-hidden="true">
  <line class="ch-line" x1="10" y1="20" x2="104" y2="20"/>
  ${kind === 'bar'
    ? '<line class="ch-line" x1="92" y1="10" x2="92" y2="30" style="stroke-width:2.2"/>'
    : '<circle class="ch-attr" cx="90" cy="20" r="6"/>'}
  <rect class="ch-ent" x="104" y="4" width="62" height="32" rx="2"/>
  <text class="ch-t e" x="135" y="20" dy=".35em" text-anchor="middle">VARLIK</text>
</svg>`;

// İlişkisel şema satırları: 'Personel(#personelID, adsoyad, >bolumID)'
//   # = birincil anahtar (altı çizili), > = yabancı anahtar, #> = ikisi birden
const schema = lines => `<div class="schema">${[].concat(lines).map(l => {
  const m = l.match(/^([^(]+)\((.*)\)$/);
  const cols = m[2].split(',').map(c => c.trim()).map(c => {
    const pk = c.includes('#'), fk = c.includes('>'), name = c.replace(/[#>]/g, '');
    return pk || fk ? `<span class="${pk ? 'pk-u' : ''}${fk ? ' fk' : ''}">${name}</span>` : name;
  });
  return `<p><b>${m[1].trim()}</b> (${cols.join(', ')})</p>`;
}).join('')}</div>`;

// Serbest figür (HTML)
const figure = (inner, caption, look) => `
  <figure class="figure">${inner}${lookNote(joinNote(look, caption))}</figure>`;

// Ders sonu kısa özet
const recap = items => `
  <section class="recap"><h2>Akılda kalsın</h2><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></section>`;

// İngilizce cümle + altında Türkçesi (ERDish cümleleri vb.)
const say = (en, tr) => `<p class="say"><span class="say-en">${en}</span>${tr ? `<span class="say-tr">${tr}</span>` : ''}</p>`;
