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
  desc: 'Bir entity’yi alt gruplara bölmeyi, bunun kurallarını ve exhaustive ile mutually exclusive kavramlarını öğreniyorsun.',
  lessons: [
    {
      id: '4-1',
      title: 'Supertype ve subtype',
      en: 'Supertypes and Subtypes',
      html: `
<p class="lead">Bir şeyin “seçenekleri” varsa orada genelde supertype ve subtype vardır: yemek siparişi içeride yenir ya da paket alınır, market poşeti kâğıt ya da plastik olur, ödeme de nakit, çek ya da kartla yapılır. Ortak yanları olan ama birbirinden de farklı böyle grupları modellemek için supertype ve subtype kullanırsın.</p>
<p>Ödeme örneğine bakalım. Bütün ödemelerin bir tarihi ve tutarı vardır, ama kart numarası sadece kartlı ödemede olur. Ayrıca kartlı ve çekli ödemede ödemeyi hangi CUSTOMER’ın yaptığını bilmek gerekebilir, nakit ödemede ise buna gerek yoktur.</p>
${more(`<p>Peki tek bir PAYMENT entity’si mi kurmalı, yoksa CASH, CHECK ve CREDIT CARD diye üç ayrı entity mi? İleride dördüncü bir ödeme yöntemi gelirse ne olacak? İşte burada supertype ve subtype devreye girer.</p>`)}

${term(`Supertype`, `Üst tip`, `<p>Bir grup instance’ın sadece o gruba ait attribute’ları ya da ilişkileri varsa entity’yi gruplara bölersin; ortak attribute’ları ve ilişkileri taşıyan bu genel entity’ye supertype, her bir gruba da subtype denir.</p>`, {
  star: true,
  exam: `The entity is called a "supertype" and each group is called a "subtype"`,
})}
${term(`Subtype`, `Alt tip`, `
  <p>Subtype, supertype’ın içindeki gruplardan biridir ve kuralları şunlardır:</p>
  <ul>
    <li>Inherits all attributes of the supertype <i>(attribute’ları miras alır)</i></li>
    <li>Inherits all relationships of the supertype <i>(ilişkileri miras alır)</i></li>
    <li>Usually has its own attributes or relationships <i>(genelde kendine ait attribute’u ya da ilişkisi olur)</i></li>
    <li>Is drawn within the supertype <i>(içine çizilir)</i></li>
    <li>Never exists alone <i>(asla tek başına olmaz)</i></li>
    <li>May have subtypes of its own <i>(kendi subtype’ları olabilir)</i></li>
  </ul>`, {
  star: true,
})}
${erd('exam', 'Diyagram şöyle okunur: Every QUIZ, MIDTERM, or FINAL is an EXAM; every EXAM is either a QUIZ, a MIDTERM, or a FINAL.', 'Büyük kutu supertype olan EXAM, içindeki üç kutu da onun subtype’ları; ortak attribute’lar sadece EXAM’da bir kez yazılır, subtype kutusunda yalnızca o türe özel olan durur. STUDENT çizgisi EXAM’ın dış kenarına bağlı, bu yüzden üç subtype da bu ilişkiyi miras alır. BONUS QUESTION çizgisi ise sadece QUIZ’e bağlı, yani bu ilişki yalnızca QUIZ’e ait.')}

${h2('İki kural')}
${term(`Exhaustive`, `Eksiksiz`, `<p>Exhaustive, supertype’ın her instance’ının mutlaka bir subtype’a girmesi demektir; bunu garantilemek için kavramsal aşamada bir <b>OTHER</b> (diğer) subtype’ı eklenir.</p>`, {
  star: true,
  exam: `Every instance of the supertype is also an instance of one of the subtypes`,
  more: `<p>Yani dışarıda kalan hiçbir durum olmaz: listede sayılmayan her şey OTHER’a girer.</p>`,
})}
${term(`Mutually exclusive`, `Birbirini dışlayan`, `<p>Mutually exclusive, her instance’ın yalnızca bir subtype’a girmesi demektir; mesela bir sınav hem QUIZ hem FINAL olamaz.</p>`, {
  star: true,
  exam: `Each instance of a supertype is an instance of only one possible subtype`,
  more: `<p>Yani bir instance aynı anda iki subtype’ta birden olamaz.</p>`,
})}
${figure(`<div class="st"><b>WALL COVERING</b>
  <div class="st"><b>PAINT</b></div><div class="st"><b>WALLPAPER</b></div><div class="st"><b>FABRIC</b></div><div class="st other"><b>OTHER</b></div>
</div>`, '', 'Dıştaki kutu supertype, içindeki dört kutu subtype. Beyaz kutuya, yani OTHER’a bak: listede adı geçmeyen bir duvar kaplaması da OTHER’a girer, böylece liste exhaustive olur.')}
${mix('Tek subtype olmaz', `Subtype’ı olan bir entity’nin en az iki subtype’ı olur. Tek bir subtype olsaydı supertype’ın aynısı olurdu, yani bölmenin bir anlamı kalmazdı.`)}

${h2('Subtype doğru mu? Kendine 3 soru sor')}
<ol>
  <li>Is this subtype a kind of supertype? <i>(gerçekten onun bir türü mü?)</i></li>
  <li>Have I covered all possible cases? <i>(exhaustive)</i></li>
  <li>Does each instance fit into one and only one subtype? <i>(mutually exclusive)</i></li>
</ol>
${note(`Aslında her entity bir şekilde bölünebilir; önemli olan, bölmek için bir sebep olması. İşletme gruplar arasındaki benzerlikleri ve farkları göstermek istiyorsa subtype kullan.`)}
${figure(`<div class="st"><b>ANIMAL</b>
  <div class="st"><b>VERTEBRATE</b>
    <div class="st-row"><div class="st"><b>BIRD</b></div><div class="st"><b>REPTILE</b></div><div class="st"><b>MAMMAL</b></div><div class="st other"><b>OTHER</b></div></div>
  </div>
  <div class="st"><b>INVERTEBRATE</b></div>
</div>`, 'Nested subtypes, yani iç içe subtype’lar. Diyagram okunaklı kalsın diye genelde 2 seviye çizilir, ama daha fazlası yasak değil.', 'VERTEBRATE kutusuna bak: hem ANIMAL’ın bir subtype’ı, hem de BIRD, REPTILE, MAMMAL ve OTHER’ın supertype’ı. Yani bir subtype’ın kendi subtype’ları olabilir.')}
`,
    },
  ],
});
