ERDS.hr = {
  w: 720, h: 360, label: 'İK departmanı ERD’si',
  ents: [
    { id: 'emp', name: 'EMPLOYEE', x: 20, y: 20, w: 150, attrs: ['# Employee ID', '* First name', '* Last name', '* Hire date', '* Salary', 'o Commission'] },
    { id: 'dept', name: 'DEPARTMENT', x: 300, y: 30, w: 150, attrs: ['# Department ID', '* Name'] },
    { id: 'loc', name: 'LOCATION', x: 550, y: 20, w: 160, attrs: ['# Location ID', '* Street address', '* Postal code', '* City', '* State province'] },
    { id: 'job', name: 'JOB', x: 300, y: 220, w: 150, attrs: ['# Job ID', '* Title', '* Max salary', '* Min salary'] },
    { id: 'cty', name: 'COUNTRY', x: 550, y: 180, w: 160, attrs: ['# Country ID', '* Country name'] },
    { id: 'reg', name: 'REGION', x: 550, y: 290, w: 160, attrs: ['# Region ID', '* Region name'] },
  ],
  rels: [
    { a: { e: 'emp', side: 'r', off: -20, must: true, many: true, label: 'works in' }, b: { e: 'dept', side: 'l', must: false, label: 'responsible for', ly: 74 } },
    { a: { e: 'dept', side: 'r', must: true, many: true, label: 'located in' }, b: { e: 'loc', side: 'l', off: -12.5, must: false, label: 'address of', ly: 74 } },
    { a: { e: 'emp', side: 'b', off: -40, must: true, many: true, label: 'assigned' }, b: { e: 'job', side: 'l', must: false, label: 'assigned to' }, via: [[55, 265]] },
    { a: { e: 'emp', side: 'b', off: 40, must: false, many: true, label: 'managed by', lx: 128, ly: 176 }, b: { e: 'emp', side: 'r', off: 30, must: false, label: 'manager of', lx: 210, ly: 116 }, via: [[135, 190], [200, 190], [200, 110]] },
    { a: { e: 'loc', side: 'b', must: true, many: true, label: 'situated', ly: 145 }, b: { e: 'cty', side: 't', must: false, label: 'site of', lx: 638, ly: 172, anchor: 'start' } },
    { a: { e: 'cty', side: 'b', must: true, many: true, label: 'part of', ly: 262 }, b: { e: 'reg', side: 't', must: false, label: 'comprised of', lx: 638, ly: 283, anchor: 'start' } },
  ],
};

