const fs = require('fs');

// Read thu-vien.tsx and extract posts
const thuVien = fs.readFileSync('src/routes/thu-vien.tsx', 'utf8');
const startPosts = thuVien.indexOf('const posts = [');
const endPosts = thuVien.indexOf('];\n\n// Simulate', startPosts) + 2;
const postsStr = thuVien.slice(startPosts + 'const posts = '.length, endPosts);

// Evaluate the posts array - use Function constructor since it's pure data
let evaledPosts;
try {
  evaledPosts = new Function(`return ${postsStr}`)();
  console.log('Loaded', evaledPosts.length, 'posts from thu-vien.tsx');
  evaledPosts.forEach(p => console.log('  Post', p.id, ':', p.title.slice(0, 60)));
} catch(e) {
  console.error('Error evaluating posts:', e.message);
  process.exit(1);
}

// The tutor data - read from the original corrupted admin-store
// Extract just the tutor lines from current admin-store (they were OK originally from the file)
const adminStore = fs.readFileSync('src/lib/admin-store.ts', 'utf8');
const startTutors = adminStore.indexOf('export const DEFAULT_TUTORS: TutorItem[] = [');
const endTutors = adminStore.indexOf('\nexport const DEFAULT_POSTS', startTutors);
const tutorsSection = adminStore.slice(startTutors, endTutors);

// Build the clean admin-store.ts
const newContent = `// Admin Store with localStorage persistence for Tutors and Library Resources

export interface TutorItem {
  id: number;
  name: string;
  role: string;
  image: string;
  about: string;
  classes: string[];
  academics: string[];
}

export interface ResourcePost {
  id: number;
  partId: number;
  title: string;
  desc: string;
  content: string;
  fileUrl?: string;
}

${tutorsSection}
export const DEFAULT_POSTS: ResourcePost[] = ${JSON.stringify(evaledPosts, null, 2)};

export const STORAGE_KEY = "univenture_posts_v4";

// Helper functions for localStorage
export function getStoredTutors(): TutorItem[] {
  if (typeof window === "undefined") return DEFAULT_TUTORS;
  try {
    const data = localStorage.getItem("univenture_tutors");
    return data ? JSON.parse(data) : DEFAULT_TUTORS;
  } catch {
    return DEFAULT_TUTORS;
  }
}

export function saveStoredTutors(tutors: TutorItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("univenture_tutors", JSON.stringify(tutors));
  } catch (e) {
    console.error("Error saving tutors:", e);
  }
}

export function getStoredPosts(): ResourcePost[] {
  if (typeof window === "undefined") return DEFAULT_POSTS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_POSTS;
  } catch {
    return DEFAULT_POSTS;
  }
}

export function saveStoredPosts(posts: ResourcePost[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error("Error saving posts:", e);
  }
}
`;

// Check for any FFFD characters 
if (newContent.includes('\uFFFD')) {
  console.error('WARNING: File contains replacement characters (uFFFD)!');
}

fs.writeFileSync('src/lib/admin-store.ts', newContent, 'utf8');
console.log('\nRebuilt admin-store.ts successfully');
console.log('Total length:', newContent.length);

// Verify backtick count
let bt = 0;
for(const c of newContent) if(c === '`') bt++;
console.log('Backtick count:', bt, bt % 2 === 0 ? '(EVEN - OK)' : '(ODD - ERROR!)');
