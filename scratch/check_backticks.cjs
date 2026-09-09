const fs = require('fs');
const txt = fs.readFileSync('src/lib/admin-store.ts', 'utf8');

// Count backticks to find unclosed template literals
let backtickCount = 0;
let positions = [];
for (let i = 0; i < txt.length; i++) {
  if (txt[i] === '`') {
    backtickCount++;
    positions.push(i);
  }
}
console.log('Total backticks:', backtickCount);
if (backtickCount % 2 !== 0) {
  console.log('ODD number of backticks - broken template literal!');
  // Find the last few backtick positions
  console.log('Last 10 backtick positions:', positions.slice(-10));
  // Check content around last backtick
  const last = positions[positions.length - 1];
  console.log('Context around last backtick:', JSON.stringify(txt.slice(last - 50, last + 50)));
} else {
  console.log('Even backticks - not a template literal issue');
}
