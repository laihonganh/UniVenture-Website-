#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

async function copyFile(src, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
}

async function collectImages(srcDir) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(srcDir, e.name);
    if (e.isDirectory()) {
      const nested = await collectImages(full);
      files.push(...nested);
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.svg', '.webp'].includes(ext)) files.push(full);
    }
  }
  return files;
}

async function importSchools(sourceDir, outDir) {
  const imgs = await collectImages(sourceDir);
  for (const src of imgs) {
    const base = path.basename(src);
    const nameNoExt = base.replace(/\.[^/.]+$/, '');
    const slug = slugify(nameNoExt);
    const ext = path.extname(base).toLowerCase() || '.png';
    const dest = path.join(outDir, `${slug}${ext}`);
    await copyFile(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  }
}

async function importMentors(sourceFiles, outDir) {
  await fs.mkdir(outDir, { recursive: true });
  for (let i = 0; i < sourceFiles.length; i++) {
    const src = sourceFiles[i];
    const ext = path.extname(src).toLowerCase() || '.jpg';
    const dest = path.join(outDir, `mentor-${i + 1}${ext}`);
    await copyFile(src, dest);
    console.log(`Copied mentor ${src} -> ${dest}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args[0] === 'schools') {
    const source = args[1] || path.join(process.env.USERPROFILE || '.', 'Downloads', 'ket-qua-pictures');
    const out = args[2] || path.join(process.cwd(), 'public', 'images', 'schools');
    await importSchools(source, out);
    return;
  }
  if (args[0] === 'mentors') {
    const out = args[1] || path.join(process.cwd(), 'public', 'images', 'mentors');
    const sources = args.slice(2);
    if (sources.length === 0) {
      console.error('No mentor source files provided.');
      process.exit(2);
    }
    await importMentors(sources, out);
    return;
  }

  console.log('Usage: node import-assets.cjs schools [sourceDir] [outDir]');
  console.log('   or: node import-assets.cjs mentors [outDir] <file1> <file2> ...');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
