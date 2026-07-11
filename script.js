/* ============================================================
   DONNÉES PRODUITS
   Chaque produit a une liste de "designs" (motifs). Chaque design
   a UNE photo. Pour ajouter un nouveau modèle (ex. B018) ou un
   nouveau design, ajoutez simplement une entrée ici — le catalogue,
   la page produit et la page commande s'adaptent automatiquement.
   ============================================================ */
const PRODUCTS = {
  B015: {
    name: "Sac Totebag Classique",
    desc: "Toile résistante, doublure intérieure, format A4. Idéal pour un usage quotidien.",
    price: 3500,
    stock: 50,
    designs: [
      { id: "d1", label: "Rayures Multicolores", image: "images/b015-d1.jpg", grad: ["#E4C766", "#163832"] },
      { id: "d2", label: "Feuilles Tropicales",   image: "images/b015-d2.jpg", grad: ["#4a7ba6", "#163832"] },
      { id: "d3", label: "Motif Aztèque Vert",    image: "images/b015-d3.jpg", grad: ["#4a4a4a", "#1b1b1b"] },
      { id: "d4", label: "Hiboux Multicolores",   image: "images/b015-d4.jpg", grad: ["#C9A227", "#6b4226"] },
      { id: "d5", label: "Fleurs Automne",        image: "images/b015-d5.jpg", grad: ["#8a3f10", "#3a2414"] },
      { id: "d6", label: "Rayures Pastel",        image: "images/b015-d6.jpg", grad: ["#7BAE96", "#1F4A42"] }
    ]
  },
  B016: {
    name: "Sac Perles Artisanal",
    desc: "Perles cousues main, anses renforcées, format compact. Pièce unique faite main.",
    price: 5000,
    stock: 30,
    designs: [
      { id: "d1", label: "Perles Multicolore", image: "images/b016-d1.jpg", grad: ["#E2782B", "#C9A227"] },
      { id: "d2", label: "Perles Bleu",        image: "images/b016-d2.jpg", grad: ["#1F4A42", "#4a7ba6"] },
      { id: "d3", label: "Perles Terracotta",  image: "images/b016-d3.jpg", grad: ["#C1502E", "#6b4226"] }
    ]
  },
  B017: {
    name: "Sac Bandoulière Cuir",
    desc: "Simili-cuir premium, bandoulière ajustable, fermeture zip sécurisée.",
    price: 6000,
    stock: 20,
    designs: [
      { id: "d1", label: "Marron", image: "images/b017-d1.jpg", grad: ["#6b4226", "#3a2414"] },
      { id: "d2", label: "Noir",   image: "images/b017-d2.jpg", grad: ["#3a3a3a", "#141414"] }
    ]
  }
};

/* ============================================================
   DONNÉES PAYS / VILLES / PAIEMENT
   ============================================================ */
const CITIES = {
  "Sénégal": ["Dakar", "Thiès", "Kaolack", "Saint-Louis", "Ziguinchor", "Touba"],
  "Burkina Faso": ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Banfora", "Ouahigouya"]
};
const FLAGS = { "Sénégal": "🇸🇳", "Burkina Faso": "🇧🇫" };
const PAYMENT_INFO = {
  "Sénégal": { wave: "+221 77 000 00 00", om: "+221 78 000 00 00" },
  "Burkina Faso": { wave: "+226 70 00 00 00", om: "+226 76 00 00 00" }
};
const WHATSAPP_NUMBER = "221000000000"; // TODO: remplacer par le vrai numéro WhatsApp Business
const DEPOSIT_RATE = 30; // % d'acompte

function fmt(n){ return n.toLocaleString('fr-FR').replace(/,/g, ' '); }

/* ============================================================
   PAGE CATALOGUE (index.html)
   ============================================================ */
