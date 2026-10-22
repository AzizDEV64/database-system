// Türkçe bölüm, Hafta 4: Varlık ilişki şemaları (kaynak: türkçe/H4 - Varlık İlişki Şemaları.pdf)
// Diyagramlar slayttaki Chen gösterimiyle çizilir (CHEN, erd.js).

// ---------- şekillerin anlamı ----------
CHEN.trLegend = {
  w: 540, h: 205, label: 'Varlık-ilişki çizelgesi şekilleri',
  nodes: [
    { id: 'a', t: 'ent', x: 75, y: 35, label: 'ÖĞRENCİ' },
    { id: 'b', t: 'weak', x: 205, y: 35, label: 'FAKÜLTE' },
    { id: 'c', t: 'dep', x: 335, y: 35, label: 'ÜRÜN' },
    { id: 'd', t: 'rel', x: 465, y: 35, label: 'Aldığı' },
    { id: 'e', t: 'attr', x: 75, y: 135, label: 'Adres' },
    { id: 'f', t: 'key', x: 205, y: 135, label: 'Öğrenci No' },
    { id: 'g', t: 'derived', x: 335, y: 135, label: 'Yaş' },
    { id: 'h', t: 'multi', x: 465, y: 135, label: 'Telefon' },
  ],
  notes: [
    { x: 75, y: 82, text: 'Varlık kümesi' }, { x: 205, y: 82, text: 'Zayıf varlık kümesi' },
    { x: 335, y: 82, text: 'Bağımlı varlık kümesi' }, { x: 465, y: 82, text: 'İlişki kümesi' },
    { x: 75, y: 180, text: 'Nitelik' }, { x: 205, y: 180, text: 'Anahtar nitelik' },
    { x: 335, y: 180, text: 'Türetilen nitelik' }, { x: 465, y: 180, text: 'Çok değerli nitelik' },
  ],
};

// ---------- nitelik türleri ----------
CHEN.trAttrs = {
  w: 540, h: 275, label: 'Nitelik türleri: KULLANICI',
  nodes: [
    { id: 'u', t: 'ent', x: 265, y: 125, label: 'KULLANICI' },
    { id: 'kod', t: 'key', x: 105, y: 40, label: 'Kod' },
    { id: 'ep', t: 'attr', x: 85, y: 125, label: 'E-posta' },
    { id: 'tel', t: 'multi', x: 110, y: 205, label: 'Telefon' },
    { id: 'yas', t: 'derived', x: 420, y: 40, label: 'Yaş' },
    { id: 'dt', t: 'attr', x: 445, y: 125, label: 'Doğum Tarihi' },
    { id: 'isim', t: 'attr', x: 385, y: 200, label: 'İsim' },
    { id: 'ad', t: 'attr', x: 320, y: 250, label: 'Ad' },
    { id: 'sa', t: 'attr', x: 455, y: 250, label: 'Soyad' },
  ],
  links: [
    { a: 'u', b: 'kod' }, { a: 'u', b: 'ep' }, { a: 'u', b: 'tel' }, { a: 'u', b: 'yas' },
    { a: 'u', b: 'dt' }, { a: 'u', b: 'isim' }, { a: 'isim', b: 'ad' }, { a: 'isim', b: 'sa' },
  ],
};

// ---------- ilişki türleri ----------
CHEN.trTypes = {
  w: 540, h: 235, label: 'Bire-bir, bire-çok, çoka-çok',
  nodes: [
    { id: 'e', t: 'ent', x: 75, y: 35, label: 'Erkek' }, { id: 'ev', t: 'rel', x: 270, y: 35, label: 'Evlilik' }, { id: 'k', t: 'ent', x: 465, y: 35, label: 'Kadın' },
    { id: 'b', t: 'ent', x: 75, y: 115, label: 'Bölüm' }, { id: 'ok', t: 'rel', x: 270, y: 115, label: 'Okuyan' }, { id: 'o', t: 'ent', x: 465, y: 115, label: 'Öğrenci' },
    { id: 'o2', t: 'ent', x: 75, y: 195, label: 'Öğrenci' }, { id: 'al', t: 'rel', x: 270, y: 195, label: 'Aldığı' }, { id: 'd', t: 'ent', x: 465, y: 195, label: 'Ders' },
  ],
  links: [
    { a: 'ev', b: 'e', card: '1' }, { a: 'ev', b: 'k', card: '1' },
    { a: 'ok', b: 'b', card: '1' }, { a: 'ok', b: 'o', card: 'n' },
    { a: 'al', b: 'o2', card: 'n' }, { a: 'al', b: 'd', card: 'm' },
  ],
};

