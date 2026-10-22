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
    { cls: 'hl', a: { e: 'emp', side: 'r', off: -20, must: true, many: true, label: 'works in' }, b: { e: 'dept', side: 'l', must: false, label: 'responsible for', ly: 74 } },
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
  desc: 'Modelin seviyelerini; entity, instance, attribute ve UID kavramlarını ve ERD’nin ne işe yaradığını anlatır.',
  lessons: [
    // ------------------------------------------------------------------ 2-1
    {
      id: '2-1',
      title: 'Kavramsal ve fiziksel modeller',
      en: 'Conceptual and Physical Models',
      html: `
${term(`Data modeling`, `Veri modelleme`, `<p>Veri modelleme, bir işletme için neyin önemli olduğunu ve işin hangi kurallarla yürüdüğünü bulup bunları bir diyagramda göstermektir.</p>`, {
  star: true,
  more: `<p>Modelleme, bir grup insanın planlayıp, geliştirip ve birbiriyle iletişim kurarak aynı hedefe birlikte ulaşmasını sağlar. İşletmenin bilgi ihtiyacını açıkça konuşup doğru yakalamak hataları ve yanlış anlamaları önler; bu da işletmeye zaman ve para kazandırır. Böylece ortaya çıkan veritabanı, tek bir kişinin değil herkesin işine yarar.</p>`,
  exam: `Capturing the important concepts and rules that shape a business and depicting them visually on a diagram`,
})}

${h2('Modelin üç seviyesi')}
${table(['Model', 'Ne gösterir?'], [
  ['Conceptual (kavramsal)', 'Önemli entity’leri ve aralarındaki ilişkileri gösterir. Attribute ve UID burada <b>yer almaz</b>.'],
  ['Logical (mantıksal)', 'Bütün entity’leri ve ilişkileri içerir; bunlara ek olarak her entity’nin bütün attribute’larını ve UID’lerini, attribute’ların zorunlu mu isteğe bağlı mı olduğunu (2-2’de) ve ilişkilerin optionality ve cardinality’sini (3-1’de) belirler. Veriyi olabildiğince ayrıntılı anlatır, ama fiziksel olarak nasıl kurulacağını hesaba katmaz. Bu modelin adı <b>ERM</b>’dir ve ERD ile çizilir.'],
  ['Physical (fiziksel)', 'Logical modelin devamıdır. Belirli bir veritabanındaki tabloları, kolonları, veri tiplerini ve hassasiyetlerini (precision), PK ve FK’leri, view ve index’leri gösterir.'],
])}
${term(`Conceptual model`, `Kavramsal model`, `<p>Kavramsal model, işletmenin neye ihtiyacı olduğunu anlatır; bunun nasıl kurulacağıyla ilgilenmez.</p>`, {
  star: true,
  more: `<p>Data modeling sürecinin sonunda elde ettiğin şey bu modeldir. İşletmenin hem işlevsel (functional) hem de bilgi (informational) ihtiyaçlarını yakalar; bugünkü ihtiyaçlara dayanır ama gelecekteki ihtiyaçları da yansıtabilir.</p>`,
  exam: `Addresses the needs of a business (what is conceptually ideal), but does not address its implementation (what is physically possible)`,
})}
${term(`Physical model`, `Fiziksel model`, `<p>Fiziksel model, mantıksal modelin belirli bir veritabanında, mesela Oracle’da, nasıl kurulacağını anlatır.</p>`, {
  star: true,
  more: `<p>Aynı modelin birden fazla fiziksel modeli olabilir: kurulacağı her veritabanı sistemi (RDBMS) için bir tane.</p>`,
  exam: `Describes how the objects should be implemented in specific database`,
})}

${h2('Kavramsal model neden önemli?')}
<ol>
  <li>Describes exactly the information needs of the business <i>(işletmenin bilgi ihtiyacını tam olarak anlatır)</i></li>
  <li>Facilitates discussion <i>(konuşmayı kolaylaştırır)</i></li>
  <li>Prevents mistakes and misunderstandings <i>(hataları ve yanlış anlamaları önler)</i></li>
  <li>Forms important “ideal system” documentation <i>(ideal sistemin önemli bir belgesi olur)</i></li>
  <li>Forms a sound basis for physical database design <i>(fiziksel tasarım için sağlam bir temel olur)</i></li>
  <li>Documents the processes (business rules) of the business <i>(işletmenin iş kurallarını kayda geçirir)</i></li>
  <li>Takes into account regulations and laws <i>(yönetmelikleri ve yasaları hesaba katar)</i></li>
</ol>
${mix('Conceptual ve physical', `Conceptual model “<b>ne</b> olmalı?” sorusunu cevaplar, yani ideal olanı anlatır. Physical model ise “<b>nasıl</b> kurulur?” sorusunu cevaplar, yani mümkün olanı anlatır. Data modeling’in çizdiği diyagram fiziksel tasarımın planı (blueprint) olur; böylece müşterinin hayali (conceptual model) fiziksel bir gerçeğe (physical model) dönüşür.`)}
`,
    },

    // ------------------------------------------------------------------ 2-2
    {
      id: '2-2',
      title: 'Entity, instance, attribute ve UID',
      en: 'Entities, Instances, Attributes, and Identifiers',
      html: `
${h2('Entity ve instance')}
${term(`Entity`, `Varlık`, `<p>Entity, işletme için önemli olan ve hakkında veri tutulması gereken şeydir; adı genelde bir isimdir (noun).</p>`, {
  star: true,
  more: `<p>Entity, tek tek sayıp listeleyebileceğin benzer şeylerin ortak adıdır; bir kişi (STUDENT), bir nesne (PRODUCT) ya da bir olay (CONCERT) olabilir.</p>`,
  exam: `"Something" of significance to the business about which data must be known <i>(significance = önem)</i>`,
})}
${term(`Instance`, `Örnek`, `<p>Instance, bir entity’nin tek bir somut örneğidir.</p>`, {
  star: true,
  more: `<p>Entity’yi bir kategori gibi düşünürsen, instance o kategorideki tek bir elemandır. Bazı entity’lerin çok sayıda instance’ı olur, bazılarının ise birkaç tane; ama tek bir instance’ı olan bir entity mantıklı olmaz.</p>`,
  exam: `A single occurrence of an entity <i>(occurrence = tek bir tane)</i>`,
})}
${table(['Entity', 'Instance'], [
  ['PERSON', 'Mahatma Gandhi, George Washington'],
  ['PRODUCT', 'Nike Air Jordan, Gibson Les Paul Custom'],
  ['PRODUCT TYPE', 'Shoe, Video Game'],
  ['JOB', 'Electrician, IT Technician'],
  ['SKILL LEVEL', 'Beginner, Expert'],
  ['CONCERT', 'U2 at the Palladium, Beyoncé at the Greek Theatre L.A.'],
  ['ANIMAL', 'Dog, Cat'],
  ['CAR', 'Volkswagen Beetle, Toyota Corolla'],
])}
${mix('DOG entity mi, instance mı?', `Bu, işletmeye göre değişir. Birçok hayvanla uğraşan bir işte ANIMAL entity olur, DOG ise onun bir instance’ıdır. Ama bir köpek yetiştiricisinde DOG entity olur; TERRIER ve POODLE de onun instance’ları olur.`)}
${term(`Tangible / Intangible`, `Somut / Soyut`, `<p>Tangible bir entity’ye dokunabilirsin (PERSON ya da PRODUCT gibi), intangible bir entity’ye ise dokunamazsın (SKILL LEVEL, yani beceri seviyesi gibi).</p>`, {
  more: `<p>Bir entity bir olay da olabilir, mesela CONCERT.</p>`,
  exam: `Tangible, like PERSON; intangible, like SKILL LEVEL`,
})}

${h2('Attribute')}
${term(`Attribute`, `Nitelik`, `<p>Attribute, bir entity’yi anlatan tek bir bilgi parçasıdır; CUSTOMER için ad, doğum tarihi ve e-posta gibi.</p>`, {
  star: true,
  more: `<p>Sadece işletmenin işine yarayan attribute’lar tutulur: ayakkabıcı müşterinin ayak numarasını tutar, ama market tutmaz.</p>`,
  exam: `Helps describe, quantify, qualify, classify, or specify an entity <i>(tanımlamak, ölçmek, nitelemek, sınıflamak, belirtmek)</i>`,
})}
${table(['Entity', 'Attribute'], [
  ['CUSTOMER', 'family name, date of birth, shoe size, town of residence, email'],
  ['CAR', 'model, weight, catalog price'],
  ['ORDER', 'order date, ship date'],
  ['JOB', 'title, description'],
  ['TRANSACTION', 'amount, transaction date'],
  ['EMPLOYMENT CONTRACT', 'start date, salary'],
])}
${mix('Attribute ve value', `Attribute bir soru gibidir (<b>rengi ne?</b>), value (değer) ise o sorunun cevabıdır (<b>yeşil</b>).`)}
${term(`Single valued`, `Tek değerli`, `<p>Bir instance’ın her attribute için aynı anda yalnızca bir değeri olabilir.</p>`, {
  star: true,
  more: `<p>Bu, bir attribute’un en önemli özelliğidir. Değer zamanla değişebilir: mesela bir araba boyanınca rengi değişir, ama hiçbir anda iki rengi birden olmaz.</p>`,
  exam: `Can only have one value at any point for each instance`,
})}
${term(`Data type`, `Veri tipi`, `<p>Veri tipi, bir değerin türünü söyler; sayı, metin, tarih, resim ya da ses gibi.</p>`, {
  exam: `Called "data types" or "formats"`,
})}
${term(`Volatile`, `Sık değişen`, `<p>Volatile attribute’un değeri sürekli değişir (yaş gibi), <b>nonvolatile</b> olanınki ise neredeyse hiç değişmez (sipariş tarihi ya da doğum tarihi gibi).</p>`, {
  star: true,
  more: `<p>Seçme şansın varsa nonvolatile olanı seç: yaşı tutarsan her yıl güncellemen gerekir, oysa yaşı doğum tarihinden her an hesaplayabilirsin.</p>`,
  exam: `If given a choice, select the nonvolatile attribute`,
})}
${term(`Mandatory / Optional`, `Zorunlu / İsteğe bağlı`, `<p>Mandatory bir attribute mutlaka dolu olmalıdır (ad gibi), optional bir attribute ise boş kalabilir (cep telefonu gibi).</p>`, {
  star: true,
  more: `<p>Hangi attribute’un zorunlu olduğu işletmeye göre değişir: e-posta adresi bir e-posta uygulamasında EMPLOYEE için zorunlu olabilir, ama bir online katalogda CUSTOMER için isteğe bağlıdır. ERD’de bunları * ve o işaretleriyle gösterirsin (3-2’de göreceksin).</p>`,
  exam: `Mandatory: must contain a value. Optional: may contain a value or be left null.`,
})}
${term(`Null`, `Boş değer`, `<p>Null, bir değerin olmaması demektir; değer ya bilinmiyordur ya da hiç girilmemiştir.</p>`, {
  star: true,
  more: `<p>Null sıfır değildir, boşluk karakteri de değildir.</p>`,
  exam: `Unavailable, unassigned, unknown, or empty; it is neither a zero nor a space`,
})}

${h2('UID')}
${term(`Unique identifier (UID)`, `Benzersiz tanımlayıcı`, `<p>UID, bir instance’ı ötekilerden ayıran attribute ya da attribute birleşimidir.</p>`, {
  star: true,
  more: `<p>Ad bunun için yetmez, çünkü iki tane Ayşe Yılmaz olabilir. Bu yüzden öğrenci numarası gibi yapay bir numara verilir.</p>`,
  exam: `A single attribute or a combination of multiple attributes that distinguishes one instance from another`,
})}
${tip(`Modeldeki <b>entity</b> veritabanında bir <b>tabloya</b>, <b>attribute</b> bir kolona, <b>UID</b> ise <b>primary key</b>’e dönüşür.`, 'Veritabanında neye dönüşür?')}
`,
    },

    // ------------------------------------------------------------------ 2-3
    {
      id: '2-3',
      title: 'ER modelleme ve ERD',
      en: 'Entity Relationship Modeling and ERDs',
      html: `
${term(`Entity relationship diagram (ERD)`, `Varlık-ilişki diyagramı`, `<p>ERD, veri modelinin resmidir ve hangi veritabanı kullanılırsa kullanılsın aynı şekilde çizilir.</p>`, {
  star: true,
  more: `<p>ERD, ortada hiç veritabanı olmasa bile işe yarar. Müşteri de ERD’ye bakıp yanlış gördüğü yerleri düzeltebilir.</p>`,
  exam: `Represents the data requirements of a business regardless of the type of database that is used`,
})}
${term(`Implementation-free`, `Kurulumdan bağımsız`, `<p>İyi bir kavramsal model, sistem hangi veritabanıyla kurulursa kurulsun aynı kalır.</p>`, {
  star: true,
  more: `<p>Veriler bir dosya dolabındaki kâğıtlarda dursa bile model değişmez. Yani aynı modeli hierarchical, relational ya da network bir veritabanına kurabilirsin; pratikte ise ER modellerinin çoğu ilişkisel (relational) veritabanına dönüşür.</p>`,
  exam: `Not dependent on the physical model`,
})}
${mix('ERM ve ERD', `<b>ERM</b> modelin kendisidir; bütün entity’lerin, attribute’ların ve ilişkilerin listesidir ve bunun için diyagram şart değildir. ERM ayrıca entity açıklamaları, veri tipleri ve kısıtlar (constraints) gibi arka plan bilgisi de içerir. <b>ERD</b> ise o modelin resmidir.`)}

${h2('ER modellemenin 4 hedefi')}
<ol>
  <li>Capture all required data <i>(gereken bütün veriyi modele al)</i></li>
  <li>Ensure that data appears only once <i>(her veri yalnızca bir yerde bulunsun)</i></li>
  <li>Model no data that is derivable from other data <i>(başka veriden hesaplanabilen veriyi modele koyma; mesela doğum tarihi varken yaşı koyma)</i></li>
  <li>Locate data in a predictable, logical place <i>(veriyi tahmin edilebilir, akla yatkın bir yere koy)</i></li>
</ol>

${h2('Örnek: İK departmanının ERD’si')}
<p>Büyük bir şirketin İK müdürü ihtiyaçlarını şöyle anlatıyor: her çalışanın adı, soyadı, işi, işe giriş tarihi ve maaşı tutulmalı; komisyon alan çalışanların komisyonu da tutulmalı ve her çalışanın benzersiz bir numarası var. Şirket departmanlara bölünmüş; her çalışan bir departmana bağlı, her departmanın benzersiz bir numarası var ve departmanın nerede olduğu da bilinmeli. Bazı çalışanlar yönetici, bu yüzden her çalışanın yöneticisi ve her yöneticinin yönettiği çalışanlar bilinmeli. Bu ihtiyaçlardan çıkan ERD aşağıda.</p>
${erd('hr', 'Çizimdeki işaretleri 3-2’de öğreneceksin; şimdilik bir ERD’yi görünce tanıman yeterli.',
`Her kutu bir entity, kutunun içindeki satırlar da onun attribute’larıdır (# ile başlayan satır UID’dir). İki kutuyu bağlayan çizgi bir ilişkidir ve iki yönden okunur: kırmızı çizgi soldan sağa “EMPLOYEE <b>works in</b> DEPARTMENT”, sağdan sola “DEPARTMENT <b>responsible for</b> EMPLOYEE” diye okunur.`)}
`,
    },
  ],
});
