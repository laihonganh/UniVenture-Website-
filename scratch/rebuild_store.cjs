const fs = require('fs');

const thuVienSrc = fs.readFileSync('src/routes/thu-vien.tsx', 'utf8');
const startPosts = thuVienSrc.indexOf('const posts = [');
const endPosts = thuVienSrc.indexOf('];\n\n// Simulate', startPosts) + 1;
const postsStr = thuVienSrc.slice(startPosts + 'const posts = '.length, endPosts);

const adminStoreSrc = fs.readFileSync('src/lib/admin-store.ts', 'utf8');

const startDefault = adminStoreSrc.indexOf('export const DEFAULT_POSTS: ResourcePost[] =');
const endDefault = adminStoreSrc.indexOf('export const STORAGE_KEY =');

if (startDefault === -1 || endDefault === -1) {
  console.error("Could not find boundaries in admin-store.ts");
  process.exit(1);
}

const newAdminStoreSrc = 
  adminStoreSrc.slice(0, startDefault) +
  'export const DEFAULT_POSTS: ResourcePost[] = ' + postsStr + ';\n\n' +
  adminStoreSrc.slice(endDefault);

fs.writeFileSync('src/lib/admin-store.ts', newAdminStoreSrc, 'utf8');
console.log("Successfully rebuilt admin-store.ts");
