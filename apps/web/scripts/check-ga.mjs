// Fails the build if the Google Analytics snippet in index.html (or the
// built dist/index.html) differs from the pinned copy in ga-snippet.html.
// Do not edit ga-snippet.html unless the site owner approves a GA change.
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const snippet = readFileSync(join(here, 'ga-snippet.html'), 'utf8').trim();

const targets = ['index.html', 'dist/index.html']
  .map((p) => join(root, p))
  .filter((p) => existsSync(p));

let failed = false;
for (const file of targets) {
  const html = readFileSync(file, 'utf8');
  if (!html.includes(snippet)) {
    console.error(`GA check failed: ${file} does not contain the pinned Google Analytics snippet.`);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log(`GA check passed (${targets.length} file(s)).`);
