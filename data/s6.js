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
    { id: 'bk', name: 'BANK', x: 330, y: 20, w: 140, attrs: ['# Number', '* Name', '* Location'] },
  ],
  rels: [
    { a: { e: 'ac', side: 'r', must: true, many: true, bar: true, label: 'at' }, b: { e: 'bk', side: 'l', must: false, label: 'have', ly: 76 } },
  ],
};
ERDS.studentArt = {
  w: 490, h: 125, label: 'STUDENT için artificial UID',
  ents: [
    { id: 'a', name: 'STUDENT', x: 20, y: 20, w: 160, attrs: ['* First name', '* Last name', '* Address'] },
    { id: 'b', name: 'STUDENT', x: 310, y: 20, w: 160, attrs: ['!# Student ID', '* First name', '* Last name', '* Address'] },
  ],
  notes: [
    { x: 245, y: 58, text: 'Create an', cls: 'hl', anchor: 'middle' },
    { x: 245, y: 74, text: 'artificial UID →', cls: 'hl', anchor: 'middle' },
  ],
};
ERDS.orderLine = {
  w: 490, h: 220, label: 'ORDER LINE, 2NF ihlali ve çözümü',
  ents: [
    { id: 'ol', name: 'ORDER LINE', x: 175, y: 15, w: 140, attrs: ['* Quantity', '~* Item price'] },
    { id: 'or', name: 'ORDER', x: 20, y: 135, w: 130, attrs: ['# Order ID', '* Order date'] },
    { id: 'pr', name: 'PRODUCT', x: 340, y: 135, w: 130, attrs: ['# Product ID', '* Description', '!* Item price'] },
  ],
  rels: [
    { a: { e: 'ol', side: 'b', off: -35, must: true, many: true, bar: true }, b: { e: 'or', side: 'r', must: false }, via: [[210, 165]] },
    { a: { e: 'ol', side: 'b', off: 35, must: true, many: true, bar: true }, b: { e: 'pr', side: 'l', must: false }, via: [[280, 172.5]] },
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
  w: 490, h: 155, label: '3NF çözümü',
  ents: [
    { id: 'cd', name: 'CD', x: 20, y: 20, w: 150, attrs: ['# Id', '* Title', '* Producer', '* Year', '~o Store name', '~o Store address'] },
    { id: 'st', name: 'STORE', x: 330, y: 20, w: 140, attrs: ['# Number', '!* Name', '!* Address'] },
  ],
  rels: [
    { a: { e: 'cd', side: 'r', off: -15, must: false, many: true, label: 'contained in' }, b: { e: 'st', side: 'l', off: 7.5, must: false, label: 'contains', ly: 86 } },
  ],
};
ERDS.partner = {
  w: 300, h: 285, label: 'EMPLOYEE ve PARTNER, 1:1',
  ents: [
    { id: 'em', name: 'EMPLOYEE', x: 20, y: 20, w: 160, attrs: ['# Id', '* Name', '* Address', '* Birth place'] },
    { id: 'pa', name: 'PARTNER', x: 20, y: 190, w: 160, attrs: ['# Number', '!* Name', '!* Birth date'] },
  ],
  rels: [
    { a: { e: 'em', side: 'b', off: -40, must: false, label: 'have', lx: 67, ly: 132, anchor: 'start' }, b: { e: 'pa', side: 't', off: -40, must: true, label: 'the dependent of', lx: 67, ly: 176, anchor: 'start' } },
  ],
};

SECTIONS.push({
  no: 6,
  title: 'UID türleri ve normalizasyon',
  en: 'UIDs and Normalization',
  desc: 'Bu bölümde UID’nin türlerini (simple, composite, artificial ve secondary) ve verinin gereksiz yere tekrar etmesini önleyen 1NF, 2NF ve 3NF kurallarını öğreneceksin.',
  lessons: [
    // ------------------------------------------------------------------ 6-1
    {
      id: '6-1',
      title: 'Yapay, bileşik ve ikincil UID’ler',
      en: 'Artificial, Composite, and Secondary UIDs',
      html: `
<p class="lead">Bu derste, 2-2. derste gördüğün UID’nin farklı türlerini tanıyacaksın.</p>
${term(`UID`, `Benzersiz tanımlayıcı`, `<p>UID, aradığın tek kaydı diğer bütün kayıtların arasından bulmanı sağlayan değer ya da değerler grubudur.</p>`, {
  exam: `The value or combination of values that enables the user to find that one unique item among all the rest`,
  more: `<p>Veritabanına geçtiğimizde UID, tablonun primary key’i (birincil anahtarı) olur.</p>`,
})}

${h2('Simple ve composite')}
${term(`Simple UID`, `Basit UID`, `<p>Simple UID, tek bir attribute’tan oluşan UID’dir.</p>`, {
  star: true,
  exam: `A UID that is a single attribute is a simple UID`,
  more: `<p>Mesela bir konser biletini sadece bilet numarasına bakarak bulabilirsin; bu durumda bilet numarası simple UID’dir.</p>`,
})}
${term(`Composite UID`, `Bileşik UID`, `<p>Composite UID, birden çok attribute’un bir araya gelmesiyle oluşan UID’dir; konser biletindeki tarih ve koltuk numarası gibi.</p>`, {
  star: true,
  exam: `If the UID is a combination of attributes, it is called a composite UID`,
  more: `<p>Bir konser biletini sadece tarihe bakarak bulamazsın, çünkü o gece çok sayıda bilet satılır. Sadece koltuk numarası da yetmez, çünkü aynı koltuk her gece yeniden satılır. Ama tarih ve koltuk numarası birlikte bileti kesin olarak tanımlar.</p>`,
})}
${erd('ticket', '', `Soldaki bilette tek bir <b>#</b> satırı var, yani UID tek başına Ticket number. Sağdaki bilette ise iki <b>#</b> satırı birlikte tek bir UID oluşturuyor.`)}

${h2('Artificial UID')}
${term(`Artificial UID`, `Yapay UID`, `<p>Artificial UID, doğada kendiliğinden bulunmayan, sistem kayıtları birbirinden ayırabilsin diye sonradan verilen bir numaradır.</p>`, {
  star: true,
  exam: `Artificial UIDs are those that don't occur in the natural world but are created for purposes of identification in a system`,
  more: `<p>Öğrenci numarası, müşteri ID’si ve pasaport numarası buna örnektir; kimse bir numarayla doğmaz. Ayakkabıların da onları birbirinden ayıran doğal bir kimlik numarası yoktur, bu yüzden mağaza her çifte bir Shoe ID verir.</p>`,
})}
<p>Bir öğrenciyi ad ve soyadıyla tanımlamak ancak bu birleşimin benzersiz olduğundan eminsen işe yarar; çoğu zaman yapay bir attribute oluşturup onu UID yapmak daha basittir. Bir UID aynı anda hem artificial hem composite de olabilir.</p>
${more(`<p>Ad, soyad ve adres üçlüsü büyük ihtimalle benzersizdir, ama tek bir ID kadar pratik değildir. Kütüphanede, spor salonunda ya da notlarının bir kopyasını isterken her seferinde adını ve adresini vermek yerine öğrenci numaranı söylemek çok daha kolaydır.</p>`)}
${erd('studentArt', '', `Soldaki STUDENT’ın hiç UID’si yok. Sağda ona yapay bir attribute olan <b># Student ID</b> eklendi (kırmızı) ve UID bu oldu.`)}

${h2('İlişkiden gelen UID')}
<p>UID, bir attribute ile bir ilişkinin birleşiminden de oluşabilir; diyagramda bunu ilişki çizgisinin üstündeki çubuk gösterir (barred ilişki, 5-3).</p>
${more(`<p>Mesela aynı hesap numarası farklı bankalarda bulunabilir, yani hesap numarası tek başına yetmez. Bu yüzden ACCOUNT’un UID’si, hesap numarası ile hesabın bağlı olduğu BANK’ın birleşimidir. Bankalar arası havalede de hesap numarasının yanında her zaman bankanın numarası istenir.</p>`)}
${erd('account', '', `Çizginin ACCOUNT ucundaki dik çubuğa bak: bu çubuk, BANK’ın ACCOUNT’un UID’sinin bir parçası olduğunu gösterir. Yani bir hesabı bulmak için hem hesabın Number’ını hem de bağlı olduğu bankayı bilmen gerekir.`)}
<p>Bir intersection entity’nin (çoka-çok ilişkiyi çözmek için araya giren entity) UID’si normalde barred ilişkilerinden gelir; mesela ENROLLMENT’ın UID’si STUDENT ve SUBJECT’ten gelir (5-3). Ama bu zorunlu değildir; intersection entity çubuk yerine kendine ait yapay bir UID de kullanabilir.</p>
${more(`<p>Aşağıda CATALOG ITEM’ın UID’si kendi <b># Number</b>’ıdır, bu yüzden ilişkileri barred değildir.</p>`)}
${erd('catalog', '', `Bir üretici (MANUFACTURER) birçok ürün (PRODUCT) üretebilir, bir ürünü de birçok üretici üretebilir; CATALOG ITEM bu M:M ilişkiyi çözen intersection entity’dir. Bir katalog kalemi üretici numarası ve ürün koduyla da tanımlanabilirdi. Ama CATALOG ITEM’dan çıkan iki çizgide de çubuk yok, çünkü onun yerine yapay bir UID olan katalog numarası (<b># Number</b>) oluşturuldu.`)}

${h2('Candidate, primary, secondary')}
${term(`Candidate UID`, `Aday UID`, `<p>Candidate UID, bir şeyi tanımlamak için kullanılabilecek UID adaylarından her biridir.</p>`, {
  star: true,
  exam: `One of several UIDs that could be used to identify something`,
  more: `<p>Mesela bir alışveriş sitesi seni hem müşteri kodunla hem de e-posta adresinle tanıyabilir. İkisi de seni tek başına tanımladığı için ikisi de candidate UID’dir.</p>`,
})}
${term(`Primary UID`, `Birincil UID`, `<p>Primary UID, adaylar arasından asıl tanımlayıcı olarak seçilen UID’dir.</p>`, {
  star: true,
  exam: `A candidate UID that is the primary identifier of something`,
  more: `<p>Bir entity’nin birden çok adayı olabilir ama yalnızca bir tane primary UID’si olur.</p>`,
})}
${term(`Secondary UID`, `İkincil UID`, `<p>Secondary UID, seçilmeyen ama yine de bir şeyi tanımlayabilen diğer adaylardır ve veriyi aramak için alternatif bir yol sağlar; ERD’de <code>(#)</code> işaretiyle gösterilir.</p>`, {
  star: true,
  exam: `A candidate UID that also identifies something, but is not the primary UID`,
  more: `<p>Mesela öğrenci numaranı unuttuğunda okul seni yaka kartındaki numarayla da bulabilir; işte o numara secondary UID’dir.</p>`,
})}
${erd('students2', `İki diyagramda da primary UID, Student ID’dir. Sağdaki First name + Last name birleşimi primary seçilmez, çünkü aynı ad ve soyada sahip iki öğrenci olabilir.`, `Parantez içindeki <b>(#)</b> secondary UID demek. Sağda <b>(#2-1)</b> ve <b>(#2-2)</b> aynı numarayı (2) taşıdığı için First name ile Last name birlikte tek bir secondary UID oluşturuyor.`)}
<p>UID’ler veritabanında primary key olur ve aradığın kaydı bulmanı sağlar; ama gerçek hayatta bir şeyi diğerinden ayırt etmek her zaman bu kadar kolay değildir.</p>
`,
    },

    // ------------------------------------------------------------------ 6-2
    {
      id: '6-2',
      title: 'Normalizasyon ve birinci normal form',
      en: 'Normalization and First Normal Form',
      html: `
<p class="lead">Normalizasyon, aynı bilgiyi veritabanında birden çok yerde tutmaktan doğan sorunları önlemek için vardır.</p>
${more(`<p>Bir arkadaşının telefon numarasını üç ayrı yere yazdığını düşün. Numara değişince üçünü de düzeltmen gerekir; birini unutursan hangisinin doğru olduğunu bilemezsin.</p>`)}
${term(`Redundancy`, `Gereksiz tekrar`, `<p>Redundancy, aynı verinin gereksiz yere birden çok yerde tutulmasıdır; bir telefon numarasını üç ayrı yere yazmak gibi.</p>`, {
  exam: `Something that is unnecessarily repetitive`,
})}
${term(`Normalization`, `Normalizasyon`, `<p>Normalizasyon, veritabanı tasarımını adım adım düzeltmek için izlenen kurallar dizisidir.</p>`, {
  star: true,
  exam: [
    `A series of steps followed to obtain a database design that allows for efficient access and storage of data`,
    `Store information in one place and in the best possible place`,
  ],
  more: `<p>Amacı tekrarı ve tutarsızlığı azaltmaktır: her bilgi tek bir yerde ve olabilecek en doğru yerde durmalıdır.</p>`,
})}
${tip(`<b>Every non-UID attribute must be dependent on the UID, the whole UID, and nothing but the UID.</b> Yani UID olmayan her attribute UID’ye, UID’nin tamamına ve sadece UID’ye bağlı olmalıdır. “The whole UID” kısmını 2NF’de (6-3), “nothing but the UID” kısmını da 3NF’de (6-4) göreceksin.`, 'Hafıza cümlesi')}
${note(`Normal form kuralları 5NF’e ve ötesine kadar gider (6NF ve 7NF çoğunlukla akademik). Derste sadece ilk üçü işleniyor; zaten çoğu iş modeli için 3NF yeterlidir.`)}

${term(`First Normal Form (1NF)`, `Birinci normal form`, `<p>1NF’nin kuralı şudur: hiçbir attribute çok değerli (multi-valued) olamaz ve tekrar eden gruplara (repeating groups) da izin verilmez.</p>`, {
  star: true,
  exam: `First Normal Form requires that no multi-valued attributes exist`,
  more: `<p>Yani bir entity’nin her instance’ında (her bir kaydında) her attribute’un yalnızca tek bir değeri olmalıdır.</p>`,
})}
<p>Mesela SCHOOL BUILDING içindeki Classroom attribute’u 1NF’yi ihlal eder, çünkü bir binada birçok sınıf bulunur.</p>
${more(`<p>Bir okul binasının tek bir adresi vardır, bu yüzden Address sorun çıkarmaz. Ama Classroom tek bir binada birden çok değer alır, bu da 1NF ihlalidir.</p>`)}
${erd('school1', '', `Kırmızı yazılan <b>Classroom</b>, 1NF’yi bozan çok değerli attribute’tur.`)}
${steps([
  ['Çok değerli attribute’u bul', 'Bu örnekte çok değerli olan attribute Classroom’dur, çünkü bir binada birden çok sınıf vardır.'],
  ['Onu yeni bir entity yap', 'Classroom’u, kendi attribute’ları (sınıf numarası, kat ve büyüklük) olan ayrı bir CLASSROOM entity’sine dönüştür.'],
  ['1:M ilişkiyle bağla', 'SCHOOL BUILDING ile CLASSROOM’u bire-çok (1:M) bir ilişkiyle bağla, çünkü bir binada birçok sınıf olabilir ama her sınıf tek bir binadadır.'],
])}
${erd('school1fix', 'Artık iki entity de 1NF’de: her attribute’un her kayıtta tek bir değeri var.', `Classroom artık SCHOOL BUILDING’in içinde değil; kendi attribute’ları olan ayrı bir CLASSROOM entity’si oldu. Çizginin CLASSROOM ucundaki crow’s foot, bir binada birçok sınıf olduğunu gösterir.`)}
<p>Aynı yöntemi başka örneklerde de kullanabilirsin:</p>
${table(['Entity', 'Çok değerli attribute', 'Çözüm'], [
  ['STUDENT', 'Subject', 'Yeni bir SUBJECT entity’si'],
  ['SHOPPING MALL', 'Store name, Store floor', 'Yeni bir STORE entity’si'],
  ['TEAM', 'Player', 'Yeni bir PLAYER entity’si'],
])}
`,
    },

    // ------------------------------------------------------------------ 6-3
    {
      id: '6-3',
      title: 'İkinci normal form',
      en: 'Second Normal Form',
      html: `
<p class="lead">2NF, her attribute’un doğru entity’de olup olmadığını kontrol eder.</p>
${more(`<p>Arkadaşının adresini tarif kutundaki bir tarif kartına yazarsan, o tarifi açana kadar adresi bulamazsın, çünkü adres yanlış yerde durur.</p>`)}
${term(`Second Normal Form (2NF)`, `İkinci normal form`, `<p>2NF’nin kuralı şudur: UID’nin parçası olmayan her attribute, UID’nin <b>tamamına</b> bağlı olmalıdır, sadece bir parçasına değil; bu yüzden UID’si simple olan bir entity zaten 2NF’dedir.</p>`, {
  star: true,
  exam: `Any non-UID attribute be dependent on (be a property of, or a characteristic of) the entire UID`,
  more: `<p>UID’nin parçaları olması için composite olması gerekir, bu yüzden 2NF ihlali ancak composite UID’li entity’lerde görülür.</p>`,
})}
${tip(`Her attribute için kendine şunu sor: “Bu, UID’nin şu parçasının mı, öbür parçasının mı, yoksa ikisinin birden mi özelliği?” Entity’nin 2NF’de olması için cevap her zaman <b>ikisi birden</b> olmalı.`, 'Kontrol sorusu')}

${h2('Örnek: PRODUCT SUPPLIER')}
${erd('psBefore', '', `İlk iki <b>#</b> satırı birlikte UID’yi oluşturur. Kırmızı yazılan <b>Supplier name</b> sorunlu attribute; nedeni hemen aşağıda.`)}
<p>Bu entity’nin UID’si Supplier number ile Product number’ın birleşimidir, ama <b>Supplier name</b> sadece Supplier number’a bağlıdır; bu bir 2NF ihlalidir.</p>
${more(`<p><b>Purchase price</b> (alış fiyatı) ise ikisine birden bağlıdır, yani doğru yerdedir. Supplier name’in ürünle bir ilgisi yoktur. Sorun şu: bir tedarikçi 5 ürün veriyorsa adı 5 kez yazılır, adı değişince de 5 kaydın hepsini düzeltmen gerekir.</p>`)}
${erd('psAfter', '', `Çözüm: Yeni bir SUPPLIER entity’si eklenir ve Supplier name oraya Name olarak taşınır. Üstü çizili iki satır PRODUCT SUPPLIER’dan çıkarıldı. Supplier number’ın yerini ise SUPPLIER’a giden çizgideki çubuk (barred ilişki) alır, yani tedarikçi hâlâ UID’nin parçası.`)}

${h2('Örnek: ACCOUNT ve BANK')}
<p>ACCOUNT’a <b>Bank location</b> eklersen 2NF ihlali olur, çünkü bankanın yeri hesaba değil sadece bankaya bağlıdır; çözüm bu attribute’u BANK entity’sine taşımaktır.</p>
${more(`<p>ACCOUNT’un UID’si, hesap numarası ile BANK’ın birleşimidir (barred ilişki). Balance (bakiye) ve Date opened (açılış tarihi) ikisine birden bağlıdır, yani Bank location eklenmeden önce entity 2NF’dedir. Bank location ACCOUNT’ta kalırsa, banka taşınınca o bankadaki her hesabı tek tek güncellemen gerekir.</p>`)}
${erd('account2nf', '', `Bu diyagram önceki ve sonraki hâli birlikte gösteriyor. ACCOUNT’taki üstü çizili Bank location, attribute’un eskiden durduğu yer; BANK’taki kırmızı Location ise taşındığı yeni yer.`)}

${h2('Örnek: ORDER LINE')}
<p>ORDER LINE’ın UID’si, ORDER ve PRODUCT’a giden barred ilişkilerden gelir; <b>Item price</b> (ürün fiyatı) ise sadece ürüne bağlı olduğu için bir 2NF ihlalidir ve PRODUCT’a taşınır.</p>
${more(`<p>Yani UID, Order ID ile Product ID’nin birleşimidir. Quantity’yi (miktar) bulmak için hem siparişi hem ürünü bilmen gerekir, yani doğru yerdedir. Item price’ı bulmak için ise sadece ürünü bilmen yeter.</p>`)}
${erd('orderLine', '', `İki çizgideki çubuklar, ORDER LINE’ın UID’sinin ORDER ve PRODUCT’tan geldiğini gösterir. ORDER LINE’daki üstü çizili Item price attribute’un eski yeri, PRODUCT’taki kırmızı Item price ise taşındığı yeni yer. Artık model 2NF’de.`)}
`,
    },

    // ------------------------------------------------------------------ 6-4
    {
      id: '6-4',
      title: 'Üçüncü normal form',
      en: 'Third Normal Form',
      html: `
<p class="lead">3NF, bir entity’nin içinde saklanan gizli tekrarları yakalamaya yarar.</p>
${more(`<p>Aynı okula giden beş arkadaşının her birinin yanına okulun adresini ayrı ayrı yazdığını düşün. Okul taşındığında beşini birden düzeltmen gerekir.</p>`)}
${term(`Third Normal Form (3NF)`, `Üçüncü normal form`, `<p>3NF’nin kuralı şudur: UID olmayan hiçbir attribute, UID olmayan başka bir attribute’a bağlı olamaz.</p>`, {
  star: true,
  exam: [
    `No non-UID attribute can be dependent on another non-UID attribute`,
    `All non-key fields are dependent on the key, the whole key, and nothing but the key`,
    `Non-UID attributes can't have attributes of their own`,
  ],
  more: `<p>Daha basit söylersek, UID olmayan bir attribute’un kendi attribute’u olmaz.</p>`,
})}
${term(`Transitive dependency`, `Geçişli bağımlılık`, `<p>Transitive dependency, bir attribute’un UID’ye değil de aynı entity’deki UID olmayan başka bir attribute’a bağlı olmasıdır.</p>`, {
  star: true,
  exam: `Exists when any attribute in an entity is dependent on any other non-UID attribute in that entity`,
  more: `<p>Yani bağlılık doğrudan UID’ye değil, araya giren başka bir attribute’a kurulur. 3NF bunu yasaklar.</p>`,
})}

${h2('Örnek: CD ve mağaza')}
${erd('cdBefore', '', `Son iki satıra bak: kırmızı yazılan <b>Store address</b>, CD’nin değil, hemen üstündeki Store name’in bilgisi.`)}
<p>Mağazanın adresi aslında CD’ye değil, UID olmayan <b>Store name</b>’e bağlıdır; bu bir transitive dependency, yani 3NF ihlalidir.</p>
${more(`<p>Store address, CD’nin UID’sine de bağlıdır, bu yüzden entity 1NF ve 2NF kurallarına uyar. Sorun şu: mağaza taşınırsa, o mağazadan alınan her CD kaydını tek tek düzeltmen gerekir.</p>`)}
${erd('cdAfter', '', `Çözüm: Yeni bir STORE entity’si oluşturulur ve mağaza bilgileri oraya taşınır. CD’deki üstü çizili iki satır, STORE’da kırmızı Name ve Address olarak duruyor; STORE’a kendi UID’si (<b>#&nbsp;Number</b>) verildi ve CD’ye bir ilişkiyle bağlandı.`)}
${tip(`3NF ihlali çoğu zaman içeride saklanmış bir entity olduğunu gösterir. Çözmek için yeni bir entity oluştur, ihlale yol açan attribute’ları oraya taşı ve yeni entity’ye bir UID ver. Son olarak yeni entity’yi eski entity’ye bir ilişkiyle bağla.`, 'Çözüm adımları')}

${h2('İki örnek daha')}
${table(['İhlal', 'Neden', 'Çözüm'], [
  ['CITY içinde State flower', 'Çiçek şehrin değil, eyaletin özelliğidir', 'Yeni bir STATE entity’si'],
  ['EMPLOYEE içinde Partner birth date', 'Doğum tarihi çalışanın değil, eşinin özelliğidir', 'Yeni bir PARTNER entity’si'],
])}
${erd('partner', 'Her çalışanın eşi olmayabilir, bu yüzden EMPLOYEE tarafı may (isteğe bağlı). Eş bilgisi ise ancak bir çalışanın eşiyse tutulur, bu yüzden PARTNER tarafı must (zorunlu).', `Bu, tablodaki ikinci örneğin çözümü. EMPLOYEE’de duran eşin adı ve doğum tarihi, yeni PARTNER entity’sine Name ve Birth date olarak taşındı (kırmızı).`)}
${mix('2NF ve 3NF', `<b>2NF</b> ihlalinde attribute, UID’nin sadece bir <b>parçasına</b> bağlıdır; bu yüzden yalnızca composite UID’lerde görülür. <b>3NF</b> ihlalinde ise attribute UID’ye değil, UID olmayan <b>başka bir attribute’a</b> bağlıdır. Bir entity’nin 3NF’de olabilmesi için önce 2NF’de olması gerekir.`)}
`,
    },
  ],
});
