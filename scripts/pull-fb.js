const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.join(__dirname, '..', 'tmp-photos');
fs.mkdirSync(outDir, { recursive: true });

const files = [
  ['fb-cover.jpg', 'https://scontent.fskp1-2.fna.fbcdn.net/v/t39.30808-6/741365780_4440362402888692_5920840874253446102_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x1024&ctp=s960x960&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=ySY5D7M2Y68Q7kNvwFkmMib&_nc_oc=Adonv1vvxkLEK54AewcNj4XpJVg0KbxIWHZ3SFVOk0pu983CSw8RA-TXHts0FWB4K7Y&_nc_zt=23&_nc_ht=scontent.fskp1-2.fna&_nc_gid=c-pHMR6cOqJ9Yqqv3grH3g&_nc_ss=78289&oh=00_AQR2mwmNXC5ZNyKY_qJTDXWl5Ezr0VkbYw6Dif1QyCZ0Dg&oe=6AF3D83E'],
  ['fb-p1.jpg', 'https://scontent.fskp1-2.fna.fbcdn.net/v/t39.30808-6/853281014_3473107476200031_2984330157573594334_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s590x590&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=BkvYqK0VnggQ7kNvwE5Rirp&_nc_oc=AdrMRD4FAbGVO7dgJVAg8vnXaFiSPVZtWP3674LeAFOM6a9KXWxBDka7apyXxFYeQYc&_nc_zt=23&_nc_ht=scontent.fskp1-2.fna&_nc_gid=RzsSMA1zFjayCjjrm9KXSA&_nc_ss=78289&oh=00_AQReMrpts1MEplCPx_Xg44t0NuPIDbiB01tGsSEzmlQ0QQ&oe=6AF3E548'],
  ['fb-p2.jpg', 'https://scontent.fskp1-2.fna.fbcdn.net/v/t39.30808-6/864106955_3473107486200030_3781303004282788966_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s590x590&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=14uTus12lDIQ7kNvwGrT4fp&_nc_oc=AdoxnjFRC_7HArQBdfTLwcdb8uiypysRw59oJzj1n1nIoLVdOmos-zyuSmYIv0bxbq0&_nc_zt=23&_nc_ht=scontent.fskp1-2.fna&_nc_gid=RzsSMA1zFjayCjjrm9KXSA&_nc_ss=78289&oh=00_AQRrQtOvaINs7lrUvzYddZJxqv4maAq0v4ZCEMA9lxfB5A&oe=6AF3D7D5'],
  ['fb-p3.jpg', 'https://scontent.fskp1-2.fna.fbcdn.net/v/t39.30808-6/839388603_10234501168971518_104039574283327678_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s590x590&_nc_cat=106&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=EOHHJV2y5AEQ7kNvwEKe96j&_nc_oc=AdqS-YzVWN3QEvKEoODO9HfP9bdtRUIeot1hKKej87Z3Ato3iMqNRlxRToRZ6rjMocw&_nc_zt=23&_nc_ht=scontent.fskp1-2.fna&_nc_gid=51ScVZ3A1CHQBY9exO7nPw&_nc_ss=7a289&oh=00_AQTOg_znYyxzwN46rz0fdaXHyMfrDEXKOK6QDonrUTp9rQ&oe=6AF3E66E'],
  ['fb-p4.jpg', 'https://scontent.fskp1-2.fna.fbcdn.net/v/t39.30808-6/839691742_10234501169211524_3015454018625117324_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s590x590&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=A0lrqdMcn58Q7kNvwGtiygF&_nc_oc=Adr_XkW52VY9pyTj-bm7J4-AI3MHCAh5JGPwRDflITiYjf8pvKj6BNu-WMwDxOZeQ4Q&_nc_zt=23&_nc_ht=scontent.fskp1-2.fna&_nc_gid=51ScVZ3A1CHQBY9exO7nPw&_nc_ss=7a289&oh=00_AQSBC4-cWxtt7F0EJW0-ipBieaVD8zvEVUodTjKbila7Bw&oe=6AF3E98C'],
  ['fb-r1.jpg', 'https://scontent.fskp1-2.fna.fbcdn.net/v/t39.30808-6/825329988_4527169224208009_4634111633482234960_n.jpg?stp=dst-jpg_tt6&cstp=mx1600x1068&ctp=s590x590&_nc_cat=106&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=q875xQlvzF4Q7kNvwFv4JSG&_nc_oc=AdohGaRGtbBDucFtAt0jbgtg-byGMSy15flnAz7ylsr3r6FjJ1yp8IWSA81rK4fuaac&_nc_zt=23&_nc_ht=scontent.fskp1-2.fna&_nc_gid=51ScVZ3A1CHQBY9exO7nPw&_nc_ss=7a289&oh=00_AQTIuqXVFyUg1TUscaeSHRiHCbfplv6Q1mgw2hkJaW7xRw&oe=6AF3EEDD'],
  ['fb-r2.jpg', 'https://scontent.fskp1-2.fna.fbcdn.net/v/t39.30808-6/825352814_4527169344207997_2667847700227112254_n.jpg?stp=dst-jpg_tt6&cstp=mx1600x1068&ctp=s590x590&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=PD5KN7a3j74Q7kNvwE3MdQX&_nc_oc=AdqQCXRkGBsKwpycvSxz25PXRrgykVj-hof7VxhbtccCtNfLtYMUGCfOkwvyn9VfdZ0&_nc_zt=23&_nc_ht=scontent.fskp1-2.fna&_nc_gid=51ScVZ3A1CHQBY9exO7nPw&_nc_ss=7a289&oh=00_AQQqsTBUA1SqIkENyq3AayhEo-EN-9QSwaqFMkX5XbVfug&oe=6AF3D7A5'],
  ['fb-r3.jpg', 'https://scontent.fskp1-2.fna.fbcdn.net/v/t39.30808-6/825329893_4527169234208008_503563492590541387_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s590x590&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Iu5J-G8-AmQQ7kNvwG9EVGl&_nc_oc=Adr_A7cBPXc-iNmzJ3uO1yHAsrbTKvU8EjFfoUfKfJ3NX_0KxuZo1kVeJXjCZrowCQQ&_nc_zt=23&_nc_ht=scontent.fskp1-2.fna&_nc_gid=51ScVZ3A1CHQBY9exO7nPw&_nc_ss=7a289&oh=00_AQQcoiuFMfpSd7SpqAgpeRQM-q0y5cXqWAMvQIpOkavpNw&oe=6AF3CC48'],
  ['fb-r4.jpg', 'https://scontent.fskp1-2.fna.fbcdn.net/v/t39.30808-6/828525193_4527169364207995_957828424097421475_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s590x590&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=tTTcGMZWTL4Q7kNvwFEfHpp&_nc_oc=Ado64kF_Yhsb3-buY5REaaDGpjje5AEAnokeMns_MpV3TcjcWaTysY8GgH19BhspBf8&_nc_zt=23&_nc_ht=scontent.fskp1-2.fna&_nc_gid=51ScVZ3A1CHQBY9exO7nPw&_nc_ss=7a289&oh=00_AQQfzgIeR7ExP2FDFQludEZwZirT-DL-juu9pSIfOQbFog&oe=6AF3EA62']
];

function get(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Referer: 'https://www.facebook.com/',
        Accept: 'image/avif,image/webp,image/*,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return get(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(res.statusCode + ' ' + path.basename(dest)));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
    });
    req.on('error', reject);
  });
}

(async () => {
  for (const [name, url] of files) {
    try {
      await get(url, path.join(outDir, name));
      console.log('OK', name, fs.statSync(path.join(outDir, name)).size);
    } catch (err) {
      console.log('FAIL', name, err.message);
    }
  }
})();
