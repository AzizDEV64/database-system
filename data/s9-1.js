// 9-1: Introduction to Relational Database Concepts
SECTIONS.find(s => s.no === 9).lessons.push({
  id: '9-1',
  title: 'İlişkisel veritabanına giriş',
  en: 'Introduction to Relational Database Concepts',
  html: `
<p class="lead">Bu derste ilişkisel tabloların temel kavramlarını öğreneceksin.</p>
${more(`<p>Bu bölümde ERD’yi tablolara dönüştüreceksin, yani bundan sonra entity’ye table (tablo), attribute’a da column (kolon) diyeceğiz. Bunu, kâğıttaki çizimini kumaşa döken bir terziye benzetebilirsin: terzi dikmeyi bildiği gibi, sen de ilişkisel veritabanı nesnelerinin yapısını bilmelisin. “Relational” kelimesi matematikteki “relation” (bağıntı) kavramından gelir, çünkü matematikteki bir relation veritabanındaki tabloyla aynı özelliklere sahiptir.</p>`)}

${h2('Tablo, satır ve kolon')}
${term(`Relational database`, `İlişkisel veritabanı`, `<p>İlişkisel veritabanı, kullanıcıya satır ve kolonlardan oluşan iki boyutlu tabloların bir koleksiyonu gibi görünen veritabanıdır.</p>`, {
  star: true,
  exam: `A collection of two-dimensional tables, each containing rows and columns`,
  more: `<p>Daha geniş tanımıyla ilişkisel veritabanı üç şeyden oluşur: nesnelerin ya da relation’ların (tabloların) bir koleksiyonu, bu relation’lar üzerinde çalışan bir operatör kümesi ve verinin doğru ve tutarlı kalmasını sağlayan veri bütünlüğü.</p>`,
})}
${term(`Row`, `Satır`, `<p>Row, tablodaki tek bir kayıttır ve her kolon için bir değer taşır.</p>`, {
  star: true,
  exam: `An entry in a table, consisting of values for each appropriate column`,
})}
${term(`Column`, `Kolon`, `<p>Column, bir attribute’un ya da bir ilişkinin tablodaki karşılığıdır.</p>`, {
  star: true,
  exam: `An implementation of an attribute or relationship in a table`,
})}
${figure(dbTable('EMPLOYEES', ['EMPLOYEE_ID', 'FIRST_NAME', 'LAST_NAME', 'DEPARTMENT_ID'], [
  ['100', 'Steven', 'King', '90'],
  ['101', 'Neena', 'Kochhar', '90'],
  ['102', 'Lex', 'De Haan', '90'],
  ['200', 'Jennifer', 'Whalen', '10'],
  ['205', 'Shelley', 'Higgins', '110'],
], [1]), '', `Vurgulu satır bir row’dur, yani tek bir çalışan; her başlığın altındaki değerler ise bir column’dur.`)}

${h2('SQL ile veriye erişmek')}
<p>Satırları tek tek gezmek yerine SQL (Structured Query Language) ile ne istediğini yazarsın.</p>
${sql(`SELECT last_name, department_id
FROM employees
WHERE employee_id = 200;`)}
${figure(dbTable('Sonuç', ['LAST_NAME', 'DEPARTMENT_ID'], [['Whalen', '10']]), '', `SELECT iki kolonu, WHERE de 200 numaralı çalışanı seçti.`)}
${sql(`SELECT *
FROM employees
WHERE department_id = 90;`)}
<p><code>*</code> “bütün kolonlar” demektir, yani bu sorgu departmanı 90 olan King, Kochhar ve De Haan’ın bütün kolonlarını getirir.</p>
${more(`<p>Yani SQL ile tablonun tamamını da bir kısmını da alabilirsin. Hangi kolonların geleceğine SELECT’ten sonra yazdıkların, hangi satırların geleceğine ise WHERE’deki koşul karar verir.</p>`)}

${h2('Primary key')}
${term(`Primary key (PK)`, `Birincil anahtar`, `<p>Primary key, her satırı tek başına tanımlayan kolon ya da kolonlar grubudur; her tablonun bir PK’si olmalıdır, PK benzersiz olmalıdır ve hiçbir parçası boş (null) olamaz.</p>`, {
  star: true,
  exam: `A column or set of columns that uniquely identifies each row in a table`,
  more: `<p>EMPLOYEES’te PK tek bir kolondur: EMPLOYEE_ID (single column primary key). PK’si olmayan bir tablo oluşturmak mümkündür ama önerilmez. PK’yi ilk kez 1-3’te görmüştün.</p>`,
})}
${figure(dbTable('ACCOUNTS', ['BANK_NO:PK', 'ACCT_NO:PK', 'BALANCE', 'DATE_OPENED'], [
  ['104', '75760', '120,050.00', '21-OCT-89'],
  ['104', '77956', '100.10', ''],
  ['105', '89570', '55,775.00', '15-JAN-85'],
  ['103', '55890', '15,001.85', '10-MAR-91'],
  ['105', '75760', '5.00', '22-SEP-03'],
], [0, 4]), '', `Bu PK iki kolondan oluşur. Vurgulu satırlarda ACCT_NO aynı, ama BANK_NO ile birlikte hiç tekrar etmiyor.`)}

${h2('Candidate key ve unique key')}
${term(`Candidate key`, `Aday anahtar`, `<p>Candidate key, PK olabilecek (benzersiz ve boş olmayan) kolon ya da kolonlar grubudur; bir tabloda birden çok olabilir.</p>`, {
  star: true,
  exam: `A column or combination of columns that could serve as the table's primary key`,
})}
${term(`Unique key (UK)`, `Benzersiz anahtar`, `<p>Candidate key’lerden biri PK seçilir, geriye kalanlar ise alternate key ya da unique key olur.</p>`, {
  star: true,
  exam: `An integrity constraint that requires every value in a column or set of columns be unique`,
  more: `<p>Unique key, satırı bulmanın ikinci bir yoludur. Mesela çalışan numaranı unutsan bile maaş bordrondaki PAYROLL_ID ile kaydına ulaşabilirsin.</p>`,
})}
${figure(dbTable('MEMBERS', ['MEMBER_ID:PK', 'LAST_NAME', 'FIRST_NAME', 'PAYROLL_ID:UK'], [
  ['100', 'SMITH', 'DANA', '21215'],
  ['310', 'ADAMS', 'TYLER', '59877'],
  ['210', 'CHEN', 'LAWRENCE', '1101'],
  ['405', 'GOMEZ', 'CARLOS', '52'],
  ['378', 'LOUNGANI', 'NEIL', '90386'],
]), '', `İki candidate key var: MEMBER_ID PK seçildi, PAYROLL_ID ise unique key oldu.`)}

