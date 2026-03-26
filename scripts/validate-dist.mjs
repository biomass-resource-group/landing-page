import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parseHeadersBlocks } from './headers-utils.mjs';

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
  join('scripts', 'site-ui.js'),
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
const matchAll = (value, expression) => Array.from(value.matchAll(expression));

const collectRelativePaths = (directory, predicate, currentPath = '') => {
  const absoluteDirectory = currentPath ? join(directory, currentPath) : directory;
  const matches = [];

  for (const entry of readdirSync(absoluteDirectory)) {
    const relativePath = currentPath ? join(currentPath, entry) : entry;
    const absolutePath = join(directory, relativePath);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      matches.push(...collectRelativePaths(directory, predicate, relativePath));
      continue;
    }

    if (predicate(relativePath)) {
      matches.push(relativePath);
    }
  }

  return matches;
};

const toRoutePattern = (relativePath) => {
  const normalizedPath = relativePath.replaceAll('\\', '/');

  if (normalizedPath === 'index.html') {
    return '/';
  }

  if (normalizedPath.endsWith('/index.html')) {
    return `/${normalizedPath.slice(0, -'index.html'.length)}`;
  }

  return `/${normalizedPath}`;
};

const extractScripts = (html) =>
  Array.from(html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)).map((match) => {
    const attributes = match[1] ?? '';
    const content = match[2] ?? '';
    const typeMatch = attributes.match(/\btype\s*=\s*["']([^"']+)["']/i);

    return {
      attributes,
      content,
      hasSrc: /\bsrc\s*=/.test(attributes),
      type: typeMatch?.[1]?.toLowerCase() ?? 'text/javascript',
    };
  });

const hashScript = (content) => createHash('sha256').update(content).digest('base64');

for (const relativePath of requiredFiles) {
  expectFile(relativePath);
}

const htmlPaths = collectRelativePaths(distDir, (relativePath) => relativePath.endsWith('.html'));
const headersBlocks = parseHeadersBlocks(read('_headers'));

const rootHeaders = headersBlocks.get('/*') ?? new Map();
const assetHeaders = headersBlocks.get('/_astro/*') ?? new Map();

expect(rootHeaders.get('x-frame-options') === 'DENY', '_headers is missing X-Frame-Options: DENY');
expect(
  rootHeaders.get('referrer-policy') === 'strict-origin-when-cross-origin',
  '_headers is missing Referrer-Policy: strict-origin-when-cross-origin',
);
expect(
  assetHeaders.get('cache-control') === 'public, max-age=31536000, immutable',
  '_headers is missing immutable caching for /_astro/* assets',
);

for (const relativePath of htmlPaths) {
  const html = read(relativePath);
  const routePattern = toRoutePattern(relativePath);
  const canonical = `${siteUrl}${routePattern}`;
  const routeHeaders = headersBlocks.get(routePattern);
  const scripts = extractScripts(html);
  const executableInlineScripts = scripts.filter(
    (script) => !script.hasSrc && script.type !== 'application/ld+json',
  );
  const jsonLdScripts = scripts.filter(
    (script) => !script.hasSrc && script.type === 'application/ld+json',
  );
  const csp = routeHeaders?.get('content-security-policy') ?? '';

  expect(
    html.includes(`<link rel="canonical" href="${canonical}"`),
    `${relativePath} is missing canonical ${canonical}`,
  );
  expect(
    html.includes(`<meta property="og:image" content="${siteUrl}/og-default.jpg"`),
    `${relativePath} is missing og:image`,
  );
  expect(
    html.includes(`<meta name="twitter:image" content="${siteUrl}/og-default.jpg"`),
    `${relativePath} is missing twitter:image`,
  );
  expect(
    html.includes('<meta name="twitter:card" content="summary_large_image"'),
    `${relativePath} is missing summary_large_image twitter card`,
  );
  expect(
    /<a class="skip-link" href="#content">Skip to content<\/a>/.test(html),
    `${relativePath} is missing the skip link`,
  );
  expect(
    /<main[^>]*id="content"[^>]*tabindex="-1"[^>]*>/.test(html),
    `${relativePath} is missing a focusable main landmark`,
  );
  expect(
    /<script[^>]*src="\/scripts\/site-ui\.js"[^>]*defer[^>]*><\/script>/.test(html),
    `${relativePath} is missing the deferred site-ui script`,
  );
  expect(
    executableInlineScripts.length === 0,
    `${relativePath} still contains inline executable script blocks`,
  );
  expect(routeHeaders instanceof Map, `${relativePath} is missing a route-specific CSP block`);

  if (!routeHeaders) {
    continue;
  }

  expect(
    csp.includes("default-src 'self'"),
    `${relativePath} CSP is missing default-src 'self'`,
  );
  expect(
    csp.includes("script-src 'self'"),
    `${relativePath} CSP is missing script-src 'self'`,
  );
  expect(
    csp.includes("style-src 'self'"),
    `${relativePath} CSP is missing style-src 'self'`,
  );
  expect(csp.includes("object-src 'none'"), `${relativePath} CSP is missing object-src 'none'`);
  expect(csp.includes("base-uri 'self'"), `${relativePath} CSP is missing base-uri 'self'`);
  expect(
    csp.includes("frame-ancestors 'none'"),
    `${relativePath} CSP is missing frame-ancestors 'none'`,
  );

  for (const script of jsonLdScripts) {
    const hash = hashScript(script.content);
    expect(
      csp.includes(`'sha256-${hash}'`),
      `${relativePath} CSP is missing the JSON-LD script hash ${hash}`,
    );
  }
}

