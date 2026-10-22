// Türkçe bölüm, Hafta 6: Veri işleme dili (kaynak: türkçe/H6 - Veri İşleme Dili.pdf)
// Slayttaki SQL örnekleri birebir korunur (tablo ve alan adları kodun parçası olduğu için açılmaz).
// sqlc() h5.js'te tanımlı.

TR_SECTIONS.push({
  no: 6,
  title: 'Veri işleme dili',
  en: 'SQL Data Manipulation Language (DML)',
  desc: 'SQL komutlarının üç grubu (DML, DDL, DCL) ve SELECT ile kayıt çekmek: alan seçmek, ORDER BY ile sıralamak, WHERE, AND ve OR ile süzmek.',
  lessons: [
    {
      id: 'H6',
      title: 'Veri işleme dili (DML) ve SELECT',
      en: 'Data Manipulation Language: SELECT',
      html: `
${h2('SQL komutlarının üç grubu')}
<p>SQL komutları üç gruba ayrılır. H5’te ilk ikisini görmüştük; bu ders üçüncüsünü, DCL’i de ekliyor.</p>
${tterm(`Veri İşleme Dili`, `DML, Data Manipulation Language`, `<p>DML, tablodaki verilerin kendisiyle uğraşır: kayıtları sorgular (<b>Select</b>), ekler (<b>Insert</b>), günceller (<b>Update</b>) ve siler (<b>Delete</b>).</p>`, {
  star: true,
  exam: `Bir tablodaki veriler üzerinde sorgulama, ekleme, güncelleme ve silme işlemleri gerçekleştirir. Komutları: Select, Insert, Update, Delete.`,
})}
${tterm(`Veri Tanımlama Dili`, `DDL, Data Definition Language`, `<p>DDL, tablonun kendisiyle uğraşır: tabloyu sıfırdan kurar (<b>Create</b>), değiştirir (<b>Alter</b>) ya da siler (<b>Drop</b>); indeks oluşturmak da DDL’in işidir.</p>`, {
  star: true,
  exam: `Sıfırdan tablo oluşturma, tablo üzerinde değişiklik yapma, indeks oluşturma ve silme işlemleri gerçekleştirir. Komutları: Create, Drop, Alter.`,
})}
${tterm(`Veri Kontrol Dili`, `DCL, Data Control Language`, `<p>DCL, kullanıcılara veri tabanında hak verir ya da verdiği hakları geri alır. Komutları <b>Grant</b>, <b>Deny</b> ve <b>Revoke</b>’tur.</p>`, {
  star: true,
  exam: `Kullanıcılara veri tabanı üzerinde bazı haklar verme veya verilen hakları geri alma gibi işlemlere olanak tanır. Komutları: Grant, Deny, Revoke.`,
})}
${mix('DML, DDL ve DCL', `<b>DDL</b> kabı kurar, <b>DML</b> kabın içindekilerle uğraşır, <b>DCL</b> ise kapıdaki bekçi gibi kimin girebileceğine karar verir.`)}

${h2('SELECT: tablodan kayıt çekmek')}
${tterm(`SELECT`, ``, `<p>SELECT, bir tablodan kayıt çekmek için kullanılır. Yıldız (<b>*</b>) “bütün alanlar” demektir.</p>`, {
  star: true,
  exam: `SQL dilinde bir tablodan kayıt çekmek için SELECT komutu kullanılır: SELECT * FROM tablo_adi`,
})}
<p>Genel yazımı ilk satırda. İkinci satır, kullanici_bilgileri tablosundaki bütün kullanıcıların bilgilerini gösterir:</p>
${sql(`SELECT * FROM tablo_adi;

SELECT * FROM kullanici_bilgileri;`)}
<p><b>Sadece belli alanları</b> görmek için yıldız yerine alan adlarını virgülle ayırarak yazarsın. Örnekteki ikinci satır, sadece öğrenci numarasını ve notun alındığı tarihi listeler:</p>
${sql(`SELECT alanadi1,alanadi2 FROM tablo_adi;

SELECT ogrno,tarih FROM notlar;`)}

${h2('ORDER BY: sıralamak')}
${tterm(`ORDER BY`, ``, `<p>ORDER BY, kayıtları belli bir alana göre sıralar: ${sqlc('SELECT * FROM tablo_adi ORDER BY alan1;')}</p>`, {
  star: true,
  exam: `Verileri listelerken belli bir alandaki verilere göre sıralamak için: SELECT * FROM tablo_adi ORDER BY alan1;`,
})}
${table(['Sorgu', 'Ne yapar?'], [
  [sqlc('SELECT * FROM notlar ORDER BY tarih;'), 'Tarihe göre artan sıralar.'],
  [sqlc('SELECT * FROM notlar ORDER BY tarih ASC;'), 'Aynı sonuç: yön yazılmazsa ASC sayılır.'],
  [sqlc('SELECT * FROM notlar ORDER BY tarih DESC;'), 'Tarihe göre azalan sıralar.'],
])}
${mix('ASC ve DESC', `<b>ASC</b> (ascending) artan: küçükten büyüğe, eskiden yeniye, A’dan Z’ye. <b>DESC</b> (descending) azalan, yani tersi. Yön yazmazsan <b>ASC</b> olur.`)}
<p>Birden fazla alana göre sıralarken alanları virgülle ayırır, her birinin yönünü ayrı yazarsın. Örnekteki ikinci satır, notları içerik numarasına göre azalan, öğrenci numarasına göre artan sırada listeler:</p>
${sql(`SELECT * FROM tabloadi ORDER BY alanadi1 DESC, alanadi2 ASC;

SELECT * FROM notlar ORDER BY icerikno DESC, ogrno ASC;`)}

${h2('WHERE: koşula göre süzmek')}
${tterm(`WHERE`, ``, `<p>WHERE, sadece belli bir alanı verdiğin koşula uyan kayıtları listeler.</p>`, {
  star: true,
  exam: `Tablodaki belli bir alanın bir koşula uymasına göre verileri listelemek için: SELECT * FROM tablo_adi WHERE alanadi1=koşul;`,
})}
<p>Genel yazımı ilk satırda. İkinci satır sadece 9801 numaralı öğrencinin aldığı notları gösterir:</p>
${sql(`SELECT * FROM tablo_adi WHERE alanadi1=koşul;

SELECT * FROM notlar WHERE ogrno=9801;`)}
<p>Koşuldaki değer metinse <b>tırnak içinde</b> yazılır; sayılar tırnaksız yazılır. Örnekteki ikinci satır sadece adı Sema olanları gösterir:</p>
${sql(`SELECT * FROM tabloadi WHERE alanadi1="metin";

SELECT * FROM kullanici_bilgileri WHERE ad="Sema";`)}

${h2('AND ve OR: birden fazla koşul')}
${table(['Bağlaç', 'Ne zaman listeler?', 'Örnek'], [
  ['<b>AND</b>', 'İki koşul da sağlanıyorsa.', sqlc('SELECT * FROM kullanici_bilgileri WHERE ad="Sema" AND soyad="Öztürk";')],
  ['<b>OR</b>', 'İki koşuldan en az biri sağlanıyorsa.', sqlc('SELECT * FROM kullanici_bilgileri WHERE ad="Serdar" OR soyad="Kubalı";')],
])}
${more(`<p>Genel yazımlar:</p>
${sql(`SELECT * FROM tablo_adi WHERE alanadi1="metin" AND alanadi2="metin";

SELECT * FROM tablo_adi WHERE alanadi1="metin" OR alanadi2="metin";`)}`)}
<p>AND ile OR aynı sorguda da kullanılabilir; birlikte değerlendirilecek koşullar <b>parantez</b> içine alınır. Örnekteki ikinci sorguda öğrenci 9801 ya da 9802 olmalı, ayrıca içerik numarası 1 olmalı:</p>
${sql(`SELECT * FROM tablo_adi WHERE
  (alanadi1="metin" OR alanadi2="metin") AND alanadi3="metin";

SELECT * FROM onemli_sayfalar WHERE
  (ogrno=9801 OR ogrno=9802) AND icerikno=1;`)}
`,
    },
  ],
});
