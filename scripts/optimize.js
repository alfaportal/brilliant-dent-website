const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const tmp = path.join(root, 'tmp-photos');
const media = path.join(root, 'public', 'media');

async function webp(src, dest, width = 1600) {
  await fs.promises.mkdir(path.dirname(dest), { recursive: true });
  await sharp(src)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(dest);
  console.log(path.relative(root, dest), fs.statSync(dest).size);
}

(async () => {
  await webp(path.join(tmp, 'fb-cover.jpg'), path.join(media, 'dent', 'hero-1.webp'), 1800);
  await webp(path.join(tmp, 'fb-p1.jpg'), path.join(media, 'dent', 'hero-2.webp'), 1400);
  await webp(path.join(tmp, 'dent-room-1.jpg'), path.join(media, 'dent', 'hero-3.webp'), 1600);
  await webp(path.join(tmp, 'fb-p2.jpg'), path.join(media, 'dent', 'certs.webp'), 1400);
  await webp(path.join(tmp, 'fb-p3.jpg'), path.join(media, 'dent', 'reception.webp'), 1400);
  await webp(path.join(tmp, 'dent-room-2.jpg'), path.join(media, 'dent', 'meeting.webp'), 1600);
  await webp(path.join(tmp, 'dent-room-3.jpg'), path.join(media, 'aes', 'hero-1.webp'), 1600);
  await webp(path.join(tmp, 'dent-room-2.jpg'), path.join(media, 'aes', 'hero-2.webp'), 1600);
  await webp(path.join(tmp, 'dent-profile.jpg'), path.join(media, 'dent', 'burim-chair.webp'), 800);

  const portrait = path.join(tmp, 'fb-p3.jpg');
  const meta = await sharp(portrait).metadata();
  const width = Math.round(meta.width * 0.48);
  const height = Math.round(meta.height * 0.8);
  const top = Math.round(meta.height * 0.1);
  await sharp(portrait)
    .extract({ left: 0, top, width, height })
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(media, 'dent', 'burim.webp'));
  console.log('burim crop from', meta.width, meta.height);
})();
