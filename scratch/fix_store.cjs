const fs = require('fs');

const thuVienSrc = fs.readFileSync('src/routes/thu-vien.tsx', 'utf8');
const match = thuVienSrc.match(/const posts = (\[[\s\S]*?\n\]);/);
if (!match) {
  console.error("Could not find posts array in thu-vien.tsx");
  process.exit(1);
}

const postsStr = match[1];

let adminStoreSrc = fs.readFileSync('src/lib/admin-store.ts', 'utf8');
// adminStoreSrc has `export const DEFAULT_POSTS: ResourcePost[] = [\n ... \n];`
adminStoreSrc = adminStoreSrc.replace(
  /export const DEFAULT_POSTS: ResourcePost\[\] = \[[^]*?\];/,
  `export const DEFAULT_POSTS: ResourcePost[] = ${postsStr};`
);

// We should also update localStorage key so the client will fetch the new default posts and ignore old corrupted ones
adminStoreSrc = adminStoreSrc.replace(/univenture_posts_v3/g, 'univenture_posts_v4');

fs.writeFileSync('src/lib/admin-store.ts', adminStoreSrc, 'utf8');
console.log("Updated admin-store.ts");
