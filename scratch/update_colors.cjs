const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, '../src'));
let count = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  content = content.replace(/#fd9d24/gi, '#ffcd6b');
  content = content.replace(/#FAD051/gi, '#ffcd6b');
  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated:', f);
    count++;
  }
});
console.log(`Finished updating ${count} files.`);
