// Ek bölüm: SQL ile tablo oluşturma (kaynak: inglizce/ek.pptx, Oracle Academy serisinin dışında).
// Numarası yok, ekranda "Ek" olarak görünür (label). no: 10 sadece sıralama ve test adresi (#/test/10) içindir.
const sqlcode = s => `<code class="sqlc">${s}</code>`;

SECTIONS.push({
  no: 10,
  label: 'Ek',
  title: 'SQL ile tablo oluşturma',
  en: 'Creating tables with SQL',
  quizSub: 'CREATE TABLE quiz',
  // ders ve test başlık kutusunda görünür
  source: 'Bu ders Oracle Academy’de yok; hocanın kampüs sistemine yüklediği ek derstir.',
  desc: 'Hocanın Oracle Academy’ye değil, kampüs sistemine yüklediği ek ders. CREATE TABLE komutuyla yeni bir tablonun yapısını tanımlamayı, veri tiplerini, PRIMARY KEY ve NOT NULL kısıtlarını öğreneceksin.',
  lessons: [
    {
      id: 'ek',
      label: 'Ek',
      title: 'CREATE TABLE ile tablo oluşturmak',
      en: 'Creating tables with SQL',
      html: `
${term(`CREATE TABLE`, `Tablo oluştur`, `<p>CREATE TABLE, yeni bir tablonun adını, kolonlarını ve her kolonun veri tipini tanımlar; sonuçta içinde hiç satır olmayan boş bir tablo oluşur.</p>`, {
  star: true,
  exam: `It defines the structure of a new table in a database.`,
  more: `<p>Tablonun adı hangi entity’yi sakladığını, kolonlar hangi attribute’lara ihtiyacın olduğunu, veri tipleri de her kolona ne tür değer girilebileceğini söyler.</p>`,
})}
<p>Her kolonun bir adı ve bir veri tipi olur, kolon tanımları da virgülle ayrılır. Aşağıdaki komut 4 kolonlu, boş bir Students tablosu kurar:</p>
${sql(`CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    BirthDate DATE
);`)}

${h2('Metin tipleri')}
${term(`CHAR(n)`, `Sabit uzunluklu metin`, `<p>CHAR(n) hep n karakter yer kaplar; değer kısaysa kalan yer boşlukla doldurulur, yani CHAR(5)’e yazılan 'TR' iki harf ve üç boşluk olur.</p>`, {
  star: true,
  exam: `Fixed-length text, padded with spaces`,
})}
${term(`VARCHAR(n)`, `Değişken uzunluklu metin`, `<p>VARCHAR(n) en fazla n karakter alır ve değeri olduğu uzunlukta saklar, yani VARCHAR(5)’e yazılan 'Ada' üç karakter kalır.</p>`, {
  star: true,
  exam: `Variable-length text, up to n characters`,
  more: `<p>Uzunluk ve boşluk doldurma ayrıntıları veritabanı sisteminden sisteme değişebilir.</p>`,
})}
${mix('CHAR ve VARCHAR', `<b>CHAR</b> sabit biçimli kodlar, <b>VARCHAR</b> adlar ve açıklamalar içindir. Telefon numarası da VARCHAR(20) olur, çünkü + ya da baştaki sıfır içerebilir.`)}

${h2('Sayı tipleri')}
${term(`INT`, `Tam sayı`, `<p>INT, 25 adet stok gibi tam sayıları tutar.</p>`, {
  exam: `Whole numbers`,
})}
${term(`DECIMAL(p,s)`, `Kesin ondalık sayı`, `<p>DECIMAL, 19.95 gibi bir fiyatı yuvarlamadan, tam olarak saklar.</p>`, {
  star: true,
  exam: `Exact decimal values`,
})}
${term(`REAL / FLOAT`, `Yaklaşık sayı`, `<p>REAL ya da FLOAT, ölçümler gibi yaklaşık değerler içindir.</p>`, {
  exam: `Approximate numbers`,
})}
${term(`Precision ve scale`, `Basamak sayıları`, `<p>DECIMAL(p,s)’de precision (p) toplam basamak sayısı, scale (s) ise virgülden sonraki basamak sayısıdır.</p>`, {
  star: true,
  exam: [`Precision = total digits`, `Scale = digits after the decimal point`],
  more: `<p>Nokta ve eksi işareti basamak sayılmaz. Virgülden sonra fazla basamak yazarsan değer veritabanının kurallarına göre yuvarlanabilir.</p>`,
})}
<p>DECIMAL(8,2)’de virgülden önce en fazla 6 basamak kalır, bu yüzden ${sqlcode('123456.78')} sığar ama ${sqlcode('1234567.89')} sığmaz.</p>

${h2('Tarih tipleri')}
${term(`DATE ve TIMESTAMP`, `Tarih, tarih ve saat`, `<p>DATE doğum tarihi gibi takvim tarihlerini, TIMESTAMP ise PostgreSQL gibi sistemlerde tarihle birlikte saati tutar.</p>`, {
  exam: [`DATE: Calendar dates`, `TIMESTAMP: Date and time`],
})}
${note(`Oracle’da metin için genelde <b>VARCHAR2</b>, sayı için <b>NUMBER(p,s)</b> kullanılır. Oracle’ın DATE tipi saati de saniyesine kadar tutar.`, 'Oracle’da')}

${h2('Temel kısıtlar')}
${term(`PRIMARY KEY`, `Birincil anahtar`, `<p>PRIMARY KEY olan kolon, yukarıda StudentID, benzersiz olmak zorundadır ve NULL olamaz.</p>`, {
  star: true,
  exam: `Must be unique and cannot be NULL`,
})}
${term(`NOT NULL`, `Boş bırakılamaz`, `<p>NOT NULL olan kolon, yukarıda FirstName ve LastName, her satırda bir değer ister.</p>`, {
  star: true,
  exam: `Require a value`,
})}
${mix('PRIMARY KEY ve NOT NULL', `NOT NULL tek başına sadece boş olmamayı sağlar, aynı değerin tekrar etmesini engellemez. Benzersizliği PRIMARY KEY getirir.`)}

${h2('Var olan veriden tablo')}
${term(`CREATE TABLE … AS SELECT`, `Sorgudan tablo oluşturmak`, `<p>Bu komut, sorgunun seçtiği kolon ve satırlarla dolu yeni bir tablo kurar.</p>`, {
  exam: `The selected columns and rows populate the new table.`,
})}
${sql(`CREATE TABLE StudentNames AS
SELECT StudentID, FirstName, LastName
FROM Students;`)}
${note(`Kaynak tablo boşsa yeni tablo da boş olur. Anahtarlar (keys) ve index’ler kopyalanmayabilir, onları ayrıca tanımlaman gerekebilir. SQL Server bu iş için <b>SELECT … INTO</b> kullanır.`)}

${h2('Alıştırmalar')}
<p>Books tablosunu (BookID, Title, Author, Price) kuran CREATE TABLE komutu hiç kitap eklemez; tablo boş oluşur, satırlar sonra ${sqlcode('INSERT INTO')} ile eklenir.</p>
${more(`${sql(`CREATE TABLE Books (
    BookID INT PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Author VARCHAR(80),
    Price DECIMAL(8,2)
);`)}`)}
<p>Kendin dene: aşağıdaki kurallara göre Products tablosunun CREATE TABLE komutunu yaz. Çözüm kapalı kutuda.</p>
${table(['Kolon', 'Kural'], [
  ['ProductID', 'Tam sayı, primary key'],
  ['ProductName', 'Değişken uzunluklu, en fazla 80 karakter, zorunlu'],
  ['CategoryCode', 'Sabit uzunluklu, 3 karakter'],
  ['Price', 'Kesin ondalık, toplam 8 basamak, 2’si virgülden sonra'],
  ['StockQuantity', 'Tam sayı'],
  ['AddedDate', 'Takvim tarihi'],
])}
${more(`${sql(`CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(80) NOT NULL,
    CategoryCode CHAR(3),
    Price DECIMAL(8,2),
    StockQuantity INT,
    AddedDate DATE
);`)}`)}
`,
    },
  ],
});
