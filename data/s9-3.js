// 9-3: Relationship Mapping
ERDS.m93_emp = {
  w: 540, h: 160, label: 'DEPARTMENT ve EMPLOYEE, 1:M ve recursive ilişki',
  ents: [
    { id: 'dp', name: 'DEPARTMENT', x: 20, y: 20, w: 140, attrs: ['# Id', '* Name'] },
    { id: 'em', name: 'EMPLOYEE', x: 300, y: 20, w: 150, attrs: ['# Id', '* First name', '* Last name', '* Address'] },
  ],
  rels: [
    { a: { e: 'em', side: 'l', off: -15, must: true, many: true, label: 'belong to' }, b: { e: 'dp', side: 'r', must: false, label: 'composed of', ly: 66 } },
    { a: { e: 'em', side: 'r', off: -15, must: false, many: true, label: 'managed by' }, b: { e: 'em', side: 'b', off: 40, must: false, label: 'the manager of' }, via: [[495, 50], [495, 140], [415, 140]] },
  ],
};
ERDS.m93_band = {
  w: 490, h: 110, label: 'MUSICIAN ve BAND, one tarafında zorunlu ilişki',
  ents: [
    { id: 'mu', name: 'MUSICIAN', x: 20, y: 20, w: 150, attrs: ['# Id', '* Name', 'o Instrument'] },
    { id: 'bd', name: 'BAND', x: 330, y: 20, w: 140, attrs: ['# Id', '* Name'] },
  ],
  rels: [
    { a: { e: 'mu', side: 'r', must: false, many: true, label: 'a member of', lx: 200 }, b: { e: 'bd', side: 'l', off: 7.5, must: true, label: 'composed of', ly: 76 } },
  ],
};
ERDS.m93_pay = {
  w: 480, h: 100, label: 'PAY CHECK ve EMPLOYEE, nontransferable ilişki',
  ents: [
    { id: 'pc', name: 'PAY CHECK', x: 20, y: 20, w: 150, attrs: ['# Id', '* Pay period'] },
    { id: 'em', name: 'EMPLOYEE', x: 330, y: 20, w: 130, attrs: ['# Id', '* Name'] },
  ],
  rels: [
    { a: { e: 'pc', side: 'r', must: true, many: true, diamond: true, label: 'issued to', lx: 214 }, b: { e: 'em', side: 'l', must: false, label: 'the recipient of', ly: 66 } },
  ],
};
ERDS.m93_acc = {
  w: 490, h: 110, label: 'ACCOUNT ve BANK, barred ilişki',
  ents: [
    { id: 'ac', name: 'ACCOUNT', x: 20, y: 20, w: 150, attrs: ['# Number', '* Balance', '* Date opened'] },
    { id: 'bk', name: 'BANK', x: 330, y: 20, w: 140, attrs: ['# Number', '* Name'] },
  ],
  rels: [
    { a: { e: 'ac', side: 'r', must: true, many: true, bar: true, label: 'located in', lx: 200 }, b: { e: 'bk', side: 'l', off: 7.5, must: false, label: 'the location of', ly: 76 } },
  ],
};
ERDS.m93_room = {
  w: 470, h: 230, label: 'ROOM, SUITE, FLOOR ve BUILDING, cascade barred ilişkiler',
  ents: [
    { id: 'ro', name: 'ROOM', x: 20, y: 20, w: 120, attrs: ['# Number'] },
    { id: 'su', name: 'SUITE', x: 300, y: 20, w: 130, attrs: ['# Number', 'o Tenant'] },
    { id: 'fl', name: 'FLOOR', x: 300, y: 155, w: 130, attrs: ['# Number'] },
    { id: 'bu', name: 'BUILDING', x: 20, y: 155, w: 120, attrs: ['# Id', '* Address'] },
  ],
  rels: [
    { a: { e: 'ro', side: 'r', off: 7.5, must: true, many: true, bar: true }, b: { e: 'su', side: 'l', must: false } },
    { a: { e: 'su', side: 'b', must: true, many: true, bar: true }, b: { e: 'fl', side: 't', must: false } },
    { a: { e: 'fl', side: 'l', off: 7.5, must: true, many: true, bar: true }, b: { e: 'bu', side: 'r', must: false } },
  ],
};
ERDS.m93_rev = {
  w: 460, h: 200, label: 'CRITIC, MOVIE ve intersection entity REVIEW',
  ents: [
    { id: 'rv', name: 'REVIEW', x: 170, y: 20, w: 120, attrs: ['* Rating'] },
    { id: 'cr', name: 'CRITIC', x: 20, y: 125, w: 120, attrs: ['# Id', '* Name'] },
    { id: 'mv', name: 'MOVIE', x: 320, y: 125, w: 120, attrs: ['# Id', '* Title'] },
  ],
  rels: [
    { a: { e: 'rv', side: 'l', must: true, many: true, bar: true }, b: { e: 'cr', side: 't', must: false }, via: [[80, 42.5]] },
    { a: { e: 'rv', side: 'r', must: true, many: true, bar: true }, b: { e: 'mv', side: 't', must: false }, via: [[380, 42.5]] },
  ],
};
ERDS.m93_cub = {
  w: 480, h: 110, label: 'EMPLOYEE ve CUBICLE, 1:1',
  ents: [
    { id: 'em', name: 'EMPLOYEE', x: 20, y: 20, w: 150, attrs: ['# Id', '* First name', '* Last name'] },
    { id: 'cu', name: 'CUBICLE', x: 330, y: 20, w: 130, attrs: ['# Code', '* Description'] },
  ],
  rels: [
    { a: { e: 'em', side: 'r', off: -7.5, must: true, label: 'allocated' }, b: { e: 'cu', side: 'l', must: false, label: 'allocated to', ly: 66 } },
  ],
};
ERDS.m93_arc = {
  w: 500, h: 210, label: 'MEMBERSHIP, COMPANY ve CUSTOMER, arc',
  ents: [
    { id: 'mb', name: 'MEMBERSHIP', x: 20, y: 20, w: 160, h: 150, attrs: ['# Id', '* Start date', '* Expiration date', 'o Termination'] },
    { id: 'co', name: 'COMPANY', x: 330, y: 20, w: 150, attrs: ['# Id', '* Name', '* Contact name'] },
    { id: 'cu', name: 'CUSTOMER', x: 330, y: 110, w: 150, attrs: ['# Id', '* First name', '* Last name'] },
  ],
  rels: [
    { a: { e: 'mb', side: 'r', off: -37.5, must: true, many: true, label: 'held by', lx: 228 }, b: { e: 'co', side: 'l', must: false, label: 'the holder of', ly: 74 } },
    { a: { e: 'mb', side: 'r', off: 52.5, must: true, many: true, label: 'held by', lx: 228 }, b: { e: 'cu', side: 'l', must: false, label: 'the holder of', ly: 164 } },
  ],
  extra: '<path class="erd-line" d="M 205 35 Q 245 102.5 205 170"/><circle class="erd-diamond" cx="216.1" cy="57.5" r="3.5"/><circle class="erd-diamond" cx="216.1" cy="147.5" r="3.5"/>',
};

