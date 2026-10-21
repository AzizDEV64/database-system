SECTIONS.push({
  no: 1,
  title: 'Veritabanına giriş',
  en: 'Introduction',
  desc: 'Veri ile bilgi farkı, veritabanının kısa tarihi ve bilgisayarların 1970’lerden buluta nasıl değiştiği.',
  lessons: [
    // ------------------------------------------------------------------ 1-2
    {
      id: '1-2',
      title: 'Veri ve bilgi',
      en: 'Data vs. Information',
      html: `
${term(`Data`, `Veri`, `
  <p>İşlenmemiş ham değer. Bir sınav notunun 72 olduğunu bilirsin, ama iyi mi kötü mü tek başına söyleyemezsin.</p>`, {
  star: true,
  exam: `Raw or unprocessed material <i>(ham, işlenmemiş malzeme)</i>`,
})}
${term(`Information`, `Bilgi`, `
  <p>Özel bir anlamı ya da işlevi olan veri. Veri birleştirilince, karşılaştırılınca ya da üzerinde hesap yapılınca bilgiye dönüşür. Sınıf ortalaması 60 ise 72’nin iyi bir not olduğunu artık anlarsın. (Sayılar slaytta yok.)</p>`, {
  star: true,
  exam: [
    `Knowledge, intelligence, a particular piece of data with a special meaning or function`,
    `Often the result of combining, comparing, analyzing or performing calculations on data`,
  ],
})}
${table(['Veri', 'Bilgi'], [
  ['Tek tek sınav notları', 'Sınıfın ve okulun ortalaması'],
  ['Telefon rehberinin tamamı', 'Mahallendeki çiçekçilerin listesi'],
])}
${term(`Database`, `Veritabanı`, `
  <p>Bilgisayarda tek merkezde ve düzenli tutulan veri kümesi. Veriyi getirmeye, eklemeye, değiştirmeye, silmeye ve bilgiye dönüştürmeye yarar. Genelde bir <b>DBA</b> (Database Administrator, veritabanı yöneticisi) yönetir.</p>
  <p>İçinde belge, resim, video ve ses de ham hâlde durur; sorgulandığında (query) bilgiye dönüşür.</p>`, {
  star: true,
  exam: `A centralized and structured set of data stored on a computer system <i>(merkezi ve düzenli)</i>`,
})}
`,
    },

    // ------------------------------------------------------------------ 1-3
    {
      id: '1-3',
      title: 'Veritabanının tarihi',
      en: 'History of the Database',
      html: `
${h2('Kısa tarih')}
${timeline([
  ['1960’lar', 'Bilgisayarlar, şirketlerin alabileceği kadar ucuzlar.'],
  ['1970–72', '<b>E. F. Codd</b> ilişkisel modeli (<b>relational model</b>) önerir: verinin mantıksal düzeni, fiziksel olarak nasıl saklandığından ayrılır.'],
  ['1976', '<b>P. Chen</b> varlık-ilişki modelini (Entity Relationship Model, <b>ERM</b>) önerir.'],
  ['1980’lerin başı', 'İlk ticari ilişkisel veritabanları çıkar: Oracle Version 2.'],
  ['1980’lerin ortası', 'Veritabanına komut verdiğimiz dil <b>SQL</b>, sektörün standart dili olur (“intergalactic standard”).'],
  ['1990’lar', 'Birçok firma batar, Oracle ayakta kalır. Sonra İnternet gelir.'],
])}
${mix('Codd ve Chen', `<b>Codd</b> (1970–72) → relational model, yani tablolar. <b>Chen</b> (1976) → ER model (ERM), veritabanı tasarımı için. Sıra yıllara göre: önce Codd, sonra Chen.`)}

${h2('Veritabanı 3 adımda kurulur')}
${steps([
  ['Data modeling (veri modelleme)', 'İşletmenin hangi veriye ihtiyacı olduğu araştırılır ve bir <b>ERD</b> (varlık-ilişki diyagramı, 2-3’te) olarak çizilir. Bu, sürecin ilk adımıdır.'],
  ['Database design (tasarım)', 'ERD bir <b>table instance chart</b>’a, yani tablo taslağına çevrilir.'],
  ['Database build (kurulum)', 'Tablolar <b>SQL</b> ile oluşturulur, sonra veri eklenir ve sorgulanır.'],
])}

${h2('Table instance chart')}
<p>Tablonun kurulmadan önceki planı. Tablo bir Excel sayfası gibidir: her <b>satır</b> (row) bir kayıt, her <b>kolon</b> (column) bir özellik. Planda tablo adı, kolon adları ve şunlar bulunur:</p>
${term(`Primary key (PK)`, `Birincil anahtar`, `
  <p>Her satırı ötekilerden ayıran kolon. TC kimlik numarası gibi düşün: iki satırda aynı olamaz. Modeldeki karşılığı UID’dir (2-2).</p>`, {
  star: true,
  exam: `The unique identifier for each row of data`,
})}
${term(`Foreign key (FK)`, `Yabancı anahtar`, `
  <p>Başka bir tablonun PK’sını gösteren kolon. İki tabloyu birbirine bu kolon bağlar.</p>`, {
  star: true,
  exam: `Links data in one table to the data in a second table`,
})}
${figure(`
  ${dbTable('DEPARTMENTS', ['deptno:PK', 'name', 'loc'], [['10', 'Accounting', 'US'], ['20', 'Sales', 'UK']], [0])}
  ${dbTable('EMPLOYEES', ['empno:PK', 'fname', 'lname', 'deptno:FK'], [['101', 'Ali', 'Kaya', '10'], ['102', 'Ayşe', 'Demir', '20'], ['103', 'Can', 'Şahin', '10']], [0])}
`, 'Ali’nin satırındaki FK değeri 10. DEPARTMENTS tablosunda PK’sı 10 olan satır Accounting, yani Ali Accounting’de çalışıyor. Bu örnek veri slaytta yok.')}
${term(`Nulls`, `Boş olabilir mi?`, `
  <p>Kolon boş bırakılabilir mi, yoksa mutlaka değer mi girilmeli (mandatory)?</p>`, {
  exam: `Must contain a value (mandatory)`,
})}
${term(`Unique`, `Benzersiz`, `
  <p>Kolondaki bir değer tabloda tekrarlanabilir mi? E-posta kolonu unique ise iki kişi aynı adresi kullanamaz.</p>`, {
  exam: `Unique within the table`,
})}
${term(`Data type`, `Veri tipi`, `
  <p>Kolonda ne tür veri durduğunu söyler: <code>NUMBER</code> sayı, <code>VARCHAR2</code> metin, <code>DATE</code> tarih.</p>`, {
  exam: `The definition and format of the data`,
})}
${mix('PK, FK ve unique', `PK satırın kimliğidir, tekrar etmez. FK başka tablonun PK’sını gösterir ve tekrar edebilir (iki çalışan aynı departmanda olabilir). Unique sadece “tekrar etmesin” der, satırın kimliği olmak zorunda değildir.`)}
`,
    },

    // ------------------------------------------------------------------ 1-4
    {
      id: '1-4',
      title: 'Bilgisayar dünyasındaki dönüşümler',
      en: 'Major Transformations in Computing',
      html: `
${h2('Temel terimler')}
${term(`Hardware`, `Donanım`, `<p>Bilgisayarın elle tutulan parçaları: klavye, ekran, disk, bellek.</p>`, {
  star: true,
  exam: `The physical "bits and pieces" of a computer`,
})}
${term(`Software`, `Yazılım`, `<p>Donanıma ne yapacağını söyleyen programlar.</p>`, {
  star: true,
  exam: `Programs (sets of instructions) which tell the hardware what to do`,
})}
${term(`Operating system`, `İşletim sistemi`, `<p>Donanımı doğrudan yöneten yazılım: Windows, Linux.</p>`, {
  star: true,
  exam: `Directly controls and manages the hardware`,
})}
${term(`Application`, `Uygulama`, `<p>Kullanıcı için belirli bir işi yapan yazılım: Word, oyunlar.</p>`, {
  exam: `Carries out specific tasks on behalf of computer users <i>(on behalf of = adına)</i>`,
})}
${mix('Operating system ve application', `İkisi de yazılımdır. Operating system <b>donanımı</b> yönetir, application <b>kullanıcı</b> için çalışır.`)}
${term(`Client`, `İstemci`, `<p>Kullanıcının önündeki bilgisayar. İnsanla doğrudan muhatap olan taraftır.</p>`, {
  star: true,
  exam: `Clients interact directly with human computer users`,
})}
${term(`Server`, `Sunucu`, `<p>Daha güçlü bir bilgisayar. Client’ın isteğini alır, işler ve sonucu geri yollar. Restoran gibi düşün: sen (client) sipariş verirsin, mutfak (server) hazırlayıp geri gönderir.</p>`, {
  star: true,
  exam: `Accepts work requests from clients … sends the results back`,
})}

${h2('1970’lerden bugüne')}
${timeline([
  ['1970’ler', 'Her şey <b>mainframe</b> denen dev merkezi bilgisayarda. Kullanıcının <b>dumb terminal</b>’i kendi başına pek işlem yapamaz, sadece sonucu gösterir. Mainframe çökerse herkes durur.'],
  ['1980’ler', '<b>PC</b>’ler yaygınlaşır, işlem masaüstüne geçer. Bunlara <b>smart client</b> ya da <b>workstation</b> denir. Pencereli, grafik arayüzlü (<b>GUI</b>) uygulamalar doğar: Word, Excel.'],
  ['1990’lar ve sonrası', 'Veri ve uygulamalar sunuculara taşınır, client’lar onlara tarayıcıyla erişir.'],
])}
${note(`Her bilgisayarda ayrı programlar vardı (<b>isolated, nonintegrated systems</b>). Bağlamak pahalıydı; her güncellemede her sunucu ve her client tek tek güncellenirdi.`, '1980’lerin sorunu')}
<div class="tiers">
  <div class="tier"><b>Client</b><span>Bilgiyi gösterir, tarayıcıyla erişir.</span></div>
  <div class="tier-arrow"></div>
  <div class="tier"><b>Application server</b><span>İş uygulamaları burada çalışır.</span></div>
  <div class="tier-arrow"></div>
  <div class="tier"><b>Database server</b><span>Veriyi saklar ve geri getirir.</span></div>
</div>
<p>Güncelleme artık sunucuda bir kez yapılır.</p>
${term(`Oracle’s mission`, `Oracle’ın amacı`, `<p>İnternet’i ve hızlı sunucuları kullanarak kurumların veri saklama ve bilgi üretme ihtiyacını karşılamak.</p>`, {
  exam: `Use the Internet and fast processing servers … storing data and producing information`,
})}

${h2('Grid ve cloud')}
${term(`Grid computing`, `Izgara bilişim`, `<p>Kurumun farklı yerlerdeki bilgisayarları tek bir güç havuzu gibi kullanılır ve istek en verimli yerde işlenir; performans ve güvenilirlik artar. Elektrik gibi: santrali bilmezsin, fişi takarsın, elektrik gelir.</p>`, {
  star: true,
  exam: `Treats computing as a utility, like the electric company`,
})}
${term(`Infrastructure`, `Altyapı`, `<p>Sistemin altındaki temel düzen: sunucular, ağ ve onları çalıştıran yazılım. Slayt bu terimi ayrıca tanımlamıyor.</p>`, {
  exam: `A software infrastructure that can run on a large number of networked servers`,
})}
${term(`Cloud computing`, `Bulut bilişim`, `<p>Şirket yazılımı ve donanımı kendisi almaz, uzaktaki bir sağlayıcıdan (cloud provider) web üzerinden kullanır.</p>`, {
  star: true,
  exam: `Access software and hardware from a cloud provider`,
})}
${mix('Grid ve cloud', `Grid’de kurum <b>kendi</b> bilgisayarlarını birleştirir. Cloud’da <b>başka bir şirketin</b> donanımını kullanır.`)}

${h2('Veritabanı kullanan sektörler')}
${table(['Sektör', 'Tuttuğu veri'], [
  ['Finance and Banking', 'Müşteri kayıtları, işlem detayları'],
  ['Retailing', 'Stok takibi (stock control)'],
  ['Telecommunications', 'Arama kayıtları (call logs)'],
  ['Airline', 'Rezervasyonlar'],
])}
`,
    },
  ],
});
