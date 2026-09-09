const fs = require('fs');
let txt = fs.readFileSync('src/lib/admin-store.ts', 'utf8');
// Remove the second duplicate STORAGE_KEY line
const marker = 'export const STORAGE_KEY = "univenture_posts_v4";';
const first = txt.indexOf(marker);
const second = txt.indexOf(marker, first + marker.length);
if (second !== -1) {
  txt = txt.slice(0, second) + txt.slice(second + marker.length + 1);
  console.log('Removed duplicate STORAGE_KEY at position', second);
} else {
  console.log('No duplicate found');
}
fs.writeFileSync('src/lib/admin-store.ts', txt, 'utf8');
console.log('Done. File length:', txt.length);
