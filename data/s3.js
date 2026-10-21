ERDS.conv = {
  w: 500, h: 250, label: 'EMPLOYEE, DEPARTMENT ve JOB',
  ents: [
    { id: 'emp', name: 'EMPLOYEE', x: 20, y: 20, w: 150, attrs: ['# ID', '* First name', '* Last name', '* Hire date', '* Salary', 'o Commission'] },
    { id: 'dept', name: 'DEPARTMENT', x: 340, y: 20, w: 140, attrs: ['# ID', '* Name'] },
    { id: 'job', name: 'JOB', x: 340, y: 150, w: 140, attrs: ['# Job ID', '* Title', '* Max salary', '* Min salary'] },
  ],
  rels: [
    { a: { e: 'emp', side: 'r', off: -30, must: true, many: true, label: 'works in' }, b: { e: 'dept', side: 'l', must: false, label: 'responsible for', ly: 67 } },
    { a: { e: 'emp', side: 'b', off: -30, must: true, many: true, label: 'assigned' }, b: { e: 'job', side: 'l', must: false, label: 'assigned to' }, via: [[65, 195]] },
  ],
};

ERDS.erdish = {
  w: 500, h: 90, label: 'EMPLOYEE works in DEPARTMENT',
  ents: [
    { id: 'emp', name: 'EMPLOYEE', x: 20, y: 20, w: 140, minH: 50 },
    { id: 'dept', name: 'DEPARTMENT', x: 340, y: 20, w: 140, minH: 50 },
  ],
  rels: [
    { a: { e: 'emp', side: 'r', must: true, many: true, label: 'works in' }, b: { e: 'dept', side: 'l', must: false, label: 'responsible for', ly: 63 } },
  ],
};

ERDS.travel = {
  w: 490, h: 210, label: 'TRAVELER, COUNTRY ve LANDMARK',
  ents: [
    { id: 'tr', name: 'TRAVELER', x: 20, y: 20, w: 130, minH: 46 },
    { id: 'co', name: 'COUNTRY', x: 340, y: 20, w: 130, minH: 46 },
    { id: 'la', name: 'LANDMARK', x: 340, y: 150, w: 130, minH: 46 },
  ],
  rels: [
    { a: { e: 'tr', side: 'r', must: false, many: true, label: 'visit' }, b: { e: 'co', side: 'l', must: false, many: true, label: 'visited by', ly: 60 } },
    { a: { e: 'tr', side: 'b', must: false, many: true, label: 'have seen' }, b: { e: 'la', side: 'l', must: false, many: true, label: 'seen by' }, via: [[85, 173]] },
    { a: { e: 'la', side: 't', must: true, many: true, label: 'located in' }, b: { e: 'co', side: 'b', must: false, label: 'the location of' } },
  ],
};

// küçük çizgi örnekleri (işaret sözlüğü)
const lineSample = kind => {
  const box = '<rect class="erd-ent" x="100" y="3" width="18" height="24" rx="5"/>';
  const L = (dash) => `<line class="erd-line${dash ? ' dash' : ''}" x1="4" y1="15" x2="100" y2="15"/>`;
  const foot = '<polyline class="erd-line" points="100,6 85,15 100,24"/>';
  const s = { solid: L(0) + box, dash: L(1) + box, toe: L(0) + box, foot: L(0) + foot + box }[kind];
  return `<svg viewBox="0 0 120 30" aria-hidden="true">${s}</svg>`;
};

