const fs = require('fs').promises;
const path = require('path');

const USER_DOWNLOADS = path.join(process.env.USERPROFILE || '.', 'Downloads');
const MATCH = /(uyen|uyển|bao|bảo|linh|minh|mentor)/i;
const EXT = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];

async function find(dir) {
  let res = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        res.push(...(await find(full)));
      } else if (e.isFile()) {
        const ext = path.extname(e.name).toLowerCase();
        if (EXT.includes(ext) && MATCH.test(e.name)) res.push(full);
      }
    }
  } catch (err) {
    // ignore permissions
  }
  return res;
}

(async () => {
  const found = await find(USER_DOWNLOADS);
  if (found.length === 0) {
    console.log('No matches found.');
    process.exit(0);
  }
  console.log(found.join('\n'));
})();
