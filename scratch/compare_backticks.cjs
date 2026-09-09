const fs = require('fs');

// Count backticks in thu-vien.tsx from const posts to end of posts array
const thuVien = fs.readFileSync('src/routes/thu-vien.tsx', 'utf8');
const startIdx = thuVien.indexOf('const posts = [');
const endIdx = thuVien.indexOf('];\n\n// Simulate', startIdx) + 2;
const postsSection = thuVien.slice(startIdx, endIdx);

let count = 0;
for (const c of postsSection) {
  if (c === '`') count++;
}
console.log('Backticks in posts section of thu-vien.tsx:', count, '(should be even)');

// Also count backticks in the DEFAULT_POSTS section of admin-store
const adminStore = fs.readFileSync('src/lib/admin-store.ts', 'utf8');
const startAdmin = adminStore.indexOf('export const DEFAULT_POSTS');
const endAdmin = adminStore.indexOf('export const STORAGE_KEY');
const postsAdmin = adminStore.slice(startAdmin, endAdmin);

let countAdmin = 0;
for (const c of postsAdmin) {
  if (c === '`') countAdmin++;
}
console.log('Backticks in DEFAULT_POSTS of admin-store.ts:', countAdmin, '(should be even)');
