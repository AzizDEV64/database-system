// Türkçe bölüm, Hafta 1: Veri tabanı yönetim sistemlerine giriş (kaynak: türkçe/H1.pdf)
// Slaytlar zaten Türkçe ve kısa: slayt cümlesi ("Slaytta") sadece tanım olarak sorulabilecek terimlerde verilir.

ERDS.trTree = {
  w: 440, h: 200, label: 'Hiyerarşik model: ağaç yapısı',
  ents: [
    { id: 'k', name: 'KÖK', x: 180, y: 15, w: 80, minH: 34 },
    { id: 'a', name: 'DAL', x: 70, y: 85, w: 80, minH: 34 },
    { id: 'b', name: 'DAL', x: 290, y: 85, w: 80, minH: 34 },
    { id: 'a1', name: 'DAL', x: 15, y: 155, w: 80, minH: 34 },
    { id: 'a2', name: 'DAL', x: 125, y: 155, w: 80, minH: 34 },
    { id: 'b1', name: 'DAL', x: 235, y: 155, w: 80, minH: 34 },
    { id: 'b2', name: 'DAL', x: 345, y: 155, w: 80, minH: 34 },
  ],
  rels: [
    { a: { e: 'k', side: 'b', off: -20, must: true }, b: { e: 'a', side: 't', must: true } },
    { a: { e: 'k', side: 'b', off: 20, must: true }, b: { e: 'b', side: 't', must: true } },
    { a: { e: 'a', side: 'b', off: -20, must: true }, b: { e: 'a1', side: 't', must: true } },
    { a: { e: 'a', side: 'b', off: 20, must: true }, b: { e: 'a2', side: 't', must: true } },
    { a: { e: 'b', side: 'b', off: -20, must: true }, b: { e: 'b1', side: 't', must: true } },
    { a: { e: 'b', side: 'b', off: 20, must: true }, b: { e: 'b2', side: 't', must: true } },
  ],
};
ERDS.trGraph = {
  w: 440, h: 215, label: 'Ağ modeli: graf yapısı',
  ents: [
    { id: 'v1', name: 'Veri1', x: 180, y: 15, w: 80, minH: 34 },
    { id: 'v2', name: 'Veri2', x: 30, y: 90, w: 80, minH: 34 },
    { id: 'v3', name: 'Veri3', x: 330, y: 90, w: 80, minH: 34 },
    { id: 'v4', name: 'Veri4', x: 110, y: 170, w: 80, minH: 34 },
    { id: 'v5', name: 'Veri5', x: 270, y: 170, w: 80, minH: 34 },
  ],
  rels: [
    { a: { e: 'v1', side: 'l', must: true }, b: { e: 'v2', side: 't', must: true } },
    { a: { e: 'v1', side: 'r', must: true }, b: { e: 'v3', side: 't', must: true } },
    { a: { e: 'v1', side: 'b', must: true }, b: { e: 'v4', side: 't', must: true }, cls: 'hl' },
    { a: { e: 'v2', side: 'r', must: true }, b: { e: 'v3', side: 'l', must: true } },
    { a: { e: 'v2', side: 'b', must: true }, b: { e: 'v4', side: 'l', must: true }, cls: 'hl' },
    { a: { e: 'v3', side: 'b', off: -20, must: true }, b: { e: 'v4', side: 'r', must: true }, cls: 'hl' },
    { a: { e: 'v3', side: 'b', off: 20, must: true }, b: { e: 'v5', side: 'r', must: true } },
  ],
};

