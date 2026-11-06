const UI = {
  sq: {
    home: 'Ballina', dent: 'Stomatologji', aes: 'Estetikë fytyre', services: 'Shërbimet', staff: 'Stafi',
    gallery: 'Galeria', contact: 'Kontakt', book: 'Cakto terminin', exploreDent: 'Eksploro shërbimet',
    exploreAes: 'Rezervo terminin estetik', about: 'Rreth nesh', work: 'Para dhe pas',
    name: 'Emri dhe mbiemri', phone: 'Telefoni', email: 'Email-i', service: 'Shërbimi', date: 'Data e dëshiruar',
    message: 'Mesazhi', send: 'Dërgo kërkesën', sent: 'Kërkesa u mor. Klinika do t’ju kontaktojë.',
    address: 'Adresa', hours: 'Orari', choose: 'Zgjidhni', doctor: 'Profili', back: 'Kthehu te klinika',
    education: 'Arsimimi', experience: 'Përvoja', certs: 'Certifikimet', bio: 'Biografia',
    offers: 'Shërbimet që ofron', portfolio: 'Puna e mjekut', empty: 'Ende pa foto.',
    enter: 'Hyni', slogan: 'Standardi i ri në stomatologji moderne dhe estetikë fytyre.'
  },
  en: {
    home: 'Home', dent: 'Dentistry', aes: 'Facial aesthetics', services: 'Services', staff: 'Team',
    gallery: 'Gallery', contact: 'Contact', book: 'Book a visit', exploreDent: 'Explore dental care',
    exploreAes: 'Book an aesthetic visit', about: 'About', work: 'Before and after',
    name: 'Full name', phone: 'Phone', email: 'Email', service: 'Service', date: 'Preferred date',
    message: 'Message', send: 'Send request', sent: 'Request received. The clinic will contact you.',
    address: 'Address', hours: 'Hours', choose: 'Choose', doctor: 'Profile', back: 'Back to the clinic',
    education: 'Education', experience: 'Experience', certs: 'Certifications', bio: 'Biography',
    offers: 'Services offered', portfolio: 'Selected work', empty: 'No photo yet.',
    enter: 'Enter', slogan: 'A new standard in modern dentistry and facial aesthetics.'
  },
  de: {
    home: 'Start', dent: 'Zahnmedizin', aes: 'Gesichtsästhetik', services: 'Leistungen', staff: 'Team',
    gallery: 'Galerie', contact: 'Kontakt', book: 'Termin vereinbaren', exploreDent: 'Zahnleistungen ansehen',
    exploreAes: 'Ästhetik-Termin buchen', about: 'Über uns', work: 'Vorher und nachher',
    name: 'Name', phone: 'Telefon', email: 'E-Mail', service: 'Leistung', date: 'Wunschdatum',
    message: 'Nachricht', send: 'Anfrage senden', sent: 'Anfrage erhalten. Die Klinik meldet sich.',
    address: 'Adresse', hours: 'Öffnungszeiten', choose: 'Wählen', doctor: 'Profil', back: 'Zurück zur Klinik',
    education: 'Ausbildung', experience: 'Erfahrung', certs: 'Zertifikate', bio: 'Biografie',
    offers: 'Leistungen', portfolio: 'Arbeiten', empty: 'Noch kein Foto.',
    enter: 'Eintreten', slogan: 'Ein neuer Standard für moderne Zahnmedizin und Gesichtsästhetik.'
  }
};

function getLang() {
  const saved = localStorage.getItem('bda-lang');
  return saved === 'en' || saved === 'de' ? saved : 'sq';
}
function setLang(lang) {
  localStorage.setItem('bda-lang', lang);
  document.documentElement.lang = lang;
}
function t(key) { return UI[getLang()][key] || UI.sq[key] || key; }
function tx(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[getLang()] || value.sq || value.en || '';
}
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}
function applyI18n() {
  document.documentElement.lang = getLang();
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll('.langs button').forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.lang === getLang() ? 'true' : 'false');
  });
}
function bindLang(redraw) {
  document.querySelectorAll('.langs button').forEach((button) => {
    button.addEventListener('click', () => { setLang(button.dataset.lang); applyI18n(); redraw(); });
  });
  const menu = document.querySelector('.menu-btn');
  if (menu) menu.addEventListener('click', () => document.querySelector('.nav')?.classList.toggle('open'));
}
function initials(name) {
  return String(name || '').split(/\s+/).slice(0, 2).map((part) => part[0] || '').join('').toUpperCase();
}
function socialLinks(person) {
  const row = el('div', 'icon-row');
  const items = [
    [person.email ? `mailto:${person.email}` : '', 'fa-solid fa-envelope', 'Email'],
    [person.phone ? `tel:${person.phone.replace(/\s/g, '')}` : '', 'fa-solid fa-phone', 'Phone'],
    [person.instagram, 'fa-brands fa-instagram', 'Instagram'],
    [person.facebook, 'fa-brands fa-facebook-f', 'Facebook'],
    [person.tiktok, 'fa-brands fa-tiktok', 'TikTok']
  ];
  items.forEach(([href, icon, label]) => {
    if (!href) return;
    const link = el('a');
    link.href = href;
    link.target = href.startsWith('http') ? '_blank' : '';
    link.rel = 'noopener';
    link.setAttribute('aria-label', label);
    link.innerHTML = `<i class="${icon}"></i>`;
    link.addEventListener('click', (event) => event.stopPropagation());
    row.appendChild(link);
  });
  return row;
}
function mountEmbed(url) {
  const wrap = el('div', 'embed-frame');
  const tiktok = String(url).match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  if (tiktok) {
    const quote = document.createElement('blockquote');
    quote.className = 'tiktok-embed';
    quote.cite = url;
    quote.setAttribute('data-video-id', tiktok[1]);
    quote.style.maxWidth = '605px';
    quote.style.minWidth = '280px';
    quote.appendChild(document.createElement('section'));
    wrap.appendChild(quote);
    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
    return wrap;
  }
  if (/instagram\.com\/(p|reel)\//.test(url)) {
    const quote = document.createElement('blockquote');
    quote.className = 'instagram-media';
    quote.dataset.instgrmPermalink = url;
    quote.dataset.instgrmVersion = '14';
    wrap.appendChild(quote);
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return wrap;
  }
  const link = el('a', '', url);
  link.href = url;
  link.target = '_blank';
  wrap.appendChild(link);
  return wrap;
}
function openLightbox(src, alt) {
  let box = document.querySelector('.lightbox');
  if (!box) {
    box = el('div', 'lightbox');
    const close = el('button', '', '×');
    close.addEventListener('click', () => box.classList.remove('open'));
    const image = el('img');
    box.append(close, image);
    box.addEventListener('click', (event) => { if (event.target === box) box.classList.remove('open'); });
    document.body.appendChild(box);
  }
  box.querySelector('img').src = src;
  box.querySelector('img').alt = alt || '';
  box.classList.add('open');
}
function compare(root) {
  const range = root.querySelector('input');
  const before = root.querySelector('.before');
  const handle = root.querySelector('.handle');
  const paint = () => {
    const value = `${range.value}%`;
    before.style.clipPath = `inset(0 ${100 - range.value}% 0 0)`;
    handle.style.left = value;
  };
  range.addEventListener('input', paint);
  paint();
}
async function loadContent() {
  const response = await fetch('/api/content');
  if (!response.ok) throw new Error('content');
  return response.json();
}
