const pair = (a, b, w = 490) => ({
  w, h: 90,
  ents: [
    { id: 'a', name: a, x: 20, y: 20, w: 140, minH: 46 },
    { id: 'b', name: b, x: w - 160, y: 20, w: 140, minH: 46 },
  ],
});

ERDS.receipt = Object.assign(pair('RECEIPT', 'STUDENT'), {
  label: 'RECEIPT issued to STUDENT',
  rels: [{ a: { e: 'a', side: 'r', must: true, many: true, diamond: true, label: 'issued to', lx: 200, ly: 34 }, b: { e: 'b', side: 'l', must: false, label: 'issued', ly: 60 } }],
});
ERDS.oneMany = Object.assign(pair('EMPLOYEE', 'DEPARTMENT'), {
  label: 'One-to-many',
  rels: [{ a: { e: 'a', side: 'r', must: true, many: true, label: 'assigned to' }, b: { e: 'b', side: 'l', must: false, label: 'responsible for', ly: 60 } }],
});
ERDS.manyMany = Object.assign(pair('STUDENT', 'TEACHER'), {
  label: 'Many-to-many',
  rels: [{ a: { e: 'a', side: 'r', must: false, many: true, label: 'learns from' }, b: { e: 'b', side: 'l', must: false, many: true, label: 'educates', ly: 60 } }],
});
ERDS.roles = {
  w: 490, h: 160, label: 'One-to-one: roller',
  ents: [
    { id: 'p', name: 'PERSON', x: 20, y: 20, w: 140, minH: 120 },
    { id: 't', name: 'TEACHER', x: 330, y: 20, w: 140, minH: 40 },
    { id: 's', name: 'STUDENT', x: 330, y: 100, w: 140, minH: 40 },
  ],
  rels: [
    { a: { e: 'p', side: 'r', off: -40, must: false, label: 'acting as' }, b: { e: 't', side: 'l', must: true, label: 'role of', ly: 56 } },
    { a: { e: 'p', side: 'r', off: 40, must: false, label: 'acting as' }, b: { e: 's', side: 'l', must: true, label: 'role of', ly: 136 } },
  ],
};
const towns = (hlA, hlB) => ({
  w: 330, h: 300,
  ents: [
    { id: 'c', name: 'COUNTRY', x: 90, y: 10, w: 120, minH: 40 },
    { id: 't', name: 'TOWN', x: 90, y: 130, w: 120, minH: 40 },
    { id: 'p', name: 'PERSON', x: 90, y: 250, w: 120, minH: 40 },
  ],
  rels: [
    { a: { e: 't', side: 't', must: true, many: true, label: 'located in' }, b: { e: 'c', side: 'b', must: false, label: 'location of' } },
    { a: { e: 'p', side: 't', must: true, many: true, label: 'living in' }, b: { e: 't', side: 'b', must: false, label: 'hometown of' } },
    { cls: 'hl', a: { e: 'p', side: 'r', must: true, many: true, label: hlA }, b: { e: 'c', side: 'r', must: false, label: hlB }, via: [[290, 270], [290, 30]] },
  ],
});
ERDS.redundant = Object.assign(towns('living in', 'location of'), { label: 'Redundant ilişki' });
ERDS.notRedundant = Object.assign(towns('born in', 'the birthplace of'), { label: 'Redundant olmayan ilişki' });

