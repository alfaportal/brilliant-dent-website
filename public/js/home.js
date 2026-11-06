function paint(data) {
  const dent = data.dent.gallery.find((item) => item.placement === 'hero') || data.dent.gallery[0];
  const aes = data.aesthetic.gallery.find((item) => item.placement === 'hero') || data.aesthetic.gallery[0];
  if (dent) document.querySelector('#doorDent').src = dent.url;
  if (aes) document.querySelector('#doorAes').src = aes.url;
  document.querySelector('#slogan').textContent = 'Ferizaj';
  applyI18n();
}
bindLang(() => { if (window.__bda) paint(window.__bda); });
loadContent().then((data) => { window.__bda = data; paint(data); });
