const fs = require('fs');

// The real problem: admin-store.ts has a stray backtick in the markdown content of post 6
// that is prematurely closing the template literal.
// We need to:
// 1. Fix the stray backtick in admin-store.ts
// 2. Also fix it in thu-vien.tsx (the source)

// Fix admin-store.ts
let adminStore = fs.readFileSync('src/lib/admin-store.ts', 'utf8');

// The problematic section ends with: | Tốn thời gian xây dựng portfolio ấn tượng |\n\n`
// The backtick after the table ends the template literal prematurely
// Replace the stray backtick that's on its own line (after the table) with nothing
// We look for the pattern: last table row followed by backtick on its own line
const badPattern = '| Tốn thời gian xây dựng portfolio ấn tượng |\n\n`\n  },';
const goodPattern = '| Tốn thời gian xây dựng portfolio ấn tượng |`,\n  },';

if (adminStore.includes(badPattern)) {
  adminStore = adminStore.replace(badPattern, goodPattern);
  console.log('Fixed stray backtick in admin-store.ts');
} else {
  // Try windows line endings
  const badPatternWin = '| Tốn thời gian xây dựng portfolio ấn tượng |\r\n\r\n`\r\n  },';
  const goodPatternWin = '| Tốn thời gian xây dựng portfolio ấn tượng |`,\r\n  },';
  if (adminStore.includes(badPatternWin)) {
    adminStore = adminStore.replace(badPatternWin, goodPatternWin);
    console.log('Fixed stray backtick (windows line endings) in admin-store.ts');
  } else {
    console.log('Pattern not found! Searching for stray backtick...');
    // Find the backtick that appears on its own line between tables
    const lines = adminStore.split('\n');
    lines.forEach((l, i) => {
      if (l.trim() === '`' || l.trim() === '`\r') {
        console.log(`Line ${i+1}: "${l}" | prev: "${lines[i-1]}" | next: "${lines[i+1]}"`);
      }
    });
  }
}

fs.writeFileSync('src/lib/admin-store.ts', adminStore, 'utf8');
console.log('Done');
