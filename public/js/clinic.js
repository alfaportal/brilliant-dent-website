const clinicKey = location.pathname.startsWith('/estetike') ? 'aesthetic' : 'dent';
document.body.dataset.theme = clinicKey === 'aesthetic' ? 'aesthetic' : 'dent';
document.body.dataset.clinic = clinicKey;

let content;

function carousel(images) {
  const media = document.querySelector('.hero-media');
  media.replaceChildren();
  if (!images.length) return;
  images.forEach((item, index) => {
    const slide = el('div', `slide${index === 0 ? ' is-on' : ''}`);
    const image = el('img');
    image.src = item.url;
    image.alt = tx(item.caption) || 'Brilliant Dent';
    slide.appendChild(image);
    media.appendChild(slide);
  });
  if (images.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let index = 0;
  setInterval(() => {
    const slides = [...media.querySelectorAll('.slide')];
    slides[index].classList.remove('is-on');
    index = (index + 1) % slides.length;
    slides[index].classList.add('is-on');
  }, 5600);
}

function render() {
  const page = content[clinicKey];
  const lang = getLang();
  document.title = clinicKey === 'dent' ? 'Brilliant Dent' : 'Brilliant Aesthetic';
  const primary = document.querySelector('.hero-actions .btn-gold');
  primary.dataset.i18n = clinicKey === 'aesthetic' ? 'exploreAes' : 'exploreDent';
  document.querySelector('[name="preferredDate"]').min = new Date().toISOString().slice(0, 10);
  document.querySelector('[data-bind="kicker"]').textContent = tx(page.kicker);
  document.querySelector('[data-bind="hero"]').textContent = tx(page.heroTitle);
  document.querySelector('[data-bind="sub"]').textContent = tx(page.heroSubtitle);
  document.querySelector('[data-bind="aboutTitle"]').textContent = tx(page.aboutTitle);
  document.querySelector('[data-bind="aboutBody"]').textContent = tx(page.aboutBody);
  carousel(page.gallery.filter((item) => item.placement === 'hero' && item.mediaType === 'image'));

  const services = document.querySelector('#services');
  services.replaceChildren();
  page.services.forEach((service, index) => {
    const card = el('article', 'service-card reveal');
    card.append(el('div', 'num', String(index + 1).padStart(2, '0')), el('h3', '', tx(service.title)), el('p', '', tx(service.description)));
    services.appendChild(card);
  });

  const doctors = document.querySelector('#doctors');
  doctors.replaceChildren();
  page.doctors.forEach((doctor) => {
    const card = el('article', 'doctor-card reveal');
    const link = el('a', 'stretch');
    link.href = `/doktori/${doctor.slug}`;
    const photo = el('div', 'doctor-photo');
    if (doctor.photo) {
      const image = el('img');
      image.src = doctor.photo;
      image.alt = doctor.fullName;
      photo.appendChild(image);
    } else photo.appendChild(el('div', 'monogram', initials(doctor.fullName)));
    const body = el('div', 'doctor-body');
    body.append(el('h3', '', doctor.fullName), el('p', '', tx(doctor.title)));
    link.append(photo, body);
    const icons = socialLinks(doctor);
    icons.style.padding = '0 1.1rem 1rem';
    card.append(link, icons);
    doctors.appendChild(card);
  });

  const pairs = document.querySelector('#pairs');
  pairs.replaceChildren();
  page.beforeAfter.forEach((pair) => {
    const box = el('div', 'ba reveal');
    const after = el('img');
    after.src = pair.afterUrl;
    after.alt = tx(pair.caption) || 'After';
    const before = el('img', 'before');
    before.src = pair.beforeUrl;
    before.alt = 'Before';
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '0';
    range.max = '100';
    range.value = '50';
    range.setAttribute('aria-label', t('work'));
    const handle = el('div', 'handle');
    box.append(after, before, range, handle, el('p', '', tx(pair.caption)));
    pairs.appendChild(box);
    compare(box);
  });

  const gallery = document.querySelector('#gallery');
  gallery.replaceChildren();
  if (page.heroVideoUrl) gallery.appendChild(mountEmbed(page.heroVideoUrl));
  page.gallery.filter((item) => item.placement !== 'hero' || item.mediaType !== 'image').forEach((item) => {
    if (item.mediaType === 'tiktok' || item.mediaType === 'instagram') {
      gallery.appendChild(mountEmbed(item.url));
      return;
    }
    const button = el('button', 'gallery-card');
    if (item.mediaType === 'video') {
      const video = document.createElement('video');
      video.src = item.url;
      video.controls = true;
      button.appendChild(video);
    } else {
      const image = el('img');
      image.src = item.url;
      image.alt = tx(item.caption);
      button.appendChild(image);
      button.addEventListener('click', () => openLightbox(item.url, image.alt));
    }
    gallery.appendChild(button);
  });

  const aboutImg = document.querySelector('#aboutImg');
  const shot = page.gallery.find((item) => item.mediaType === 'image');
  if (shot) { aboutImg.src = shot.url; aboutImg.alt = tx(shot.caption); }

  const select = document.querySelector('#service');
  select.replaceChildren(new Option(t('choose'), ''));
  page.services.forEach((service) => select.append(new Option(tx(service.title), tx(service.title))));

  const contact = content.contact;
  document.querySelector('#address').textContent = tx(contact.address);
  document.querySelector('#email').textContent = contact.email;
  document.querySelector('#email').href = `mailto:${contact.email}`;
  const phones = document.querySelector('#phones');
  phones.replaceChildren();
  [contact.phone, contact.phoneSecondary].filter(Boolean).forEach((phone) => {
    const link = el('a', '', phone);
    link.href = `tel:${phone.replace(/\s/g, '')}`;
    phones.append(link, document.createTextNode(' · '));
  });
  const hours = document.querySelector('#hours');
  hours.replaceChildren();
  (contact.hours || []).forEach((row) => {
    const li = el('li');
    li.append(el('span', '', tx(row.days)), el('span', '', tx(row.time)));
    hours.appendChild(li);
  });
  const map = document.querySelector('#map');
  map.src = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery || tx(contact.address))}&z=16&output=embed`;

  const social = document.querySelector('#footerSocial');
  social.replaceChildren();
  page.social.forEach((item) => {
    const link = el('a');
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener';
    const icon = item.network === 'facebook' ? 'fa-brands fa-facebook-f' : item.network === 'tiktok' ? 'fa-brands fa-tiktok' : 'fa-brands fa-instagram';
    link.innerHTML = `<i class="${icon}"></i> ${tx(item.label) || item.network}`;
    social.appendChild(link);
  });
  document.querySelector('#year').textContent = String(new Date().getFullYear());
  applyI18n();
}

document.querySelector('#form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const note = document.querySelector('.note');
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  note.textContent = '';
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, clinic: clinicKey })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error);
    note.textContent = t('sent');
    form.reset();
  } catch (err) {
    note.textContent = err.message;
  }
});

bindLang(() => render());
loadContent().then((data) => { content = data; render(); }).catch(() => {
  document.querySelector('[data-bind="hero"]').textContent = 'Brilliant Dent';
});