// ---------- ilişkide nitelik: mağaza sattığı mal ----------
CHEN.trSattigi = {
  w: 600, h: 180, label: 'MAĞAZA sattığı MAL (n-m), Miktar ilişkinin niteliği',
  nodes: [
    { id: 'mg', t: 'ent', x: 130, y: 90, label: 'MAĞAZA' },
    { id: 'mno', t: 'key', x: 70, y: 30, label: 'Mağaza No' }, { id: 'mad', t: 'attr', x: 195, y: 30, label: 'Mağaza Adı' },
    { id: 'r', t: 'rel', x: 300, y: 90, label: 'Sattığı', hl: true },
    { id: 'mik', t: 'attr', x: 300, y: 155, label: 'Miktar', hl: true },
    { id: 'ml', t: 'ent', x: 470, y: 90, label: 'MAL' },
    { id: 'mk', t: 'key', x: 410, y: 30, label: 'Mal Kodu' }, { id: 'mlad', t: 'attr', x: 535, y: 30, label: 'Mal Adı' },
  ],
  links: [
    { a: 'mg', b: 'mno' }, { a: 'mg', b: 'mad' }, { a: 'ml', b: 'mk' }, { a: 'ml', b: 'mlad' },
    { a: 'r', b: 'mik', hl: true },
    { a: 'r', b: 'mg', card: 'n' }, { a: 'r', b: 'ml', card: 'm' },
  ],
};

// ---------- 1-1: bölüm başkanı ----------
CHEN.trBaskan = {
  w: 700, h: 195, label: 'BÖLÜM ve PERSONEL arasında bölüm başkanlığı (1-1)',
  nodes: [
    { id: 'b', t: 'ent', x: 120, y: 105, label: 'BÖLÜM' },
    { id: 'bno', t: 'key', x: 62, y: 35, label: 'Bölüm No' }, { id: 'bad', t: 'attr', x: 185, y: 35, label: 'Bölüm Adı' },
    { id: 'r', t: 'rel', x: 345, y: 105, label: 'Bölüm Başkanı' },
    { id: 'g', t: 'attr', x: 345, y: 30, label: 'Göreve Başlama Tarihi' },
    { id: 'p', t: 'ent', x: 570, y: 105, label: 'PERSONEL' },
    { id: 'pno', t: 'key', x: 505, y: 35, label: 'Personel No', hl: true }, { id: 'ad', t: 'attr', x: 635, y: 35, label: 'Adı' },
    { id: 'sa', t: 'attr', x: 505, y: 170, label: 'Soyadı' }, { id: 'dt', t: 'attr', x: 628, y: 170, label: 'Doğum Tarihi' },
  ],
  links: [
    { a: 'b', b: 'bno' }, { a: 'b', b: 'bad' }, { a: 'r', b: 'g' },
    { a: 'p', b: 'pno', hl: true }, { a: 'p', b: 'ad' }, { a: 'p', b: 'sa' }, { a: 'p', b: 'dt' },
    { a: 'r', b: 'b', card: '1' }, { a: 'r', b: 'p', card: '1' },
  ],
};

// ---------- 1-n: personel çalışır bölüm ----------
CHEN.trCalisir = {
  w: 610, h: 180, label: 'PERSONEL çalışır BÖLÜM (n-1)',
  nodes: [
    { id: 'p', t: 'ent', x: 130, y: 90, label: 'PERSONEL' },
    { id: 'pid', t: 'key', x: 65, y: 30, label: 'Personel No' }, { id: 'as', t: 'attr', x: 200, y: 30, label: 'Ad Soyad' },
    { id: 'adr', t: 'attr', x: 65, y: 150, label: 'Adres' }, { id: 'm', t: 'attr', x: 195, y: 150, label: 'Maaş' },
    { id: 'r', t: 'rel', x: 345, y: 90, label: 'Çalışır' },
    { id: 'b', t: 'ent', x: 530, y: 90, label: 'BÖLÜM' },
    { id: 'bid', t: 'key', x: 530, y: 30, label: 'Bölüm No', hl: true }, { id: 'badi', t: 'attr', x: 530, y: 150, label: 'Ad' },
  ],
  links: [
    { a: 'p', b: 'pid' }, { a: 'p', b: 'as' }, { a: 'p', b: 'adr' }, { a: 'p', b: 'm' },
    { a: 'b', b: 'bid', hl: true }, { a: 'b', b: 'badi' },
    { a: 'r', b: 'p', card: 'n' }, { a: 'r', b: 'b', card: '1' },
  ],
};

// ---------- n-m: film oynar sinema ----------
CHEN.trOynar = {
  w: 620, h: 180, label: 'FİLM oynar SİNEMA (n-m)',
  nodes: [
    { id: 'f', t: 'ent', x: 135, y: 90, label: 'FİLM' },
    { id: 'fid', t: 'key', x: 75, y: 30, label: 'Film No', hl: true }, { id: 'fa', t: 'attr', x: 195, y: 30, label: 'Film Adı' },
    { id: 'yt', t: 'attr', x: 80, y: 150, label: 'Yapım Tarihi' }, { id: 'yo', t: 'attr', x: 205, y: 150, label: 'Yönetmen' },
    { id: 'r', t: 'rel', x: 310, y: 90, label: 'Oynar', hl: true },
    { id: 'ta', t: 'attr', x: 310, y: 30, label: 'Tarih' }, { id: 'sa', t: 'attr', x: 310, y: 150, label: 'Saat' },
    { id: 's', t: 'ent', x: 485, y: 90, label: 'SİNEMA' },
    { id: 'sid', t: 'key', x: 425, y: 30, label: 'Sinema No', hl: true }, { id: 'sad', t: 'attr', x: 555, y: 30, label: 'Sinema Adı' },
    { id: 'ad', t: 'attr', x: 425, y: 150, label: 'Adres' }, { id: 'te', t: 'attr', x: 555, y: 150, label: 'Telefon' },
  ],
  links: [
    { a: 'f', b: 'fid', hl: true }, { a: 'f', b: 'fa' }, { a: 'f', b: 'yt' }, { a: 'f', b: 'yo' },
    { a: 'r', b: 'ta' }, { a: 'r', b: 'sa' },
    { a: 's', b: 'sid', hl: true }, { a: 's', b: 'sad' }, { a: 's', b: 'ad' }, { a: 's', b: 'te' },
    { a: 'r', b: 'f', card: 'n' }, { a: 'r', b: 's', card: 'm' },
  ],
};