SECTIONS.find(s => s.no === 9).lessons.push({
  id: '9-3',
  title: 'İlişkilerin tablolara dönüştürülmesi',
  en: 'Relationship Mapping',
  html: `
<p class="lead">Bu derste ERD’deki ilişkilerin tablolarda foreign key kolonlarına nasıl dönüştüğünü öğreneceksin.</p>
${more(`<p>İlişkileri tablolara aktarmazsan elinde birbirine hiç bağlanmayan bir sürü tek başına tablo kalır. İlişkiler, bir tablonun diğerine başvurabilmesi için primary key ile foreign key arasında kurulur (9-1). Entity’lerin tabloya, attribute’ların kolona nasıl çevrildiğini ise 9-2’de görmüştün.</p>`)}

${h2('Temel kural')}
${term(`Rule for relationships`, `İlişki kuralı`, `<p>Bir ilişki, <b>many</b> (çok) tarafındaki tabloda bir ya da daha fazla foreign key kolonu oluşturur.</p>`, {
  exam: `A relationship creates one or more foreign-key columns in the table on the many side`,
  more: `<p>İlişkinin adı (mesela “belong to”) tabloya taşınmaz; ilişki tabloda sadece FK kolonu olarak yaşar.</p>`,
})}
<p>FK kolonunun adı, başvurduğu tablonun kısa adından (short name) gelir; dpt_id ve mgr_id gibi.</p>
${erd('m93_emp', '', `Crow’s foot EMPLOYEE tarafında, bu yüzden FK’ler EMPLOYEES’e gider.`)}
${figure(schema(['EMPLOYEES(#id, first_name, last_name, address, >dpt_id, >mgr_id)']), '', `Altı çizili kolon primary key, kırmızılar FK. FK, işin ihtiyacına göre zorunlu ya da isteğe bağlı olur: dpt_id zorunludur, ama her çalışanın yöneticisi olmayabileceği için mgr_id isteğe bağlıdır.`)}

${h2('Zorunluluk ve değişmezlik')}
<p>One tarafında zorunlu bir ilişki, one tarafı isteğe bağlı olanla aynı şekilde dönüştürülür, çünkü FK constraint zorunluluğu sadece <b>many</b> ucunda sağlayabilir; “her BAND en az bir MUSICIAN’dan oluşur” gibi kurallar için ek programlama (additional programming) gerekir.</p>
${erd('m93_band', '', `BAND tarafındaki çizgi düz, yani her BAND en az bir MUSICIAN’dan oluşmak zorunda.`)}
${figure(schema(['MUSICIANS(#id, name, instrument, >bad_id)', 'BANDS(#id, name)']), '', `FK (bad_id) yine many tarafına, MUSICIANS’a gider. Ama tablolarda hiçbir şey bir BAND’in en az bir müzisyeni olmasını zorlamaz; bu kural ek programlamayla sağlanmalıdır.`)}
${term(`Nontransferable relationship`, `Aktarılamaz ilişki`, `<p>Nontransferable ilişkide FK kolonu sonradan güncellenemez; FK constraint bunu sağlayamadığı için ek programlama gerekir.</p>`, {
  star: true,
  exam: `The foreign-key column in the database table cannot be updated <i>(update = güncellemek)</i>`,
})}
${erd('m93_pay', '', `Elmas, maaş çekinin başka çalışana aktarılamayacağını, yani PAYCHECKS’teki <b>epe_id</b>’nin değiştirilemeyeceğini gösterir.`)}

${h2('Barred ilişkiler')}
${term(`Barred relationship`, `Çubuklu ilişki`, `<p>Barred ilişki de many tarafta bir FK’ye dönüşür, ama bu FK aynı zamanda primary key’in parçası olur (6-1).</p>`, {
  exam: `The foreign-key column plays a double role <i>(çift görev)</i>`,
})}
${erd('m93_acc', '', `Çubuk, BANK’ın ACCOUNT’un UID’sine katıldığını gösterir.`)}
${figure(schema(['ACCOUNTS(#act_nbr, balance, date_opened, #>bak_nbr)']), '', `bak_nbr hem FK hem de primary key’in parçası. act_nbr tek başına benzersiz değildir, ama bak_nbr ile birlikte benzersizdir.`)}

${term(`Cascade barred relationship`, `Zincirleme barred ilişki`, `<p>Cascade barred relationship’te her entity’nin UID’si zincirde bir alt seviyeye taşınır.</p>`, {
  star: true,
  exam: `The unique identifier of each entity in the chain is carried down to the entity on the next level <i>(carry down = aşağı taşımak)</i>`,
})}
${erd('m93_room', '', `BUILDING’in Id’si zincir boyunca ROOM’a kadar taşınır.`)}
${figure(schema([
  'ROOMS(#rom_nbr, #>sue_nbr, #>sue_flr_nbr, #>sue_bdg_id)',
  'SUITES(#sue_nbr, #>flr_nbr, #>flr_bdg_id, tenant)',
  'FLOORS(#flr_nbr, #>bdg_id)',
  'BUILDINGS(#id, address)',
]), '', `ROOMS’un primary key’i dört kolondan oluşur. FK adında en fazla iki tablo öneki olur: sue_flr_bdg_id değil, <b>sue_bdg_id</b>.`)}
${more(`<p>FK kolonu, geldiği tabloların kısa adlarını önek (prefix) olarak alır; zincir uzadıkça ad da uzar, kural bu yüzden var. Ayrıca her tablonun tek bir primary key’i ve tek bir FK’si vardır, ama ikisi de birden çok kolondan oluşabilir.</p>
${dbTable('ROOMS', ['rom_nbr', 'sue_nbr', 'sue_flr_nbr', 'sue_bdg_id'], [['1', '15', '2', '100'], ['2', '15', '2', '100'], ['1', '7B', '2', '201']], [0, 2], { note: 'rom_nbr 1 iki kez geçiyor; ama dört değer birlikte her satırda farklı.' })}`)}

${h2('M:M ilişkiler')}
${term(`Intersection entity`, `Kesişim entity’si`, `<p>Intersection entity, M:M ilişkinin çözümüdür (5-3) ve iki ana tabloya FK’lerle bağlanan bir intersection table’a dönüşür.</p>`, {
  star: true,
  exam: `The product of the resolution of a many to many relationship <i>(resolution = çözüm)</i>`,
})}
${erd('m93_rev', '', `REVIEW, CRITIC ile MOVIE’nin eşleşmelerini tutar.`)}
${figure(schema(['REVIEWS(#>ctc_id, #>mve_id, rating)']), '', `İki FK birlikte primary key olur.`)}

${h2('1:1 ilişkiler')}
<p>1:1 ilişkiden bir <b>foreign key</b> ve bir <b>unique key</b> oluşur; ilişki bir tarafta zorunluysa FK o tarafın tablosuna konur.</p>
${more(`<p>FK’nin bütün kolonları unique key’in de parçasıdır. Unique olması gerekir, çünkü ilişki 1:1’dir: aynı cbe_code iki kez geçerse bir bölme iki çalışana verilmiş olur.</p>`)}
${erd('m93_cub', '', `EMPLOYEE tarafı zorunlu, bu yüzden FK EMPLOYEES’e gider.`)}
${figure(schema(['EMPLOYEES(#id, first_name, last_name, >cbe_code)']), '', `cbe_code hem FK hem unique key (<b>fk, uk</b>).`)}
<p>İki taraf da isteğe bağlıysa FK’yi sen seçersin: yer kazanmak için daha az satırı olan tabloya ya da iş için daha anlamlı olan tabloya koyarsın. Mesela CAR ve SPACE için:</p>
${table(['Business', 'FK’nin yeri'], [['Car-Rental', 'CARS tablosunda spe_id'], ['Parking-Lot', 'SPACES tablosunda car_lic_plate']])}
<p>İki uçta da zorunlu bir 1:1 ilişki için de ek kod gerekir.</p>
${more(`<p>Bu, one ucunda zorunlu 1:M ilişkideki sınırlamanın aynısıdır. Zorunlu 1:1 ilişkiler zaten nadirdir ve çoğu zaman tek bir tablo olarak modellenir.</p>`)}

${h2('Arc ilişkiler')}
${term(`Arc mapping`, `Arc dönüşümü`, `<p>Arc’ı olan entity’nin tablosu arc’taki her ilişki için bir FK içerir; biri hep boş kalacağı için bu FK’ler isteğe bağlıdır.</p>`, {
  exam: `The resulting foreign keys have to be optional <i>(optional = isteğe bağlı)</i>`,
})}
${erd('m93_arc', '', `Yay, üyeliğin ya COMPANY’ye ya CUSTOMER’a ait olduğunu gösterir.`)}
${figure(dbTable('MEMBERSHIPS (MBP)', ['Key type', 'Optionality', 'Column name'], [['pk', '*', 'id'], ['', '*', 'start_date'], ['', '*', 'expiration_date'], ['', 'o', 'termination'], ['fk1', 'o', 'cpe_id'], ['fk2', 'o', 'cms_id']], [4, 5]), '', `ERD’de “held by” zorunlu (düz çizgi) olsa da iki FK de isteğe bağlıdır (<b>o</b>).`)}
<p>Her satırda sadece bir FK’nin dolu olmasını veritabanında saklanan bir <b>check constraint</b> sağlar:</p>
${sql(`CHECK ((cpe_id IS NOT NULL AND cms_id IS NULL)
    OR (cpe_id IS NULL AND cms_id IS NOT NULL))`)}
<p>İlişkiler tamamen isteğe bağlı olsaydı <code>OR (cpe_id IS NULL AND cms_id IS NULL)</code> eklerdin.</p>
${more(`<p>Check constraint, tek bir satırdaki basit kuralları (değer karşılaştırmak, NULL olup olmadığına bakmak gibi) sağlar; arc da buna uyar. Ama one ucunda zorunlu ilişki gibi iki tabloyu kapsayan kurallar check constraint ile yapılamaz, onlar için ek programlama gerekir.</p>`)}
`,
});
