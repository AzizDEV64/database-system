// Türkçe bölüm, H4.2: Veri tabanı normalizasyonu (kaynak: türkçe/H4.2 - Veritabanı Normalizasyonu.pdf)
// Hafta 4 bölümüne (h4.js) üçüncü ders olarak eklenir; bu yüzden h4.js'ten sonra yüklenmeli.

// slayttaki DAĞITIM örneği, sütun adları açık yazılmış hâliyle
const DAG_1NF = [
  ['1', '34', 'İstanbul', '1', '300'], ['1', '34', 'İstanbul', '2', '200'], ['1', '34', 'İstanbul', '3', '400'],
  ['1', '34', 'İstanbul', '4', '200'], ['1', '34', 'İstanbul', '6', '100'], ['2', '6', 'Ankara', '1', '300'],
  ['2', '6', 'Ankara', '2', '400'], ['3', '6', 'Ankara', '2', '200'], ['4', '34', 'İstanbul', '2', '200'],
  ['4', '34', 'İstanbul', '4', '300'], ['4', '34', 'İstanbul', '5', '400'],
];
const MIKTARLAR = DAG_1NF.map(r => [r[0], r[3], r[4]]);

TR_SECTIONS.find(s => s.no === 4).lessons.push({
  id: 'H4-norm',
  label: 'H4.2',
  title: 'Veri tabanı normalizasyonu',
  en: 'Database Normalization',
  html: `
<p class="lead">Normalizasyon (normalleştirme), bir tablodaki verinin gereksiz yere tekrar etmesini, kaybolmasını ya da eksik kalmasını önlemek için uygulanan kurallar dizisidir.</p>
${more(`<p>İlk taslak hâlindeki bir veri tabanı tasarımını gözden geçirip son hâline yaklaştırmanın yollarından biridir. Aslında bir tablodaki kaydın hangi alanlardan oluşacağına karar vermeye yarar. Genel kabul görmüş 5 normalizasyon kuralı vardır; burada beşini de göreceksin.</p>`)}

${h2('Normalizasyonun amaçları')}
${table(['Amaç', 'Ne demek?'], [
  ['Veri bütünlüğünü sağlamak', 'Aynı veri birkaç yerde tutulursa kopyalar zamanla birbirinden farklılaşır ve hangisinin doğru olduğu bilinmez.'],
  ['Uygulamadan bağımsızlık', 'Veri modeli, onu kullanan program değişse bile tutarlı ve sabit kalır.'],
  ['Performansı artırmak', 'Daha az kopya, daha az yer kaplar ve veri tabanında arama daha hızlı olur.'],
])}
${more(`<p><b>Bütünlük:</b> Tekrarlanan kopyalar, bunlardan habersiz program kodları yüzünden farklı değerler taşımaya başlayabilir. Bu durumda VTYS’nin otomatik bütünlük mekanizmaları bile işe yaramaz; düzeltmeyi programın yapması gerekir, bu da programı karmaşıklaştırır.</p>
<p><b>Bağımsızlık:</b> Normalleştirme, “ilişkisel model verinin içeriğine göre kurulmalı, uygulamaya göre değil” fikrini bir adım öne alır. Programın ihtiyaçları, veri tabanının mantıksal modelini mümkün olduğunca az etkilemelidir.</p>
<p><b>Performans:</b> Tamamen normalleştirilmiş bir veri tabanında, dış anahtarlar dışında gereksiz kopya en aza iner.</p>`)}

${h2('Başlangıç: normal olmayan tablo')}
${tterm(`Atomik değer`, `Atomic value`, `<p>Atomik değer, tek ve basit bir değerdir; bir hücrede virgülle ayrılmış birkaç değer olmaz.</p>`, {
  star: true,
  exam: `İlişkisel veri tabanı modelinin temel kuralına göre bütün niteliklerin aldığı değerler atomik (tek ve basit) olmalıdır.`,
})}
<p>Aşağıdaki DAĞITIM tablosu bu kurala uymuyor, çünkü bir hücrede birden fazla gönderi numarası ve miktar var:</p>
${figure(dbTable('DAĞITIM (normal değil)', ['Müşteri No', 'Şehir Kodu', 'Şehir Adı', 'Gönderi No', 'Miktar'], [
  ['1', '34', 'İstanbul', '1, 2, 3, 4, 6', '300, 200, 400, 200, 100'],
  ['2', '6', 'Ankara', '1, 2', '300, 400'],
  ['3', '6', 'Ankara', '2', '200'],
  ['4', '34', 'İstanbul', '2, 4, 5', '200, 300, 400'],
], [0, 1, 3], { note: 'Vurgulu satırlara bak: Gönderi No ve Miktar hücrelerinde virgülle ayrılmış birkaç değer var. Bir hücrede birden fazla değer olduğu için tablo normal değil.' }))}

${h2('1. kural: birinci normal form (1NF)')}
${tterm(`Birinci normal form (1NF)`, `First normal form`, `<p>Bir satırdaki her alan yalnızca tek bir bilgi içerir; yani her hücrede tek bir değer vardır.</p>`, {
  star: true,
  exam: `Bir satırdaki bir alan yalnızca bir tek bilgi içerebilir.`,
  more: `<p>Birden fazla yazarı olan bir kitap için yazar1, yazar2, yazar3 diye alanlar açarsan bu kurala uymamış olursun. Doğrusu, ayrıca bir YAZARLAR tablosu oluşturmaktır.</p>`,
})}
<p>DAĞITIM tablosunda her gönderi ayrı bir satıra yazılınca tablo 1NF’ye uyar:</p>
${figure(dbTable('DAĞITIM (1NF)', ['Müşteri No:PK', 'Şehir Kodu', 'Şehir Adı', 'Gönderi No:PK', 'Miktar'], DAG_1NF, [0, 1, 2, 3, 4], {
  note: 'Artık her hücrede tek değer var; anahtar, Müşteri No ile Gönderi No’nun birleşimi. Ama vurgulu beş satıra bak: müşteri 1’in şehir kodu ve şehir adı beş kez yazılmış. 1NF’nin sorunu bu tekrardır.',
}))}
<p>1NF’deki tabloda şehir kodu ve şehir adı her müşteri için tekrar eder. Bu tekrar, üç tür soruna yol açar:</p>
${table(['Sorun', 'Örnek'], [
  ['Silme sorunu', 'Müşteri 3’ün tek gönderisi iptal edilip satırı silinirse, müşterinin kendisi ve şehri de tablodan kaybolur.'],
  ['Güncelleme sorunu', 'Müşteri 1 Ankara’ya taşınırsa onunla ilgili bütün satırları tek tek güncellemek gerekir; büyük bir tabloda binlerce kayıt değişebilir.'],
  ['Ekleme sorunu', 'Tekrarlı yapıda, bir bilgiyi eklemek için başka bir bilgiye ihtiyaç duyulur (aşağıda 2NF’de bir örneği var).'],
])}

${h2('2. kural: ikinci normal form (2NF)')}
${tterm(`İkinci normal form (2NF)`, `Second normal form`, `<p>Anahtar olmayan her alan, birincil anahtarın <b>tamamına</b> bağlı olmalıdır; anahtarın sadece bir parçasına bağlı olan alanlar ayrı bir tabloya alınır.</p>`, {
  star: true,
  exam: `Bir tablo için, anahtar olmayan her alan, birincil anahtar olarak tanımlı tüm alanlara bağımlı olmak zorundadır. Bu duruma uymayan alanlar ayrı bir tabloya alınmalıdır.`,
})}
${tterm(`Kısmi bağımlılık`, `Partial dependency`, `<p>Kısmi bağımlılık, bir alanın birden fazla alandan oluşan anahtarın sadece bir parçasına bağlı olmasıdır; 2NF bunu ortadan kaldırır.</p>`, {
  more: `<p>Bu kural şöyle de söylenir: “her anahtar olmayan sütun birincil anahtara kısmi bağımlı değil, tam işlevsel bağımlı olmalıdır.” İşlevsel bağımlılık, bir alanın değerinin başka bir alanın değeriyle belirlenmesidir: müşteri numarasını bilirsen şehrini de bilirsin.</p>`,
})}
<p>DAĞITIM tablosunun anahtarı Müşteri No ve Gönderi No’dan oluşuyor. Ama şehir kodu ve şehir adı sadece Müşteri No’ya bağlı. Bu yüzden tablo ikiye ayrılır:</p>
${schema(['MÜŞTERİLER(#Müşteri No, Şehir Kodu, Şehir Adı)', 'MİKTARLAR(#>Müşteri No, #Gönderi No, Miktar)'])}
${more(`${dbTable('MÜŞTERİLER', ['Müşteri No:PK', 'Şehir Kodu', 'Şehir Adı'], [['1', '34', 'İstanbul'], ['2', '6', 'Ankara'], ['3', '6', 'Ankara'], ['4', '34', 'İstanbul']], [1, 2], {
  note: 'Şehir kodu ve adı sadece Müşteri No’ya bağlı olduğu için bu tabloya ayrıldı; artık her müşterinin şehri bir kez yazılıyor. Ama vurgulu satırlara bak: Ankara hâlâ iki kez yazılı, çünkü şehir adı aslında şehir koduna bağlı. Bunu 3NF çözecek.',
})}
${dbTable('MİKTARLAR', ['Müşteri No:PK', 'Gönderi No:PK', 'Miktar'], MIKTARLAR, [], {
  note: 'Miktar hem müşteriye hem gönderiye, yani anahtarın tamamına bağlı; bu yüzden burada kalır.',
})}`)}
<p>Bir örnek daha: ÖDÜNÇ tablosuna Kitap Adı eklenirse, bu alan ödünç numarasına değil kitaba bağlı olur; kitap adları ayrı bir tabloda tutulmalıdır. Kuralın tersi de geçerlidir: iki tablonun birincil anahtarı aynı olamaz, aynıysa bu iki tablo tek tabloda birleştirilmelidir.</p>
<p>2NF güncelleme sorununu çözer, ama ekleme ve silme sorunları hâlâ kalır:</p>
${table(['Sorun', 'Örnek'], [
  ['Ekleme sorunu', 'MÜŞTERİLER tablosuna, İzmir’de oturan bir müşteri girilmedikçe İzmir şehri eklenemez.'],
  ['Silme sorunu', 'Bir şehirdeki tek müşteri silinirse, o şehrin kodu ve adı da tablodan kaybolur.'],
])}

${h2('3. kural: üçüncü normal form (3NF)')}
${tterm(`Üçüncü normal form (3NF)`, `Third normal form`, `<p>Anahtar olmayan bir alan, anahtar olmayan başka bir alana bağlı olamaz.</p>`, {
  star: true,
  exam: `Bir tablo için, anahtarı olmayan bir alan, anahtarı olmayan başka hiç bir alana bağlı olamaz.`,
})}
${tterm(`Geçişli bağımlılık`, `Transitive dependency`, `<p>Geçişli bağımlılık, bir alanın anahtara doğrudan değil, anahtar olmayan başka bir alan üzerinden bağlı olmasıdır; 3NF bunu ortadan kaldırır.</p>`, {
  more: `<p>MÜŞTERİLER tablosunda şehir adı, müşteri numarasına değil şehir koduna bağlıdır: şehir kodunu bilirsen şehrin adını da bilirsin. Bu bağımlılık ayrı bir tabloya taşınınca 3NF elde edilir.</p>`,
})}
${schema(['ŞEHİRLER(#Şehir Kodu, Şehir Adı)', 'MÜŞTERİLER(#Müşteri No, >Şehir Kodu)', 'MİKTARLAR(#>Müşteri No, #Gönderi No, Miktar)'])}
${more(`${dbTable('ŞEHİRLER', ['Şehir Kodu:PK', 'Şehir Adı'], [['6', 'Ankara'], ['34', 'İstanbul'], ['35', 'İzmir']], [], {
  note: 'Şehir adı müşteriye değil şehir koduna bağlı olduğu için kendi tablosuna taşındı. Her şehrin adı artık bir kez yazılıyor.',
})}
${dbTable('MÜŞTERİLER', ['Müşteri No:PK', 'Şehir Kodu:FK'], [['1', '34'], ['2', '6'], ['3', '6'], ['4', '34'], ['5', '35']], [], {
  note: 'Şehir Kodu burada yabancı anahtar olarak kaldı; şehrin adını ŞEHİRLER tablosundan bulursun.',
})}
<p>Artık İzmir, orada hiç müşteri olmasa bile ŞEHİRLER tablosunda durabilir; bir müşteri silindiğinde de şehir bilgisi kaybolmaz.</p>`)}
${mix('2NF ve 3NF', `<b>2NF</b>’de alan, anahtarın sadece <b>bir parçasına</b> bağlıdır (kısmi bağımlılık). <b>3NF</b>’de alan, anahtara değil anahtar olmayan <b>başka bir alana</b> bağlıdır (geçişli bağımlılık).`)}

${h2('4. kural: dördüncü normal form (4NF)')}
${tterm(`Dördüncü normal form (4NF)`, `Fourth normal form`, `<p>Birincil anahtar ile anahtar olmayan alanlar arasında, birbirinden bağımsız birden fazla bire-çok ilişkiye izin verilmez.</p>`, {
  star: true,
  exam: `Birincil anahtar alanlar ile anahtarı olmayan alanlar arasında, birden fazla bağımsız bire-çok ilişkisine izin verilmez.`,
})}
${tterm(`Çok değerli bağımlılık`, `Multivalued dependency`, `<p>Çok değerli bağımlılık, bir anahtar değerine birden fazla değerin, başka bir alandan bağımsız olarak bağlı olmasıdır; bir öğrencinin birden çok bölümü ve birden çok sporu olması gibi.</p>`)}
<p>Örnekte bir öğrenci birden çok bölüme kayıt olabiliyor ve birden çok spor yapabiliyor. Bölüm ile spor birbirinden bağımsız olduğu için tek tabloda her bölüm-spor eşleşmesi ayrı bir satır olur:</p>
${figure(dbTable('ÖĞRENCİ', ['Öğrenci No', 'Bölüm', 'Spor'], [
  ['123', 'Fizik', 'Kayak'], ['123', 'Kimya', 'Kayak'], ['123', 'Fizik', 'Tenis'], ['123', 'Kimya', 'Tenis'], ['999', 'Kimya', 'Tenis'],
], [0, 1, 2, 3], {
  note: 'Vurgulu dört satır öğrenci 123’e ait: 2 bölüm × 2 spor = 4 satır. Bölüm ile spor birbirinden bağımsız olduğu için her bölüm her sporla eşleştirilip yazılıyor. Bu öğrenci yeni bir bölüme kaydolursa iki satır birden eklenmesi gerekir.',
}))}
<p>Çözüm, tabloyu bağımsız ilişkiler kadar parçaya ayırmaktır:</p>
${schema(['ÖĞRENCİ_BÖLÜM(#Öğrenci No, #Bölüm)', 'ÖĞRENCİ_SPOR(#Öğrenci No, #Spor)'])}
${more(`<p>Kitap örneği de aynı şeyi anlatır: bir kitap hem hikâye hem kişisel gelişim kitabı olabilir. Bunun için TÜRLER adında bir tablo ve kitapları türlere bağlayan KİTAP_TÜRLERİ adında bir tablo daha açılır. “Kişisel Gelişim Hikâyeleri” adlı kitap için KİTAP_TÜRLERİ’ne iki satır eklenir: biri hikâye türünün koduyla, biri kişisel gelişim türünün koduyla.</p>`)}

${h2('5. kural')}
${tterm(`Beşinci normal form (5NF)`, `Fifth normal form`, `<p>Tekrarlamaları ortadan kaldırmak için her tablo mümkün olduğunca küçük parçalara bölünür.</p>`, {
  exam: `Tekrarlamaları ortadan kaldırmak için her bir tablonun mümkün olduğunca küçük parçalara bölünmesi gerekir.`,
})}
${table(['Kural', 'Kısaca'], [
  ['1NF', 'Her hücrede tek (atomik) değer'],
  ['2NF', 'Anahtarın tamamına bağlılık, kısmi bağımlılık yok'],
  ['3NF', 'Anahtar olmayan alana bağlılık yok, geçişli bağımlılık yok'],
  ['4NF', 'Birden fazla bağımsız bire-çok ilişki yok, çok değerli bağımlılık yok'],
  ['5NF', 'Tablolar mümkün olduğunca küçük parçalara bölünür'],
])}

${h2('Özet')}
<p>Normalizasyon kuralları, veri tabanını tasarlama adımlarını değil, tablolardaki kayıtların ilişkisel veri tabanına uygun olup olmadığını denetler. İyi bir ilişkisel tasarım şu dört şeyi sağlar:</p>
<ol>
  <li>Veri tekrarı yapılmaz.</li>
  <li>Boş yer mümkün olduğunca az olur.</li>
  <li>Veri bütünlüğü sağlanır.</li>
  <li>Veriler, aralarında ilişki kurulabilecek şekilde düzenlenir.</li>
</ol>

${h2('Örnek: sipariş tablosu')}
<p>Son örnekte tek bir SİPARİŞ tablosu, adım adım 3NF’ye getiriliyor:</p>
${schema(['SİPARİŞ(#Sipariş No, Tarih, Ürün Adı, #Ürün No, Adet, Müşteri No, Müşteri Adı, Müşteri Soyadı)'])}
<p><b>1NF → 2NF</b>, kısmi bağımlılıklar giderilir: Adet hem siparişe hem ürüne bağlıdır, ama Tarih ve müşteri bilgileri sadece siparişe, Ürün Adı da sadece ürüne bağlıdır.</p>
${schema(['SİPARİŞ_ÜRÜN(#Sipariş No, #Ürün No, Adet)', 'SİPARİŞ_MÜŞTERİ(#Sipariş No, Tarih, Müşteri No, Müşteri Adı, Müşteri Soyadı)', 'ÜRÜN(#Ürün No, Ürün Adı)'])}
<p><b>2NF → 3NF</b>, geçişli bağımlılıklar giderilir: Müşteri Adı ve Soyadı siparişe değil müşteri numarasına bağlıdır.</p>
${schema(['SİPARİŞ_ÜRÜN(#Sipariş No, #Ürün No, Adet)', 'SİPARİŞ_MÜŞTERİ(#Sipariş No, Tarih, >Müşteri No)', 'MÜŞTERİLER(#Müşteri No, Müşteri Adı, Müşteri Soyadı)', 'ÜRÜN(#Ürün No, Ürün Adı)'])}
`,
});
