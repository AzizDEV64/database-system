// 9-4: Subtype Mapping
ERDS.m94_emp = {
  w: 490, h: 250, label: 'EMPLOYEE supertype’ı ve FULL TIME, PART TIME subtype’ları',
  ents: [
    {
      id: 'emp', name: 'EMPLOYEE', x: 40, y: 50, w: 160,
      attrs: ['# Id', '* First name', '* Last name'],
      subs: [
        { name: 'FULL TIME', attrs: ['* Salary'] },
        { name: 'PART TIME', attrs: ['* Hourly rate'] },
      ],
    },
    { id: 'pt', hidden: true, name: 'PART TIME', x: 48, y: 173, w: 144, h: 45 },
    { id: 'dpt', name: 'DEPARTMENT', x: 340, y: 88, w: 130, attrs: ['# Id'] },
    { id: 'agy', name: 'AGENCY', x: 340, y: 173, w: 130, attrs: ['# Id'] },
  ],
  rels: [
    { a: { e: 'emp', side: 'r', off: -72, must: false, many: true, label: 'managed by', lx: 240, ly: 60 }, b: { e: 'emp', side: 't', off: 30, must: false, label: 'the manager of' }, via: [[232, 68.5], [232, 18], [150, 18]] },
    { a: { e: 'emp', side: 'r', off: -30, must: true, many: true, label: 'assigned to', lx: 220 }, b: { e: 'dpt', side: 'l', must: false, label: 'the home for', ly: 127 } },
    { over: true, cls: 'hl', a: { e: 'pt', side: 'r', must: true, many: true, label: 'employed by', lx: 212 }, b: { e: 'agy', side: 'l', must: false, label: 'the source of', ly: 212 } },
  ],
};
ERDS.m94_clo = {
  w: 530, h: 262, label: 'CLOTHING supertype’ı ve SHIRT, SHOE subtype’ları',
  ents: [
    {
      id: 'ctg', name: 'CLOTHING', x: 20, y: 20, w: 170,
      attrs: ['# Id', '* Material'],
      subs: [
        { name: 'SHIRT', attrs: ['* Sleeve length', '* Neck size', 'o Collar style'] },
        { name: 'SHOE', attrs: ['* Size', '* Buckle style', 'o Heel height'] },
      ],
    },
    { id: 'sht', hidden: true, name: 'SHIRT', x: 28, y: 77, w: 154, h: 75 },
    { id: 'she', hidden: true, name: 'SHOE', x: 28, y: 158, w: 154, h: 75 },
    { id: 'mnr', name: 'MANUFACTURER', x: 360, y: 27.5, w: 150, attrs: ['# Id'] },
    { id: 'tlr', name: 'TAILOR', x: 360, y: 92, w: 150, attrs: ['# Id'] },
    { id: 'clr', name: 'COBBLER', x: 360, y: 173, w: 150, attrs: ['# Id'] },
  ],
  rels: [
    { a: { e: 'ctg', side: 'r', off: -83, must: true, many: true, label: 'produced by', lx: 210 }, b: { e: 'mnr', side: 'l', must: false, label: 'the producer of', ly: 66 } },
    { over: true, a: { e: 'sht', side: 'r', must: false, many: true, label: 'altered by', lx: 210 }, b: { e: 'tlr', side: 'l', must: false, label: 'the alterer of', ly: 131 } },
    { over: true, a: { e: 'she', side: 'r', must: false, many: true, label: 'repaired by', lx: 210 }, b: { e: 'clr', side: 'l', must: false, label: 'the repairer of', ly: 212 } },
  ],
};
ERDS.m94_arc = {
  w: 420, h: 210, label: 'CLOTHING, SHIRT ve SHOE ayrı entity olarak, arc içinde',
  ents: [
    { id: 'ctg', name: 'CLOTHING', x: 20, y: 20, w: 120, h: 170, attrs: ['# Id', '* Material'] },
    { id: 'sht', name: 'SHIRT', x: 280, y: 20, w: 130, attrs: ['* Sleeve length', '* Neck size', 'o Collar style'] },
    { id: 'she', name: 'SHOE', x: 280, y: 115, w: 130, attrs: ['* Size', '* Buckle style', 'o Heel height'] },
  ],
  rels: [
    { cls: 'hl', a: { e: 'ctg', side: 'r', off: -47.5, must: true, label: 'a supertype of', lx: 178 }, b: { e: 'sht', side: 'l', must: true, label: 'a subtype of', ly: 76 } },
    { cls: 'hl', a: { e: 'ctg', side: 'r', off: 47.5, must: true, label: 'a supertype of', lx: 178 }, b: { e: 'she', side: 'l', must: true, label: 'a subtype of', ly: 171 } },
  ],
  extra: '<path class="erd-line hl" d="M 160 40 Q 180 105 160 170"/><circle cx="164.7" cy="57.5" r="3.2" style="fill:var(--red)"/><circle cx="164.7" cy="152.5" r="3.2" style="fill:var(--red)"/>',
};

