// ---------- Bölüm 6 diyagramları ----------
ERDS.ticket = {
  w: 420, h: 108, label: 'Simple ve composite UID',
  ents: [
    { id: 'a', name: 'CONCERT TICKET', x: 20, y: 20, w: 170, attrs: ['# Ticket number', '* Name'] },
    { id: 'b', name: 'CONCERT TICKET', x: 230, y: 20, w: 170, attrs: ['# Date of performance', '# Seat number'] },
  ],
  notes: [
    { x: 105, y: 100, text: 'Simple UID', anchor: 'middle' },
    { x: 315, y: 100, text: 'Composite UID', anchor: 'middle' },
  ],
};
ERDS.account = {
  w: 490, h: 110, label: 'ACCOUNT ve BANK, barred ilişki',
  ents: [
    { id: 'ac', name: 'ACCOUNT', x: 20, y: 20, w: 150, attrs: ['# Number', '* Balance', '* Date opened'] },
    { id: 'bk', name: 'BANK', x: 330, y: 20, w: 140, attrs: ['# Number', '* Name'] },
  ],
  rels: [
    { a: { e: 'ac', side: 'r', must: true, many: true, bar: true, label: 'at' }, b: { e: 'bk', side: 'l', off: 7.5, must: false, label: 'have', ly: 76 } },
  ],
};
ERDS.catalog = {
  w: 500, h: 230, label: 'CATALOG ITEM, artificial UID’li intersection entity',
  ents: [
    { id: 'ci', name: 'CATALOG ITEM', x: 20, y: 20, w: 150, attrs: ['# Number', '* Price'] },
    { id: 'mf', name: 'MANUFACTURER', x: 330, y: 20, w: 150, attrs: ['# Number', '* Name'] },
    { id: 'pr', name: 'PRODUCT', x: 20, y: 150, w: 150, attrs: ['# Code', '* Description'] },
  ],
  rels: [
    { a: { e: 'ci', side: 'r', must: true, many: true, label: 'supplied by' }, b: { e: 'mf', side: 'l', must: false, label: 'supply', ly: 66 } },
    { a: { e: 'ci', side: 'b', must: true, many: true, label: 'for' }, b: { e: 'pr', side: 't', must: false, label: 'has' } },
  ],
};
ERDS.students2 = {
  w: 440, h: 158, label: 'Primary ve secondary UID’ler',
  ents: [
    { id: 'a', name: 'STUDENT', x: 20, y: 20, w: 180, attrs: ['# Student ID', '(#) Badge number', '* First name', '* Last name', '* Address'] },
    { id: 'b', name: 'STUDENT', x: 240, y: 20, w: 180, attrs: ['# Student ID', '(#1) Badge number', '(#2-1) First name', '(#2-2) Last name', '* Address'] },
  ],
  notes: [
    { x: 110, y: 145, text: 'Bir secondary UID', anchor: 'middle' },
    { x: 330, y: 145, text: 'İki secondary UID (biri composite)', anchor: 'middle' },
  ],
};
ERDS.school1 = {
  w: 220, h: 120, label: '1NF ihlali',
  ents: [{ id: 'sb', name: 'SCHOOL BUILDING', x: 20, y: 20, w: 175, attrs: ['# Code', '* Name', '* Address', '!o Classroom'] }],
};
ERDS.school1fix = {
  w: 490, h: 110, label: '1NF çözümü',
  ents: [
    { id: 'sb', name: 'SCHOOL BUILDING', x: 20, y: 20, w: 175, attrs: ['# Code', '* Name', '* Address'] },
    { id: 'cr', name: 'CLASSROOM', x: 330, y: 20, w: 140, attrs: ['# Number', '* Floor', '* Size'] },
  ],
  rels: [
    { a: { e: 'sb', side: 'r', must: false, label: 'the location of' }, b: { e: 'cr', side: 'l', must: true, many: true, label: 'located in', ly: 76 } },
  ],
};
ERDS.psBefore = {
  w: 240, h: 120, label: '2NF ihlali',
  ents: [{ id: 'ps', name: 'PRODUCT SUPPLIER', x: 20, y: 20, w: 195, attrs: ['# Supplier number', '# Product number', '* Purchase price', '!* Supplier name'] }],
};
ERDS.psAfter = {
  w: 500, h: 125, label: '2NF çözümü',
  ents: [
    { id: 'ps', name: 'PRODUCT SUPPLIER', x: 20, y: 20, w: 195, attrs: ['~# Supplier number', '# Product number', '* Purchase price', '~* Supplier name'] },
    { id: 'su', name: 'SUPPLIER', x: 350, y: 20, w: 130, attrs: ['# Id', '* Name'] },
  ],
  rels: [
    { a: { e: 'ps', side: 'r', off: -15, must: true, many: true, bar: true }, b: { e: 'su', side: 'l', must: false } },
  ],
};
ERDS.account2nf = {
  w: 490, h: 125, label: '2NF ihlali ve çözümü: Bank location',
  ents: [
    { id: 'ac', name: 'ACCOUNT', x: 20, y: 20, w: 150, attrs: ['# Number', '* Balance', '* Date opened', '~* Bank location'] },
    { id: 'bk', name: 'BANK', x: 330, y: 20, w: 140, attrs: ['# Number', '* Name', '!* Location'] },
  ],
  rels: [
    { a: { e: 'ac', side: 'r', off: -7.5, must: true, many: true, bar: true, label: 'at' }, b: { e: 'bk', side: 'l', must: false, label: 'have', ly: 76 } },
  ],
};
ERDS.cdBefore = {
  w: 220, h: 150, label: '3NF ihlali',
  ents: [{ id: 'cd', name: 'CD', x: 20, y: 20, w: 175, attrs: ['# Id', '* Title', '* Producer', '* Year', 'o Store name', '!o Store address'] }],
};
ERDS.cdAfter = {
  w: 490, h: 125, label: '3NF çözümü',
  ents: [
    { id: 'cd', name: 'CD', x: 20, y: 20, w: 150, attrs: ['# Id', '* Title', '* Producer', '* Year'] },
    { id: 'st', name: 'STORE', x: 330, y: 20, w: 140, attrs: ['# Number', '* Name', '* Address'] },
  ],
  rels: [
    { a: { e: 'cd', side: 'r', must: false, many: true, label: 'contained in' }, b: { e: 'st', side: 'l', off: 7.5, must: false, label: 'contains', ly: 86 } },
  ],
};
ERDS.partner = {
  w: 300, h: 285, label: 'EMPLOYEE ve PARTNER, 1:1',
  ents: [
    { id: 'em', name: 'EMPLOYEE', x: 20, y: 20, w: 160, attrs: ['# Id', '* Name', '* Address', '* Birth place'] },
    { id: 'pa', name: 'PARTNER', x: 20, y: 190, w: 160, attrs: ['# Number', '* Name', '* Birth date'] },
  ],
  rels: [
    { a: { e: 'em', side: 'b', off: -40, must: false, label: 'have', lx: 67, ly: 132, anchor: 'start' }, b: { e: 'pa', side: 't', off: -40, must: true, label: 'the dependent of', lx: 67, ly: 176, anchor: 'start' } },
  ],
};

