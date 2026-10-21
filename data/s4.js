ERDS.exam = {
  w: 500, h: 300, label: 'EXAM supertype ve subtype’ları',
  ents: [
    { id: 'st', name: 'STUDENT', x: 20, y: 40, w: 120, minH: 44 },
    { id: 'bq', name: 'BONUS QUESTION', x: 20, y: 216, w: 140, minH: 46 },
    { id: 'quiz', hidden: true, name: 'QUIZ', x: 258, y: 224, w: 214, h: 30 },
    {
      id: 'ex', name: 'EXAM', x: 250, y: 20, w: 230,
      attrs: ['# Number', '* Description', '* Weight', '* Date', '* Grade for written component'],
      subs: [
        { name: 'MIDTERM', attrs: ['* Grade for oral presentation'] },
        { name: 'FINAL', attrs: ['* Extra points for optional paper'] },
        { name: 'QUIZ', minH: 30 },
      ],
    },
  ],
  rels: [
    { over: true, a: { e: 'bq', side: 'r', must: false, many: true, label: 'included in' }, b: { e: 'quiz', side: 'l', must: false, label: 'includes', ly: 254, lx: 246 } },
    { a: { e: 'st', side: 'r', must: false, label: 'take' }, b: { e: 'ex', side: 'l', off: -82, must: true, many: true, label: 'taken by', ly: 78 } },
  ],
};

SECTIONS.push({
  no: 4,
  title: 'Supertype ve subtype',
  en: 'Supertypes and Subtypes',
  desc: 'Bir entity’yi alt gruplara bölmek: kurallar, exhaustive ve mutually exclusive.',
  lessons: [
    {
      id: '4-1',
      title: 'Supertype ve subtype',
      en: 'Supertypes and Subtypes',
      html: `
<p class="lead">Ödeme nakit, çek ya da kartla yapılır. Hepsinin tarihi ve tutarı vardır ama kart numarası sadece kartlı ödemede olur. Tek bir PAYMENT mı kurmalı, üç ayrı entity mi? Çözüm: supertype ve subtype.</p>

${term(`Supertype`, `Üst tip`, `<p>Ortak attribute ve ilişkileri taşıyan genel entity. Bazı instance’ların kendilerine özel attribute ya da ilişkisi varsa entity gruplara bölünür.</p>`, {
  star: true,
  exam: `The entity is called a "supertype" and each group is called a "subtype"`,
})}
${term(`Subtype`, `Alt tip`, `
  <p>Supertype’ın içindeki bir grup. Slayttaki kuralları:</p>
  <ul>
    <li>Inherits all attributes of the supertype <i>(attribute’ları miras alır)</i></li>
    <li>Inherits all relationships of the supertype <i>(ilişkileri miras alır)</i></li>
    <li>Usually has its own attributes or relationships <i>(genelde kendine ait attribute’u olur)</i></li>
    <li>Is drawn within the supertype <i>(içine çizilir)</i></li>
    <li>Never exists alone <i>(asla tek başına olmaz)</i></li>
    <li>May have subtypes of its own <i>(kendi subtype’ları olabilir)</i></li>
  </ul>`, {
  star: true,
})}
${erd('exam', 'Every QUIZ, MIDTERM, or FINAL is an EXAM; every EXAM is either a QUIZ, a MIDTERM, or a FINAL. Hepsi EXAM’ın attribute’larını ve STUDENT ilişkisini miras alır. QUIZ’in ayrıca kendine ait bir ilişkisi var (BONUS QUESTION).')}

${h2('İki kural')}
${term(`Exhaustive`, `Eksiksiz`, `<p>Supertype’ın her instance’ı mutlaka bir subtype’a girer, dışarıda kalan durum olmaz. Bunu garantilemek için kavramsal aşamada bir <b>OTHER</b> subtype’ı eklenir.</p>`, {
  star: true,
  exam: `Every instance of the supertype is also an instance of one of the subtypes`,
})}
${term(`Mutually exclusive`, `Birbirini dışlayan`, `<p>Her instance yalnızca bir subtype’a girer; aynı anda ikisinde olamaz.</p>`, {
  star: true,
  exam: `Each instance of a supertype is an instance of only one possible subtype`,
})}
${figure(`<div class="st"><b>WALL COVERING</b>
  <div class="st"><b>PAINT</b></div><div class="st"><b>WALLPAPER</b></div><div class="st"><b>FABRIC</b></div><div class="st other"><b>OTHER</b></div>
</div>`, 'OTHER sayesinde liste exhaustive olur.')}
${mix('Tek subtype olmaz', `Subtype’ı olan bir entity’nin en az iki subtype’ı olur. Tek bir subtype, supertype’ın aynısı olurdu.`)}

${h2('Subtype doğru mu? 3 soru')}
<ol>
  <li>Is this subtype a kind of supertype? <i>(gerçekten onun bir türü mü?)</i></li>
  <li>Have I covered all possible cases? <i>(exhaustive)</i></li>
  <li>Does each instance fit into one and only one subtype? <i>(mutually exclusive)</i></li>
</ol>
${note(`Her entity bölünebilir; önemli olan bir sebep olması. İşletme benzerlik ve farkları göstermek istiyorsa subtype kullan.`)}
${figure(`<div class="st"><b>ANIMAL</b>
  <div class="st"><b>VERTEBRATE</b>
    <div class="st-row"><div class="st"><b>BIRD</b></div><div class="st"><b>REPTILE</b></div><div class="st"><b>MAMMAL</b></div><div class="st other"><b>OTHER</b></div></div>
  </div>
  <div class="st"><b>INVERTEBRATE</b></div>
</div>`, 'Nested subtypes: iç içe subtype’lar. Okunaklı kalsın diye genelde 2 seviye çizilir, ama daha fazlası yasak değil.')}
`,
    },
  ],
});