TR_SECTIONS.push({
  no: 1,
  title: 'Veri tabanı yönetim sistemlerine giriş',
  en: 'Introduction to Database Management Systems',
  desc: 'Veri tabanı ve VTYS nedir, hangi veri tabanı türleri vardır, neden veri tabanı kullanırız; ayrıca tablo, kayıt ve alan kavramları.',
  lessons: [
    {
      id: 'H1',
      title: 'Veri tabanı yönetim sistemlerine giriş',
      en: 'Introduction to Database Management Systems',
      html: `
${tterm(`Veri tabanı`, `Database`, `<p>Veri tabanı, birbiriyle ilişkili verilerin kullanım amacına uygun şekilde düzenlenip saklandığı, verilerin mantıksal ve fiziksel tanımlarının da bulunduğu bilgi deposudur.</p>`, {
  star: true,
  more: `<p>Mesela bir üniversitenin öğrenci işleri, bir hastanedeki hasta ve doktor bilgileri ya da bir bankadaki müşteri ve kredi bilgileri birer veri tabanında tutulur.</p>`,
  exam: `Birbiriyle ilişkisi olan verilerin tutulduğu, kullanım amacına uygun olarak düzenlenmiş veriler topluluğunun, mantıksal ve fiziksel olarak tanımlarının bulunduğu bilgi depolarıdır.`,
})}
${tterm(`Veri tabanı yönetim sistemi (VTYS)`, `DBMS`, `<p>VTYS, veri tabanını oluşturmanı, düzenlemeni, kullanmanı, geliştirmeni ve bakımını yapmanı sağlayan yazılımdır.</p>`, {
  star: true,
  exam: `Yeni bir veritabanı oluşturmak, veri tabanını düzenlemek, kullanmak, geliştirmek, bakımını yapmak amacıyla çeşitli karmaşık işlemlerin gerçekleştirildiği bir yazılım sistemidir.`,
})}
<p>VTYS örnekleri şunlardır: Oracle Database, IBM DB/2, Informix, Microsoft Access, Microsoft SQL Server, Microsoft Visual FoxPro, MySQL, PostgreSQL, SQLite ve CSQL.</p>
${mix('Veri tabanı ve VTYS', `Veri tabanı, verilerin durduğu <b>depodur</b>; VTYS ise bu depoyu yöneten <b>programdır</b>.`)}

${h2('Veri tabanı türleri')}
<p>Veri tabanlarını iki açıdan gruplayabilirsin: verinin nasıl düzenlendiğine (veri modeline) ve aynı anda kaç kişinin kullandığına göre.</p>
${table(['Neye göre?', 'Türler'], [
  ['Veri modeline göre', 'Hiyerarşik, ağ, ilişkisel, nesneye yönelik'],
  ['Kullanıcı sayısına göre', 'Tek kullanıcılı, çok kullanıcılı'],
])}
${tterm(`Hiyerarşik`, `Hierarchical`, `<p>Hiyerarşik model, veri tabanları için kullanılan <b>ilk</b> modeldir ve veriyi bir ağaç gibi saklar.</p>`, {
  star: true,
  more: `<p>Ağaçta en üstte bir kök bulunur, onun altında dallar, dalların altında da başka dallar yer alır.</p>`,
})}
${erd('trTree', '', 'En üstte tek bir <b>kök</b> var ve her dal yalnızca <b>bir</b> üst dala bağlı. Bu yüzden bir dala ulaşmak için kökten başlayıp aşağı doğru inersin.')}
${tterm(`Ağ`, `Network`, `<p>Ağ modeli, hiyerarşik model yetersiz kalınca <b>1960’ların sonunda</b> ortaya çıktı ve veriyi ağacın gelişmiş hâli olan <b>graf</b> yapısında saklar.</p>`, {
  more: `<p>Grafta bir veri, ağaçtaki gibi tek bir üst dala değil, birden fazla veriye bağlanabilir.</p>`,
})}
${erd('trGraph', '', 'Ağaçtan farkı şu: bir veri, birden çok veriye bağlanabiliyor. Kırmızı çizgilere bak: Veri4’e hem Veri1’den, hem Veri2’den, hem de Veri3’ten çizgi geliyor. Ağaçta bu olamazdı, çünkü her dalın tek bir üstü vardı.')}
${tterm(`İlişkisel`, `Relational`, `<p>Bu modelde veriler <b>tablolarda</b> saklanır, tablolar arasındaki bağlantılar da matematiksel ilişkilerle gösterilir.</p>`, { star: true })}
${figure(schema([
  'KİTAP(#Kitap No, Kitap Adı, ISBN No, Sayfa Sayısı, Kitap Özeti)',
  'TÜR(#Tür No, Tür Açıklaması)',
  'KİTAP_TÜR(#>Kitap No, #>Tür No)',
  'YAZAR(#Yazar No, Adı, Soyadı, Doğum Tarihi, Hayat Özeti)',
  'KİTAP_YAZAR(#Kitap Yazar No, >Yazar No, >Kitap No)',
  'ÜYE(#Üye No, Adı, Soyadı, Adresi, Aktif mi)',
  'ÖDÜNÇ(#Ödünç No, >Kitap No, >Üye No, Verme Tarihi, Verme Süresi, Geldi mi)',
]), '', 'Bu, ilişkisel bir kütüphane veri tabanının tablolarıdır. Tablolar ortak sütunlarla birbirine bağlanır: mesela ÖDÜNÇ tablosundaki Kitap No, hangi kitabın verildiğini KİTAP tablosundan; Üye No da kime verildiğini ÜYE tablosundan bulmanı sağlar. Altı çizili sütunlar her kaydı diğerlerinden ayırmaya yarar; kırmızı sütunlar da başka bir tabloya bağlanan sütunlardır.')}
${tterm(`Nesneye yönelik`, `Object-oriented`, `<p>C++ gibi nesneye yönelik bir programlama diliyle oluşturulan ve yine böyle bir dille kullanılan veri tabanıdır.</p>`, {
  more: `<p>Kelime işlemci ve hesap tablosu programlarında kullanılan nesneler artık veri tabanlarında da kullanılıyor.</p>`,
})}

${h2('Neden veri tabanı?')}
<p>Eskiden veriler ayrı ayrı dosyalarda tutuluyordu, ama veri miktarı arttıkça ve birçok kişinin veriye aynı anda erişmesi gerektikçe bu yöntem yetersiz kaldı.</p>
<p>Veri tabanı kullanmanın avantajları şunlardır:</p>
<ol>
  <li>Aynı verinin birkaç yerde tekrar tekrar tutulması önlenir.</li>
  <li>Veriler merkezden denetlenir, böylece tutarlı kalır.</li>
  <li>Veriler birçok kullanıcı arasında paylaşılabilir.</li>
  <li>Fiziksel yapının ve erişim yönteminin karmaşıklığı, çok katmanlı mimarilerle kullanıcıdan gizlenir.</li>
  <li>Her kullanıcıya yalnızca ilgilendiği veriler, alışık olduğu kolay, anlaşılır yapılarda sunulur.</li>
  <li>Sunulan çözümleme, tasarım ve geliştirme araçları ile uygulama yazılımı geliştirmek kolaylaşır.</li>
  <li>Veri bütünlüğü sağlanır, yani veriler doğru ve geçerli kalır.</li>
  <li>Güvenlik ve gizlilik istenen düzeyde sağlanır.</li>
  <li>Yedekleme, yeniden başlatma ve onarma gibi işletim sorunlarına çözüm getirilir.</li>
</ol>

${h2('Tablo, kayıt, alan')}
${tterm(`Tablo`, `Table`, `<p>Bir veri tabanı tablolardan oluşur; tablo da verilerin satırlar ve sütunlar hâlinde düzenlendiği yapıdır.</p>`, {
  star: true,
  more: `<p>Mesela öğrenci bilgilerini ve ders içeriğini saklamak için iki ayrı tablo oluşturulur: biri öğrenci bilgileri, öbürü ders içeriği için.</p>`,
})}
${tterm(`Kayıt`, `Record`, `<p>Tablodaki her bir <b>satıra</b> kayıt denir.</p>`, {
  star: true,
  more: `<p>Bir kayıt tek bir şeyin bütün bilgilerini taşır; mesela aşağıdaki tabloda bir satır, bir öğrencinin numarasını, adını, doğum tarihini, doğum yerini ve e-postasını birlikte tutar.</p>`,
})}
${tterm(`Alan`, `Field`, `<p>Tablodaki her bir <b>sütuna</b> alan denir.</p>`, {
  star: true,
  more: `<p>Bir alan, bütün kayıtların aynı türden bilgisini tutar; mesela öğrenci no, ad soyad ya da e-posta birer alandır.</p>`,
})}
${figure(dbTable('ÖĞRENCİ BİLGİLERİ', ['Öğrenci No', 'Ad Soyad', 'Doğum Tarihi', 'Doğum Yeri', 'E-posta'], [
  ['1', 'Ayşe Öztürk', '01.11.1979', 'Konya', 'ayse@gazi.edu.tr'],
  ['2', 'Sema Özdemir', '24.05.1975', 'Ankara', 'sema@gazi.edu.tr'],
  ['3', 'Serdar Gülpınar', '06.06.1983', 'Adana', 'serdar@gazi.edu.tr'],
], [2], { note: 'Vurgulanan satır bir <b>kayıttır</b>: Serdar Gülpınar’ın numarası, adı, doğum tarihi, doğum yeri ve e-postası bu tek satırda birlikte durur. Her sütun ise bir <b>alandır</b>; mesela Doğum Yeri sütunu, bütün öğrencilerin doğum yerini tutar.' }))}
`,
    },
  ],
});