ERDS.mmSubject = {
  w: 490, h: 110, label: 'STUDENT ve SUBJECT arasında M:M',
  ents: [
    { id: 'st', name: 'STUDENT', x: 20, y: 20, w: 130, attrs: ['# ID', '* First name', '* Last name'] },
    { id: 'su', name: 'SUBJECT', x: 340, y: 20, w: 130, attrs: ['# ID', '* Name'] },
  ],
  rels: [
    { a: { e: 'st', side: 'r', must: false, many: true, label: 'studies' }, b: { e: 'su', side: 'l', off: 7.5, must: false, many: true, label: 'studied by', ly: 76 } },
  ],
};
ERDS.enroll = {
  w: 490, h: 230, label: 'ENROLLMENT intersection entity ve barred ilişkiler',
  ents: [
    { id: 'en', name: 'ENROLLMENT', x: 180, y: 20, w: 140, attrs: ['o Grade'] },
    { id: 'st', name: 'STUDENT', x: 20, y: 140, w: 130, attrs: ['# ID', '* First name', '* Last name'] },
    { id: 'su', name: 'SUBJECT', x: 340, y: 140, w: 130, attrs: ['# ID', '* Name'] },
  ],
  rels: [
    { a: { e: 'en', side: 'b', off: -35, must: true, many: true, bar: true, label: 'for', ly: 112 }, b: { e: 'st', side: 'r', must: false, label: 'enrols for', ly: 197 }, via: [[215, 177.5]] },
    { a: { e: 'en', side: 'b', off: 35, must: true, many: true, bar: true, label: 'for', lx: 293, ly: 112, anchor: 'start' }, b: { e: 'su', side: 'l', must: false, label: 'subject of', lx: 334, ly: 190 }, via: [[285, 170]] },
  ],
};

