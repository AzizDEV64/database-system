SECTIONS.push({
  no: 1,
  title: 'Veritabanına giriş',
  en: 'Introduction',
  desc: 'Veri ile bilgi arasındaki farkı, veritabanının kısa tarihini ve bilgisayarların 1970’lerden buluta kadar nasıl değiştiğini anlatır.',
  lessons: [
    // ------------------------------------------------------------------ 1-2
    {
      id: '1-2',
      title: 'Veri ve bilgi',
      en: 'Data vs. Information',
      html: `
${term(`Data`, `Veri`, `
  <p>Veri, henüz işlenmemiş ham değerdir; bir sınav notunun 72 olması gibi.</p>`, {
  star: true,
  more: `<p>Bir sınav notunun 72 olduğunu bilirsin, ama bu notun iyi mi kötü mü olduğunu tek başına söyleyemezsin.</p>`,
  exam: `Raw or unprocessed material <i>(ham, işlenmemiş malzeme)</i>`,
})}
${term(`Information`, `Bilgi`, `
  <p>Bilgi, özel bir anlamı ya da işlevi olan veridir.</p>`, {
  star: true,
  more: `<p>Veriyi birleştirdiğinde, karşılaştırdığında ya da üzerinde hesap yaptığında bilgiye dönüşür. Mesela sınıf ortalamasının 60 olduğunu öğrenince 72’nin iyi bir not olduğunu anlarsın.</p>`,
  exam: [
    `Knowledge, intelligence, a particular piece of data with a special meaning or function`,
    `Often the result of combining, comparing, analyzing or performing calculations on data`,
  ],
})}
${table(['Veri', 'Bilgi'], [
  ['Öğrencilerin tek tek sınav notları', 'Sınıfın ve okulun not ortalaması'],
  ['Telefon rehberinin tamamı', 'Rehberden çıkarılan, mahallendeki çiçekçilerin listesi'],
  ['Nüfus sayımında herkesten tek tek toplanan bilgiler', 'Ülkedeki insanların yaşa, mesleğe ya da yaşadıkları ile göre gruplanmış toplamları'],
])}
${term(`Database`, `Veritabanı`, `
  <p>Veritabanı, bilgisayarda tek bir merkezde ve düzenli biçimde tutulan veri kümesidir; veri içinde ham hâlde durur, sorgulandığında (query) bilgiye dönüşür.</p>`, {
  star: true,
  more: `<p>Veriyi getirmene, eklemene, değiştirmene, silmene ve onu bilgiye dönüştürmene yarar. Genelde onu bir <b>DBA</b> (Database Administrator, yani veritabanı yöneticisi) yönetir.</p>
  <p>Veritabanının içinde sayılar ve metinlerin yanında belgeler, resimler, videolar ve sesler de saklanabilir.</p>`,
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
  ['1960’lar', 'Bilgisayarlar, şirketlerin satın alabileceği kadar ucuzlar ve depolama kapasitesi artar.'],
  ['1970–72', '<b>E. F. Codd</b> ilişkisel modeli (<b>relational model</b>) önerir; bu modelde verinin mantıksal düzeni, fiziksel olarak nasıl saklandığından ayrılır.'],
  ['1976', '<b>P. Chen</b> varlık-ilişki modelini (Entity Relationship Model, <b>ERM</b>) önerir.'],
  ['1980’lerin başı', 'İlk ticari ilişkisel veritabanları piyasaya çıkar; Oracle Version 2 bunlardan biridir.'],
  ['1980’lerin ortası', 'Veritabanına komut vermek için kullandığımız dil olan <b>SQL</b>, sektörün standart dili hâline gelir (“intergalactic standard”).'],
  ['1990’ların başı', 'Sektörde büyük bir eleme (shakeout) olur, birçok firma batar; Oracle ayakta kalır.'],
  ['1990’ların ortası', 'Herkesin kullanabildiği İnternet ve WWW ortaya çıkar; eski sistemlerdeki verilere (legacy data) uzaktan erişmek için büyük bir yarış başlar.'],
  ['1990’ların sonu', 'İnternet şirketlerine yapılan büyük yatırım, Web ile veritabanını birbirine bağlayan araçların patlamasına yol açar.'],
  ['2000’lerin başı', 'Veritabanı uygulamaları büyümeye devam eder: amazon.com, google.com, devlet sistemleri, müzeler, hastaneler, okullar.'],
])}
${more(`<p>İlişkisel veritabanlarından önce de veritabanları vardı; mesela IBM’in IMS’i gibi hierarchical (hiyerarşik) veritabanları. Bunların bazıları hâlâ kullanılıyor, ama bugün en yaygın olanlar ilişkisel veritabanlarıdır, çünkü esnektirler ve kullanımları görece kolaydır.</p>`)}
${mix('Codd ve Chen', `<b>Codd</b> 1970–72’de relational model’i, yani tabloları önerdi. <b>Chen</b> ise 1976’da veritabanı tasarımı için ER model’i (ERM) önerdi. Yıllara göre sıra şöyle: önce Codd, sonra Chen.`)}

${h2('Veritabanı 3 adımda kurulur')}
${steps([
  ['Data modeling (veri modelleme)', 'İşletmenin hangi veriye ihtiyacı olduğunu araştırırsın ve bunu bir <b>ERD</b> (varlık-ilişki diyagramı; 2-3’te göreceksin) olarak çizersin; ERD işletmenin bilgi ihtiyacını eksiksiz ve doğru göstermelidir.'],
  ['Database design (tasarım)', 'ERD’yi bir <b>table instance chart</b>’a, yani tabloların taslağına çevirirsin.'],
  ['Database build (kurulum)', 'Veritabanının fiziksel yapısını, yani tabloları <b>SQL</b> komutlarıyla kurarsın; sonra yine SQL ile tablolara veri ekler, veriye erişir ve onu değiştirirsin.'],
])}
<p>Mesela bir şirketin İK müdürü her çalışanın adını, soyadını, işini, işe giriş tarihini ve maaşını tutmak istediğini, her departmanın da benzersiz bir numarası olduğunu söyler. Sen bu ihtiyaçları ilk adımda bir ERD’ye dökersin; bu örneğin tam ERD’sini 2-3’te göreceksin.</p>

${h2('Table instance chart')}
<p>Table instance chart, bir tablonun kurulmadan önceki planıdır; bu planda tablonun adı, kolonların adları ve aşağıdaki bilgiler bulunur.</p>
${more(`<p>Tabloyu bir Excel sayfası gibi düşünebilirsin: her <b>satır</b> (row) bir kaydı, her <b>kolon</b> (column) bir özelliği tutar.</p>`)}
${term(`Primary key (PK)`, `Birincil anahtar`, `
  <p>Birincil anahtar, her satırı ötekilerden ayıran kolondur; TC kimlik numarası gibi.</p>`, {
  star: true,
  more: `<p>TC kimlik numarasında olduğu gibi, iki satırda aynı değer olamaz. Modeldeki karşılığı UID’dir (2-2’de göreceksin).</p>`,
  exam: `The unique identifier for each row of data`,
})}
${term(`Foreign key (FK)`, `Yabancı anahtar`, `
  <p>Yabancı anahtar, başka bir tablonun PK’sını gösteren ve iki tabloyu birbirine bağlayan kolondur.</p>`, {
  star: true,
  exam: `Links data in one table to the data in a second table`,
})}
${figure(`
  ${dbTable('DEPARTMENTS', ['Department No:PK', 'Name', 'Location'], [['10', 'Accounting', 'US'], ['20', 'Sales', 'UK']], [0])}
  ${dbTable('EMPLOYEES', ['Employee No:PK', 'First Name', 'Last Name', 'Department No:FK'], [['101', 'Ali', 'Kaya', '10'], ['102', 'Ayşe', 'Demir', '20'], ['103', 'Can', 'Şahin', '10']], [0])}
`, '',
`Ali’nin satırında FK olan <b>Department No</b> kolonunun değeri 10. DEPARTMENTS tablosunda PK’sı 10 olan satıra bakınca Accounting’i görürsün; yani Ali, Accounting departmanında çalışıyor. Can’ın satırında da 10 yazıyor, çünkü FK değeri tekrar edebilir: bir departmanda birden çok kişi çalışabilir.`)}
${term(`Nulls`, `Boş olabilir mi?`, `
  <p>Bu madde, kolonun boş bırakılıp bırakılamayacağını söyler.</p>`, {
  more: `<p>Bazı kolonlara mutlaka bir değer girmen gerekir; bunlara mandatory (zorunlu) denir.</p>`,
  exam: `Must contain a value (mandatory)`,
})}
${term(`Unique`, `Benzersiz`, `
  <p>Bu madde, kolondaki bir değerin tabloda tekrar edip edemeyeceğini söyler.</p>`, {
  more: `<p>Mesela e-posta kolonu unique ise iki kişi aynı adresi kullanamaz.</p>`,
  exam: `Unique within the table`,
})}
${term(`Data type`, `Veri tipi`, `
  <p>Veri tipi, kolonda ne tür veri durduğunu söyler; <code>NUMBER</code>, <code>VARCHAR2</code> ya da <code>DATE</code> gibi.</p>`, {
  more: `<p><code>NUMBER</code> sayı, <code>VARCHAR2</code> metin, <code>DATE</code> de tarih tutar.</p>`,
  exam: `The definition and format of the data`,
})}
${mix('PK, FK ve unique', `PK satırın kimliğidir, bu yüzden tekrar etmez. FK ise başka bir tablonun PK’sını gösterir ve tekrar edebilir, çünkü iki çalışan aynı departmanda olabilir. Unique sadece “bu değer tekrar etmesin” der; o kolonun satırın kimliği olması gerekmez.`)}
`,
    },

    // ------------------------------------------------------------------ 1-4
    {
      id: '1-4',
      title: 'Bilgisayar dünyasındaki dönüşümler',
      en: 'Major Transformations in Computing',
      html: `
${h2('Temel terimler')}
${term(`Hardware`, `Donanım`, `<p>Donanım, bilgisayarın elle tutulabilen parçalarıdır; klavye, ekran, disk ve bellek gibi.</p>`, {
  star: true,
  exam: `The physical "bits and pieces" of a computer`,
})}
${term(`Software`, `Yazılım`, `<p>Yazılım, donanıma ne yapacağını söyleyen programlardır, yani talimat dizileridir.</p>`, {
  star: true,
  exam: `Programs (sets of instructions) which tell the hardware what to do`,
})}
${term(`Operating system`, `İşletim sistemi`, `<p>İşletim sistemi, donanımı doğrudan kontrol eden ve yöneten yazılımdır; Windows ve Linux gibi.</p>`, {
  star: true,
  exam: `Directly controls and manages the hardware`,
})}
${term(`Application`, `Uygulama`, `<p>Uygulama, kullanıcı adına belirli bir işi yapan yazılımdır; Word ya da bilgisayardaki oyunlar gibi.</p>`, {
  exam: `Carries out specific tasks on behalf of computer users <i>(on behalf of = adına)</i>`,
})}
${mix('Operating system ve application', `İkisi de yazılımdır, ama farklı işler yaparlar. Operating system <b>donanımı</b> yönetir, application ise <b>kullanıcı</b> için çalışır.`)}
${term(`Client`, `İstemci`, `<p>Client, ekranı, klavyesi ve faresiyle kullanıcının önünde oturduğu masaüstü bilgisayardır; yani insanla doğrudan muhatap olan bilgisayar odur.</p>`, {
  star: true,
  exam: `Clients interact directly with human computer users`,
})}
${term(`Server`, `Sunucu`, `<p>Server, client’ın gönderdiği isteği alıp işleyen ve sonucu geri yollayan, client’tan daha güçlü bir bilgisayardır.</p>`, {
  star: true,
  more: `<p>Bir web sayfasından bilgi istediğinde client’ın bu isteği sunucudaki veritabanına gönderir. Server veriyi veritabanından alır, onu işe yarar bilgiye çevirir ve client’a geri yollar. Bunu bir restoran gibi düşün: sen (client) sipariş verirsin, mutfak (server) yemeği hazırlayıp sana gönderir.</p>`,
  exam: `Accepts work requests from clients … sends the results back`,
})}

${h2('1970’lerden bugüne')}
${timeline([
  ['1970’ler', 'O dönemde her şey <b>mainframe</b> denen dev, merkezi bir bilgisayarda çalışır; kullanıcılar ona <b>dumb terminal</b> denen basit cihazlarla bağlanır.'],
  ['1980’ler', '<b>PC</b>’ler yaygınlaşır ve işlem, <b>smart client</b> ya da <b>workstation</b> denen masaüstü bilgisayarlara geçer; pencereli, grafik arayüzlü (<b>GUI</b>) uygulamalar doğar.'],
  ['1990’lar ve sonrası', 'Veri ve uygulamalar sunuculara taşınır, client’lar da bunlara tarayıcı üzerinden erişir.'],
])}
${more(`<p><b>1970’ler:</b> Dumb terminal kendi başına neredeyse hiç işlem yapamaz, sadece mainframe’in sonucunu ekranda gösterir. Bu yüzden mainframe çökerse herkes durur.</p>
<p><b>1980’ler:</b> Word, Excel ve PowerPoint gibi bugün bildiğimiz GUI uygulamalar bu dönemde doğar.</p>`)}
${note(`O yıllarda her bilgisayarda ayrı programlar vardı ve bunlar birbirine bağlı değildi (<b>isolated, nonintegrated systems</b>). Bu sistemleri birbirine bağlamak pahalıydı. Üstelik her güncellemede her sunucuyu ve her client’ı tek tek güncellemek gerekiyordu.`, '1980’lerin sorunu')}
${figure(`<div class="tiers">
  <div class="tier"><b>Thin client</b><span>Bilgiyi kullanıcıya gösterir, sunuculara sadece tarayıcıyla erişir.</span></div>
  <div class="tier-arrow"></div>
  <div class="tier"><b>Application server</b><span>İşletmenin uygulamaları burada çalışır.</span></div>
  <div class="tier-arrow"></div>
  <div class="tier"><b>Database server</b><span>Veriyi saklar ve istendiğinde geri getirir.</span></div>
</div>`, '', `1990’lardan sonraki düzen böyle: kullanıcı client’ta tarayıcıdan bir istek yapar, istek önce application server’a, oradan da database server’a gider. Sonuç aynı yoldan geri döner.`)}
<p>Bu düzende bir güncellemeyi artık sadece sunucuda, bir kez yapman yeterli.</p>
${more(`<p>Client’ın doğrudan sunucuyla konuştuğu sisteme <b>2-tier</b> (iki katmanlı), arada bir application server ya da web server bulunan sisteme <b>3-tier</b> (üç katmanlı) denir.</p>`)}
${term(`Oracle’s mission`, `Oracle’ın amacı`, `<p>Oracle’ın amacı, İnternet’i ve hızlı sunucuları kullanarak kurumların veri saklama ve o veriden bilgi üretme ihtiyacını karşılamaktır.</p>`, {
  exam: `Use the Internet and fast processing servers … storing data and producing information`,
})}

${h2('Grid ve cloud')}
${term(`Grid computing`, `Izgara bilişim`, `<p>Grid computing’de kurumun farklı yerlerdeki bilgisayarları tek bir güç havuzu gibi kullanılır; bu da hem performansı hem de güvenilirliği artırır.</p>`, {
  star: true,
  more: `<p>Kullanıcının isteği havuzun bir yerinde, en verimli şekilde işlenir. Bunu elektrik gibi düşün: hangi santralden geldiğini bilmezsin, fişi takarsın ve elektrik gelir.</p>`,
  exam: `Treats computing as a utility, like the electric company`,
})}
${term(`Infrastructure`, `Altyapı`, `<p>Altyapı, bir sistemin üzerinde çalıştığı temel yapıdır; grid computing de ağa bağlı çok sayıda sunucuda çalışabilen bir yazılım altyapısı kurar.</p>`, {
  exam: `A software infrastructure that can run on a large number of networked servers`,
})}
${term(`Cloud computing`, `Bulut bilişim`, `<p>Cloud computing’de şirket, yazılımı ve donanımı kendisi satın almak yerine uzaktaki bir sağlayıcıdan (cloud provider) web üzerinden kullanır.</p>`, {
  star: true,
  exam: `Access software and hardware from a cloud provider`,
})}
${mix('Grid ve cloud', `Grid’de kurum <b>kendi</b> bilgisayarlarını birleştirip tek bir havuz gibi kullanır. Cloud’da ise <b>başka bir şirketin</b> donanımını kullanır.`)}

${h2('Veritabanı kullanan sektörler')}
${table(['Sektör', 'Tuttuğu veri'], [
  ['Finance and Banking', 'Müşteri kayıtları ve işlem detayları'],
  ['Retailing', 'Stok takibi için veriler (stock control)'],
  ['Telecommunications', 'Arama kayıtları (call logs)'],
  ['Airline', 'Rezervasyonlar'],
])}
<p>Veritabanı bu işletmelerin başarısı için şarttır; mesela amazon.com daha önce aldıklarını veritabanında tuttuğu için sana yeni ürünler önerebilir.</p>
`,
    },
  ],
});
