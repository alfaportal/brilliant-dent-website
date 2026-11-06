const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.join(__dirname, '..', 'tmp-photos');
fs.mkdirSync(outDir, { recursive: true });

const files = [
  ['dent-profile.jpg', 'https://scontent.cdninstagram.com/v/t51.2885-19/375309581_961975298225155_2088858729096547184_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=104&ig_cache_key=GA3FXhYD9O5T6WoDAHALxmXyHf0cbkULAAAB1501500j-ccb7-5&ccb=7-5&_nc_sid=669407&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=hsRhmynR4t8Q7kNvwEit2TW&_nc_oc=Adphdv8C13LeoFUPDdnM10Kozy12yOBIZkNLZYgsN2fjFO2eghh-y2eJY5_po7Do1II&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_ss=78a8c&oh=00_AQSUl7gNZOJSw_2suZVzsUz1XcwK-o8kgSRYOy6rHBbXHA&oe=6AF3FC7F'],
  ['dent-jun26.jpg', 'https://scontent.cdninstagram.com/v/t51.82787-15/730558855_18610512298019498_7483281374916373719_n.jpg?stp=c204.0.615.614a_dst-jpg_e35_s640x640_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=KBPkWiL8VdsQ7kNvwGnLsZp&_nc_oc=AdrRpBG12Nj_VsD5mXqyo5IYyAsGOa9OsTvP5GvZXPPbLBTEE29crCUBFnfaTnjRFw4&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=1kNsq6Y4qsYTvrlZfl_mKw&_nc_ss=78a8c&oh=00_AQTft7llTpW_OKMvAcXSq_GEedo2mrRfJ1YdDrCXsQD_UQ&oe=6AF3E621'],
  ['dent-jun25.jpg', 'https://scontent.cdninstagram.com/v/t51.82787-15/729657863_18610207060019498_5283666772325050294_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=CHo1SUtvIwIQ7kNvwHlW-Sd&_nc_oc=AdqZs_4BUnvqneU0r1cPKGz2yziYvxb3-f6LF6cAbBcdxfb_P_tCkmMmlr0QOopcnhY&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=DEWV-iFlr44B3M72y-K00A&_nc_ss=78a8c&oh=00_AQQCkHdopN1oZnzo-JDpyhhdTOiVMYxxPvrxu9UtxwReXQ&oe=6AF3CEE3'],
  ['dent-may2.jpg', 'https://scontent.cdninstagram.com/v/t51.82787-15/683649705_18594280666019498_5851028048130714514_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=105&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=N68gh47kD7EQ7kNvwFrHT59&_nc_oc=AdpQast277jtbleRlrOBtGjk88NQGFn0GdkMQrKcZ_GdLu1VdAqKcxdgcVHue99sNpI&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=DEWV-iFlr44B3M72y-K00A&_nc_ss=78a8c&oh=00_AQSMExkpqjuI4EXfFOvyJjOV_6Fip-Sg0iwX2U1ckLx7uQ&oe=6AF3D45F'],
  ['dent-dec9.jpg', 'https://scontent.cdninstagram.com/v/t51.82787-15/597936054_18555721279019498_7357958379584422551_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=zydNHHQwLOkQ7kNvwGTkij6&_nc_oc=Ado2YpBmD7zKQ2MWzLIA2UGoQ_Rnkv25y3b3Jot95SgtFv9CcER_9cphoFvzHszbrng&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=DEWV-iFlr44B3M72y-K00A&_nc_ss=78a8c&oh=00_AQQLQMJ1_4lDaNwcnRrsG-fhQiNyoZqpcsNi6SFOMO-jZw&oe=6AF3EE78'],
  ['dent-jun6.jpg', 'https://scontent.cdninstagram.com/v/t51.75761-15/504422138_18518487172019498_9144609887716229480_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=oqMq6Pc02FcQ7kNvwFesW7B&_nc_oc=Adr0EXnkYWjZk8hXCar1lNpmqLBBsyS9_Mi0yZZgZwUZEWBBYl4uw__17KCE2wWO6i0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=DEWV-iFlr44B3M72y-K00A&_nc_ss=78a8c&oh=00_AQQ-7d4TorqRKq69kjGyJhRfY6-5tjiIWsQIAQo2Kbxmlg&oe=6AF3FB46'],
  ['dent-jun2.jpg', 'https://scontent.cdninstagram.com/v/t51.75761-15/503262630_18517808167019498_2501750486760687015_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=tKsk9GRYmIEQ7kNvwFJmWNB&_nc_oc=AdrQBN6JHMGN2vf5rRN9nyy7VCAOtvF11IRpcbKzM7dlEq81bwCcp_FJm-g0SfsjiLw&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=DEWV-iFlr44B3M72y-K00A&_nc_ss=78a8c&oh=00_AQR5UiA3ddeDHxupweFfdv2wdasuwbOEc78lTpDMvwO2KA&oe=6AF3D0CC'],
  ['dent-room-1.jpg', 'https://scontent.cdninstagram.com/v/t39.30808-6/737412579_984806147708063_214832856367003052_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=85dvII1_mCIQ7kNvwG1Zu03&_nc_oc=AdpIFAc9kJjLIN6aj6CjMc5nSHz6t087TMy2pf8Xepo4hQ9-7Fk_4S7cc1Npld2W4Pw&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=DEWV-iFlr44B3M72y-K00A&_nc_ss=78a8c&oh=00_AQQQmU8Rh7WeoevU_aWWJBg0trz1tSqwgpIAf_dghy-6zQ&oe=6AF3EECF'],
  ['dent-room-2.jpg', 'https://scontent.cdninstagram.com/v/t39.30808-6/736778447_984795874375757_8167660691091009464_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=7KR-mfJzrdoQ7kNvwF2ymVU&_nc_oc=AdosX3VMFSB8L3CLjJJq68tJbOYOtPSKs8_hccU7N_QdTOrtK4S1E2cqI2db23-uXvI&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=DEWV-iFlr44B3M72y-K00A&_nc_ss=78a8c&oh=00_AQTZ75hOr5cKGyZO7UGJCQk1kaZGFxzAcLKifC6QKXKk3w&oe=6AF3F4C2'],
  ['dent-room-3.jpg', 'https://scontent.cdninstagram.com/v/t39.30808-6/736198676_984690257719652_5653949167132914150_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=0eArP002qecQ7kNvwH7MRkc&_nc_oc=Ado5HnDOvc5WZBn81Q1FSfVpg3jwALMi76b7oRIk0ugeqJfVu7axtupu2T-MbuiN2NI&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=DEWV-iFlr44B3M72y-K00A&_nc_ss=78a8c&oh=00_AQRXldSuMY6DVLsmeM85KVwTGcpdtNLdN4IXarU3Cbmixg&oe=6AF3E8FA']
];

function get(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Referer: 'https://www.instagram.com/',
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
    const dest = path.join(outDir, name);
    try {
      await get(url, dest);
      const size = fs.statSync(dest).size;
      console.log('OK', name, size);
    } catch (err) {
      console.log('FAIL', name, err.message);
    }
  }
})();
