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
    { a: { e: 'emp', side: 'r', must: true, many: true, label: 'work in' }, b: { e: 'dept', side: 'l', must: false, label: 'responsible for', ly: 63 } },
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
  desc: 'Optionality ve cardinality’yi, ERD çizim kurallarını, bir ilişkiyi ERDish ile okumayı ve matrix diyagramını öğreniyorsun.',
  lessons: [
    // ------------------------------------------------------------------ 3-1
    {
      id: '3-1',
      title: 'İlişkileri bulmak',
      en: 'Identifying Relationships',
      html: `
${term(`Relationship`, `İlişki`, `<p>İlişki, iki entity arasındaki bağlantıdır; bir STUDENT’ın bir BOOK’u ödünç alması gibi.</p>`, {
  star: true,
  exam: `A connection or association between objects`,
  more: `<p>ER’deki “R” harfi buradan gelir. Kütüphane örneğinde “ödünç alır”, STUDENT ile BOOK arasındaki ilişkidir. Bir entity kendisiyle de ilişkili olabilir. Modelde ilişkiler en az entity’ler kadar önemlidir.</p>`,
})}
<p>İlişkilerin şu özellikleri var:</p>
<ul>
  <li>Represent something of significance or importance to the business <i>(işletme için önemli bir şeyi gösterir)</i></li>
  <li>Show how entities are related to each other <i>(entity’lerin birbirine nasıl bağlı olduğunu gösterir)</i></li>
  <li>Exist only between entities (or one entity and itself) <i>(entity kendisiyle de ilişkili olabilir)</i></li>
  <li>Are bi-directional <i>(iki yönlüdür)</i></li>
  <li>Are named at both ends <i>(iki ucunun da adı vardır)</i></li>
  <li>Have optionality and cardinality</li>
</ul>
<p>İki entity arasında birden fazla ilişki de olabilir; mesela bir PERSON bir CLASS’a katılabilir (attend), onu verebilir (teach) ya da onun hakkında yazabilir (write).</p>
${term(`Optionality`, `Zorunluluk`, `<p>Optionality, ilişkinin zorunlu mu yoksa isteğe bağlı mı olduğunu söyler; yani “must mı, may mi?” sorusunun cevabıdır.</p>`, {
  star: true,
  exam: `Relationships are either mandatory or optional`,
  more: `<p>Mesela her çalışanın bir işi olmak zorunda mı? Evet, o zaman <b>must</b> deriz. Peki her iş birine verilmek zorunda mı? Hayır, boş kadro da olabilir; o zaman <b>may</b> deriz.</p>`,
})}
${term(`Cardinality`, `Kaç tane`, `<p>Cardinality, ilişkinin öbür ucunda kaç tane instance olabileceğini söyler ve cevabı ya <b>one and only one</b> (bir ve yalnızca bir) ya da <b>one or more</b> (bir veya daha çok) olur.</p>`, {
  star: true,
  exam: `Only answers whether the number is singular or plural <i>(tekil mi, çoğul mu)</i>`,
  more: `<p>Yani cardinality “kaç tane?” sorusunun cevabıdır. Kesin bir sayı vermez; sadece tekil mi çoğul mu, onu söyler.</p>`,
})}
${mix('Optionality ve cardinality', `Optionality <b>must / may</b> sorusunu cevaplar, yani ilişkinin zorunlu olup olmadığına bakar. Cardinality ise <b>one / one or more</b> sorusunu cevaplar, yani kaç tane olduğuna bakar.`)}

${h2('İlişki cümleleri')}
${say(`Each EMPLOYEE <b>must</b> hold <b>one and only one</b> JOB.`, `Her çalışanın tam olarak bir işi olmak zorunda.`)}
${say(`Each JOB <b>may</b> be held by <b>one or more</b> EMPLOYEEs.`, `Bir iş bir ya da daha çok çalışana verilebilir, ama boşta da kalabilir.`)}
${say(`Each PRODUCT <b>must</b> be classified by <b>one and only one</b> PRODUCT TYPE.`, `Her ürün tam olarak bir ürün türüne ait olmak zorunda.`)}
${say(`Each PRODUCT TYPE <b>may</b> classify <b>one or more</b> PRODUCTs.`, `Bir ürün türünde bir ya da daha çok ürün olabilir, ama hiç ürün olmayabilir de.`)}
${more(`<p>Cümle daha rahat okunsun diye ikinci entity’nin adının sonuna küçük bir “s” eklenir; PRODUCTs, EMPLOYEEs gibi.</p>`)}
${say(`Each CUSTOMER <b>must</b> place <b>one or more</b> ORDERs.`, `Restoranda her müşteri en az bir sipariş vermek zorundadır. Bir anne kendisi ve çocukları için sipariş verse bile siparişin sahibi ve parasını ödeyen müşteri annedir.`)}
${say(`Each ORDER <b>must</b> be placed by <b>one and only one</b> CUSTOMER.`, `Her siparişi tek bir müşteri verir, yani siparişin tek bir sahibi vardır.`)}
${say(`Each EMPLOYEE <b>may</b> be managed by <b>one and only one</b> EMPLOYEE.`, `Bir çalışanın en fazla bir yöneticisi olabilir. Yönetici de bir EMPLOYEE olduğu için ilişki entity’nin kendisine döner.`)}
${say(`Each EMPLOYEE <b>may</b> manage <b>one or more</b> EMPLOYEEs.`, `Bir yönetici birden çok çalışanı yönetebilir.`)}
${say(`Each SEAT <b>may</b> be sold to <b>one or more</b> PASSENGERs.`, `Bir koltuk hiç satılmayabilir, ama birden çok yolcuya da satılabilir; buna overbooking denir.`)}
${say(`Each PASSENGER <b>may</b> purchase <b>one</b> SEAT.`, `Bir yolcu bir koltuk satın alabilir.`)}
${note(`Bu soruların cevabı işletmenin kurallarına (business rules) göre değişir. Mesela bir havayolu şirketi aynı koltuğu birden çok yolcuya satabilir, başka bir şirket ise satmayabilir.`)}
`,
    },

    // ------------------------------------------------------------------ 3-2
    {
      id: '3-2',
      title: 'ERD çizim kuralları',
      en: 'ER Diagramming Conventions',
      html: `
${term(`ER Diagramming`, `ERD çizimi`, `<p>ERD’yi herkesin aynı şekilde okuyabilmesi için ortak kurallarla (convention) çizeriz.</p>`, {
  exam: `Everyone draws ER diagrams according to the same conventions`,
  more: `<p>Trafik işaretleri gibi düşün: herkes aynı işareti kullandığı için kimsenin ayrıca açıklama istemesine gerek kalmaz.</p>`,
})}
${term(`Softbox`, `Yuvarlak köşeli kutu`, `<p>Softbox, köşeleri yuvarlatılmış kutudur ve ERD’de her entity bununla çizilir.</p>`, {
  star: true,
  exam: `Entity names are always singular and written with all capital letters`,
  more: `<p>Entity’nin adı kutunun içine tekil ve tamamen büyük harfle yazılır; yani EMPLOYEES değil, EMPLOYEE.</p>`,
})}

${h2('Attribute işaretleri')}
${table(['İşaret', 'Anlamı'], [
  ['<code>#</code>', 'Unique identifier (UID), yani her instance’ı birbirinden ayıran attribute'],
  ['<code>*</code>', 'Mandatory, yani değeri mutlaka girilmesi gereken (zorunlu) attribute'],
  ['<code>o</code>', 'Optional, yani boş bırakılabilen (isteğe bağlı) attribute'],
])}
${note(`UID’nin parçası olan bir attribute zaten zorunludur. Bu yüzden önüne sadece <code>#</code> konur, ayrıca <code>*</code> konmaz.`)}
${erd('conv', 'Her entity’nin attribute’ları, kutunun içinde entity adının altına sıralanır.', `Kutuların içindeki satırların başına bak: <code>#</code> ile başlayan satır UID, <code>*</code> ile başlayan zorunlu, <code>o</code> ile başlayan isteğe bağlı bir attribute. Mesela EMPLOYEE’deki Commission’ın başında <code>o</code> var, yani her çalışanın komisyonu olmak zorunda değil. Kutuları birleştiren çizgilerin anlamını hemen aşağıda göreceksin.`)}

${h2('İlişki çizgileri')}
<p>Bir ilişki çizgisinde iki şeye bakarsın. Çizginin kendisi düz mü kesikli mi, ona bakınca optionality’yi (must / may) anlarsın. Çizginin entity’ye değdiği uç çatallı mı değil mi, ona bakınca da cardinality’yi (one / one or more) anlarsın.</p>
<div class="legend-erd">
  <div>${lineSample('solid')}<p><strong>Düz çizgi</strong><span>must, yani ilişki zorunlu</span></p></div>
  <div>${lineSample('dash')}<p><strong>Kesikli çizgi</strong><span>may, yani ilişki isteğe bağlı</span></p></div>
  <div>${lineSample('toe')}<p><strong>Single toe</strong><span>one and only one; uç çatalsız biter</span></p></div>
  <div>${lineSample('foot')}<p><strong>Crow’s foot</strong><span>one or more, yani bir veya daha çok</span></p></div>
</div>
${term(`Crow’s Foot`, `Karga ayağı`, `<p>Crow’s foot, çizginin entity’ye değdiği uçtaki üç çatallı işarettir ve o uçtaki entity’den “bir veya daha çok” instance olabileceğini gösterir.</p>`, {
  star: true,
  exam: `Lines terminate in either a "single toe" or a "crow's foot" <i>(terminate = biter)</i>`,
  more: `<p>Karga ayağına benzediği için bu adı almış.</p>`,
})}
${term(`Single Toe`, `Tek uç`, `<p>Single toe, çizginin çatalsız, düz bittiği uçtur ve o uçtaki entity’den “bir ve yalnızca bir” instance olduğunu gösterir.</p>`)}
`,
    },

    // ------------------------------------------------------------------ 3-3
    {
      id: '3-3',
      title: 'ERDish konuşmak ve ilişki çizmek',
      en: 'Speaking ERDish & Drawing Relationships',
      html: `
${term(`ERDish`, `ERD dili`, `<p>ERDish, ERD’deki bir ilişkiyi kalıplı bir İngilizce cümleyle söylemektir.</p>`, {
  star: true,
  exam: `The vocabulary used to clearly communicate the business rules that are captured on an ERD`,
  more: `<p>Böylece hem müşteriyle konuşurken hem de tasarımı DBA’ya (veritabanı yöneticisine) anlatırken herkes aynı dili kullanır.</p>`,
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
<p>Her ilişkinin iki ucu olduğu için ilk cümleyi soldan sağa (ERD dikey çizilmişse yukarıdan aşağı), ikinci cümleyi de ters yönde okursun.</p>
${erd('erdish', '', `Çizgiyi tam ortasından ikiye böl: sol yarı EMPLOYEE’ye, sağ yarı DEPARTMENT’a ait. Sol yarının düz, sağ yarının kesikli olduğuna dikkat et. Uçlara da bak: EMPLOYEE ucunda crow’s foot var, DEPARTMENT ucunda ise yok.`)}
${say(`Each EMPLOYEE <b>must</b> work in <b>one and only one</b> DEPARTMENT.`, `Soldan sağa okuyoruz. EMPLOYEE tarafındaki yarı düz çizgi, o yüzden must. DEPARTMENT ucunda single toe var, o yüzden one and only one.`)}
${say(`Each DEPARTMENT <b>may</b> be responsible for <b>one or more</b> EMPLOYEEs.`, `Sağdan sola okuyoruz. DEPARTMENT tarafındaki yarı kesikli çizgi, o yüzden may. EMPLOYEE ucunda crow’s foot var, o yüzden one or more.`)}
${tip(`<b>Must / may</b> kararı için çizginin, <b>cümleye başladığın entity’nin</b> tarafındaki yarısına bak. <b>Kaç tane</b> olduğunu anlamak için ise <b>karşı uçtaki</b> işarete bak. İlişkinin adı da kendi entity’sinin yanına yazılır.`, 'Okuma kuralı')}
`,
    },

    // ------------------------------------------------------------------ 3-4
    {
      id: '3-4',
      title: 'Matrix diyagramı',
      en: 'Matrix Diagrams',
      html: `
${term(`Matrix diagram`, `Matris diyagramı`, `<p>Matrix diyagramı, entity’leri hem satırlara hem sütunlara yazdığın ve aralarındaki ilişkileri bulmana yarayan bir tablodur.</p>`, {
  star: true,
  exam: `A grid-like drawing that can be used to discover and record relationships between entities`,
  more: `<p>Her hücrede “bu iki entity arasında ilişki var mı?” diye kendine sorarsın; varsa ilişkinin adını hücreye yazarsın. 3 entity’de ilişkileri akıldan bulmak kolaydır, ama 13 ya da daha fazla entity olunca bir ilişkiyi gözden kaçırmak çok kolaylaşır.</p>`,
})}
<p>Özellikle çok sayıda entity ile çalışırken matrix diyagramı, hiçbir ilişkiyi atlamadığından emin olmanın iyi bir yoludur.</p>
<p>Örnekte bir seyahat acentesi, müşterilerinin gezdiği ülkeleri ve gördüğü önemli yerleri (landmark) kaydediyor:</p>
${figure(`<div class="table-wrap"><table class="matrix">
  <thead><tr><th></th><th>TRAVELER</th><th>COUNTRY</th><th>LANDMARK</th></tr></thead>
  <tbody>
    <tr><td>TRAVELER</td><td class="diag"></td><td>visit</td><td>have seen</td></tr>
    <tr><td>COUNTRY</td><td style="color:var(--red);font-weight:800">visited by</td><td class="diag"></td><td>the location of</td></tr>
    <tr><td>LANDMARK</td><td>seen by</td><td>located in</td><td class="diag"></td></tr>
  </tbody>
</table></div>`, '', `Kırmızı hücreyi okumak için önce satırın başındaki entity’yi, sonra hücredeki adı, en son sütunun başındaki entity’yi söyle: “COUNTRY visited by TRAVELER”. Köşegendeki taralı hücreler boş, çünkü bu örnekte hiçbir entity kendisiyle ilişkili değil.`)}
${mix('Hep tek yönde oku', `Matrisi her zaman aynı sırayla okursun: önce satırdaki entity, sonra hücredeki ilişki adı, en son sütundaki entity. Yani “COUNTRY visited by TRAVELER” doğru, “TRAVELER visited by COUNTRY” yanlış. Aynı şekilde “LANDMARK seen by TRAVELER” doğru, “TRAVELER seen by LANDMARK” yanlış.`)}
${note(`Matrix diyagramı optionality ve cardinality göstermez; sadece hangi entity’ler arasında ilişki olduğunu ve ilişkinin adını gösterir. Bu yüzden önce ilişkileri ERDish ile yazarsın, sonra ERD’yi çizersin. Bir entity kendisiyle ilişkiliyse köşegendeki hücre de dolar.`)}
${say(`Each LANDMARK <b>must</b> be located in <b>one and only one</b> COUNTRY.`, `Her landmark tek bir ülkede bulunur.`)}
${say(`Each COUNTRY <b>may</b> be the location of <b>one or more</b> LANDMARKs.`, `Bir ülkede birden çok landmark olabilir, ama hiç olmayabilir de.`)}
${say(`Each TRAVELER <b>may</b> visit <b>one or more</b> COUNTRIES.`, `Bir yolcu bir ya da daha çok ülke gezebilir, ama hiç gezmemiş de olabilir.`)}
${say(`Each COUNTRY <b>may</b> be visited by <b>one or more</b> TRAVELERs.`, `Bir ülkeyi bir ya da daha çok yolcu gezmiş olabilir, ama hiç kimse gezmemiş de olabilir.`)}
<p>TRAVELER ile LANDMARK arasındaki ilişki de iki yönde aynı kalıptadır: “Each TRAVELER may have seen one or more LANDMARKs” ve “Each LANDMARK may be seen by one or more TRAVELERs”.</p>
${erd('travel', 'Matristen çıkan ERD. TRAVELER ile diğer iki entity arasında many-to-many ilişki var; bunun nasıl çözüldüğünü 5-3’te göreceksin.', `Matristeki her ilişki burada bir çizgi oldu. TRAVELER’dan çıkan iki çizginin iki yarısı da kesikli ve iki ucunda da crow’s foot var, yani iki yönde de “may … one or more”. LANDMARK ile COUNTRY arasındaki çizgi ise LANDMARK tarafında düz (must), COUNTRY ucunda da çatalsız (one and only one).`)}
`,
    },
  ],
});