SECTIONS.push({
  no: 2,
  title: 'Veri modelleme',
  en: 'Data Modeling',
  desc: 'Modelin seviyeleri; entity, instance, attribute ve UID kavramları; ERD’nin ne işe yaradığı.',
  lessons: [
    // ------------------------------------------------------------------ 2-1
    {
      id: '2-1',
      title: 'Kavramsal ve fiziksel modeller',
      en: 'Conceptual and Physical Models',
      html: `
${term(`Data modeling`, `Veri modelleme`, `<p>İşletme için neyin önemli olduğunu ve hangi kurallarla çalıştığını bulup diyagramda göstermek. Bu diyagram veritabanının planı (blueprint) olur.</p>`, {
  star: true,
  exam: `Capturing the important concepts and rules that shape a business and depicting them visually on a diagram`,
})}

${h2('Modelin üç seviyesi')}
${table(['Model', 'Ne gösterir?'], [
  ['Conceptual (kavramsal)', 'Önemli entity’ler ve aralarındaki ilişkiler. Attribute ve UID <b>yok</b>.'],
  ['Logical (mantıksal)', 'Bunlara ek olarak bütün attribute’lar ve UID’ler (2-2’de), optionality ve cardinality (3-1’de). Adı <b>ERM</b>’dir, ERD ile çizilir.'],
  ['Physical (fiziksel)', 'Logical modelin uzantısı: belirli bir veritabanında tablolar, kolonlar, veri tipleri, PK, FK, view ve index’ler.'],
])}
${term(`Conceptual model`, `Kavramsal model`, `<p>İşletmenin neye ihtiyacı olduğunu anlatır, bunun nasıl kurulacağıyla ilgilenmez. Data modeling sürecinin sonucudur.</p>`, {
  star: true,
  exam: `Addresses the needs of a business (what is conceptually ideal), but does not address its implementation (what is physically possible)`,
})}
${term(`Physical model`, `Fiziksel model`, `<p>Mantıksal modelin belirli bir veritabanında, örneğin Oracle’da, nasıl kurulacağını anlatır.</p>`, {
  star: true,
  exam: `Describes how the objects should be implemented in specific database`,
})}

${h2('Kavramsal model neden önemli?')}
${note(`Hedeflerde “five reasons” yazıyor ama slaytta 7 madde var.`)}
<ol>
  <li>Describes exactly the information needs of the business <i>(bilgi ihtiyacını tam anlatır)</i></li>
  <li>Facilitates discussion <i>(konuşmayı kolaylaştırır)</i></li>
  <li>Prevents mistakes and misunderstandings <i>(hata ve yanlış anlamayı önler)</i></li>
  <li>Forms important “ideal system” documentation <i>(ideal sistemin belgesi olur)</i></li>
  <li>Forms a sound basis for physical database design <i>(fiziksel tasarıma sağlam temel)</i></li>
  <li>Documents the processes (business rules) of the business <i>(iş kurallarını kayda geçirir)</i></li>
  <li>Takes into account regulations and laws <i>(yasaları hesaba katar)</i></li>
</ol>
${mix('Conceptual ve physical', `Conceptual “<b>ne</b> olmalı?” sorusunu cevaplar (ideal olan). Physical “<b>nasıl</b> kurulur?” sorusunu cevaplar (mümkün olan).`)}
`,
    },

    // ------------------------------------------------------------------ 2-2
    {
      id: '2-2',
      title: 'Entity, instance, attribute ve UID',
      en: 'Entities, Instances, Attributes, and Identifiers',
      html: `
${h2('Entity ve instance')}
${term(`Entity`, `Varlık`, `<p>İşletme için önemli olan ve hakkında veri tutulan şey. Genelde bir isimdir (noun): kişi (STUDENT), nesne (PRODUCT) ya da olay (CONCERT).</p>`, {
  star: true,
  exam: `"Something" of significance to the business about which data must be known <i>(significance = önem)</i>`,
})}
${term(`Instance`, `Örnek`, `<p>Entity’nin tek bir somut örneği. Entity bir kategori ise instance o kategorideki tek bir elemandır.</p>`, {
  star: true,
  exam: `A single occurrence of an entity <i>(occurrence = tek bir tane)</i>`,
})}
${table(['Entity', 'Instance'], [
  ['PERSON', 'Mahatma Gandhi'],
  ['CAR', 'Toyota Corolla'],
  ['JOB', 'Electrician'],
  ['CONCERT', 'U2 at the Palladium'],
])}
${mix('DOG entity mi, instance mı?', `Duruma göre değişir. Birçok hayvanla uğraşan bir işte ANIMAL entity’dir, DOG ise instance. Köpek yetiştiricisinde DOG entity olur; TERRIER ve POODLE instance olur.`)}
${term(`Tangible / Intangible`, `Somut / Soyut`, `<p>Tangible entity’ye dokunabilirsin (PERSON, PRODUCT). Intangible’a dokunamazsın (SKILL LEVEL). Entity bir olay da olabilir (CONCERT).</p>`, {
  exam: `Tangible, like PERSON; intangible, like SKILL LEVEL`,
})}

${h2('Attribute')}
${term(`Attribute`, `Nitelik`, `<p>Entity’yi anlatan tek bir bilgi parçası; CUSTOMER için ad, doğum tarihi, e-posta gibi. Yalnızca işletmenin işine yarayanlar tutulur: ayakkabıcı müşterinin ayak numarasını tutar, market tutmaz.</p>`, {
  star: true,
  exam: `Helps describe, quantify, qualify, classify, or specify an entity <i>(tanımlamak, ölçmek, nitelemek, sınıflamak, belirtmek)</i>`,
})}
${mix('Attribute ve value', `Attribute soru gibidir (<b>renk ne?</b>), value (değer) ise cevabı (<b>yeşil</b>).`)}
${term(`Single valued`, `Tek değerli`, `<p>Bir instance’ın her attribute için aynı anda tek değeri olur. Araba boyanınca rengi değişir, ama hiçbir an iki rengi olmaz.</p>`, {
  star: true,
  exam: `Can only have one value at any point for each instance`,
})}
${term(`Data type`, `Veri tipi`, `<p>Değerin türü: sayı, metin, tarih, resim ya da ses.</p>`, {
  exam: `Called "data types" or "formats"`,
})}
${term(`Volatile`, `Sık değişen`, `<p>Değeri zamanla değişen attribute; yaş gibi. Değişmeyene <b>nonvolatile</b> denir: doğum tarihi gibi. Seçme şansın varsa nonvolatile olanı seç: yaşı her yıl güncellemen gerekir, oysa yaş doğum tarihinden her an hesaplanabilir.</p>`, {
  star: true,
  exam: `If given a choice, select the nonvolatile attribute`,
})}
${term(`Mandatory / Optional`, `Zorunlu / İsteğe bağlı`, `<p>Mandatory attribute mutlaka dolu olmalıdır (ad). Optional attribute boş kalabilir (cep telefonu). Hangisinin zorunlu olduğu işletmeye göre değişir. ERD’de * ve o ile gösterilir (3-2).</p>`, {
  star: true,
  exam: `Mandatory: must contain a value. Optional: may contain a value or be left null.`,
})}
${term(`Null`, `Boş değer`, `<p>Değerin olmaması: bilinmiyor ya da hiç girilmemiş. Null sıfır değildir, boşluk karakteri de değildir.</p>`, {
  star: true,
  exam: `Unavailable, unassigned, unknown, or empty; it is neither a zero nor a space`,
})}

${h2('UID')}
${term(`Unique identifier (UID)`, `Benzersiz tanımlayıcı`, `<p>Bir instance’ı ötekilerden ayıran attribute ya da attribute birleşimi. Ad yetmez, çünkü iki Ayşe Yılmaz olabilir. Bu yüzden öğrenci numarası gibi yapay bir numara verilir.</p>`, {
  star: true,
  exam: `A single attribute or a combination of multiple attributes that distinguishes one instance from another`,
})}
${tip(`Modeldeki <b>entity</b> veritabanında <b>tabloya</b>, <b>attribute</b> kolona, <b>UID</b> ise <b>primary key</b>’e dönüşür.`, 'Veritabanında neye dönüşür?')}
`,
    },

    // ------------------------------------------------------------------ 2-3
    {
      id: '2-3',
      title: 'ER modelleme ve ERD',
      en: 'Entity Relationship Modeling and ERDs',
      html: `
${term(`Entity relationship diagram (ERD)`, `Varlık-ilişki diyagramı`, `<p>Veri modelinin resmi. Hangi veritabanı kullanılırsa kullanılsın aynı şekilde çizilir; ortada veritabanı olmasa bile işe yarar. Müşteri ERD’ye bakıp düzeltme yapabilir.</p>`, {
  star: true,
  exam: `Represents the data requirements of a business regardless of the type of database that is used`,
})}
${term(`Implementation-free`, `Kurulumdan bağımsız`, `<p>İyi bir kavramsal model, sistem hangi veritabanıyla kurulursa kurulsun aynı kalır. Veriler bir dosya dolabındaki kâğıtlarda dursa bile değişmez. Aynı model hierarchical, relational ya da network bir veritabanına kurulabilir.</p>`, {
  star: true,
  exam: `Not dependent on the physical model`,
})}
${mix('ERM ve ERD', `<b>ERM</b> (model), bütün entity, attribute ve ilişkilerin listesidir; diyagram şart değildir. <b>ERD</b> o modelin resmidir.`)}

${h2('ER modellemenin 4 hedefi')}
<ol>
  <li>Capture all required data <i>(gereken her veriyi al)</i></li>
  <li>Ensure that data appears only once <i>(her veri tek bir yerde olsun)</i></li>
  <li>Model no data that is derivable from other data <i>(hesaplanabilen veriyi koyma; doğum tarihi varken yaşı koyma)</i></li>
  <li>Locate data in a predictable, logical place <i>(veriyi akla yatkın bir yere koy)</i></li>
</ol>

${h2('Örnek: İK departmanının ERD’si')}
${erd('hr', 'Çizimdeki işaretleri 3-2’de öğreneceksin. Şimdilik ERD’yi görünce tanıman yeterli. Slayttaki çizimde DEPARTMENT ucunda ve yönetici döngüsünde crow’s foot yok; ben ekledim, çünkü bir adreste birden çok departman, bir yöneticinin de birden çok çalışanı olabilir.')}
`,
    },
  ],
});