SECTIONS.push({
  no: 5,
  title: 'İlişkileri iyileştirmek',
  en: 'Refining Relationships',
  desc: 'Transferability, 1:1 / 1:M / M:M ilişki türleri, gereksiz ilişkiler ve M:M ilişkinin çözümü.',
  lessons: [
    // ------------------------------------------------------------------ 5-1
    {
      id: '5-1',
      title: 'İlişkinin aktarılabilirliği',
      en: 'Relationship Transferability',
      html: `
<p class="lead">Optionality ve cardinality’den (3-1) sonra bir ilişkiye sorulan üçüncü soru şu: bu ilişki bir instance’tan başka bir instance’a taşınabilir mi?</p>
${term(`Transferable`, `Aktarılabilir`, `<p>İlişki başka bir instance’a taşınabilir. Öğrenci bir çalışma grubundan (STUDY GROUP) başka bir gruba geçebilir, çalışan başka departmana tayin olabilir.</p>`, {
  star: true,
  exam: `A STUDENT being allowed to move from one STUDY GROUP to another`,
})}
${term(`Nontransferable`, `Aktarılamaz`, `<p>İlişki bir kez kurulunca değiştirilemez. Öğrenciye kesilen makbuz (RECEIPT) başka öğrenciye devredilemez; yanlış kesildiyse iptal edilir, yenisi yazılır. Bir şiirin yazarı da değişmez. ERD’de çizginin üstüne <b>elmas</b> (diamond) konur.</p>`, {
  star: true,
  exam: `A nontransferable relationship is represented with the diamond on the relationship`,
})}
${erd('receipt', 'Elmas genellikle crow’s foot tarafına çizilir.')}
${note(`Aktarılıp aktarılamayacağına işletme karar verir. Bazı spor salonları üyeliğin başkasına devrine izin verir, bazıları vermez.`)}
`,
    },

    // ------------------------------------------------------------------ 5-2
    {
      id: '5-2',
      title: 'İlişki türleri',
      en: 'Relationship Types',
      html: `
${term(`One-to-many (1:M)`, `Bire çok`, `<p>Bir uçta single toe, öbür uçta crow’s foot. En sık görülen türdür. Many tarafı may ise “sıfır veya daha çok”, must ise “bir veya daha çok” demektir.</p>`, {
  star: true,
  exam: `The various types of 1:M relationships are most common in an ER Model`,
})}
${erd('oneMany')}
${term(`Many-to-many (M:M)`, `Çoka çok`, `<p>İki uçta da crow’s foot. İlk taslaklarda sık görülür, ama modelleme ilerledikçe hepsi çözülür ve kaybolur. Çoğu zaman modelde bir entity’nin eksik olduğunu gösterir. Nasıl çözüldüğü 5-3’te.</p>`, {
  star: true,
  exam: `In later stages of the modeling process, all M:M relationships will be resolved, and disappear`,
})}
${erd('manyMany')}
${term(`One-to-one (1:1)`, `Bire bir`, `<p>İki uçta da single toe. Az görülür; genelde rolleri (PERSON → TEACHER) ya da bir sürecin aşamalarını (RECIPE → DISH) modellerken çıkar.</p>`, {
  exam: `Mandatory at one end of the 1:1 relationship commonly occurs when roles are modeled`,
})}
${erd('roles')}
${note(`İki uç da zorunlu 1:M ilişkide entity’ler birbiri olmadan var olamaz (ORDER ve ORDER ITEM). “Bir” tarafı zorunlu, “çok” tarafı isteğe bağlı olan 1:M nadirdir (BAND ve MUSICIAN). İki ucu da zorunlu 1:1 varsa iki ayrı entity tutmak için bir iş gereği olmalı. Bir PERSON aynı anda hem TEACHER hem STUDENT olamıyorsa bunlar PERSON’ın subtype’ları (4-1) olarak da çizilebilirdi.`, 'Slayt notlarından')}

${h2('Gereksiz ilişki')}
${term(`Redundant`, `Gereksiz, fazlalık`, `<p>Başka ilişkilerden çıkarılabilen ilişki; silinir. Kişi bir TOWN’da yaşıyor, TOWN da bir COUNTRY’de bulunuyorsa kişinin ülkesi zaten bilinir. Kırmızı çizgi gereksizdir.</p>`, {
  star: true,
  exam: `A redundant relationship can be derived from another relationship in the model <i>(derive = türetmek)</i>`,
})}
${erd('redundant')}
${mix('Önce ilişkiyi oku', `Sadece çizime bakıp karar verme. Kırmızı çizgi <b>born in</b> (doğduğu ülke) ise gereksiz değildir, çünkü insan doğduğu ülkeden başka bir yerde yaşayabilir.`)}
${erd('notRedundant')}
`,
    },

    // ------------------------------------------------------------------ 5-3
    {
      id: '5-3',
      title: 'Many-to-many ilişkiyi çözmek',
      en: 'Resolving Many-to-Many Relationships',
      html: `
<p class="lead">Bir öğrenci birçok derse (SUBJECT) girer, bir derse de birçok öğrenci girer: M:M. Peki notu (Grade) nereye yazacağız? STUDENT’a yazarsan hangi derse ait olduğu, SUBJECT’e yazarsan kimin notu olduğu bilinmez. Not ikisinden birine değil, aradaki ilişkiye aittir.</p>
${erd('mmSubject')}
${term(`Intersection entity`, `Kesişim entity’si`, `<p>M:M ilişkiyi çözmek için araya eklenen üçüncü entity. İlişkinin attribute’unu (Grade) o taşır. Sonunda bir M:M ilişki, iki tane 1:M ilişkiye dönüşür ve iki crow’s foot da yeni entity’nin tarafında olur.</p>`, {
  star: true,
  exam: `The product of the resolution of a many to many relationship <i>(resolution = çözüm)</i>`,
})}
${erd('enroll', 'ENROLLMENT tarafı düz çizgidir: bir kayıt, öğrencisi ve dersi olmadan var olamaz.')}
${term(`Barred relationship`, `Çubuklu ilişki`, `<p>Bir entity’nin UID’sine katılan ilişki. Çizginin üstünde küçük dik bir çubukla gösterilir. ENROLLMENT’ın UID’si STUDENT ID ile SUBJECT ID’nin birleşimidir. Bu ID’ler kutuya ayrıca yazılmaz, çubuklar bunu zaten söyler.</p>`, {
  star: true,
  exam: `A relationship that participates in an entity's unique identifier <i>(participate = katılmak)</i>`,
})}
<p>Slayttaki diğer örnekler de aynı yolla çözülür: TV SHOW ile PERSON arasına <b>VIEWING RECORD</b>, COMPANY ile CLEANING SERVICE arasına <b>CLEANING SCHEDULE</b> eklenir.</p>
`,
    },
  ],
});