SECTIONS.find(s => s.no === 9).lessons.push({
  id: '9-4',
  title: 'Subtype’ları tablolara dönüştürmek',
  en: 'Subtype Mapping',
  html: `
<p class="lead">Bir supertype’ı ve subtype’larını (4-1) tablolara üç farklı yolla dönüştürebilirsin.</p>
<p>Üç yöntemde de supertype’ın primary UID’si primary key, diğer UID’ler de unique key olur.</p>

${h2('1. Tek tablo')}
${term(`Supertype implementation`, `Tek tablo yöntemi`, `<p>Subtype sayısı kaç olursa olsun, supertype ve subtype’ları için tek bir tablo oluşturulur; buna single-table implementation da denir.</p>`, {
  star: true,
  exam: `Only one table is created, regardless of <i>(-den bağımsız olarak)</i> the number of subtypes`,
})}
<p>Supertype’ın attribute’ları ve ilişkileri optionality’sini korur, ama subtype’tan gelen kolonlar ve foreign key’ler ERD’de zorunlu olsalar bile optional (isteğe bağlı) olur.</p>
${term(`Discriminator column`, `Ayırt edici kolon`, `<p>Tabloya, satırın hangi subtype’a ait olduğunu (FTE, PTE gibi) gösteren zorunlu bir kolon eklenir; adı genelde <code>&lt;table_short_name&gt;_type</code>, burada <code>epe_type</code> olur.</p>`, {
  exam: `A discriminator column to distinguish <i>(ayırt etmek)</i> between the different subtypes`,
  more: `<p>Kavramsal modeldeki OTHER subtype’ı tasarım aşamasında ya gerçek bir adla tanımlanır ya da dönüşüme hiç katılmaz.</p>`,
})}
${erd('m94_emp', '', `Kırmızı çizgiye bak: AGENCY ilişkisi EMPLOYEE’ye değil, sadece PART TIME’a bağlı.`)}
${figure(dbTable('EMPLOYEES (EPE)', ['Key Type', 'Optionality', 'Column Name'], [
  ['pk', '*', 'id'], ['', '*', 'first_name'], ['', '*', 'last_name'], ['', 'o', 'salary'], ['', 'o', 'hourly_rate'],
  ['fk1', '*', 'dpt_id'], ['fk2', 'o', 'agy_id'], ['', '*', 'epe_type'], ['fk3', 'o', 'mgr_id'],
], [3, 4, 6, 7]), '', `<b>*</b> zorunlu, <b>o</b> optional demek (9-2). Subtype’tan gelen salary, hourly_rate ve agy_id optional oldu; epe_type ise discriminator kolonu.`)}
${more(`<p>mgr_id, EMPLOYEE’nin kendisiyle kurduğu ilişkinin foreign key’idir. Normalde epe_id olurdu, ama anlaşılsın diye yeniden adlandırıldı.</p>`)}
${term(`Check constraint`, `Kontrol kuralı`, `<p>Her subtype’ın zorunlu kolonlarının gerçekten dolu olmasını bir check constraint sağlar.</p>`, {
  exam: `All columns that come from mandatory attributes are not null`,
})}
${sql(`CHECK ((epe_type = 'FTE' AND salary IS NOT NULL
         AND hourly_rate IS NULL AND agy_id IS NULL)
    OR (epe_type = 'PTE' AND salary IS NULL
         AND hourly_rate IS NOT NULL AND agy_id IS NOT NULL))`)}
<p>Yani FTE’de salary dolu, hourly_rate ile agy_id boş olmalı; PTE’de ise tam tersine hourly_rate ile agy_id dolu, salary boş olmalı.</p>
${more(`<p>Örnek veride bunu görebilirsin: FTE satırlarında hourly_rate ile agy_id, PTE satırlarında da salary boş kalıyor.</p>
${dbTable('EMPLOYEES', ['id', 'first_name', 'last_name', 'salary', 'hourly_rate', 'dpt_id', 'agy_id', 'epe_type', 'mgr_id'], [
  ['2000', 'Joan', 'Merrick', '50000', '', '10', '', 'FTE', '111'],
  ['111', 'Sylvia', 'Patakis', '90000', '', '10', '', 'FTE', ''],
  ['2101', 'Marcus', 'Rivera', '', '65.00', '10', '17', 'PTE', '111'],
  ['2102', 'Hector', 'Chen', '', '75.00', '25', '17', 'PTE', '45'],
  ['45', 'Rajesh', 'Vishwan', '90000', '', '25', '', 'FTE', ''],
], [2, 3])}`)}
<p><b>Ne zaman?</b> Yaygın ve esnek olduğu için genelde ilk bu yöntem düşünülür; attribute’ların ve ilişkilerin çoğu supertype’taysa ve iş kuralları bütün subtype’larda aynıysa uygundur.</p>

${h2('2. Her subtype’a bir tablo')}
${term(`Subtype implementation`, `Her subtype’a ayrı tablo`, `<p>Birinci seviyedeki her subtype’a bir tablo oluşturulur, supertype’ın tablosu olmaz; adı two-table implementation olsa da üç subtype varsa üç tablo olur.</p>`, {
  star: true,
  exam: `One table per first-level subtype`,
  more: `<p>Primary key değerlerinin (id) iki tablo arasında da benzersiz olması gerekiyorsa, bunun için ek programlama gerekir.</p>`,
})}
<p>Her tablo supertype’ın attribute’larını ve ilişkilerini de alır; subtype’ın ilişkisi ise sadece kendi tablosuna girer. Optionality korunduğu için check constraint gerekmez.</p>
${erd('m94_clo', '', `TAILOR sadece SHIRT’e, COBBLER sadece SHOE’ya bağlı; MANUFACTURER ise ikisine de miras kalır.`)}
${figure(schema(['SHIRTS(#id, material, sleeve_length, neck_size, collar_style, >tlr_id, >mnr_id)', 'SHOES(#id, material, size, buckle_style, heel_height, >clr_id, >mnr_id)']), '', `id, material ve mnr_id supertype’tan geldiği için iki tabloda da var.`)}
<p><b>Ne zaman?</b> Subtype’ların ortak yanı azsa, ilişkilerin çoğu subtype’lardaysa, iş kuralları çok farklıysa ya da tablolar farklı kullanılıyorsa (biri sorgulanırken öbürü güncelleniyorsa) uygundur.</p>

${h2('3. Her entity’ye bir tablo: arc')}
<p>Subtype’lar ayrı entity’ler olarak da çizilebilir: her biri supertype’a mandatory 1:1 bir ilişkiyle bağlanır ve bu ilişkiler bir arc içindedir (9-3), yani her CLOTHING ya SHIRT ya SHOE’dur, ikisi birden olamaz.</p>
${erd('m94_arc', '', `Kırmızı kavis arc’tır: bağladığı iki ilişkiden her satırda sadece biri olabilir.`)}
${term(`Arc implementation`, `Her entity’ye bir tablo`, `<p>Supertype’a ve her subtype’a birer tablo oluşturulur; her tablo kendi entity’sinin attribute’larını ve ilişkilerini alır.</p>`, {
  star: true,
  exam: `This choice produces one table for every entity`,
})}
<p>Supertype tablosuna her subtype için bir foreign key eklenir. Arc yüzünden sadece biri dolu olabildiği için bunlar optional olur, mandatory 1:1 ilişkiden geldikleri için de aynı zamanda unique key olur. Arc’ı bir check constraint uygular.</p>
${figure(dbTable('CLOTHING (CTG)', ['Key Type', 'Optionality', 'Column Name'], [
  ['pk', '*', 'id'], ['', '*', 'material'], ['fk1, uk1', 'o', 'sht_id'], ['fk2, uk2', 'o', 'she_id'], ['fk3', '*', 'mnr_id'],
], [2, 3]) + schema(['SHIRTS(#id, sleeve_length, neck_size, collar_style, >tlr_id)', 'SHOES(#id, size, buckle_style, heel_height, >clr_id)']), '', `sht_id ve she_id SHIRTS ile SHOES’u gösterir ve check constraint, ikisinden tam olarak birinin dolu olmasını sağlar. material ve mnr_id artık sadece CLOTHING’de durur; SHIRTS ve SHOES ise kendi attribute’larını ve kendi ilişkilerinin FK’sini (tlr_id, clr_id) alır.`)}
${sql(`CHECK ((sht_id IS NOT NULL AND she_id IS NULL)
    OR (sht_id IS NULL AND she_id IS NOT NULL))`)}
<p><b>Ne zaman?</b> Nadiren kullanılır: subtype’ların ortak yanı azsa ve her tablo tek başına kullanılabiliyorsa, iş kuralları ya da tabloların kullanımı çok farklıysa uygundur.</p>
${more(`<p>Mesela genel bilgi CLOTHING’de, özel bilgi SHIRTS ve SHOES’tadır ve ikisi neredeyse hiç birlikte gerekmez. Ama bu giysi örneğinde arc implementation’ın seçilmesi pek olası değildir, sadece bir seçenek olarak gösterildi.</p>`)}
`,
});
