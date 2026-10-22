// Türkçe bölüm, Hafta 5: Yapısal SQL komutları (kaynak: türkçe/H5 - Yapısal SQL Komutları.pdf)
// Slayttaki SQL örnekleri birebir korunur (sütun adları kodun parçası olduğu için açılmaz).

const PERSONS = [['1', 'Hansen', 'Ola', 'Timoteivn 10', 'Sandnes'], ['2', 'Svendson', 'Tove', 'Borgvn 23', 'Sandnes'], ['3', 'Pettersen', 'Kari', 'Storgt 20', 'Stavanger']];
const PERSONS_COLS = ['P_Id', 'LastName', 'FirstName', 'Address', 'City'];
const sqlc = s => `<code class="sqlc">${s}</code>`;

TR_SECTIONS.push({
  no: 5,
  title: 'Yapısal SQL komutları',
  en: 'SQL Data Definition Language (DDL)',
  desc: 'SQL’in DDL komutları: veri tabanı, şema ve tablo oluşturmak, veri tipleri, kısıtlar ve ALTER TABLE ile tabloyu değiştirmek.',
  lessons: [
    {
      id: 'H5',
      title: 'Yapısal SQL komutları (DDL)',
      en: 'Structured Query Language: Data Definition',
      html: `
${tterm(`SQL`, `Structured Query Language`, `<p>SQL (Yapısal Sorgulama Dili), kullanıcıların ve programların VTYS’ye ne yapacağını söylediği dildir; VTYS de bu komutlara göre veri tabanında okuma ve yazma yapar.</p>`, {
  star: true,
  more: `<p>Kullanıcılar SQL ile VTYS’ye istek gönderir, VTYS bu isteği veri tabanındaki tablolara (müşteriler, faturalar, ürünler) uygular ve sonucu kullanıcıya geri döndürür.</p>`,
})}
<p>SQL komutları iki gruba ayrılır:</p>
${table(['Grup', 'Ne yapar?'], [
  ['DDL (Data Definition Language), yapısal komutlar', 'Veri tabanı, tablo, ilişki gibi <b>yapıları</b> oluşturur, değiştirir ve siler.'],
  ['DML (Data Manipulation Language)', 'Tablolardaki <b>verileri</b> ekler, siler, günceller ve sorgular.'],
])}
${mix('DDL ve DML', `<b>DDL</b> kabı hazırlar: tabloyu kurar, sütun ekler. <b>DML</b> kabın içindekiyle uğraşır: satır ekler, siler, sorgular. Bu derste sadece DDL var.`)}

${h2('Oluşturma komutları')}
${table(['Komut', 'Ne için?', 'Genel yazım'], [
  ['CREATE DATABASE', 'Veri tabanı oluşturur.', sqlc('CREATE DATABASE veritabani_adi;')],
  ['CREATE SCHEMA', 'Şema oluşturur.', sqlc('CREATE SCHEMA sema_adi;') + '<br>Örnek: ' + sqlc('CREATE SCHEMA sema3;')],
  ['CREATE TABLE', 'Tablo oluşturur.', sqlc('CREATE TABLE tablo_adi (alan_adi veri_tipi kısıtlar, ...);')],
])}
${more(`<p>Aşağıdaki CREATE DATABASE örneği, veri tabanının karakter kodlamasını (UTF8), Türkçe sıralama ve harf kurallarını (tr_TR), sahibini ve şablonunu da belirtir:</p>
${sql(`CREATE DATABASE "OnlineStore"
  ENCODING = 'UTF8'
  LC_COLLATE = 'tr_TR.UTF-8'
  LC_CTYPE = 'tr_TR.UTF-8'
  OWNER = postgres
  TEMPLATE = template0;`)}`)}
<p>Aşağıdaki CREATE TABLE örneği, bu dersteki birçok şeyi tek bir tabloda gösteriyor. Her satırda önce sütunun adı, sonra veri tipi, sonra varsa kısıtları yazılır; CONSTRAINT satırları da kısıtlara ad verir:</p>
${sql(`CREATE TABLE "public"."Urunler" (
  "urunNo"       SERIAL,
  "kodu"         CHAR(6) NOT NULL,
  "adi"          VARCHAR(40) NOT NULL,
  "uretimTarihi" DATE DEFAULT '2000-01-01',
  "birimFiyati"  MONEY,
  "miktari"      SMALLINT DEFAULT 0,
  CONSTRAINT "urunlerPK"     PRIMARY KEY ("urunNo"),
  CONSTRAINT "urunlerUnique" UNIQUE ("kodu"),
  CONSTRAINT "urunlerCheck"  CHECK ("miktari" >= 0)
);`)}

${h2('Veri tipleri')}
<p>Her sütunun bir veri tipi olur. Aşağıda en sık kullanılan veri tiplerinin MySQL ve PostgreSQL’deki karşılıklarını görüyorsun:</p>
${table(['Veri türü', 'MySQL', 'PostgreSQL'], [
  ['Sabit uzunluklu metin', sqlc('CHAR(n)'), sqlc('CHAR(n)')],
  ['Değişken uzunluklu metin', sqlc('VARCHAR(n)'), sqlc('VARCHAR(n)')],
  ['Uzun metin', sqlc('TEXT') + ', ' + sqlc('LONGTEXT'), sqlc('TEXT')],
  ['Tamsayı', sqlc('INT'), sqlc('INTEGER')],
  ['Otomatik artan sayı', sqlc('AUTO_INCREMENT') + ' özelliği', sqlc('SERIAL')],
  ['Kesin ondalık sayı', sqlc('DECIMAL(p,s)'), sqlc('NUMERIC(p,s)')],
  ['Para birimi', 'Yok', sqlc('MONEY')],
  ['Tarih', sqlc('DATE'), sqlc('DATE')],
  ['Tarih ve saat', sqlc('DATETIME'), sqlc('TIMESTAMP')],
  ['Doğru / yanlış', sqlc('BOOLEAN'), sqlc('BOOLEAN')],
])}
${more(`${table(['Veri türü', 'MySQL', 'PostgreSQL'], [
  ['İkili (binary) veri', sqlc('BLOB') + ' ve türevleri', sqlc('BYTEA')],
  ['Çok küçük tamsayı', sqlc('TINYINT') + ' (-128 … 127)', 'Yok, SMALLINT kullanılır'],
  ['Küçük tamsayı', sqlc('SMALLINT') + ' (-32.768 … 32.767)', sqlc('SMALLINT')],
  ['Orta boy tamsayı', sqlc('MEDIUMINT'), 'Yok, INTEGER kullanılır'],
  ['Büyük tamsayı', sqlc('BIGINT'), sqlc('BIGINT') + ', büyük otomatik sayı için ' + sqlc('BIGSERIAL')],
  ['Tek duyarlıklı ondalık', sqlc('FLOAT'), sqlc('REAL')],
  ['Çift duyarlıklı ondalık', sqlc('DOUBLE'), sqlc('DOUBLE PRECISION')],
  ['Saat', sqlc('TIME'), sqlc('TIME')],
  ['Zaman damgası', sqlc('TIMESTAMP') + ' (UTC olarak saklanır)', sqlc('TIMESTAMPTZ')],
  ['Yıl', sqlc('YEAR'), 'Yok, SMALLINT kullanılır'],
  ['Sabit seçenek listesi', sqlc("ENUM('a','b')"), sqlc('ENUM') + ' (önce CREATE TYPE ile tanımlanır)'],
  ['Çoklu seçim', sqlc("SET('a','b')"), 'Yok, dizi tipi kullanılır: ' + sqlc('TEXT[]')],
])}
<p>Metin uzunluk sınırları: MySQL’de CHAR en fazla 255 karakter, VARCHAR en fazla 65.535 bayttır; PostgreSQL’de VARCHAR(n) için n en fazla 10.485.760’tır, TEXT ise sınırsızdır (en çok 1 GB).</p>`)}

${h2('Kısıtlar')}
${tterm(`Kısıt`, `Constraint`, `<p>Kısıtlar, sütunlara girilebilecek verileri sınırlayan kurallardır ve veri bütünlüğünün korunmasına yardım eder.</p>`, {
  star: true,
  exam: `Kısıtlar (constraints) veri bütünlüğünün korunmasına yardımcı olur.`,
})}
<p>Bütün kısıt örnekleri aynı Persons tablosu üzerinde. Tablonun kendisi:</p>
${sql(`CREATE TABLE Persons (
  P_Id      int NOT NULL,
  LastName  varchar(255) NOT NULL,
  FirstName varchar(255),
  Address   varchar(255),
  City      varchar(255)
);`)}
<p>Aşağıda her kısıt için sadece bu tabloya eklenen satır gösteriliyor.</p>

${tterm(`NOT NULL`, ``, `<p>NOT NULL, tanımlandığı sütunun boş bırakılamayacağını belirtir; o sütuna her kayıtta mutlaka bir değer girilir.</p>`, {
  star: true,
  exam: `NOT NULL: Tanımlandığı alanın boş (NULL) olamayacağını belirtir.`,
  more: sql(`LastName varchar(255) NOT NULL`),
})}
${tterm(`DEFAULT`, ``, `<p>DEFAULT, sütuna değer girilmezse o sütuna otomatik olarak yazılacak değeri belirler.</p>`, {
  star: true,
  exam: `DEFAULT: Tanımlandığı alana bir değer girilmemesi durumunda alana varsayılan bir değerin atanmasını sağlar.`,
  more: sql(`City varchar(255) DEFAULT 'Sandnes'`, 'Şehir girilmeyen her kayıtta City sütununa Sandnes yazılır.'),
})}
${tterm(`PRIMARY KEY`, `Birincil anahtar`, `<p>PRIMARY KEY, sütundaki değerin her kayıtta farklı olmasını sağlar; bu sütun kendiliğinden UNIQUE ve NOT NULL olur ve bir tabloda yalnızca bir birincil anahtar bulunabilir.</p>`, {
  star: true,
  exam: `PRIMARY KEY: Tanımlandığı alandaki verilerin her kayıtta farklı olmasını sağlar. Alan otomatik olarak UNIQUE ve NOT NULL olur; bir tabloda yalnızca bir birincil anahtar bulunabilir.`,
  more: sql(`CONSTRAINT PK_PersonID PRIMARY KEY (P_Id)`),
})}
${tterm(`UNIQUE`, ``, `<p>UNIQUE, sütundaki (ya da birlikte düşünülen sütun grubundaki) değerlerin tekrar etmemesini sağlar.</p>`, {
  star: true,
  exam: `UNIQUE: Tanımlandığı alandaki (veya alan grubundaki) verilerin tekil, benzersiz olmasını sağlar.`,
  more: sql(`CONSTRAINT uc_PersonID UNIQUE (P_Id, LastName)`, 'Bu örnekte benzersizlik iki sütunun birlikte değerine uygulanıyor: aynı P_Id ve LastName ikilisi iki kez girilemez.'),
})}
${mix('PRIMARY KEY ve UNIQUE', `İkisi de tekrarı engeller. Ama PRIMARY KEY sütunu ayrıca <b>boş olamaz</b> (otomatik NOT NULL) ve bir tabloda <b>yalnızca bir</b> birincil anahtar bulunur.`)}
${tterm(`CHECK`, ``, `<p>CHECK, bir sütuna girilebilecek değerlerin aralığını sınırlar; mesela miktarın sıfırdan küçük olmaması gibi.</p>`, {
  star: true,
  exam: `CHECK: Tablodaki bir sütun için girilebilecek değer aralığını sınırlamada kullanılır.`,
  more: sql(`CONSTRAINT CH_PID CHECK (P_Id > 0)`, 'P_Id sütununa sadece sıfırdan büyük değerler girilebilir.'),
})}
${tterm(`FOREIGN KEY`, `Yabancı anahtar`, `<p>FOREIGN KEY, tablolar arasındaki ilişkiyi kurar; bir tablodaki sütunun başka bir tablonun birincil anahtarını göstermesini sağlar.</p>`, {
  star: true,
  exam: `FOREIGN KEY: Tablolar arasındaki ilişkileri tanımlar; bir tablodaki alanın, başka bir tablonun birincil anahtarına başvurmasını sağlar.`,
})}
${sql(`CREATE TABLE Orders (
  O_Id    int NOT NULL,
  OrderNo int NOT NULL,
  P_Id    int,
  CONSTRAINT FK_PID FOREIGN KEY (P_Id)
    REFERENCES Persons (P_Id)
);`, 'Orders tablosundaki P_Id, Persons tablosundaki P_Id’ye bağlanıyor: her sipariş bir kişiye ait.')}

${h2('ALTER TABLE: var olan tabloyu değiştirmek')}
${tterm(`ALTER TABLE`, ``, `<p>ALTER TABLE, var olan bir tabloya sütun ya da kısıt eklemek, silmek veya değiştirmek için kullanılır.</p>`, {
  star: true,
  exam: `Var olan bir tablodaki sütunlara ve kısıtlara ekleme, silme, değiştirme işlemleri yapmak için kullanılır.`,
})}
${table(['İşlem', 'Komut'], [
  ['Sütun eklemek', sqlc('ALTER TABLE tablo_adi ADD sutun_adi veri_tipi;')],
  ['Sütun silmek', sqlc('ALTER TABLE tablo_adi DROP COLUMN sutun_adi;')],
  ['Sütunun veri tipini değiştirmek', sqlc('ALTER TABLE tablo_adi ALTER COLUMN sutun_adi TYPE yeni_veri_tipi;')],
])}
<p>Örnek: Persons tablosuna DateOfBirth (doğum tarihi) sütunu ekleniyor.</p>
${sql(`ALTER TABLE Persons ADD DateOfBirth date;`)}
${figure(dbTable('Persons (komuttan sonra)', [...PERSONS_COLS, 'DateOfBirth'], PERSONS.map(r => [...r, '']), [], {
  add: 5,
  note: 'Komut çalışınca tablonun en sağına <b>DateOfBirth</b> sütunu eklendi. Var olan üç kişinin doğum tarihini henüz girmediğimiz için bu sütun hepsinde boş, yani <b>NULL</b>. Diğer sütunlardaki veriler hiç değişmedi.',
}))}
<p>Aynı sütunu silmek için:</p>
${sql(`ALTER TABLE Persons DROP COLUMN DateOfBirth;`)}
${figure(dbTable('Persons (komuttan önce)', [...PERSONS_COLS, 'DateOfBirth'], PERSONS.map(r => [...r, ''])
  .map(r => r.map((v, j) => (j === 5 ? '<span class="null">NULL</span>' : v))), [], {
  drop: 5,
  note: 'Komut çalışınca kırmızıyla gösterilen <b>DateOfBirth</b> sütunu, içindeki bütün değerlerle birlikte tablodan tamamen silinir; tablo yine beş sütuna döner.',
}))}
<p>Veri tipini değiştirmenin yazımı MySQL ile PostgreSQL’de farklıdır: MySQL’de <b>MODIFY COLUMN</b>, PostgreSQL’de <b>ALTER COLUMN … TYPE</b> kullanılır. DateOfBirth sütununu yıla çevirmek için:</p>
${sql(`-- MySQL
ALTER TABLE Persons MODIFY COLUMN DateOfBirth year;

-- PostgreSQL (YEAR tipi olmadığı için tamsayıya çevrilir)
ALTER TABLE Persons
  ALTER COLUMN DateOfBirth TYPE integer
  USING EXTRACT(YEAR FROM DateOfBirth)::integer;`)}

${h2('ALTER TABLE ile kısıt eklemek ve kaldırmak')}
<p>Yukarıdaki kısıtların hepsi, tablo kurulduktan sonra da eklenebilir ya da kaldırılabilir:</p>
${table(['Kısıt', 'Eklemek', 'Kaldırmak'], [
  ['NOT NULL', sqlc('ALTER TABLE Persons ALTER COLUMN LastName SET NOT NULL;'), sqlc('ALTER TABLE Persons ALTER COLUMN LastName DROP NOT NULL;')],
  ['DEFAULT', sqlc("ALTER TABLE Persons ALTER COLUMN City SET DEFAULT 'Sandnes';"), sqlc('ALTER TABLE Persons ALTER COLUMN City DROP DEFAULT;')],
  ['PRIMARY KEY', sqlc('ALTER TABLE Persons ADD CONSTRAINT PK_PersonID PRIMARY KEY (P_Id);'), sqlc('ALTER TABLE Persons DROP CONSTRAINT PK_PersonID;')],
  ['UNIQUE', sqlc('ALTER TABLE Persons ADD CONSTRAINT uc_PersonID UNIQUE (P_Id, LastName);'), sqlc('ALTER TABLE Persons DROP CONSTRAINT uc_PersonID;')],
  ['CHECK', sqlc('ALTER TABLE Persons ADD CONSTRAINT CH_PID CHECK (P_Id > 0);'), sqlc('ALTER TABLE Persons DROP CONSTRAINT CH_PID;')],
  ['FOREIGN KEY', sqlc('ALTER TABLE Orders ADD CONSTRAINT FK_PID FOREIGN KEY (P_Id) REFERENCES Persons (P_Id);'), sqlc('ALTER TABLE Orders DROP CONSTRAINT FK_PID;')],
])}
${tip(`NOT NULL ve DEFAULT, sütunun kendisine <b>SET</b> / <b>DROP</b> ile eklenip kaldırılır. PRIMARY KEY, UNIQUE, CHECK ve FOREIGN KEY ise <b>adlarıyla</b> kaldırılır: ${sqlc('DROP CONSTRAINT kısıt_adı')}. Bu yüzden kısıtlara CONSTRAINT ile ad vermek işini kolaylaştırır.`, 'Kalıbı hatırla')}
`,
    },
  ],
});
