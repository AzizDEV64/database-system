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
ERDS.process = {
  w: 490, h: 160, label: 'One-to-one: süreç aşamaları',
  ents: [
    { id: 'ex', name: 'EXAM', x: 20, y: 20, w: 140, minH: 46 },
    { id: 'ak', name: 'ANSWER KEY', x: 330, y: 20, w: 140, minH: 46 },
    { id: 'rc', name: 'RECIPE', x: 20, y: 100, w: 140, minH: 46 },
    { id: 'di', name: 'DISH', x: 330, y: 100, w: 140, minH: 46 },
  ],
  rels: [
    { a: { e: 'ex', side: 'r', must: true, label: 'evaluated with' }, b: { e: 'ak', side: 'l', must: true, label: 'for', ly: 60 } },
    { a: { e: 'rc', side: 'r', must: false, label: 'the basis for' }, b: { e: 'di', side: 'l', must: false, label: 'the result', ly: 140 } },
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
  notes: [{ x: 250, y: 91, text: '← bar →', cls: 'hl', anchor: 'middle' }],
  rels: [
    { a: { e: 'en', side: 'b', off: -35, must: true, many: true, bar: true, label: 'for', ly: 112 }, b: { e: 'st', side: 'r', must: false, label: 'enrols for', ly: 197 }, via: [[215, 177.5]] },
    { a: { e: 'en', side: 'b', off: 35, must: true, many: true, bar: true, label: 'for', lx: 293, ly: 112, anchor: 'start' }, b: { e: 'su', side: 'l', must: false, label: 'subject of', lx: 334, ly: 190 }, via: [[285, 170]] },
  ],
};

SECTIONS.push({
  no: 5,
  title: 'İlişkileri iyileştirmek',
  en: 'Refining Relationships',
  desc: 'Transferability’yi, 1:1, 1:M ve M:M ilişki türlerini, gereksiz ilişkileri ve M:M ilişkinin nasıl çözüldüğünü öğreniyorsun.',
  lessons: [
    // ------------------------------------------------------------------ 5-1
    {
      id: '5-1',
      title: 'İlişkinin aktarılabilirliği',
      en: 'Relationship Transferability',
      html: `
<p class="lead">Optionality ve cardinality’den (3-1) sonra bir ilişkiye sorduğumuz üçüncü soru şu: Bu ilişki bir instance’tan başka bir instance’a taşınabilir mi?</p>
${term(`Transferable`, `Aktarılabilir`, `<p>Transferable, ilişkinin başka bir instance’a taşınabildiği anlamına gelir.</p>`, {
  star: true,
  exam: `A STUDENT being allowed to move from one STUDY GROUP to another`,
  more: `<p>Mesela bir öğrenci bir çalışma grubundan (STUDY GROUP) başka bir gruba geçebilir, bir çalışan da başka bir departmana tayin olabilir. Bir öğretmene verilmiş bir sınıf (CLASS) da dönem ortasında başka bir öğretmene aktarılabilir; öyle olmasaydı, öğretmen hastalandığında sınıfı kimseye veremezdin.</p>`,
})}
${term(`Nontransferable`, `Aktarılamaz`, `<p>Nontransferable bir ilişki bir kez kurulduktan sonra değiştirilemez ve ERD’de çizgisinin üstüne bir <b>elmas</b> (diamond) konur.</p>`, {
  star: true,
  exam: `A nontransferable relationship is represented with the diamond on the relationship`,
  more: `<p>Mesela öğrenciye kesilen makbuz (RECEIPT) başka bir öğrenciye devredilemez; yanlış kesildiyse iptal edilir ve yenisi yazılır. Bir şiirin (POEM) yazarı (AUTHOR) da sonradan değişmez. Nontransferable ilişkiler genellikle bir iş kuralını yansıttığı için önemlidir; ERD veritabanına dönüştürülürken de bunun sonuçları olur.</p>`,
})}
${erd('receipt', '','Çizginin üstündeki kırmızı elmas, ilişkinin nontransferable olduğunu gösterir: bir makbuz bir öğrenciye kesildikten sonra başka bir öğrenciye geçemez. Elmasın, crow’s foot olan RECEIPT tarafında durduğuna dikkat et; elmas genellikle oraya çizilir.')}
${note(`Bir ilişkinin aktarılıp aktarılamayacağına işletme karar verir. Mesela bazı spor salonları üyeliğin başkasına devredilmesine izin verir, bazıları vermez.`)}
`,
    },

    // ------------------------------------------------------------------ 5-2
    {
      id: '5-2',
      title: 'İlişki türleri',
      en: 'Relationship Types',
      html: `
${term(`One-to-many (1:M)`, `Bire çok`, `<p>One-to-many ilişkide çizginin bir ucunda single toe, öbür ucunda crow’s foot vardır ve ER modelde en sık gördüğün tür budur.</p>`, {
  star: true,
  exam: `The various types of 1:M relationships are most common in an ER Model`,
})}
${erd('oneMany', '', 'Çizginin EMPLOYEE ucunda crow’s foot, DEPARTMENT ucunda single toe var: bir departmanda birçok çalışan olabilir, ama her çalışan tek bir departmana bağlıdır. EMPLOYEE tarafı düz (must), DEPARTMENT tarafı kesikli (may) çizildiği için her çalışanın bir departmanı olmak zorunda, ama boş bir departman da olabilir. “Many” kelimesi optionality’ye göre değişir: çizgi crow’s foot tarafında düzse “bir veya daha çok”, kesikliyse “sıfır veya daha çok” demektir.')}
${term(`Many-to-many (M:M)`, `Çoka çok`, `<p>Many-to-many ilişkide çizginin iki ucunda da crow’s foot vardır ve modelleme ilerledikçe bu ilişkilerin hepsi çözülüp ortadan kalkar.</p>`, {
  star: true,
  exam: `In later stages of the modeling process, all M:M relationships will be resolved, and disappear`,
  more: `<p>M:M ilişkiler özellikle ER modelin ilk versiyonunda sık karşına çıkar.</p>`,
})}
${erd('manyMany', '', 'İki uçta da crow’s foot var: bir öğrenci birçok öğretmenden ders alır, bir öğretmen de birçok öğrenciye ders verir. Böyle bir ilişki çoğu zaman modelde bir entity’nin eksik olduğunu gösterir; 5-3’te bu eksik entity’yi ekleyip çizgiyi nasıl ortadan kaldırdığımızı göreceksin.')}
${term(`One-to-one (1:1)`, `Bire bir`, `<p>One-to-one ilişkide çizginin iki ucunda da single toe vardır; az görülür ve genelde rolleri (PERSON → TEACHER) ya da bir sürecin aşamalarını (RECIPE → DISH, EXAM → ANSWER KEY) modellerken karşına çıkar.</p>`, {
  exam: `Mandatory at one end of the 1:1 relationship commonly occurs when roles are modeled`,
})}
${erd('roles', '', 'İki çizginin de iki ucunda single toe var, yani bir PERSON en fazla bir TEACHER ve en fazla bir STUDENT rolüne sahip olur. Çizgi PERSON tarafında kesikli (may), rol tarafında düz (must): her kişi öğretmen olmak zorunda değil, ama her TEACHER mutlaka bir kişidir. “Mandatory at one end” budur.')}
${erd('process', '', 'Bunlar süreç aşamalarını gösteren iki 1:1 ilişki. EXAM ile ANSWER KEY arasındaki çizgi iki uçta da düz, yani iki taraf da zorunlu. RECIPE ile DISH arasındaki çizgi ise iki uçta da kesikli, yani iki taraf da isteğe bağlı. Rollerdeki gibi bir ucu zorunlu olanı da sayarsan, 1:1 ilişkinin üç çeşidini de görmüş olursun.')}
${note(`İki ucu da zorunlu olan bir 1:M ilişkide entity’ler birbiri olmadan var olamaz; ORDER ve ORDER ITEM gibi. “Bir” tarafı zorunlu, “çok” tarafı isteğe bağlı olan 1:M ise nadirdir; BAND ve MUSICIAN buna örnektir. İki ucu da zorunlu bir 1:1 ilişki (EXAM ve ANSWER KEY gibi) iki entity’yi sıkıca bağlar; bu durumda iki ayrı entity tutmak için bir iş gereği olmalıdır.`)}
${more(`<p>Bir PERSON aynı anda hem TEACHER hem STUDENT olamıyorsa, bunlar PERSON’ın subtype’ları (4-1) olarak da çizilebilirdi.</p>`)}

${h2('Gereksiz ilişki')}
${term(`Redundant`, `Gereksiz, fazlalık`, `<p>Redundant ilişki, modeldeki başka ilişkilerden zaten çıkarılabilen ilişkidir; bu yüzden silinir.</p>`, {
  star: true,
  exam: `A redundant relationship can be derived from another relationship in the model <i>(derive = türetmek)</i>`,
  more: `<p>Mesela bir kişi bir TOWN’da yaşıyor, o TOWN da bir COUNTRY’de bulunuyorsa kişinin hangi ülkede yaşadığı zaten bellidir. Aşağıdaki diyagramda kırmızı çizgi bu yüzden gereksizdir.</p>`,
})}
${erd('redundant', '', 'Siyah çizgileri takip et: PERSON → TOWN → COUNTRY. Kişinin yaşadığı ülke bu yoldan zaten bulunuyor. Bu yüzden kırmızı, doğrudan PERSON → COUNTRY çizgisi (living in) aynı bilgiyi tekrarlıyor ve silinmeli.')}
${mix('Önce ilişkiyi oku', `Sadece çizime bakıp karar verme, önce ilişkinin ne dediğini oku. Kırmızı çizgi <b>born in</b> (doğduğu ülke) anlamına geliyorsa gereksiz değildir, çünkü insan doğduğu ülkeden başka bir yerde yaşayabilir.`)}
${erd('notRedundant', '', 'Şekil yukarıdakiyle aynı, değişen tek şey kırmızı çizginin adı: born in. Siyah yol kişinin şu an yaşadığı ülkeyi, kırmızı çizgi ise doğduğu ülkeyi verir; bu yüzden kırmızı çizgi kalır.')}
`,
    },

    // ------------------------------------------------------------------ 5-3
    {
      id: '5-3',
      title: 'Many-to-many ilişkiyi çözmek',
      en: 'Resolving Many-to-Many Relationships',
      html: `
<p class="lead">STUDENT ile SUBJECT (ders) arasında M:M bir ilişki var ve notu (Grade) ikisinden birine yazamazsın, çünkü not aradaki ilişkiye aittir.</p>
${more(`<p>Bir öğrenci birçok derse girer, bir derse de birçok öğrenci girer; ilişkinin M:M olması bundandır. Notu STUDENT’a yazarsan notun hangi derse ait olduğu, SUBJECT’e yazarsan kimin notu olduğu belli olmaz.</p>`)}
${erd('mmSubject', '', '<b>Önce:</b> STUDENT ile SUBJECT, iki ucunda da crow’s foot olan tek bir M:M çizgiyle bağlı. Grade’i koyacak yer yok, çünkü iki kutuda da sadece o entity’nin kendi bilgileri duruyor. Her attribute bir entity’ye ait olmak zorunda olduğu için araya üçüncü bir entity gerekir.')}
${term(`Intersection entity`, `Kesişim entity’si`, `<p>Intersection entity, M:M bir ilişkiyi çözmek için iki entity’nin arasına eklenen üçüncü entity’dir ve böylece o M:M ilişki iki tane 1:M ilişkiye dönüşür.</p>`, {
  star: true,
  exam: `The product of the resolution of a many to many relationship <i>(resolution = çözüm)</i>`,
  more: `<p>İlişkiye ait attribute’u (burada Grade) o taşır. İki crow’s foot da yeni entity’nin tarafında olur.</p>`,
})}
${erd('enroll', 'ENROLLMENT tarafında çizgiler düzdür, çünkü bir kayıt öğrencisi ve dersi olmadan var olamaz.', '<b>Sonra:</b> Aradaki M:M çizgi kalktı, yerine ENROLLMENT geldi; artık iki tane 1:M ilişki var, iki crow’s foot da ENROLLMENT tarafında ve Grade ENROLLMENT’ın içinde. Kırmızı “bar” yazısının iki yanındaki küçük yatay çizgiler bar’lardır; ne anlama geldikleri hemen aşağıda.')}
${term(`Barred relationship`, `Çubuklu ilişki`, `<p>Barred relationship, bir entity’nin UID’sine katılan ilişkidir ve çizginin üstüne konan küçük dik bir çubukla (bar) gösterilir.</p>`, {
  star: true,
  ex: `ENROLLMENT’ın UID’si STUDENT ID ile SUBJECT ID’nin birleşimidir; çubuklar bunu zaten gösterdiği için bu ID’ler kutunun içine ayrıca yazılmaz.`,
  exam: `A relationship that participates in an entity's unique identifier <i>(participate = katılmak)</i>`,
})}
<p>Diğer örnekler de aynı yolla çözülür: TV SHOW ile PERSON arasına <b>VIEWING RECORD</b>, COMPANY ile CLEANING SERVICE arasına da <b>CLEANING SCHEDULE</b> eklenir.</p>
`,
    },
  ],
});