SECTIONS.push({
  no: 3,
  title: 'İlişkiler ve ERD çizimi',
  en: 'Relationships and ER Diagramming',
  desc: 'Optionality ve cardinality, ERD çizim kuralları, ilişkiyi ERDish ile okumak ve matrix diyagramı.',
  lessons: [
    // ------------------------------------------------------------------ 3-1
    {
      id: '3-1',
      title: 'İlişkileri bulmak',
      en: 'Identifying Relationships',
      html: `
${term(`Relationship`, `İlişki`, `<p>İki entity (ya da bir entity ile kendisi) arasındaki bağlantı; ER’deki “R” budur. Örneğin STUDENT bir BOOK’u ödünç alır. Modelde entity’ler kadar önemlidir.</p>`, {
  star: true,
  exam: `A connection or association between objects`,
})}
<p>İlişkilerin özellikleri:</p>
<ul>
  <li>Exist only between entities (or one entity and itself) <i>(entity kendisiyle de ilişkili olabilir)</i></li>
  <li>Are bi-directional <i>(iki yönlüdür)</i></li>
  <li>Are named at both ends <i>(iki ucunun da adı vardır)</i></li>
  <li>Have optionality and cardinality</li>
</ul>
${term(`Optionality`, `Zorunluluk`, `<p>Sorduğu soru: “must mı, may mi?” Her çalışanın bir işi olmak zorunda mı? Evet, o zaman <b>must</b>. Her iş birine verilmek zorunda mı? Boş kadro olabilir, o zaman <b>may</b>.</p>`, {
  star: true,
  exam: `Relationships are either mandatory or optional`,
})}
${term(`Cardinality`, `Kaç tane`, `<p>Sorduğu soru: “kaç tane?” Cevap ya <b>one and only one</b> ya da <b>one or more</b> olur. Kesin bir sayı vermez, sadece tekil mi çoğul mu onu söyler.</p>`, {
  star: true,
  exam: `Only answers whether the number is singular or plural <i>(tekil mi, çoğul mu)</i>`,
})}
${mix('Optionality ve cardinality', `Optionality → <b>must / may</b> (zorunlu mu?). Cardinality → <b>one / one or more</b> (kaç tane?).`)}

${h2('İlişki cümleleri')}
${say(`Each EMPLOYEE <b>must</b> hold <b>one and only one</b> JOB.`, `Her çalışanın tam olarak bir işi olmalı.`)}
${say(`Each JOB <b>may</b> be held by <b>one or more</b> EMPLOYEEs.`, `Bir iş bir veya daha çok çalışana verilebilir.`)}
${say(`Each CUSTOMER <b>must</b> place <b>one or more</b> ORDERs.`, `Restoranda müşteri en az bir sipariş verir.`)}
${say(`Each ORDER <b>must</b> be placed by <b>one and only one</b> CUSTOMER.`, `Her siparişin tek bir sahibi vardır.`)}
${say(`Each EMPLOYEE <b>may</b> be managed by <b>one and only one</b> EMPLOYEE.`, `Bir çalışanın en fazla bir yöneticisi olabilir. Yönetici de bir EMPLOYEE olduğu için ilişki entity’nin kendisine döner.`)}
${say(`Each EMPLOYEE <b>may</b> manage <b>one or more</b> EMPLOYEEs.`, `Bir yönetici birden çok çalışanı yönetebilir.`)}
${note(`Cevaplar işletmenin kurallarına (business rules) göre değişir. Örneğin havayolu bir koltuğu birden çok yolcuya satabilir (overbooking).`)}
`,
    },

    // ------------------------------------------------------------------ 3-2
    {
      id: '3-2',
      title: 'ERD çizim kuralları',
      en: 'ER Diagramming Conventions',
      html: `
${term(`ER Diagramming`, `ERD çizimi`, `<p>ERD’yi herkesin aynı şekilde okuyacağı ortak kurallarla (convention) çizmek, tıpkı trafik işaretleri gibi.</p>`, {
  exam: `Everyone draws ER diagrams according to the same conventions`,
})}
${term(`Softbox`, `Yuvarlak köşeli kutu`, `<p>Entity bu kutuyla çizilir. Adı kutunun içine, tekil ve büyük harfle yazılır: EMPLOYEES değil, EMPLOYEE.</p>`, {
  star: true,
  exam: `Entity names are always singular and written with all capital letters`,
})}

${h2('Attribute işaretleri')}
${table(['İşaret', 'Anlamı'], [
  ['<code>#</code>', 'Unique identifier (UID)'],
  ['<code>*</code>', 'Mandatory (zorunlu)'],
  ['<code>o</code>', 'Optional (isteğe bağlı)'],
])}
${note(`UID’nin parçası olan attribute zaten zorunludur, bu yüzden önüne sadece <code>#</code> konur, <code>*</code> konmaz.`)}
${erd('conv', 'Slayttaki örnek: attribute’lar entity adının altında listelenir.')}

${h2('İlişki çizgileri')}
<div class="legend-erd">
  <div>${lineSample('solid')}<p><strong>Düz çizgi</strong><span>must (zorunlu)</span></p></div>
  <div>${lineSample('dash')}<p><strong>Kesikli çizgi</strong><span>may (isteğe bağlı)</span></p></div>
  <div>${lineSample('toe')}<p><strong>Single toe</strong><span>one and only one (uçta çatal yok)</span></p></div>
  <div>${lineSample('foot')}<p><strong>Crow’s foot</strong><span>one or more</span></p></div>
</div>
${term(`Crow’s Foot`, `Karga ayağı`, `<p>Çizginin entity’ye değdiği uçtaki üç çatallı işaret. O entity’den “bir veya daha çok” olabileceğini gösterir.</p>`, {
  star: true,
  exam: `Lines terminate in either a "single toe" or a "crow's foot" <i>(terminate = biter)</i>`,
})}
${term(`Single Toe`, `Tek uç`, `<p>Çatalsız, düz biten uç. O entity’den “bir ve yalnızca bir” olduğunu gösterir.</p>`)}
`,
    },

    // ------------------------------------------------------------------ 3-3
    {
      id: '3-3',
      title: 'ERDish konuşmak ve ilişki çizmek',
      en: 'Speaking ERDish & Drawing Relationships',
      html: `
${term(`ERDish`, `ERD dili`, `<p>ERD’deki ilişkiyi kalıplı bir İngilizce cümleyle söylemek. Müşteriyle konuşurken de, tasarımı DBA’ya anlatırken de ortak dil olur.</p>`, {
  star: true,
  exam: `The vocabulary used to clearly communicate the business rules that are captured on an ERD`,
})}

${h2('Cümlenin 6 parçası')}
<ol class="erdish">
  <li>EACH</li>
  <li>Entity A</li>
  <li>must be / may be<small>optionality</small></li>
  <li>relationship name</li>
  <li>one and only one / one or more<small>cardinality</small></li>
  <li>Entity B</li>
</ol>

${h2('Bir ilişki, iki cümle')}
${erd('erdish')}
${say(`Each EMPLOYEE <b>must</b> work in <b>one and only one</b> DEPARTMENT.`, `Soldan sağa: EMPLOYEE tarafı düz → must; DEPARTMENT ucu single toe → one and only one.`)}
${say(`Each DEPARTMENT <b>may</b> be responsible for <b>one or more</b> EMPLOYEEs.`, `Sağdan sola: DEPARTMENT tarafı kesikli → may; EMPLOYEE ucu crow’s foot → one or more.`)}
${tip(`<b>Must / may</b> için çizginin, <b>cümleye başladığın entity’nin</b> tarafındaki yarısına bak. <b>Kaç tane</b> için <b>karşı uca</b> bak. İlişki adı da kendi entity’sinin yanına yazılır. Çizgi ve uç işaretlerinin listesi 3-2’de.`, 'Okuma kuralı')}
${note(`Slayt metninde “MAY BE (solid line)” ve “ONE OR MORE (single toe)” yazıyor; bu bir hata. Slayttaki çizimde de görüldüğü gibi may kesikli çizgidir, one or more ise crow’s foot.`, 'Slayttaki hata')}
`,
    },

    // ------------------------------------------------------------------ 3-4
    {
      id: '3-4',
      title: 'Matrix diyagramı',
      en: 'Matrix Diagrams',
      html: `
${term(`Matrix diagram`, `Matris diyagramı`, `<p>Entity’leri hem satırlara hem sütunlara yazdığın bir tablo. Her hücre “bu ikisi arasında ilişki var mı?” diye sorar. 3 entity’de buna gerek yok ama 13 entity olunca hiçbir ilişkiyi atlamamanı sağlar.</p>`, {
  star: true,
  exam: `A grid-like drawing that can be used to discover and record relationships between entities`,
})}
<p>Slayttaki örnekte bir seyahat acentesi müşterilerin gezdiği ülkeleri ve gördüğü yerleri (landmark) kaydediyor:</p>
<div class="table-wrap"><table class="matrix">
  <thead><tr><th></th><th>TRAVELER</th><th>COUNTRY</th><th>LANDMARK</th></tr></thead>
  <tbody>
    <tr><td>TRAVELER</td><td class="diag"></td><td>visit</td><td>have seen</td></tr>
    <tr><td>COUNTRY</td><td>visited by</td><td class="diag"></td><td>the location of</td></tr>
    <tr><td>LANDMARK</td><td>seen by</td><td>located in</td><td class="diag"></td></tr>
  </tbody>
</table></div>
${mix('Hep tek yönde oku', `Satır, sonra hücre, sonra sütun: “COUNTRY visited by TRAVELER” doğru. “TRAVELER visited by COUNTRY” yanlış.`)}
${note(`Matrix diyagramı optionality ve cardinality göstermez. Önce ilişkileri ERDish ile yaz, sonra ERD’yi çiz. Bir entity kendisiyle ilişkiliyse köşegendeki hücre de dolar.`)}
${say(`Each LANDMARK <b>must</b> be located in <b>one and only one</b> COUNTRY.`, `Her yer tek bir ülkededir.`)}
${say(`Each COUNTRY <b>may</b> be the location of <b>one or more</b> LANDMARKs.`, `Bir ülkede birden çok yer olabilir.`)}
${say(`Each TRAVELER <b>may</b> visit <b>one or more</b> COUNTRIES.`, `TRAVELER ile diğer iki entity arasındaki ilişkilerin hepsi “may … one or more”.`)}
${erd('travel', 'Matristen çıkan ERD. TRAVELER ile diğer ikisi arasında many-to-many ilişki var; bunun çözümü 5-3’te.')}
`,
    },
  ],
});