function initCatalogue(){
  const grid = document.getElementById('catalogueGrid');
  if(!grid) return;

  Object.entries(PRODUCTS).forEach(([code, p]) => {
    const main = p.designs[0];
    const card = document.createElement('a');
    card.href = `produit.html?code=${code}`;
    card.className = 'prodcard';
    card.innerHTML = `
      <div class="prodcard-img" style="background:linear-gradient(150deg, ${main.grad[0]}, ${main.grad[1]} 70%)">
        <img src="${main.image}" alt="${p.name}" onerror="this.style.display='none'">
      </div>
      <div class="prodcard-body">
        <div class="prodcard-name">${p.name}</div>
        <div class="prodcard-colors">${p.designs.length} design${p.designs.length>1?'s':''} disponible${p.designs.length>1?'s':''}</div>
        <div class="prodcard-price">${fmt(p.price)} FCFA</div>
        <div class="prodcard-stock">Stock : ${p.stock}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ============================================================
   PAGE PRODUIT (produit.html)
   ============================================================ */
function initProductPage(){
  const root = document.getElementById('productRoot');
  if(!root) return;

  const params = new URLSearchParams(location.search);
  const code = PRODUCTS[params.get('code')] ? params.get('code') : Object.keys(PRODUCTS)[0];
  const product = PRODUCTS[code];

  const hero = document.getElementById('prodHero');
  const heroImg = document.getElementById('heroImg');
  const grid = document.getElementById('designGrid');
  const designNameEl = document.getElementById('designName');
  const orderLink = document.getElementById('orderLink');

  document.getElementById('prodName').textContent = product.name;
  document.getElementById('prodDesc').textContent = product.desc;
  document.getElementById('prodPrice').textContent = fmt(product.price) + ' FCFA';
  document.getElementById('prodStock').textContent = `Il ne reste que ${product.stock} pièces disponibles`;
  document.title = product.name + ' — Korgoneere';

  function setMain(d){
    hero.style.background = `radial-gradient(120% 100% at 15% 0%, rgba(228,199,102,0.35), transparent 55%), linear-gradient(150deg, ${d.grad[0]}, ${d.grad[1]} 70%)`;
    heroImg.src = d.image;
    heroImg.style.display = 'block';
    heroImg.onerror = function(){ heroImg.style.display = 'none'; }; // photo pas encore ajoutée -> fond couleur reste visible
    designNameEl.textContent = d.label;
    orderLink.href = `commande.html?code=${code}&design=${d.id}`;
  }

  product.designs.forEach((d, i) => {
    const cell = document.createElement('div');
    cell.className = 'design-cell' + (i === 0 ? ' active' : '');
    cell.style.background = `linear-gradient(135deg, ${d.grad[0]}, ${d.grad[1]})`;
    cell.innerHTML = `
      <img src="${d.image}" alt="${d.label}" onerror="this.style.display='none'">
      <span class="design-tag">${code}#${String(i + 1).padStart(3, '0')}</span>
    `;
    cell.addEventListener('click', () => {
      grid.querySelectorAll('.design-cell').forEach(el => el.classList.remove('active'));
      cell.classList.add('active');
      setMain(d);
    });
    grid.appendChild(cell);
  });

  setMain(product.designs[0]);
}

/* ============================================================
   PAGE COMMANDE (commande.html)
   ============================================================ */
function initOrderPage(){
  const form = document.getElementById('orderForm');
  if(!form) return;

  const params = new URLSearchParams(location.search);
  const code = PRODUCTS[params.get('code')] ? params.get('code') : Object.keys(PRODUCTS)[0];
  const product = PRODUCTS[code];
  const designId = params.get('design');
  const design = product.designs.find(d => d.id === designId) || product.designs[0];

  document.getElementById('summarySwatch').style.background = `linear-gradient(135deg, ${design.grad[0]}, ${design.grad[1]})`;
  document.getElementById('summarySwatch').innerHTML = `<img src="${design.image}" alt="${design.label}" onerror="this.style.display='none'" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">`;
  document.getElementById('summaryName').textContent = product.name;
  document.getElementById('summaryMeta').textContent = `${design.label} · ${fmt(product.price)} FCFA / pièce`;

  let qty = 1;
  const qtyEl = document.getElementById('qtyval');
  const totalEl = document.getElementById('totalAmount');
  const qtyNoteText = document.getElementById('qtyNoteText');
  const depositNote = document.getElementById('depositNote');
  const countrySelect = document.getElementById('fcountry');
  const citySelect = document.getElementById('fcity');
  const flagBox = document.getElementById('flagBox');

  function updateTotals(){
    const total = product.price * qty;
    totalEl.textContent = fmt(total) + ' FCFA';
    qtyNoteText.textContent = `(${qty} pièce${qty > 1 ? 's' : ''})`;
    updateDepositNote();
  }

  function updateDepositNote(){
    const country = countrySelect.value;
    const total = product.price * qty;
    const deposit = Math.round(total * DEPOSIT_RATE / 100 / 100) * 100;
    if(!country){
      depositNote.innerHTML = "Choisissez votre pays pour voir les instructions d'acompte.";
      return;
    }
    const info = PAYMENT_INFO[country];
    depositNote.innerHTML = `Acompte à envoyer pour valider : <b>${fmt(deposit)} FCFA</b><br>
      Wave : <b>${info.wave}</b> · Orange Money : <b>${info.om}</b>`;
  }

  countrySelect.addEventListener('change', function(){
    const country = this.value;
    flagBox.textContent = FLAGS[country] || '🌍';
    citySelect.innerHTML = '';
    citySelect.disabled = false;
    const placeholder = document.createElement('option');
    placeholder.value = ''; placeholder.disabled = true; placeholder.selected = true;
    placeholder.textContent = 'Choisir une ville';
    citySelect.appendChild(placeholder);
    (CITIES[country] || []).forEach(c => {
      const opt = document.createElement('option'); opt.value = c; opt.textContent = c;
      citySelect.appendChild(opt);
    });
    updateDepositNote();
  });

  document.getElementById('qtyMinus').onclick = () => { if(qty > 1){ qty--; qtyEl.textContent = qty; updateTotals(); } };
  document.getElementById('qtyPlus').onclick = () => { if(qty < product.stock){ qty++; qtyEl.textContent = qty; updateTotals(); } };

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('fname').value.trim();
    const phone = document.getElementById('fphone').value.trim();
    const country = countrySelect.value;
    const city = citySelect.value;
    const errorMsg = document.getElementById('errorMsg');

    if(!name || !phone || !country || !city){
      errorMsg.style.display = 'block';
      return;
    }
    errorMsg.style.display = 'none';

    const total = product.price * qty;
    const deposit = Math.round(total * DEPOSIT_RATE / 100 / 100) * 100;
    const info = PAYMENT_INFO[country];

    // TODO : envoyer aussi ces données vers Google Sheets via l'URL du
    // Google Apps Script (prochaine étape), ex:
    // fetch(APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify({code, design: design.id, name, phone, country, city, qty, total}) });

    const message = `Bonjour, je confirme ma commande Korgoneere.
Produit : ${product.name} (${code}) — ${design.label}
Quantité : ${qty}
Nom : ${name}
Téléphone : ${phone}
Pays : ${country}
Ville : ${city}
Total : ${fmt(total)} FCFA
J'envoie l'acompte de ${fmt(deposit)} FCFA via Wave (${info.wave}) ou Orange Money (${info.om}).`;

    document.getElementById('waLink').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    form.style.display = 'none';
    document.getElementById('confirmBox').style.display = 'block';
    document.getElementById('confirmBox').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  updateTotals();
}

/* ============================================================
   BOUTON WHATSAPP FLOTTANT (toutes les pages)
   ============================================================ */
function initWhatsAppFloat(){
  if(document.querySelector('.wa-float')) return;
  const a = document.createElement('a');
  const msg = "Bonjour, j'ai une question sur vos sacs Korgoneere.";
  a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  a.className = 'wa-float';
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', 'Discuter sur WhatsApp');
  a.innerHTML = `<svg viewBox="0 0 24 24" width="26" height="26" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#fff" stroke-width="1.5"/>
    <path d="M8.5 9.2c.6 2.4 2.2 4 4.6 4.6" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="8.5" cy="9.2" r="1" fill="#fff"/>
    <circle cx="13.1" cy="13.8" r="1" fill="#fff"/>
  </svg>`;
  document.body.appendChild(a);
}

document.addEventListener('DOMContentLoaded', () => {
  initCatalogue();
  initProductPage();
  initOrderPage();
  initWhatsAppFloat();
});