import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = process.cwd();
const distDir = join(repoRoot, 'dist');
const siteUrl = 'https://biomassresourcegroup.com';
const requiredFiles = [
  'index.html',
  join('updates', 'index.html'),
  'robots.txt',
  'sitemap-index.xml',
  '_headers',
  'og-default.jpg',
];

const failures = [];

const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const expectFile = (relativePath) => {
  const absolutePath = join(distDir, relativePath);
  expect(existsSync(absolutePath), `Missing dist artifact: ${relativePath}`);
  return absolutePath;
};

const read = (relativePath) => readFileSync(join(distDir, relativePath), 'utf8');

for (const relativePath of requiredFiles) {
  expectFile(relativePath);
}

const checkHtml = (relativePath, expectedCanonicalPath) => {
  const html = read(relativePath);
  const canonical = `${siteUrl}${expectedCanonicalPath}`;

  expect(
    html.includes(`<link rel="canonical" href="${canonical}"`),
    `${relativePath} is missing canonical ${canonical}`,
  );
  expect(
    html.includes('<meta property="og:image" content="https://biomassresourcegroup.com/og-default.jpg"'),
    `${relativePath} is missing og:image`,
  );
  expect(
    html.includes('<meta name="twitter:image" content="https://biomassresourcegroup.com/og-default.jpg"'),
    `${relativePath} is missing twitter:image`,
  );
  expect(
    html.includes('<meta name="twitter:card" content="summary_large_image"'),
    `${relativePath} is missing summary_large_image twitter card`,
  );
};

checkHtml('index.html', '/');
checkHtml(join('updates', 'index.html'), '/updates/');

const updatesDir = join(distDir, 'updates');
if (existsSync(updatesDir)) {
  for (const entry of readdirSync(updatesDir)) {
    const absolutePath = join(updatesDir, entry);
    if (!statSync(absolutePath).isDirectory()) continue;

    const articlePath = join('updates', entry, 'index.html');
    if (!existsSync(join(distDir, articlePath))) continue;
    checkHtml(articlePath, `/updates/${entry}/`);
  }
}

const robots = read('robots.txt');
expect(
  robots.includes(`Sitemap: ${siteUrl}/sitemap-index.xml`),
  'robots.txt is missing the production sitemap reference',
);

const headers = read('_headers');
expect(headers.includes('X-Frame-Options: DENY'), '_headers is missing X-Frame-Options: DENY');
expect(
  headers.includes('Referrer-Policy: strict-origin-when-cross-origin'),
  '_headers is missing Referrer-Policy: strict-origin-when-cross-origin',
);

if (failures.length > 0) {
  console.error('Dist validation failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Dist validation passed.');
