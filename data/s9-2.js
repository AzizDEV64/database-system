// 9-2: Basic Mapping: The Transformation Process
ERDS.m92_dept = {
  w: 420, h: 140, label: 'DEPARTMENT ve EMPLOYEE, kavramsal model',
  ents: [
    { id: 'dp', name: 'DEPARTMENT', x: 20, y: 20, w: 160, attrs: ['# Department id', '* Department name'] },
    { id: 'em', name: 'EMPLOYEE', x: 255, y: 20, w: 145, attrs: ['# Employee id', '* First name', '* Last name', '* Payroll id', 'o Nickname'] },
  ],
  rels: [
    { a: { e: 'dp', side: 'r', off: -15, must: false }, b: { e: 'em', side: 'l', off: -27, must: true, many: true } },
  ],
};

SECTIONS.find(s => s.no === 9).lessons.push({
  id: '9-2',
  title: 'Temel dönüşüm süreci',
  en: 'Basic Mapping: The Transformation Process',
  html: `
<p class="lead">Bu derste ERD’deki bir entity’yi veritabanı tablosuna dönüştürmeyi ve tablolara ad vermeyi öğreneceksin.</p>
${more(`<p>Bir ev tasarladığında, sonunda o evin yapıldığını görmek istersin. İnşaatı kendin yapmasan bile, tasarımını gerçeğe dönüştürmelerine yardım edebilmek için ustaların kullandığı terimleri anlaman gerekir. Veritabanında da durum aynı.</p>
<p>Kavramsal modeli kurarken iş kurallarına odaklanırsın; veritabanı tasarımında ise odak, depolama, işlem hızı ve güvenlik gibi konulara kayar. Bunlar önemlidir ama iş gereksinimlerinin önüne geçmemelidir, çünkü dünyanın en hızlı veritabanı bile işin ihtiyacını karşılamıyorsa pek işe yaramaz. İlk veritabanı tasarımı da tasarımcılar, veritabanı yöneticileri ve uygulama geliştiriciler arasında konuşmak için bir başlangıç olur.</p>`)}

${h2('Tablolara kısa bir bakış')}
<p>Tablo, verinin düzenlenip saklandığı basit bir yapıdır; kolonlardan (column) ve satırlardan (row) oluşur ve her satır bir çalışanı anlatır.</p>
${figure(dbTable('EMPLOYEES', ['EMPLOYEE_ID:PK', 'LAST_NAME', 'FIRST_NAME', 'DEPARTMENT_ID:FK', 'PAYROLL_ID:UK', 'NICKNAME'], [
  ['100', 'SMITH', 'DANA', '10', '21215', 'Dana'],
  ['101', 'ADAMS', 'TYLER', '15', '59877', 'Ty'],
  ['102', 'CHEN', 'LAWRENCE', '10', '1101', 'Larry'],
  ['200', 'GOMEZ', 'CARLOS', '10', '52', 'Chaz'],
  ['205', 'LOUNGANI', 'NEIL', '22', '90386', 'Neil'],
]), '', `EMPLOYEE_ID primary key’dir ve her satırı diğerlerinden ayırır. PAYROLL_ID unique key’dir, yani sistem aynı payroll_id’li iki satıra izin vermez. DEPARTMENT_ID ise DEPARTMENTS tablosuna işaret eden foreign key’dir.`)}
${figure(dbTable('DEPARTMENTS', ['DEPARTMENT_ID:PK', 'DEPARTMENT_NAME', 'MANAGER_ID:FK', 'LOCATION_ID:FK'], [
  ['10', 'Administration', '200', '1700'],
  ['20', 'Marketing', '201', '1800'],
  ['50', 'Shipping', '124', '1500'],
  ['60', 'IT', '103', '1400'],
  ['80', 'Sales', '149', '2500'],
], [0]), '', `Dana Smith’in DEPARTMENT_ID’si 10. Departmanı hakkında daha fazla bilgi istersen DEPARTMENTS’ta department_id’si 10 olan satıra bakarsın. Bu tablodaki MANAGER_ID ve LOCATION_ID de birer foreign key’dir.`)}

${h2('Kavramsal modelden fiziksel modele')}
${term(`Transform`, `Dönüştürmek`, `<p>Transform, kavramsal modeli (ER diagram) fiziksel modele, yani ilişkisel bir veritabanına çevirmek demektir; entity, attribute ve ilişkiler tablo, kolon ve foreign key olur.</p>`, {
  star: true,
  exam: `To change the elements of an ERD (entities, attributes, relationships) into database elements`,
})}
${term(`Map`, `Eşlemek`, `<p>Map, ERD’nin her öğesini ona karşılık gelen veritabanı öğesiyle eşleştirmek demektir.</p>`, {
  star: true,
  exam: `To associate the elements of an ERD (entities, attributes, relationships) with database elements <i>(associate = ilişkilendirmek)</i>`,
})}
<p>Analizden (kavramsal model) uygulamaya (fiziksel model) geçerken kullandığın terimler de değişir:</p>
${table(['Analysis (ER Diagram)', 'Implementation (Physical Design)'], [
  ['Entity', 'Table'],
  ['Instance', 'Row'],
  ['Attribute', 'Column'],
  ['Primary UID', 'Primary Key'],
  ['Secondary UID', 'Unique Key'],
  ['Relationship', 'Foreign-key column ve foreign key constraint'],
])}
${more(`<p>Sistem geliştirmede analiz, tasarımdan önce gelir. Veri modellemeyi analiz aşamasında yaparsın; iş gereksinimlerini modele tam olarak yansıttığından emin olunca tasarım aşamasına geçer ve ERD’yi fiziksel bir uygulamaya eşlersin.</p>
<p>Bu dersteki basit örneklerde eşleme bire birdir, yani bir entity tek bir tablo olur. Ama foreign key’ler (9-3), arc’lar ve subtype’lar (9-4) işin içine girince her zaman böyle olmaz.</p>`)}

${h2('Tablo diyagramı')}
<p>Tablo diyagramının ilk satırında tablonun adı ve short name’i yazar, altında da üç kolon vardır:</p>
<ul>
  <li><b>Key type</b>: primary key için <b>pk</b>, unique key için <b>uk</b>, foreign-key kolonu için <b>fk</b>; kolon bir anahtar değilse boş kalır.</li>
  <li><b>Optionality</b>: entity diyagramındaki gibi, zorunluysa <b>*</b>, isteğe bağlıysa <b>o</b>.</li>
  <li><b>Column name</b>: kolonun adı.</li>
</ul>
${erd('m92_dept', '', `Bu iki entity, aşağıdaki iki tablo diyagramına dönüşüyor.`)}
${figure(dbTable('DEPARTMENTS (DPT)', ['Key type', 'Optionality', 'Column name'], [
  ['pk', '*', 'department_id'],
  ['', '*', 'department_name'],
]) + dbTable('EMPLOYEES (EPE)', ['Key type', 'Optionality', 'Column name'], [
  ['pk', '*', 'employee_id'],
  ['', '*', 'payroll_id'],
  ['', '*', 'last_name'],
  ['', '*', 'first_name'],
  ['', 'o', 'nickname'],
  ['fk', '*', 'department_id'],
], [5]), '', `<b>#</b> işaretli attribute pk oldu, <b>*</b> ve <b>o</b> işaretleri aynen kaldı. Vurgulu <b>department_id</b> ise ilişkiden gelen foreign-key kolonudur.`)}

${h2('Tablo ve kolon adları')}
<p>Tablonun adı, entity adının çoğuludur; mesela STUDENT, STUDENTS olur.</p>
<p>Kolon adları attribute adlarıyla aynıdır, sadece özel karakterler ve boşluklar alt çizgiyle (_) değiştirilir. Kolon adlarında kısaltma da daha sık kullanılır; mesela first name, first_name ya da fname olabilir. STUDENT entity’si STUDENTS tablosuna dönüşürken de Street address str_addr, Postal code p_code, Date of birth ise dob olur.</p>

${h2('Short name')}
${term(`Short name`, `Kısa ad`, `<p>Her tablo için benzersiz bir short name vermek, foreign-key kolonlarına ad verirken işe yarar.</p>`, {
  exam: `A unique short name for every table is useful in the naming of foreign-key columns`,
  more: `<p>Short name zorunlu değildir, sadece kullanışlıdır. Aşağıdaki kurallar da olası yöntemlerden yalnızca biridir. Bu kurallar benzersizliği garanti etmez ama aynı adın çıkması nadirdir; çıkarsa daha az kullanılan tablonun adına bir sayı eklersin, mesela CTR ve CTR1.</p>`,
})}
${table(['Entity adı', 'Hangi harfler alınır', 'Örnek'], [
  ['Birden çok kelime', 'İlk kelimenin ilk harfi, ikinci kelimenin ilk harfi, son kelimenin son harfi', 'JOB ASSIGNMENT → JAT, PRIVATE HOME → PHE'],
  ['Tek kelime, birden çok hece', 'İlk hecenin ilk harfi, ikinci hecenin ilk harfi, son hecenin son harfi', 'EMPLOYEE → EPE, CLIENT → CET'],
  ['Tek hece, birden çok harf', 'İlk harf, ikinci harf, son harf', 'FLIGHT → FLT, THEME → THE'],
])}

${h2('Oracle’da adlandırma kısıtları')}
<p>Oracle’da tablo ve kolon adları:</p>
<ul>
  <li>bir harfle başlamalıdır,</li>
  <li>en fazla 30 alfanümerik karakter içerebilir,</li>
  <li>boşluk ya da “!” gibi özel karakterler içeremez ama “$”, “#” ve “_” içerebilir; yani SALES_ORDERS geçerlidir, SALES-ORDERS değildir,</li>
  <li>tablo adıysa bir kullanıcı hesabının içinde, kolon adıysa bir tablonun içinde benzersiz olmalıdır.</li>
</ul>
${term(`Reserved word`, `Ayrılmış kelime`, `<p>Reserved word, Oracle veritabanında ve SQL dilinde özel bir anlamı olan kelimedir; bu yüzden tablo ve kolon adı olarak kullanmamak en iyisidir.</p>`, {
  star: true,
  exam: `Some words have a special meaning in the Oracle database and in the SQL programming language`,
})}
<p>Sık görülen reserved word’ler şunlardır: TABLE, NUMBER, SEQUENCE, ORDER, VALUES, LEVEL ve TYPE.</p>
`,
});