// ---------- özyineli ----------
CHEN.trOzyineli = {
  w: 440, h: 175, label: 'Özyineli bağıntı: öğretmen ve zümre başkanı',
  nodes: [
    { id: 'o', t: 'ent', x: 110, y: 60, label: 'ÖĞRETMEN' },
    { id: 'r', t: 'rel', x: 330, y: 60, label: 'Zümre Başkanı' },
  ],
  links: [
    { a: 'r', b: 'o', card: 'n', lx: 205, ly: 48 },
    { a: 'r', b: 'o', via: [[330, 140], [110, 140]], card: '1', lx: 125, ly: 112 },
  ],
  notes: [
    { x: 205, y: 34, text: 'öğretmen' },
    { x: 220, y: 158, text: 'zümre başkanı' },
  ],
};

// ---------- zayıf varlık ----------
CHEN.trZayif = {
  w: 650, h: 140, label: 'Zayıf varlık: ÜNİVERSİTE sahip FAKÜLTE',
  nodes: [
    { id: 'u', t: 'ent', x: 130, y: 100, label: 'ÜNİVERSİTE' },
    { id: 'un', t: 'key', x: 70, y: 35, label: 'Üniversite No', hl: true }, { id: 'ua', t: 'attr', x: 215, y: 35, label: 'Üniversite Adı' },
    { id: 'r', t: 'rel', x: 330, y: 100, label: 'Sahip' },
    { id: 'f', t: 'weak', x: 520, y: 100, label: 'FAKÜLTE' },
    { id: 'fn', t: 'key', x: 460, y: 35, label: 'Fakülte No' }, { id: 'fa', t: 'attr', x: 585, y: 35, label: 'Fakülte Adı' },
  ],
  links: [
    { a: 'u', b: 'un', hl: true }, { a: 'u', b: 'ua' }, { a: 'f', b: 'fn' }, { a: 'f', b: 'fa' },
    { a: 'r', b: 'u', card: '1' }, { a: 'r', b: 'f', card: 'n' },
  ],
};

// ---------- büyük örnek: ürün-bileşen-satıcı ----------
CHEN.trUrun = {
  w: 765, h: 345, label: 'Ürün-bileşen veri tabanı, çözümün tamamı',
  nodes: [
    { id: 's', t: 'ent', x: 290, y: 60, label: 'SATICI' },
    { id: 's1', t: 'attr', x: 170, y: 28, label: 'Adı' }, { id: 's2', t: 'key', x: 410, y: 28, label: 'Kodu' },
    { id: 's3', t: 'attr', x: 150, y: 90, label: 'Telefon No' }, { id: 's4', t: 'attr', x: 430, y: 90, label: 'Adresi' },
    { id: 'sa', t: 'rel', x: 290, y: 155, label: 'Satın Alma' },
    { id: 'sa1', t: 'attr', x: 160, y: 155, label: 'Tarih' }, { id: 'sa2', t: 'attr', x: 415, y: 150, label: 'Adet' },
    { id: 'b', t: 'ent', x: 290, y: 250, label: 'BİLEŞEN' },
    { id: 'b1', t: 'attr', x: 150, y: 225, label: 'Adı' }, { id: 'b2', t: 'attr', x: 150, y: 285, label: 'Miktar' },
    { id: 'b3', t: 'attr', x: 245, y: 320, label: 'Açıklama' }, { id: 'b4', t: 'key', x: 345, y: 320, label: 'Kodu' },
    { id: 'ur', t: 'rel', x: 455, y: 250, label: 'Üretim' },
    { id: 'ur1', t: 'attr', x: 455, y: 195, label: 'Adet' },
    { id: 'u', t: 'dep', x: 615, y: 250, label: 'ÜRÜN' },
    { id: 'u1', t: 'key', x: 570, y: 192, label: 'Kodu' }, { id: 'u2', t: 'attr', x: 670, y: 192, label: 'Adı' },
    { id: 'u3', t: 'attr', x: 545, y: 315, label: 'Birim Fiyat' }, { id: 'u4', t: 'attr', x: 690, y: 315, label: 'Stok Miktarı' },
  ],
  links: [
    { a: 's', b: 's1' }, { a: 's', b: 's2' }, { a: 's', b: 's3' }, { a: 's', b: 's4' },
    { a: 'sa', b: 'sa1' }, { a: 'sa', b: 'sa2' },
    { a: 'b', b: 'b1' }, { a: 'b', b: 'b2' }, { a: 'b', b: 'b3' }, { a: 'b', b: 'b4' },
    { a: 'ur', b: 'ur1' },
    { a: 'u', b: 'u1' }, { a: 'u', b: 'u2' }, { a: 'u', b: 'u3' }, { a: 'u', b: 'u4' },
    { a: 'sa', b: 's', card: '1' }, { a: 'sa', b: 'b', card: 'n' },
    { a: 'ur', b: 'b', card: 'n' }, { a: 'ur', b: 'u', card: 'm' },
  ],
};

