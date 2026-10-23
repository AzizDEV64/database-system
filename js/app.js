(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const view = $('#view');

  // ---------- tarayıcıda saklanan küçük ayarlar ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem('dbguide-' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('dbguide-' + k, JSON.stringify(v)); } catch (e) {} },
  };
  // ---------- bölüm (department) seçimi ----------
  const dept = store.get('dept', null);
  const COURSE = window.COURSES[dept];
  if (!COURSE) return chooseDept();
  // her bölümün ilerlemesi ayrı saklanır (İngilizce bölüm eski anahtarları kullanır)
  const K = k => COURSE.keyPrefix + k;
  const SECTIONS = COURSE.sections, QUIZZES = COURSE.quizzes, U = COURSE.unit;
  document.documentElement.lang = 'tr';
  $$('.brand-text, .mobilebar-title').forEach(el => { el.textContent = COURSE.name; });
  $('#search').placeholder = COURSE.searchHint;

  function chooseDept() {
    document.body.classList.add('choosing');
    const info = c => {
      const secs = c.sections, n = secs.reduce((a, s) => a + s.lessons.length, 0);
      const tests = secs.filter(s => (c.quizzes[s.no] || []).length).length;
      return `${secs.length} ${c.unit.toLocaleLowerCase('tr')}, ${n} ders, ${tests} test`;
    };
    const desc = {
      en: 'Konular Türkçe anlatılıyor. Sınav İngilizce olduğu için her terimin yanında sınavda geçen İngilizce ifade var, bölüm sonundaki testler de İngilizce.',
      tr: 'Konular da testler de Türkçe. Her terimin yanında İngilizce karşılığı da yazıyor.',
    };
    // her bölüm sekmeli bir tablo kutusu: gri gövde, sarı sekme ve sarı seçme satırı
    view.innerHTML = `
    <div class="page chooser">
      <p class="chooser-brand"><span class="brand-mark" aria-hidden="true">${$('.brand-mark').innerHTML}</span>Veritabanı vize notları</p>
      <h1>Hangi bölümdesin?</h1>
      <p class="home-lead">Bu ders üniversitede iki ayrı bölümde, farklı içerikle işleniyor. Kendi bölümünü seç; seçimini bu tarayıcı hatırlar, istersen sonra menünün altından değiştirebilirsin.</p>
      <div class="choices">
        ${['en', 'tr'].map(k => { const c = window.COURSES[k]; return `
        <section class="dchoice" aria-labelledby="dc-${k}">
          <h2 class="dchoice-h" id="dc-${k}"><span class="dchoice-tab">${c.dept}</span><span class="dchoice-title">${c.source}</span></h2>
          <p class="dchoice-desc">${desc[k]}</p>
          <p class="dchoice-count">${info(c)}</p>
          <button class="dchoice-go" type="button" data-dept="${k}">${c.dept.replace(' bölüm', ' bölümü')} seç</button>
        </section>`; }).join('')}
      </div>
    </div>`;
    $$('.dchoice-go', view).forEach(b => {
      b.onclick = () => { store.set('dept', b.dataset.dept); location.reload(); };
    });
  }

  // bozuk ya da elle değiştirilmiş kayıtlar siteyi çökertmesin
  const storedDone = store.get(K('done'), []);
  let done = new Set(Array.isArray(storedDone) ? storedDone : []);
  let quick = store.get('quick', false) === true;
  const smooth = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  let quizDirty = false; // testte cevaplanmış soru varken ok tuşlarıyla sayfa değişmesin
  document.body.classList.toggle('quick', quick);

  // ---------- veri ----------
  const lessons = [];
  SECTIONS.sort((a, b) => a.no - b.no).forEach(s => s.lessons.forEach(l => { l.section = s; lessons.push(l); }));
  const byId = Object.fromEntries(lessons.map(l => [l.id, l]));
  // ekranda görünen ders numarası: aynı numaralı iki ders olabilir (Türkçe bölümde iki tane H4), adresleri farklıdır
  lessons.forEach(l => { l.no = l.label || l.id; });
  const lno = id => (byId[id] ? byId[id].no : id);

  const slug = s => s.toLocaleLowerCase('tr')
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const text = el => el ? el.textContent.replace(/\s+/g, ' ').trim() : '';
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  // Terimleri ve okuma süresini ders HTML'inden çıkar
  const terms = [];
  lessons.forEach(l => {
    const tmp = document.createElement('div');
    tmp.innerHTML = l.html;
    l.minutes = Math.max(2, Math.round(text(tmp).split(' ').length / 160));
    l.terms = $$('.term', tmp).map(t => {
      const item = {
        en: t.dataset.en, tr: t.dataset.tr, id: 't-' + slug(t.dataset.en), lesson: l,
        body: text($('.term-body', t)),
        exam: $$('.exam-text', t).map(text),
        key: t.classList.contains('is-key'),
      };
      terms.push(item);
      return item;
    });
  });
  terms.sort((a, b) => a.en.localeCompare(b.en, COURSE.locale));

  // Testler: her bölümün sonunda bir test sayfası
  const storedScores = store.get(K('quiz'), {});
  let scores = storedScores && typeof storedScores === 'object' && !Array.isArray(storedScores) ? storedScores : {};
  const pages = [];
  SECTIONS.forEach(s => {
    s.quiz = QUIZZES[s.no] || [];
    s.lessons.forEach(l => pages.push({ href: '#/ders/' + l.id, label: l.no + ' ' + l.title, kind: 'ders' }));
    if (s.quiz.length) pages.push({ href: '#/test/' + s.no, label: U + ' ' + s.no + ' testi', kind: 'test' });
  });
  const pageIndex = path => pages.findIndex(p => p.href === '#' + path);
  const scoreText = s => scores[s.no] ? `${scores[s.no].best} / ${s.quiz.length}` : `${s.quiz.length} soru`;

  // ---------- kenar menü ----------
  function buildNav() {
    const route = location.hash || '#/';
    let html = `<ul class="nav-top">
      <li><a href="#/"${route === '#/' ? ' aria-current="page"' : ''}>Ana sayfa</a></li>
      <li><a href="#/sozluk"${route.startsWith('#/sozluk') ? ' aria-current="page"' : ''}>Terim sözlüğü</a></li>
    </ul>`;
    SECTIONS.forEach(s => {
      html += `<p class="nav-section">${U} ${s.no}: ${s.title}</p><ol class="rail">`;
      s.lessons.forEach(l => {
        const cur = route.startsWith('#/ders/' + l.id);
        html += `<li class="${done.has(l.id) ? 'done' : ''}"><a href="#/ders/${l.id}"${cur ? ' aria-current="page"' : ''}>
          <span class="rail-id">${l.no}</span><span>${l.title}</span>${done.has(l.id) ? '<span class="sr"> (bitti)</span>' : ''}</a></li>`;
      });
      if (s.quiz.length) {
        const cur = route.startsWith('#/test/' + s.no);
        html += `<li class="test${scores[s.no] ? ' done' : ''}"><a href="#/test/${s.no}"${cur ? ' aria-current="page"' : ''}>
          <span class="rail-id"></span><span>${U} testi</span><span class="rail-score">${scoreText(s)}</span></a></li>`;
      }
      html += `</ol>`;
    });
    $('#nav').innerHTML = html;
    // ilerleme çizgisi: bitirilen kısım düz, kalan kesikli (menüdeki ders çizgisi gibi)
    const pct = Math.round(done.size / lessons.length * 100);
    const quizzes = SECTIONS.filter(s => s.quiz.length);
    const tested = quizzes.filter(s => scores[s.no]).length;
    $('#progress').innerHTML = `
      <p class="progress-row"><span><b>${done.size}</b> / ${lessons.length} ders bitti</span><span>${tested} / ${quizzes.length} test</span></p>
      <div class="progress-line" role="progressbar" aria-label="Bitirilen dersler" aria-valuemin="0" aria-valuemax="${lessons.length}" aria-valuenow="${done.size}">
        <span class="pl-done" style="width:${pct}%"></span><span class="pl-node" style="left:${pct}%"></span>
      </div>`;
  }

  // ---------- ana sayfa ----------
  function home() {
    view.innerHTML = `
    <div class="page home">
      <header class="home-head">
        <h1>${COURSE.title}</h1>
        <p class="home-lead">${COURSE.lead}</p>
      </header>

      <div class="course" aria-label="Bölümler ve dersler">
        ${SECTIONS.map(s => {
          const n = s.lessons.filter(l => done.has(l.id)).length;
          return `
          <section class="stbl">
            <div class="stbl-top">
              <h2 class="stbl-h"><span class="stbl-tab">${U} ${s.no}</span><span class="stbl-title">${s.title}</span></h2>
              <span class="stbl-count">${n} / ${s.lessons.length} ders</span>
            </div>
            <p class="stbl-desc">${s.desc}</p>
            <ul class="stbl-rows">
              ${s.lessons.map(l => {
                const isDone = done.has(l.id);
                return `<li class="${isDone ? 'done' : ''}"><a href="#/ders/${l.id}">
                <span class="row-mark" aria-hidden="true">${isDone ? '✓' : ''}</span>
                <span class="row-id">${l.no}</span>
                <span class="row-name">${l.title}</span>
                <span class="row-meta">${l.minutes} dk</span>${isDone ? '<span class="sr"> (bitti)</span>' : ''}</a></li>`;
              }).join('')}
              ${s.quiz.length ? `<li class="test-row${scores[s.no] ? ' done' : ''}"><a href="#/test/${s.no}">
                <span class="row-mark" aria-hidden="true">${scores[s.no] ? '✓' : '<i class="row-box"></i>'}</span>
                <span class="row-name">${U} testi</span>
                <span class="row-meta">${scoreText(s)}</span></a></li>` : ''}
            </ul>
          </section>`;
        }).join('')}
      </div>

      <section class="legend">
        <h2>Sayfalarda göreceğin işaretler</h2>
        <dl>
          <div><dt><span class="term-mark">#</span></dt><dd><b>Anahtar terim.</b> Sınavda en sık sorulanlar. ERD’de de <code>#</code> “anahtar” (unique identifier) demektir.</dd></div>
          <div><dt><span class="term-mark plain">*</span></dt><dd><b>Bilmen gereken terim;</b> bunları da atlama. (ERD’de <code>*</code> “zorunlu” demektir.)</dd></div>
          ${COURSE.examTag ? `<div><dt><span class="exam-tag">${COURSE.examTag}</span></dt><dd>${COURSE.examLegend}</dd></div>` : ''}
          <div><dt><span class="legend-swatch mix"></span></dt><dd><b>Karıştırma:</b> birbirine çok benzeyen, sık karıştırılan kavramlar.</dd></div>
          <div><dt><span class="legend-swatch info"></span></dt><dd><b>Not:</b> konuyu anlamana yardım eden kısa bir açıklama.</dd></div>
        </dl>
        <p class="scope">${COURSE.scope}</p>
      </section>
    </div>`;
  }

  // ---------- ders sayfası ----------
  function lessonPage(id, focus) {
    const l = byId[id];
    if (!l) return home();
    store.set(K('last'), id);
    const isDone = done.has(id);

    view.innerHTML = `
    <article class="page lesson">
      <p class="crumbs"><a href="#/">Ana sayfa</a> / ${U} ${l.section.no}: ${l.section.title}</p>
      <header class="sbox lesson-box">
        <h1><span class="lesson-id">${l.no}</span>${l.title}</h1>
        <p class="lesson-en" lang="en">${l.en}</p>
      </header>
      <div class="lesson-meta"><p>Yaklaşık ${l.minutes} dakikada okunur, ${l.terms.length} terim var.</p><button class="quick-toggle" id="quickBtn" type="button" aria-pressed="${quick}"><span class="qt-track" aria-hidden="true"></span><span class="qt-text">Hızlı tekrar<small>sadece terim, Türkçesi ve sınav cümlesi</small></span></button></div>
      <div class="content">${l.html}</div>

      <div class="done-row${isDone ? ' is-done' : ''}">
        ${isDone
          ? `<p class="done-state"><span class="done-node" aria-hidden="true"></span><span><b>Bu dersi bitirdin.</b><small>Menüdeki çizgide düz olarak görünüyor.</small></span></p>
             <button class="done-undo" id="doneBtn" type="button">Geri al</button>`
          : `<p class="done-state"><span class="done-node open" aria-hidden="true"></span><span><b>Bu dersi bitirdin mi?</b><small>İşaretlersen ilerlemen menüde görünür.</small></span></p>
             <button class="btn" id="doneBtn" type="button">Bitirdim olarak işaretle</button>`}
      </div>
      ${pager('/ders/' + id)}
    </article>`;

    $$('.content .term', view).forEach(t => { t.id = 't-' + slug(t.dataset.en); });
    $('#quickBtn').onclick = () => {
      quick = !quick;
      store.set('quick', quick);
      document.body.classList.toggle('quick', quick);
      $('#quickBtn').setAttribute('aria-pressed', quick);
    };
    renderERDs(view);
    linkRefs($('.content', view), id);
    revealChanges(view);

    $('#doneBtn').onclick = () => {
      done.has(id) ? done.delete(id) : done.add(id);
      store.set(K('done'), [...done]);
      buildNav();
      lessonPage(id);
      $('.done-row').scrollIntoView({ block: 'center' });
      $('#doneBtn').focus({ preventScroll: true });
    };

    if (focus) flashTo(focus, 'auto');
  }

  // Metindeki "2-3", "(3-1’de)", "3. bölümde" gibi atıfları tıklanabilir bağlantıya çevirir
  const REF = /(^|[^\w\-’'#/])([1-9]-[1-9])(?![\w-])|\b([1-9])\. (bölüm[a-zçğıöşü]*)/g;
  function linkRefs(root, current, newTab) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => n.parentElement.closest('a, code, svg, .exam, h1, h2, h3, button')
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const t = node.nodeValue;
      const frag = document.createDocumentFragment();
      let last = 0, m, changed = false;
      REF.lastIndex = 0;
      while ((m = REF.exec(t))) {
        let id, start, label;
        if (m[2]) {
          id = m[2]; start = m.index + m[1].length; label = id;
          if (!byId[id] || id === current) continue;
        } else {
          const s = SECTIONS.find(x => String(x.no) === m[3]);
          if (!s) continue;
          id = s.lessons[0].id; start = m.index; label = `${m[3]}. ${m[4]}`;
          if (id === current) continue;
        }
        frag.append(t.slice(last, start));
        const a = document.createElement('a');
        a.href = '#/ders/' + id;
        a.className = 'ref';
        a.textContent = label;
        if (newTab) { a.target = '_blank'; a.rel = 'noopener'; }
        frag.append(a);
        last = start + label.length;
        changed = true;
      }
      if (!changed) return;
      frag.append(t.slice(last));
      node.replaceWith(frag);
    });
  }

  // Dar ekranda tablo sığmazsa, eklenen ya da silinen sütun görünsün diye tabloyu o sütuna kaydırır
  function revealChanges(root) {
    requestAnimationFrame(() => $$('.dbt-change .dbt-scroll', root).forEach(s => {
      const th = $('th.col-add, th.col-drop', s);
      if (th && s.scrollWidth > s.clientWidth) s.scrollLeft = th.offsetLeft + th.offsetWidth - s.clientWidth;
    }));
  }

  function pager(path) {
    const i = pageIndex(path), prev = pages[i - 1], next = pages[i + 1];
    const link = (p, cls, word) => p
      ? `<a class="${cls}${p.kind === 'test' ? ' to-test' : ''}" href="${p.href}">
          <svg class="pg-arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="${cls === 'next' ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="pg-text"><small>${word} ${p.kind === 'test' ? 'test' : 'ders'}</small><span>${p.kind === 'test' ? '<i class="pg-test" aria-hidden="true"></i>' : ''}${p.label}</span></span>
        </a>`
      : '<span></span>';
    return `<nav class="pager" aria-label="Önceki ve sonraki sayfa">${link(prev, 'prev', 'Önceki')}${link(next, 'next', 'Sonraki')}</nav>`;
  }

  // ---------- test sayfası ----------
  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const LETTERS = 'ABCDEFG';

  // only: sadece bu sorular (yanlışları tekrar çözerken)
  function testPage(no, only) {
    const s = SECTIONS.find(x => x.no === +no);
    if (!s || !s.quiz.length) return home();
    const all = s.quiz.map((q, i) => ({
      i, l: q.l, q: q.q, why: q.why, erd: q.erd,
      opts: q.tf ? COURSE.tf : q.o,
      correct: q.tf ? [q.a ? 0 : 1] : [].concat(q.a),
      multi: Array.isArray(q.a), tf: !!q.tf,
    }));
    const list = only ? all.filter(q => only.includes(q.i)) : all;
    const n = list.length;
    const answers = {};
    const best = scores[s.no];
    quizDirty = false;

    view.innerHTML = `
    <article class="page test">
      <p class="crumbs"><a href="#/">Ana sayfa</a> / ${U} ${s.no}: ${s.title}</p>
      <header class="sbox lesson-box">
        <h1><span class="lesson-id">${U} ${s.no}</span>${U} testi</h1>
        <p class="lesson-en">${COURSE.quizSub(s.no)}</p>
        <ul class="sbox-attrs term-index" aria-label="Testin kapsadığı dersler">
          ${s.lessons.map(l => `<li><a href="#/ders/${l.id}"><span class="attr-mark" aria-hidden="true">*</span><span class="attr-name">${l.no} ${l.title}</span></a></li>`).join('')}
        </ul>
      </header>
      <div class="lesson-meta test-meta">
        <p>${only ? `Sadece yanlış yaptığın ${n} soru.` : `${n} soru, sorular ${COURSE.quizLang}.`} Bir şık seçince cevap hemen kontrol edilir ve altında Türkçe açıklaması çıkar. Birden çok cevaplı sorularda şıkları seçip “Cevabı kontrol et”e bas.</p>
        ${best ? `<p>En iyi sonucun: <b>${best.best} / ${s.quiz.length}</b></p>` : ''}
      </div>
      <ol class="quiz">
        ${list.map((q, k) => {
          const order = q.tf ? [0, 1] : shuffle(q.opts.map((_, j) => j));
          return `<li class="qz" data-q="${q.i}">
            <p class="qz-head"><span>Soru ${k + 1} / ${n}</span><a href="#/ders/${q.l}" target="_blank" rel="noopener" title="Ders yeni sekmede açılır, testin kaybolmaz">ders ${lno(q.l)}</a></p>
            <p class="qz-q" lang="en">${q.q}</p>
            ${q.erd ? erd(q.erd) : ''}
            ${q.multi ? '<p class="qz-hint">Birden fazla doğru şık var. Hepsini seç, sonra kontrol et.</p>' : ''}
            <div class="opts" role="group" aria-label="Şıklar">
              ${order.map((j, p) => `<button class="opt" type="button" data-o="${j}"${q.multi ? ' aria-pressed="false"' : ''}><span class="opt-key" aria-hidden="true">${LETTERS[p]}</span><span class="opt-text" lang="en">${q.opts[j]}</span><span class="opt-state"></span></button>`).join('')}
            </div>
            ${q.multi ? '<button class="btn small qz-check" type="button">Cevabı kontrol et</button>' : ''}
            <div class="qz-fb" aria-live="polite"></div>
          </li>`;
        }).join('')}
      </ol>
      <div class="qz-status" id="qzStatus"></div>
      <section class="sbox qz-result" id="qzResult" role="status" hidden></section>
      ${pager('/test/' + s.no)}
    </article>`;
    renderERDs(view);

    const byQ = Object.fromEntries(list.map(q => [q.i, q]));
    const status = () => {
      const a = Object.keys(answers).length, r = Object.values(answers).filter(Boolean).length;
      $('#qzStatus').innerHTML = `<span>${a} / ${n} cevaplandı, ${r} doğru</span><span class="qz-bar" aria-hidden="true"><span style="width:${a / n * 100}%"></span></span>`;
    };
    status();

    function grade(li, chosen) {
      const q = byQ[li.dataset.q];
      const ok = chosen.length === q.correct.length && chosen.every(c => q.correct.includes(c));
      answers[q.i] = ok;
      quizDirty = true;
      li.classList.add(ok ? 'is-right' : 'is-wrong');
      $$('.opt', li).forEach(b => {
        const o = +b.dataset.o, isC = q.correct.includes(o), picked = chosen.includes(o);
        b.setAttribute('aria-disabled', 'true'); // disabled değil: odak kaybolmasın
        if (isC) { b.classList.add('right'); $('.opt-state', b).textContent = picked ? 'doğru' : q.multi ? 'bunu da seçmeliydin' : 'doğru cevap'; }
        else if (picked) { b.classList.add('wrong'); $('.opt-state', b).textContent = 'senin cevabın'; }
        else b.classList.add('dim');
      });
      const check = $('.qz-check', li);
      if (check) {
        if (document.activeElement === check) $('.opt', li).focus();
        check.remove();
      }
      const keys = $$('.opt', li).filter(b => q.correct.includes(+b.dataset.o)).map(b => $('.opt-key', b).textContent).join(', ');
      const lesson = byId[q.l];
      $('.qz-fb', li).innerHTML = `<p><strong>${ok ? 'Doğru.' : `Yanlış. Doğru cevap: ${keys}.`}</strong> ${q.why}</p>`
        + (ok ? '' : `<a href="#/ders/${q.l}" target="_blank" rel="noopener">Konuyu tekrar oku: ${lno(q.l)} ${lesson ? lesson.title : ''}</a> <small>(yeni sekmede açılır)</small>`);
      linkRefs($('.qz-fb p', li), null, true);
      status();
      if (Object.keys(answers).length === n) finish();
    }

    function finish() {
      const right = Object.values(answers).filter(Boolean).length;
      const wrong = list.filter(q => !answers[q.i]).map(q => q.i);
      if (!only) {
        const prevBest = scores[s.no] ? scores[s.no].best : -1;
        scores[s.no] = { best: Math.max(prevBest, right), last: right };
        store.set(K('quiz'), scores);
        buildNav();
      }
      const pct = right / n;
      const msg = pct >= .9 ? 'Çok iyi, bu bölüme hazırsın.'
        : pct >= .7 ? 'İyi. Yanlış yaptığın soruların derslerine kısaca bir göz at.'
        : 'Bu bölümün derslerini hızlı tekrar moduyla bir kez daha oku, sonra testi yeniden çöz.';
      const box = $('#qzResult');
      box.hidden = false;
      box.innerHTML = `<h2>Sonuç: ${right} / ${n}</h2><p>${msg}</p>
        <div class="qz-actions">
          ${wrong.length ? '<button class="btn" type="button" id="retryWrong">Yanlışları tekrar çöz</button>' : ''}
          <button class="btn ghost" type="button" id="retryAll">Testi baştan çöz</button>
        </div>`;
      const restart = ids => { window.scrollTo(0, 0); testPage(no, ids); $('.qz .opt', view).focus({ preventScroll: true }); };
      if (wrong.length) $('#retryWrong').onclick = () => restart(wrong);
      $('#retryAll').onclick = () => restart();
      box.scrollIntoView({ behavior: smooth, block: 'center' });
    }

    $('.quiz', view).addEventListener('click', e => {
      const li = e.target.closest('.qz');
      if (!li || li.classList.contains('is-right') || li.classList.contains('is-wrong')) return;
      const q = byQ[li.dataset.q];
      const opt = e.target.closest('.opt');
      if (opt && !q.multi) return grade(li, [+opt.dataset.o]);
      if (opt && q.multi) {
        opt.setAttribute('aria-pressed', opt.getAttribute('aria-pressed') !== 'true');
        $('.qz-fb', li).textContent = '';
        return;
      }
      if (e.target.closest('.qz-check')) {
        const chosen = $$('.opt[aria-pressed="true"]', li).map(b => +b.dataset.o);
        if (!chosen.length) { $('.qz-fb', li).innerHTML = '<p>Önce en az bir şık seç.</p>'; return; }
        grade(li, chosen);
      }
    });
  }

  function flashTo(id, behavior) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: behavior === 'smooth' ? smooth : behavior, block: 'start' });
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
    clearTimeout(el._flashT);
    el._flashT = setTimeout(() => el.classList.remove('flash'), 1900);
  }

  // Zaten açık olan adrese tıklanınca tarayıcı hashchange vermez; elle kaydır
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a || a.target === '_blank' || a.getAttribute('href') !== location.hash) return;
    e.preventDefault();
    const t = new URLSearchParams(location.hash.split('?')[1] || '').get('t');
    if (t) flashTo(t, 'smooth'); else window.scrollTo(0, 0);
    toggleMenu(false);
  });
  // "İçeriğe geç" bağlantısı yönlendiriciye gitmesin
  $('.skip').addEventListener('click', e => { e.preventDefault(); view.focus(); });

  // ---------- sözlük ----------
  function glossary() {
    view.innerHTML = `
    <div class="page glossary">
      <h1>Terim sözlüğü</h1>
      <p class="home-lead">Bütün derslerdeki ${terms.length} terim, ${COURSE.glossaryOrder}. Bir terime tıklarsan o terimin anlatıldığı derse gidersin.</p>
      <div class="gloss-filter">
        <label class="sr" for="gq">Sözlükte ara</label>
        <input id="gq" type="search" placeholder="İngilizce ya da Türkçe yaz">
        <label class="chk"><input type="checkbox" id="gkey"> Sadece anahtar terimler (#)</label>
      </div>
      <div id="glist"></div>
    </div>`;
    const draw = () => {
      const q = norm($('#gq').value.trim()), onlyKey = $('#gkey').checked;
      const list = terms.filter(t => (!onlyKey || t.key) && (!q || norm(t.en + ' ' + t.tr + ' ' + t.body).includes(q)));
      let html = '', letter = '';
      list.forEach(t => {
        const L = t.en[0].toLocaleUpperCase(COURSE.locale);
        if (L !== letter) { html += `${letter ? '</dl>' : ''}<h2 class="gl-letter">${L}</h2><dl class="gl">`; letter = L; }
        html += `<div class="gl-item">
          <dt><a href="#/ders/${t.lesson.id}?t=${t.id}"><span class="term-mark${t.key ? '' : ' plain'}" aria-hidden="true">${t.key ? '#' : '*'}</span><span lang="en">${t.en}</span></a> <span class="term-tr">${t.tr}</span> <span class="gl-lesson">ders ${t.lesson.no}</span></dt>
          <dd>${esc(t.body)}${t.exam[0] ? `<span class="gl-exam" lang="en">${esc(t.exam[0])}</span>` : ''}</dd>
        </div>`;
      });
      if (letter) html += '</dl>';
      $('#glist').innerHTML = html || '<p class="empty">Bu yazdığınla eşleşen terim yok. Daha kısa bir kelime dene.</p>';
    };
    $('#gq').oninput = draw;
    $('#gkey').onchange = draw;
    draw();
  }

  // ---------- arama ----------
  const norm = s => s.toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i');
  const search = $('#search'), results = $('#results');
  let sel = -1;

  function runSearch() {
    const raw = search.value.trim(), q = norm(raw);
    if (!q) { results.hidden = true; return; }
    const hitsT = terms.map(t => {
      const en = norm(t.en), tr = norm(t.tr);
      const score = en.startsWith(q) ? 0 : en.includes(q) ? 1 : tr.includes(q) ? 2 : norm(t.body).includes(q) ? 3 : 9;
      return { t, score };
    }).filter(x => x.score < 9).sort((a, b) => a.score - b.score).slice(0, 8);
    const hitsL = lessons.filter(l => norm(l.title + ' ' + l.en).includes(q)).slice(0, 3);
    let html = '';
    hitsL.forEach(l => { html += `<a href="#/ders/${l.id}"><strong>${l.no} ${l.title}</strong><small>ders</small></a>`; });
    hitsT.forEach(({ t }) => { html += `<a href="#/ders/${t.lesson.id}?t=${t.id}"><strong lang="en">${t.en}</strong><small>${t.tr}, ders ${t.lesson.no}</small></a>`; });
    results.innerHTML = html || `<p class="empty">“${esc(raw)}” bulunamadı. Terimin Türkçesini ya da İngilizcesini dene.</p>`;
    results.hidden = false;
    sel = -1;
  }
  search.addEventListener('input', runSearch);
  search.addEventListener('focus', runSearch);
  search.addEventListener('keydown', e => {
    const items = $$('a', results);
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && items.length) {
      e.preventDefault();
      sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((a, i) => a.classList.toggle('sel', i === sel));
      items[sel].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      const a = items[sel] || items[0];
      if (a) { closeSearch(); a.click(); }
    } else if (e.key === 'Escape') closeSearch();
  });
  results.addEventListener('click', e => { if (e.target.closest('a')) closeSearch(); });
  document.addEventListener('click', e => { if (!e.target.closest('.search')) results.hidden = true; });
  function closeSearch() { results.hidden = true; search.value = ''; search.blur(); }

  // ---------- klavye ----------
  document.addEventListener('keydown', e => {
    if (e.defaultPrevented || e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (e.key === '/') { e.preventDefault(); toggleMenu(true); search.focus(); return; }
    if (e.target.closest('button') || document.body.classList.contains('menu-open')) return;
    const path = (location.hash.slice(1) || '/').split('?')[0];
    if (quizDirty && path.startsWith('/test/')) return;
    const i = pageIndex(path);
    if (i > -1 && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !e.altKey && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      const to = pages[i + (e.key === 'ArrowRight' ? 1 : -1)];
      if (to) location.hash = to.href;
    }
  });

  // ---------- tema ----------
  const isDark = () => (document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
  const themeLabel = () => {
    const cur = isDark() ? 'dark' : 'light';
    $$('[data-set-theme]').forEach(b => b.setAttribute('aria-pressed', b.dataset.setTheme === cur));
  };
  $$('[data-set-theme]').forEach(b => {
    b.onclick = () => {
      document.documentElement.dataset.theme = b.dataset.setTheme;
      try { localStorage.setItem('dbguide-theme', b.dataset.setTheme); } catch (e) {}
      themeLabel();
    };
  });
  themeLabel();

  // ---------- bölüm değiştirme ----------
  $('#deptName').textContent = COURSE.dept.replace(' bölüm', '');
  $('#deptBtn').onclick = () => {
    store.set('dept', null);
    history.replaceState(null, '', '#/');
    location.reload();
  };

  // ---------- mobil menü ----------
  const sidebar = $('#sidebar');
  const mobile = () => matchMedia('(max-width: 960px)').matches;
  function toggleMenu(open) {
    if (!mobile()) return;
    const wasOpen = document.body.classList.contains('menu-open');
    if (open === wasOpen) return;
    document.body.classList.toggle('menu-open', open);
    $('#menuBtn').setAttribute('aria-expanded', open);
    $('#menuBtn').setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    view.inert = open;                 // menü açıkken arkadaki sayfaya odak gitmesin
    // odağı arama kutusuna değil menüye ver: telefonda ekran klavyesi açılmasın
    if (open) ($('.nav [aria-current]') || sidebar).focus({ preventScroll: true });
    else if (sidebar.contains(document.activeElement) || document.activeElement === document.body) $('#menuBtn').focus({ preventScroll: true });
  }
  $('#menuBtn').onclick = () => toggleMenu(!document.body.classList.contains('menu-open'));
  $('#scrim').onclick = () => toggleMenu(false);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });
  matchMedia('(max-width: 960px)').addEventListener('change', () => { document.body.classList.remove('menu-open'); view.inert = false; });

  // ---------- yönlendirme ----------
  let lastPath = null;
  function route() {
    const [path, qs] = (location.hash || '#/').slice(1).split('?');
    const params = new URLSearchParams(qs || '');
    if (document.body.classList.contains('menu-open')) toggleMenu(false);
    // bilinmeyen ders ya da test → ana sayfa (doğru başlıkla)
    const bad = (/^\/ders\//.test(path) && !byId[path.split('/')[2]])
      || (/^\/test\//.test(path) && !SECTIONS.some(s => String(s.no) === path.split('/')[2] && s.quiz.length));
    if (bad) { history.replaceState(null, '', '#/'); return route(); }
    buildNav();
    const samePage = path === lastPath;
    lastPath = path;
    const m = path.match(/^\/ders\/([\w-]+)/);
    if (m) {
      const focus = params.get('t');
      if (samePage && focus) return flashTo(focus, 'smooth');
      window.scrollTo(0, 0);
      lessonPage(m[1], focus);
      document.title = `${lno(m[1])} ${byId[m[1]] ? byId[m[1]].title : ''} | ${COURSE.name}`;
    } else if (/^\/test\/\d+$/.test(path)) {
      const no = path.split('/')[2];
      window.scrollTo(0, 0);
      testPage(no);
      document.title = `${U} ${no} testi | ${COURSE.name}`;
    } else if (path.startsWith('/sozluk')) {
      window.scrollTo(0, 0);
      glossary();
      document.title = `Terim sözlüğü | ${COURSE.name}`;
    } else {
      window.scrollTo(0, 0);
      home();
      document.title = COURSE.title;
    }
    if (!samePage) view.focus({ preventScroll: true });
    const cur = $('.nav [aria-current]');
    if (cur) cur.scrollIntoView({ block: 'nearest' });
  }
  window.addEventListener('hashchange', route);
  route();
})();