${h2('Foreign key')}
${term(`Foreign key (FK)`, `Yabancı anahtar`, `<p>Foreign key, değerleri başka bir tablonun PK değerleriyle eşleşmek zorunda olan kolon ya da kolonlar grubudur.</p>`, {
  more: `<p>FK bazen aynı tablonun PK’sini de gösterebilir.</p>`,
  star: true,
  exam: `Contains values that match the primary key value in another table`,
})}
${figure(`
  ${dbTable('EMPLOYEES', ['EMPLOYEE_ID:PK', 'LAST_NAME', 'DEPARTMENT_ID:FK'], [
    ['200', 'Whalen', '10'],
  ], [0])}
  ${dbTable('DEPARTMENTS', ['DEPARTMENT_ID:PK', 'DEPARTMENT_NAME'], [
    ['10', 'Administrasi'],
    ['20', 'Pemasaran'],
    ['50', 'Pengiriman'],
  ], [0])}
`, '', `Whalen’in FK’si 10 olduğu için DEPARTMENTS’ta PK’si 10 olan bir satır olmalı; yoksa referential integrity bozulur.`)}
${figure(`
  ${dbTable('SHELVES', ['SHELF_NO:PK'], [['A6'], ['A8'], ['B24'], ['Q35']], [3])}
  ${dbTable('BOOKS', ['BOOK_NO:PK', 'SHELF_NO <span class="key pk">PK</span>:FK', 'BOOK_NAME'], [
    ['106', 'A6', 'LITTLE WOMEN'],
    ['15', 'A8', 'TALE OF TWO CITIES'],
    ['7897', 'B24', 'HARRY POTTER'],
    ['15', 'Q35', 'LEARN TO SPEAK SPANISH'],
  ], [3])}
`, '', `Bir FK aynı zamanda PK’nin parçasıysa boş (null) olamaz. Mesela SHELF_NO, SHELVES’e giden bir FK’dir ama BOOKS’un PK’sinin de parçasıdır.`)}

${h2('Veri bütünlüğü kuralları')}
${term(`Column integrity`, `Kolon bütünlüğü`, `<p>Column integrity, bir kolonun sadece kendi tanımlı veri biçimine uyan değerleri içerebileceğini söyler.</p>`, {
  star: true,
  exam: `A column must contain only values that are consistent with the defined data format of the column`,
})}
<p>Mesela ACCOUNTS tablosunun tanımı, her kolonun veri tipini (data type) ve boş bırakılıp bırakılamayacağını söyler:</p>
${table(['Column Name', 'Data Type', 'Optionality'], [
  ['BANK_NO', 'Number (5)', 'Not Null'],
  ['ACCT_NO', 'Number (8)', 'Not Null'],
  ['BALANCE', 'Number (12,2)', 'Not Null'],
  ['DATE_OPENED', 'Date', 'boş olabilir'],
])}
${more(`<p>Yukarıdaki ACCOUNTS tablosu bu tanıma uyar. Mesela 77956 numaralı hesabın DATE_OPENED’ı boş, ama bu kolon zorunlu (Not Null) olmadığı için bu bir ihlal değildir.</p>`)}
<p>Data-integrity rules (diğer adıyla constraints), veritabanının doğru ve tutarlı hâlini tanımlar.</p>
${more(`<p>Bu kurallar sayesinde kullanıcı sadece veritabanını doğru ve tutarlı hâlde bırakan işlemleri yapabilir.</p>`)}
${table(['Constraint type', 'Ne zaman bozulur?'], [
  ['<b>Entity integrity</b>', 'PK’de tekrar eden ya da boş bir değer varsa (mesela emp_no’su boş bir çalışan).'],
  ['<b>Referential integrity</b>', 'FK var olan bir PK değeriyle eşleşmiyorsa (mesela DEPARTMENTS’ta olmayan bir dept_no); izin varsa FK boş olabilir.'],
  ['<b>Column integrity</b>', 'Kolonda veri biçimine uymayan bir değer varsa (mesela balance’ta sayı olmayan bir değer).'],
  ['<b>User-defined integrity</b>', 'Veri işletmenin kurallarına uymuyorsa. Kural örneği: bakiye 1.00’ın altına düşerse hesap sahibine mektup gönderilmeli.'],
])}
${more(`<p>User-defined integrity kuralını veritabanı kendi başına sağlamaz; mesela bakiye 1.00’ın altına düşünce mektup göndermek için ek programlama gerekir.</p>`)}
`,
});