// ---------- üçlü ilişki: konser ----------
CHEN.trKonser = {
  w: 690, h: 245, label: 'KONSER, ESER ve MÜZİSYEN arasında KATILIM',
  nodes: [
    { id: 'k', t: 'ent', x: 175, y: 75, label: 'KONSER' },
    { id: 'k1', t: 'key', x: 75, y: 118, label: 'Konser No' }, { id: 'k2', t: 'attr', x: 105, y: 28, label: 'Tarih' }, { id: 'k3', t: 'attr', x: 215, y: 25, label: 'Salon' },
    { id: 'r', t: 'rel', x: 360, y: 75, label: 'KATILIM' },
    { id: 'r1', t: 'attr', x: 360, y: 20, label: 'Görevi' },
    { id: 'e', t: 'ent', x: 545, y: 75, label: 'ESER' },
    { id: 'e1', t: 'key', x: 515, y: 22, label: 'Eser No' }, { id: 'e2', t: 'attr', x: 628, y: 28, label: 'Eser Adı' },
    { id: 'e3', t: 'attr', x: 642, y: 90, label: 'Besteci' }, { id: 'e4', t: 'attr', x: 592, y: 142, label: 'Eser Türü' },
    { id: 'm', t: 'ent', x: 360, y: 168, label: 'MÜZİSYEN' },
    { id: 'm1', t: 'key', x: 205, y: 168, label: 'Müzisyen No' }, { id: 'm2', t: 'attr', x: 360, y: 225, label: 'Adı' }, { id: 'm3', t: 'attr', x: 495, y: 190, label: 'Soyadı' },
  ],
  links: [
    { a: 'k', b: 'k1' }, { a: 'k', b: 'k2' }, { a: 'k', b: 'k3' }, { a: 'r', b: 'r1' },
    { a: 'e', b: 'e1' }, { a: 'e', b: 'e2' }, { a: 'e', b: 'e3' }, { a: 'e', b: 'e4' },
    { a: 'm', b: 'm1' }, { a: 'm', b: 'm2' }, { a: 'm', b: 'm3' },
    { a: 'r', b: 'k' }, { a: 'r', b: 'e' }, { a: 'r', b: 'm' },
  ],
};

