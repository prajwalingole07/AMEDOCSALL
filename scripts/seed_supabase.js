// Seed 68 colleges to Supabase for Netlify global persistence
// Usage: node scripts/seed_supabase.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zxkzynzeizikzqafccud.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_JXULQCMWTVDIsfflJpvTnA_XgHE7rM3";

if (!url || !key) {
  console.error('Missing SUPABASE_URL / KEY');
  process.exit(1);
}
const supabase = createClient(url, key);
const dataPath = path.join(process.cwd(), 'data', 'colleges.json');
const colleges = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
console.log(`Seeding ${colleges.length} colleges to ${url}...`);
let ok=0, fail=0;
(async()=>{
  for (const c of colleges) {
    const { error } = await supabase.from('colleges').upsert({ id: c.slug, data: c, updated_at: new Date().toISOString() });
    if (error) { console.error('fail', c.slug, error.message); fail++; } else { ok++; process.stdout.write('.'); }
  }
  console.log(`\nDone: ${ok} ok, ${fail} fail`);
})();