SECTIONS.push({
  no: 6,
  title: 'UID türleri ve normalizasyon',
  en: 'UIDs and Normalization',
  desc: 'Simple, composite, artificial ve secondary UID’ler; tekrarı önleyen 1NF, 2NF ve 3NF kuralları.',
  lessons: [
    // ------------------------------------------------------------------ 6-1
    {
      id: '6-1',
      title: 'Yapay, bileşik ve ikincil UID’ler',
      en: 'Artificial, Composite, and Secondary UIDs',
      html: `
<p class="lead">UID’yi 2-2’de gördün. Bu ders onun türlerini anlatıyor.</p>
${term(`UID`, `Benzersiz tanımlayıcı`, `<p>Aradığın tek kaydı bulmanı sağlayan değer ya da değerler. Veritabanında primary key olur.</p>`, {
  exam: `The value or combination of values that enables the user to find that one unique item among all the rest`,
})}

${h2('Simple ve composite')}
${term(`Simple UID`, `Basit UID`, `<p>Tek bir attribute’tan oluşan UID: bilet numarası gibi.</p>`, {
  star: true,
  exam: `A UID that is a single attribute is a simple UID`,
})}
${term(`Composite UID`, `Bileşik UID`, `<p>Birden çok attribute’un birleşimi. Konser biletinde tarih de koltuk da tek başına yetmez (aynı koltuk her gece satılır), ikisi birlikte yeter.</p>`, {
  star: true,
  exam: `If the UID is a combination of attributes, it is called a composite UID`,
})}
${erd('ticket')}

${h2('Artificial UID')}
${term(`Artificial UID`, `Yapay UID`, `<p>Doğada olmayan, sistemin tanımlamak için verdiği numara: öğrenci numarası, müşteri ID’si, pasaport numarası. Ayakkabının numarası yoktur; mağaza her çifte bir Shoe ID verir.</p>`, {
  star: true,
  exam: `Artificial UIDs are those that don't occur in the natural world but are created for purposes of identification in a system`,
})}
<p>Ad + soyad + adres belki benzersizdir ama tek bir ID daha pratiktir. Bir UID hem artificial hem composite olabilir.</p>

${h2('İlişkiden gelen UID')}
<p>UID bir attribute ile bir ilişkinin birleşimi de olabilir. Aynı hesap numarası farklı bankalarda olabileceği için ACCOUNT’un UID’si hesap numarası + BANK’tır (barred ilişki, 5-3).</p>
${erd('account')}
<p>Intersection entity çubuk yerine yapay bir UID de kullanabilir: CATALOG ITEM’ın UID’si kendi <b># Number</b>’ı, ilişkileri barred değil.</p>
${erd('catalog')}

${h2('Candidate, primary, secondary')}
${term(`Candidate UID`, `Aday UID`, `<p>UID olabilecek her aday. Alışveriş sitesinde hem müşteri kodun hem e-postan seni tanımlar; ikisi de candidate UID’dir.</p>`, {
  star: true,
  exam: `One of several UIDs that could be used to identify something`,
})}
${term(`Primary UID`, `Birincil UID`, `<p>Adaylar arasından seçilen asıl UID. Her entity’de yalnızca bir tane olur.</p>`, {
  star: true,
  exam: `A candidate UID that is the primary identifier of something`,
})}
${term(`Secondary UID`, `İkincil UID`, `<p>Seçilmeyen diğer adaylar; numaranı unutunca seni yaka kartınla bulmaya yarar. ERD’de <code>(#)</code> ile gösterilir.</p>`, {
  star: true,
  exam: `A candidate UID that also identifies something, but is not the primary UID`,
})}
${erd('students2', 'İkisinde de primary UID Student ID. Sağdaki First name + Last name tekrar edebileceği için primary seçilmez.')}
`,
    },

    // ------------------------------------------------------------------ 6-2
    {
      id: '6-2',
      title: 'Normalizasyon ve birinci normal form',
      en: 'Normalization and First Normal Form',
      html: `
<p class="lead">Bir telefon numarasını üç yerde tutarsan, numara değişince üçünü de düzeltmen gerekir; birini unutursan hangisi doğru bilemezsin. Normalizasyon bunu önler.</p>
${term(`Redundancy`, `Gereksiz tekrar`, `<p>Aynı verinin gereksiz yere birden çok yerde durması.</p>`, {
  exam: `Something that is unnecessarily repetitive`,
})}
${term(`Normalization`, `Normalizasyon`, `<p>Tasarımı adım adım düzelten kurallar. Tekrarı ve tutarsızlığı azaltır: her bilgi tek ve en doğru yerde dursun.</p>`, {
  star: true,
  exam: [
    `A series of steps followed to obtain a database design that allows for efficient access and storage of data`,
    `Store information in one place and in the best possible place`,
  ],
})}
${tip(`<b>Every non-UID attribute must be dependent on the UID, the whole UID, and nothing but the UID.</b> Üç parça sırasıyla 1NF, 2NF ve 3NF’ye denk gelir (bu eşleştirme benim).`, 'Hafıza cümlesi')}
${note(`Kurallar 5NF’e kadar gider; derste ilk üçü var ve çoğu iş modeli için 3NF yeterlidir.`)}

${term(`First Normal Form (1NF)`, `Birinci normal form`, `<p>Hiçbir attribute çok değerli (multi-valued) olamaz: her instance’ta her attribute’un tek değeri olmalı.</p>`, {
  star: true,
  exam: `First Normal Form requires that no multi-valued attributes exist`,
})}
<p>Bir binanın tek adresi ama çok sınıfı vardır. Classroom çok değerli, yani 1NF ihlali:</p>
${erd('school1')}
${steps([
  ['Çok değerli attribute’u bul', 'Classroom.'],
  ['Onu yeni bir entity yap', 'CLASSROOM, kendi attribute’larıyla.'],
  ['1:M ilişkiyle bağla', 'Bir binada çok sınıf olur.'],
])}
${erd('school1fix', 'İki entity de 1NF’de.')}
${table(['Entity', 'Çok değerli attribute', 'Çözüm'], [
  ['STUDENT', 'Subject', 'SUBJECT entity’si'],
  ['SHOPPING MALL', 'Store name, Store floor', 'STORE entity’si'],
  ['TEAM', 'Player', 'PLAYER entity’si'],
])}
`,
    },

    // ------------------------------------------------------------------ 6-3
    {
      id: '6-3',
      title: 'İkinci normal form',
      en: 'Second Normal Form',
      html: `
<p class="lead">Arkadaşının adresini tarif kutusuna koyarsan, o tarifi açana kadar bulamazsın. 2NF, her attribute’un doğru entity’de olup olmadığını kontrol eder.</p>
${term(`Second Normal Form (2NF)`, `İkinci normal form`, `<p>UID’nin parçası olmayan her attribute, UID’nin <b>tamamına</b> bağlı olmalı; sadece bir parçasına değil. Bu yüzden 2NF ihlali ancak composite UID’de olur. UID simple ise entity zaten 2NF’dedir.</p>`, {
  star: true,
  exam: `Any non-UID attribute be dependent on (be a property of, or a characteristic of) the entire UID`,
})}
${tip(`Her attribute için sor: “Bu, UID’nin şu parçasının mı, bu parçasının mı, yoksa ikisinin birden mi özelliği?” 2NF için cevap her zaman <b>ikisi birden</b> olmalı.`, 'Kontrol sorusu')}

${h2('Örnek: PRODUCT SUPPLIER')}
${erd('psBefore')}
<p>UID, Supplier number + Product number. <b>Purchase price</b> ikisine birden bağlı, doğru yerde. <b>Supplier name</b> ise sadece Supplier number’a bağlı: 2NF ihlali. Bir tedarikçi 5 ürün veriyorsa adı 5 kez yazılır; ad değişince hepsi düzeltilmeli.</p>
${erd('psAfter', 'Çözüm: SUPPLIER entity’si eklenir, Supplier name oraya taşınır, Supplier number’ın yerini barred ilişki alır.')}

${h2('Örnek: ACCOUNT ve BANK')}
<p>ACCOUNT’un UID’si hesap numarası + BANK (barred ilişki). Balance ve Date opened ikisine birden bağlı, yani 2NF’de. Ama <b>Bank location</b> eklenirse, o sadece bankaya bağlıdır: ihlal. Banka taşınınca o bankadaki her hesap güncellenmek zorunda kalır. Çözüm: BANK’a taşımak.</p>
${erd('account2nf')}
${note(`ORDER LINE’ın UID’si ORDER ve PRODUCT’tan (barred) gelir. Quantity ikisine bağlıdır, doğru yerdedir. Item price ise sadece ürüne bağlıdır: 2NF ihlali. PRODUCT’a taşınır.`, 'Bir örnek daha: ORDER LINE')}
`,
    },

    // ------------------------------------------------------------------ 6-4
    {
      id: '6-4',
      title: 'Üçüncü normal form',
      en: 'Third Normal Form',
      html: `
<p class="lead">Aynı okula giden beş arkadaşının yanına okulun adresini ayrı ayrı yazarsan, okul taşındığında beşini de düzeltmen gerekir. 3NF bu tür gizli tekrarı yakalar.</p>
${term(`Third Normal Form (3NF)`, `Üçüncü normal form`, `<p>UID olmayan hiçbir attribute, UID olmayan başka bir attribute’a bağlı olamaz. Başka bir deyişle: attribute’ların kendi attribute’u olmaz. 3NF’de olmak için önce 2NF’de olmak gerekir.</p>`, {
  star: true,
  exam: [
    `No non-UID attribute can be dependent on another non-UID attribute`,
    `All non-key fields are dependent on the key, the whole key, and nothing but the key`,
  ],
})}
${term(`Transitive dependency`, `Geçişli bağımlılık`, `<p>Bir attribute’un UID’ye değil, aynı entity’deki UID olmayan başka bir attribute’a bağlı olması. 3NF bunu yasaklar.</p>`, {
  star: true,
  exam: `Exists when any attribute in an entity is dependent on any other non-UID attribute in that entity`,
})}

${h2('Örnek: CD ve mağaza')}
${erd('cdBefore')}
<p>Store address CD’nin UID’sine bağlı, yani 1NF ve 2NF tamam. Ama aslında <b>Store name</b>’e bağlı; o da UID değil. Bu bir transitive dependency, yani 3NF ihlali. Mağaza taşınırsa o mağazadan alınan her CD düzeltilmeli.</p>
${erd('cdAfter', 'Çözüm: STORE entity’si oluşturulur, mağaza bilgileri oraya taşınır ve CD’ye ilişkiyle bağlanır.')}
${tip(`3NF ihlali çoğu zaman gizli bir entity’dir. Yeni entity oluştur, ihlale yol açan attribute’ları oraya taşı (UID ver), eski entity’ye ilişkiyle bağla.`, 'Çözüm adımları')}

${h2('İki örnek daha')}
${table(['İhlal', 'Neden', 'Çözüm'], [
  ['CITY içinde State flower', 'Çiçek şehrin değil eyaletin özelliği', 'STATE entity’si'],
  ['EMPLOYEE içinde Partner birth date', 'Doğum tarihi çalışanın değil eşinin özelliği', 'PARTNER entity’si'],
])}
${erd('partner', 'Her çalışanın eşi olmayabilir: EMPLOYEE tarafı may. Eş bilgisi ancak bir çalışanın eşiyse tutulur: PARTNER tarafı must.')}
${mix('2NF ve 3NF', `<b>2NF</b>: attribute UID’nin sadece bir <b>parçasına</b> bağlı (composite UID’de olur). <b>3NF</b>: attribute UID’ye değil, UID olmayan <b>başka bir attribute’a</b> bağlı.`)}
`,
    },
  ],
});