TR_SECTIONS.push({
  no: 4,
  title: 'E‑R şemaları, tasarım ve normalizasyon',
  en: 'E-R Diagrams, Database Design and Normalization',
  desc: 'E-R şemaları, veri tabanı tasarımının yedi adımı ve tabloları tekrardan kurtaran normalizasyon kuralları.',
  lessons: [
    // ------------------------------------------------------------------ H4: Varlık ilişki şemaları (türkçe/H4 - Varlık İlişki Şemaları.pdf)
    {
      id: 'H4-er',
      label: 'H4',
      title: 'Varlık ilişki şemaları',
      en: 'Entity Relationship (E-R) Diagrams',
      html: `
<p class="lead">E-R (varlık-ilişki) şeması, veri tabanını kurmadan önce çizdiğin plandır: neyi saklayacağını ve bunların nasıl bağlandığını şekillerle gösterir.</p>

${h2('Şekiller')}
${erd('trLegend')}
${tterm(`Varlık kümesi`, `Entity set`, `<p>Varlık kümesi, hakkında bilgi tuttuğumuz şeylerin grubudur; ÖĞRENCİ ve DERS gibi.</p>`, {
  star: true,
  more: `<p>Veri tabanını kurarken her varlık kümesi bir tabloya dönüşür. Mesela bir okul sisteminde ÖĞRENCİ ve DERS ayrı ayrı tablolar olur.</p>`,
})}
${tterm(`Nitelik`, `Attribute`, `<p>Nitelik, bir varlığın özelliğidir; öğrencinin adı ya da doğum tarihi gibi.</p>`, {
  star: true,
  exam: `Varlıklar kendisinin özelliklerini belirleyen bir veya birden fazla nitelik ile birlikte tanımlanır.`,
  more: `<p>Tabloya geçtiğinde her nitelik bir sütun olur. Bir öğrencinin adı, soyadı ve doğum tarihi, ÖĞRENCİ tablosunun sütunlarıdır.</p>`,
})}
${tterm(`Anahtar nitelik`, `Key attribute`, `<p>Anahtar nitelik, değeri her varlıkta farklı olan niteliktir; öğrenci numarası gibi. Şemada altı çizili yazılır.</p>`, {
  star: true,
  more: `<p>İki öğrencinin numarası aynı olamayacağı için bir öğrenciyi bu numarayla kesin olarak bulursun. Tabloya geçtiğinde anahtar nitelik birincil anahtar olur.</p>`,
})}
<p>Bu şekillerle çizilen şemaya <b>Chen gösterimi</b> denir ve bu derste hep bu gösterimi kullanıyoruz. Aynı şema Martin (IE), IDEF1X, Min-Max (ISO), Bachman ve UML gibi başka gösterimlerle de çizilebilir.</p>

${h2('Nitelik türleri')}
${table(['Tür', 'Anlamı', 'Şekli'], [
  ['Çekirdek', 'Daha küçük parçalara bölünemez, ör. E‑posta', shape('attr', 'E‑posta') + '<small>Elips</small>'],
  ['Birleşik', 'Birkaç çekirdek nitelikten oluşur, ör. İsim = Ad + Soyad', chenSvg({
    w: 170, h: 84, nodes: [
      { id: 'i', t: 'attr', x: 85, y: 18, label: 'İsim' },
      { id: 'a', t: 'attr', x: 40, y: 66, label: 'Ad' },
      { id: 's', t: 'attr', x: 130, y: 66, label: 'Soyad' },
    ], links: [{ a: 'i', b: 'a' }, { a: 'i', b: 's' }],
  }) + '<small>Bir elipse bağlı elipsler</small>'],
  ['Türetilmiş', 'Saklanmaz, gerektiğinde hesaplanır, ör. yaş', shape('derived', 'Yaş') + '<small>Kesikli elips</small>'],
  ['Birden çok değer alabilen', 'Birden fazla değeri olabilir, ör. Telefon', shape('multi', 'Telefon') + '<small>Çift elips</small>'],
])}
${erd('trAttrs', '', 'Şekillere bak: altı çizili <b>Kod</b> anahtar nitelik, çift elipsli <b>Telefon</b> çok değerli, kesikli <b>Yaş</b> türetilmiş bir nitelik; yaş, doğum tarihinden hesaplanır. <b>İsim</b> ise Ad ve Soyad’a bölünen birleşik nitelik.')}
${mix('Türetilmiş ve çok değerli', `<b>Türetilmiş</b> nitelik hiç saklanmaz, ihtiyaç olunca hesaplanır. <b>Çok değerli</b> nitelik saklanır, ama birden fazla değeri vardır.`)}

${h2('Katılım kısıtları')}
${table(['Kısıt', 'Anlamı', 'Şekli'], [
  ['Zorunlu katılım', 'Varlık ilişkiye mutlaka katılır; varlık tarafına düz bir çizgi konur. Ör. her sınavda en az bir soru olmalı.', participation('bar') + '<small>Düz çizgi</small>'],
  ['Kısmi katılım', 'Katılmak isteğe bağlıdır; varlık tarafına yuvarlak işareti konur. Ör. bir soru hiç kullanılmamış olabilir.', participation('circle') + '<small>Yuvarlak işareti</small>'],
])}

${h2('İlişki türleri')}
${tterm(`İlişki`, `Relationship`, `<p>İlişki, varlıklar arasındaki bağdır ve şemada baklava dilimiyle çizilir; “öğrenci ders alır” gibi.</p>`, {
  star: true,
  more: `<p>İlişkinin adı baklava diliminin içine yazılır. “Öğrenci ders alır” dediğinde ÖĞRENCİ ile DERS arasında “alma” ilişkisi kurmuş olursun.</p>`,
})}
${erd('trTypes', '', 'Her satırı soldan sağa oku. Çizgi uçlarındaki 1, n ve m, o taraftan kaç kaydın ilişkiye girebileceğini gösterir: bir Bölüm’de n (birçok) Öğrenci okur, her Öğrenci ise 1 Bölüm’de okur.')}
${table(['Tür', 'Anlamı'], [
  ['Bire-bir (1-1)', 'Her varlık karşı taraftan en fazla bir varlıkla ilişkilidir; evlilik gibi.'],
  ['Bire-çok (1-n)', 'Bir kayıt karşı tarafta birçok kayıtla eşleşir, tersi olmaz. <b>En çok kullanılan</b> türdür; bir müşterinin birçok siparişi gibi.'],
  ['Çoka-çok (n-m)', 'İki taraf da karşıda birçok kayıtla eşleşir; öğrenci birçok ders alır, dersi de birçok öğrenci alır.'],
])}
${tterm(`Tanımlayıcı nitelik`, `Descriptive attribute`, `<p>Tanımlayıcı nitelik, bir varlığa değil ilişkinin kendisine ait olan niteliktir; bir mağazanın bir maldan ne kadar sattığını gösteren Miktar gibi.</p>`, {
  more: `<p>Miktar ne tek başına mağazanın ne de malın özelliğidir; ancak hangi mağazanın hangi malı sattığı birlikte bilinince anlam kazanır. Bu yüzden şemada baklava dilimine bağlanır.</p>`,
})}
${erd('trSattigi', '', 'Miktar elipsi bir varlığa değil, <b>Sattığı</b> baklavasına bağlı; yani Miktar, Sattığı ilişkisinin tanımlayıcı niteliği. İki uçta da “çok” var (n ve m): bir mağaza birçok mal satar, bir mal da birçok mağazada satılır.')}

${h2('Şemayı tablolara dönüştürmek')}
<p>Her varlık bir tabloya, her nitelik bir sütuna dönüşür; anahtarların yeri ise ilişki türüne göre belirlenir.</p>
${tip(`<b>1-1:</b> Tablolardan birinin birincil anahtarı, diğerine yabancı anahtar olarak eklenir; hangi tabloya ekleneceğine, tabloların tutacağı bilgilere bakarak karar verilir.<br><b>1-n:</b> “1” tarafının birincil anahtarı, “n” tarafına yabancı anahtar olarak eklenir.<br><b>n-m:</b> İlişkinin adını taşıyan üçüncü bir tablo kurulur; buna <b>bağlantı tablosu</b> denir. İki tablonun birincil anahtarları buraya yabancı anahtar olarak gelir, ilişkinin tanımlayıcı nitelikleri de bu tabloya sütun olarak eklenir. Bu tablonun birincil anahtarı genelde iki yabancı anahtarın birleşimidir; bu yetmezse yeni bir sütun eklenip birincil anahtar yapılır.`, 'Kısa kural')}
${more(`<p>Aşağıdaki şemalarda altı çizili sütun birincil anahtarı, kırmızı sütun yabancı anahtarı gösterir. Yabancı anahtar, başka bir tablonun birincil anahtarını taşıyan sütundur; iki tabloyu birbirine bu sütun bağlar.</p>`)}


<p><b>Bire-çok:</b> Bir bölümde birçok personel çalışır, bu yüzden Bölüm No, PERSONEL tablosuna eklenir.</p>
${erd('trCalisir', '', 'Çizginin BÖLÜM ucunda <b>1</b>, PERSONEL ucunda <b>n</b> yazıyor. Kırmızıyla gösterilen <b>Bölüm No</b>, aşağıdaki şemada PERSONEL tablosunun sonuna yabancı anahtar olarak ekleniyor.')}
${schema(['PERSONEL(#Personel No, Ad Soyad, Adres, Maaş, >Bölüm No)', 'BÖLÜM(#Bölüm No, Ad)'])}

<p><b>Çoka-çok:</b> Yeni bir tablo kurulur; iki tarafın anahtarları ve ilişkinin kendi nitelikleri bu tabloya gelir.</p>
${erd('trOynar', 'Tarih ve Saat, “oynar” ilişkisinin tanımlayıcı nitelikleridir; bu yüzden OYNAR tablosuna sütun olarak gelir.','İki uçta da “çok” var (n ve m): bir film birçok sinemada, bir sinema da birçok filmde oynar. Bu yüzden yabancı anahtar iki tablodan hiçbirine sığmaz. Kırmızı baklava kendi başına OYNAR tablosu olur; iki kırmızı anahtar, Film No ve Sinema No, bu tabloya gider.')}
${schema(['FİLM(#Film No, Film Adı, Yapım Tarihi, Yönetmen)', 'SİNEMA(#Sinema No, Sinema Adı, Adres, Telefon)', 'OYNAR(#Oynar No, >Film No, >Sinema No, Tarih, Saat)'])}
${more(`<p>Buradaki Oynar No, iki yabancı anahtarın birleşimi yerine birincil anahtar olarak eklenmiş yeni bir sütundur.</p>`)}

<p><b>Bire-bir:</b> Her bölümün bir başkanı vardır ve bu başkan da bir personeldir.</p>
${erd('trBaskan', 'Göreve başlama tarihi ne bölümün ne personelin tek başına özelliği; başkanlık ilişkisine ait olduğu için baklavaya bağlı.', 'İki uçta da <b>1</b> var, yani yabancı anahtar iki tablodan herhangi birine konabilir. Burada BÖLÜM seçiliyor: kırmızı <b>Personel No</b>, BÖLÜM tablosuna “Başkanın Personel No” adıyla gider, Göreve Başlama Tarihi de onunla birlikte BÖLÜM’e geçer. Nedeni aşağıdaki notta.')}
${schema(['BÖLÜM(#Bölüm No, Bölüm Adı, >Başkanın Personel No, Göreve Başlama Tarihi)', 'PERSONEL(#Personel No, Adı, Soyadı, Doğum Tarihi)'])}
${note(`Başkanın personel numarasını BÖLÜM tablosuna koymak daha uygundur, çünkü her bölümün bir başkanı vardır, bu sütun hep dolu olur. Tersini yapıp yönettiği bölümün numarasını PERSONEL tablosuna koysaydın, başkan olmayan herkeste bu sütun boş kalırdı.`, '1-1’de anahtar hangi tarafa?')}

${h2('Özel durumlar')}
${tterm(`Özyineli bağıntı`, `Recursive relationship`, `<p>Özyineli bağıntı, bir varlığın kendisiyle kurduğu ilişkidir; öğretmen ile zümre başkanı gibi.</p>`, {
  star: true,
  more: `<p>Her öğretmenin bir zümre başkanı vardır, ama zümre başkanı da sonuçta bir öğretmendir. Bu yüzden ÖĞRETMEN varlığı kendisiyle ilişkilendirilir.</p>`,
})}
${erd('trOzyineli', '', 'İki çizgi de aynı ÖĞRETMEN kutusuna bağlı: ilişki bu kutudan çıkıp yine ona dönüyor. Üstteki çizgi sıradan öğretmeni (n), alttaki zümre başkanını (1) gösterir; yani bir zümre başkanının birçok öğretmeni vardır.')}
${tterm(`Zayıf varlık kümesi`, `Weak entity set`, `<p>Zayıf varlık, başka bir varlık olmadan var olamayan ve tek başına anahtar oluşturamayan varlıktır. Şemada çift çizgili dikdörtgenle çizilir.</p>`, {
  star: true,
  exam: `Bir varlık kümesinin niteliklerinin tümü alınsa bile bir anahtar oluşturmuyorsa buna zayıf varlık kümesi denir.`,
  more: `<p>Fakülte, bir üniversite olmadan var olamaz; ayrıca aynı adlı bir fakülte başka bir üniversitede de bulunabilir. Bu yüzden bir fakülteyi kesin olarak bulmak için üniversitenin anahtarına da ihtiyacın olur; FAKÜLTE tablosunda Üniversite No da anahtarın parçasıdır.</p>`,
})}
${erd('trZayif', '', 'Çift çizgili FAKÜLTE kutusu zayıf varlık demek. Bir fakülteyi bulmak için Fakülte No yetmez, hangi üniversiteye ait olduğunu da bilmen gerekir. Bu yüzden kırmızı <b>Üniversite No</b>, aşağıdaki şemada FAKÜLTE’nin anahtarına katılır.')}
${schema(['ÜNİVERSİTE(#Üniversite No, Üniversite Adı)', 'FAKÜLTE(#>Üniversite No, #Fakülte No, Fakülte Adı)'])}
${tterm(`Varolma bağımlılığı`, `Existence dependency`, `<p>Bir varlık başka bir varlık olmadan var olamıyorsa ona varolma bağımlıdır; bağımlı olana <b>bağımlı (subordinate)</b>, öbürüne <b>üstün (dominant)</b> varlık denir.</p>`)}

${h2('Tablonun özellikleri')}
<p>Burada “ilişki” kelimesi tablonun kendisi demek. Bir tablonun özellikleri:</p>
<ol>
  <li>Satırların sırası önemli değildir.</li>
  <li>Bütün satırlar birbirinden farklıdır.</li>
  <li>Bütün satırlar farklı olduğu için her tablonun en az bir anahtarı (anahtar adayı) vardır; en kötü durumda bütün sütunlar birlikte anahtardır.</li>
  <li>Sütunların sırası da önemli değildir.</li>
  <li>Bir sütundaki bütün değerler aynı türdendir.</li>
  <li>Her hücrede tek ve yalın bir değer bulunur; dizi ya da tablo konamaz.</li>
</ol>
${more(`<p>Anahtar birden fazla sütundan da oluşabilir. Mesela bir öğrencinin bir dersten aldığı not, öğrenci numarası, ders kodu ve dönemin birleşimiyle bulunur:</p>
${schema(['ÖĞRDERS(#Öğrenci No, #Ders Kodu, #Dönemi, Notu)'])}`)}

${h2('Örnek: ürün-bileşen veri tabanı')}
<p>Satıcı ile bileşen arasında bire-çok, ürün ile bileşen arasında Adet nitelikli çoka-çok bir ilişki var; ÜRÜN de bağımlı bir varlık.</p>
${erd('trUrun', '', 'ÜRÜN kutusunun içindeki üst çizgi, onun bağımlı varlık olduğunu gösterir. Baklavalara bağlı elipsler ise ilişkinin nitelikleridir: Satın Alma’nın Tarih ve Adet’i, Üretim’in de Adet’i.')}
${more(`<p>Her bileşen tek bir satıcıdan alınır, ama bir satıcıdan birçok bileşen alınabilir; bu yüzden ilişki bire-çoktur. Bir üründe hangi bileşenden kaç adet kullanıldığı önemli olduğu için Üretim ilişkisine Adet niteliği eklenir. Her ürün bileşenlerine varolma bağımlıdır, bu yüzden ÜRÜN bağımlı varlık olarak çizilir. Bileşenin yanına satıcı kodunu ayrıca yazmana gerek yok; hangi satıcıdan alındığı Satın Alma ilişkisinden bulunur.</p>`)}

${h2('Örnek: üç varlıklı ilişki')}
<p>KATILIM ilişkisi KONSER, ESER ve MÜZİSYEN’i birbirine bağlar; tablosuna üç tarafın anahtarları ve Görevi niteliği gelir.</p>
${erd('trKonser', '', 'Üç varlığın çizgisi tek bir KATILIM baklavasında birleşiyor. Bu yüzden KATILIM tablosunun her satırı üç şeyi birlikte söyler: hangi konserde, hangi eseri, hangi müzisyen çaldı. Görevi de ancak bu üçü birlikte bilinince anlam kazanır.')}
${schema(['KONSER(#Konser No, Tarih, Salon)', 'ESER(#Eser No, Eser Adı, Eser Türü, Besteci)', 'MÜZİSYEN(#Müzisyen No, Adı, Soyadı)', 'KATILIM(>Konser No, >Eser No, >Müzisyen No, Görevi)'])}
`,
    },

    // ------------------------------------------------------------------ H4: Veri tabanı tasarımı (türkçe/H4 - Veritabanı Tasarımı.pdf)
    // kaynak: türkçe/H4 - Veritabanı Tasarımı.pdf
    {
      id: 'H4-tasarim',
      label: 'H4',
      title: 'Veri tabanı tasarımı',
      en: 'Database Design',
      html: `
<p class="lead">Bir veri tabanı projesinde en önemli aşama tasarımdır, çünkü baştan yanlış tasarlanan bir veri tabanını sonradan yapılan düzenlemelerle kurtarmak mümkün olmaz.</p>
${more(`<p>Bu yüzden tasarım yapılırken aşağıdaki yedi adım sırayla izlenir. Adımları kütüphane örneği üzerinden göreceksin.</p>`)}

${tterm(`Nesne`, `Object`, `<p>Nesne, çeşitli özellikleri olan bir varlıktır; kütüphane sisteminde kitap ya da üye gibi.</p>`, {
  star: true,
  exam: `Nesne, çeşitli özellikleri bulunan bir varlıktır.`,
  more: `<p>Örnekler: kütüphane sisteminde kitaplar, üyeler, türler ve ödünç hareketleri; okul sisteminde öğrenciler, öğretmenler, dersler ve derslikler; personel sisteminde çalışanlar, meslekler, birimler, maaşlar ve izinler; sözlükte kelimeler, anlamlar ve diller.</p>`,
})}
${tterm(`Anahtar alan`, `Key field`, `<p>Anahtar alan, tablodaki her kaydı diğerlerinden ayıran sütundur; kitap için Kitap No gibi.</p>`, {
  star: true,
  exam: `Tabloda yer alacak her bir kaydı bir diğerinden ayırabilecek bir sütuna ihtiyaç duyulur.`,
})}

${h2('Tasarımın yedi adımı')}
${steps([
  ['Nesneleri tanımla', 'Her projeye önce hangi nesnelerin olacağını belirleyerek başlarsın.'],
  ['Her nesne için bir tablo oluştur', 'Her tabloya, içindeki veriyi en iyi anlatan bir ad verirsin.'],
  ['Her tablo için bir anahtar alan seç', 'Her kaydı diğerlerinden ayıracak bir sütun belirlersin.'],
  ['Her özellik için bir sütun ekle', 'Nesnenin gerekli her özelliği tabloya bir alan (sütun) olarak eklenir.'],
  ['Tekrarlayan özellikler için ek tablo oluştur', 'Veri tekrarı olacaksa, tablo en az bir tabloya daha bölünmelidir.'],
  ['Anahtara bağlı olmayan alanları ayır', 'Anahtarla aynı satırda durup anahtarla doğrudan ilgisi olmayan alanlar ayrı bir tabloya taşınır.'],
  ['Tablolar arasındaki ilişkileri tanımla', 'Bütün tablolar birlikte düşünülerek aralarındaki ilişkiler belirlenir.'],
])}
${more(`<p><b>2. adım:</b> Proje bitene kadar bu tablolar üzerinde değişiklik yapılabilir.</p>
<p><b>4. adım, örnekler:</b> Kitap için Kitap No, ISBN No, kitap adı, yazarı, türü, sayfa sayısı, özeti, fiyatı, baskı yılı. Üye için Üye No, adı, soyadı, e-posta adresi, ev, cep ve iş telefonu. Personel için sicil no, adı, soyadı, e-posta adresi, mesleği, çalıştığı birim ve maaşı.</p>
<p><b>5. adım:</b> Akılda hep şu soru olmalı: veri tekrarı olacak mı? Tekrar oluyorsa bir yerde hata yapılıyor demektir.</p>`)}
${tip(`Tasarım yaparken her tablo için kendine şunu sor: <b>Bu bilgi birden fazla yerde tekrar yazılacak mı?</b> Cevap evetse, o bilgi kendi tablosuna taşınmalı.`, 'Akılda tutman gereken soru')}

${h2('Örnek: ödünç tablosu')}
<p>Ödünç verilen bir kitap için ödünç alanın adresini ÖDÜNÇ tablosuna yazmazsın, çünkü adres ödünç işleminin değil üyenin özelliğidir.</p>
${more(`<p>ÖDÜNÇ tablosunun birincil anahtarı Ödünç No’dur ve bu tablo ödünç verme işlemiyle ilgilidir. Adres ise ödünç alan kişiye bağlıdır; kişinin aldığı her kitap için adresini tekrar yazmaya gerek yoktur. Sistemin başka yerlerinde de bu adrese ihtiyaç olabilir. Bu yüzden ÜYE adında ayrı bir tablo açılır ve adres orada tutulur.</p>`)}
<p>ÖDÜNÇ tablosu üyeye, ÜYE tablosunun birincil anahtarı olan Üye No ile bağlanır; bu bağlantıya yabancı anahtar denir.</p>

${h2('Tablolar arasındaki ilişkiler')}
<p>Kitaplar üyelere ödünç verildiği için ÖDÜNÇ tablosu hem KİTAP hem ÜYE ile ilişkilidir. Her kitap en az bir türe ait olmalıdır, bu yüzden KİTAP ile TÜR arasında da bir ilişki vardır.</p>
${schema([
  'KİTAP(#Kitap No, Kitap Adı, ISBN No, Sayfa Sayısı, Kitap Özeti)',
  'TÜR(#Tür No, Tür Açıklaması)',
  'KİTAP_TÜR(#>Kitap No, #>Tür No)',
  'YAZAR(#Yazar No, Adı, Soyadı, Doğum Tarihi, Hayat Özeti)',
  'KİTAP_YAZAR(#Kitap Yazar No, >Yazar No, >Kitap No)',
  'ÜYE(#Üye No, Adı, Soyadı, Adresi, Aktif mi)',
  'ÖDÜNÇ(#Ödünç No, >Kitap No, >Üye No, Verme Tarihi, Verme Süresi, Geldi mi)',
])}
${note(`Altı çizili sütun birincil anahtar, kırmızı sütun yabancı anahtardır.`)}
`,
    },
  ],
});