const updatesArchiveHtml = read(join('updates', 'index.html'));
const homeHtml = read('index.html');
const updateEntries = matchAll(
  updatesArchiveHtml,
  /<article[^>]*class="updates-list__entry"[^>]*>([\s\S]*?)<\/article>/g,
);

expect(
  /<h2 class="home-hero__stage-title">\s*Active operating corridors\s*<\/h2>/.test(homeHtml),
  'index.html is missing the hero stage h2 heading',
);
expect(
  /<h3 class="home-hero__loop-title">\s*Operating loop\s*<\/h3>/.test(homeHtml),
  'index.html is missing the hero loop h3 heading',
);
expect(updateEntries.length > 0, 'updates/index.html is missing updates archive entries');
expect(
  !/<a\b[^>]*>\s*Read\s*<\/a>/i.test(updatesArchiveHtml),
  'updates/index.html still contains generic "Read" links',
);

for (const [index, entry] of updateEntries.entries()) {
  const entryMarkup = entry[1];
  const articleLinks = matchAll(entryMarkup, /<a\b[^>]*href="\/updates\/[^"]+\/"/g).length;

  expect(
    articleLinks === 1,
    `updates/index.html archive entry ${index + 1} should expose exactly one article link`,
  );
  expect(
    /aria-labelledby="[^"]+"/.test(entryMarkup),
    `updates/index.html archive entry ${index + 1} is missing aria-labelledby`,
  );
  expect(
    /aria-describedby="[^"]+"/.test(entryMarkup),
    `updates/index.html archive entry ${index + 1} is missing aria-describedby`,
  );
}

const cssPaths = collectRelativePaths(distDir, (relativePath) => relativePath.endsWith('.css'));
const css = cssPaths.map((relativePath) => read(relativePath)).join('\n');

expect(
  /html:not\(\.js\)\s+\.mobile-menu\s*\{[^}]*display\s*:\s*block/i.test(css),
  'Built CSS is missing the no-JS mobile navigation fallback',
);
expect(
  /html\.js\s+\.site-menu-toggle\s*\{[^}]*display\s*:\s*inline-flex/i.test(css),
  'Built CSS is missing the JS-gated mobile menu toggle',
);
expect(
  /html\.js\s+\.mobile-menu\.is-open\s*\{[^}]*display\s*:\s*block/i.test(css),
  'Built CSS is missing the JS-driven mobile menu open state',
);

const robots = read('robots.txt');
expect(
  robots.includes(`Sitemap: ${siteUrl}/sitemap-index.xml`),
  'robots.txt is missing the production sitemap reference',
);

if (failures.length > 0) {
  console.error('Dist validation failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Dist validation passed.');
