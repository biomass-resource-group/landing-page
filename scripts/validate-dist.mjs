import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parseHeadersBlocks } from './headers-utils.mjs';

const repoRoot = process.cwd();
const distDir = join(repoRoot, 'dist');
const siteUrl = 'https://biomassresourcegroup.com';
const requiredFiles = [
  'index.html',
  join('about', 'index.html'),
  join('platform', 'index.html'),
  join('markets', 'index.html'),
  join('company', 'index.html'),
  join('contact', 'index.html'),
  'robots.txt',
  'sitemap-index.xml',
  '_headers',
  '_redirects',
  'og-default.jpg',
  join('scripts', 'company-redirect.js'),
  join('scripts', 'site-ui.js'),
];
const retiredSelectors = [
  '.hero-visual',
  '.hero-metrics',
  '.affiliations__item',
  '.model-card',
  '.technology-panel',
  '.region-panel',
  '.update-card',
  '.cta-card',
];

const failures = [];
const canonicalOverrides = new Map([['/company/', `${siteUrl}/about/`]]);

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

expect(!existsSync(join(distDir, 'updates')), 'dist still contains a public updates directory');

const redirects = readFileSync(join(distDir, '_redirects'), 'utf8');
expect(redirects.includes('/updates /'), '_redirects is missing the /updates redirect');
expect(redirects.includes('/updates/* /'), '_redirects is missing the /updates/* redirect');

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
  rootHeaders.get('cross-origin-opener-policy') === 'same-origin',
  '_headers is missing Cross-Origin-Opener-Policy: same-origin',
);
expect(
  rootHeaders.get('cross-origin-resource-policy') === 'same-origin',
  '_headers is missing Cross-Origin-Resource-Policy: same-origin',
);
expect(
  assetHeaders.get('cache-control') === 'public, max-age=31536000, immutable',
  '_headers is missing immutable caching for /_astro/* assets',
);

const cssAssets = collectRelativePaths(join(distDir, '_astro'), (relativePath) =>
  relativePath.endsWith('.css'),
);

for (const cssAsset of cssAssets) {
  const stylesheet = readFileSync(join(distDir, '_astro', cssAsset), 'utf8');

  expect(!stylesheet.includes('data:font/'), `${cssAsset} still contains inlined font data URLs`);
}

for (const relativePath of htmlPaths) {
  const html = read(relativePath);
  const routePattern = toRoutePattern(relativePath);
  const canonical = canonicalOverrides.get(routePattern) ?? `${siteUrl}${routePattern}`;
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
  expect(!html.includes('/updates/'), `${relativePath} still links to a removed /updates route`);
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
    csp.includes('https://static.cloudflareinsights.com'),
    `${relativePath} CSP is missing Cloudflare Insights script allowance`,
  );
  expect(
    csp.includes("connect-src 'self' https://cloudflareinsights.com"),
    `${relativePath} CSP is missing Cloudflare Insights connect allowance`,
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

const aboutHtml = read(join('about', 'index.html'));
const homeHtml = read('index.html');
const contactHtml = read(join('contact', 'index.html'));
const modelPreviewPosition = homeHtml.indexOf('home-model-preview');
const destinationsPosition = homeHtml.indexOf('home-destinations');

expect(
  /<h2 class="home-hero__stage-title">\s*Operating today\s*<\/h2>/.test(homeHtml),
  'index.html is missing the hero stage h2 heading',
);
expect(
  /<dl class="home-hero__proof">/.test(homeHtml),
  'index.html is missing the homepage proof stat strip',
);
expect(
  homeHtml.includes('href="/platform/"') &&
    homeHtml.includes('href="/markets/"') &&
    homeHtml.includes('href="/about/"') &&
    homeHtml.includes('href="/contact/"'),
  'index.html is missing one or more primary architecture links',
);
expect(
  modelPreviewPosition !== -1 && destinationsPosition !== -1 && modelPreviewPosition < destinationsPosition,
  'index.html does not place the commercial model ahead of the diligence-path section',
);
expect(
  !homeHtml.includes('See the full operating model'),
  'index.html still includes the duplicate platform CTA',
);
expect(
  !/Latest Activity|View all updates|Read the update|Latest milestone|Latest update/.test(homeHtml),
  'index.html still exposes removed updates language',
);
expect(
  !homeHtml.includes('/cdn-cgi/l/email-protection') && !homeHtml.includes('__cf_email__'),
  'index.html still contains Cloudflare email obfuscation markup',
);
expect(
  !homeHtml.includes('https://www.linkedin.com/in/cody-danet/'),
  'index.html still includes Cody Danet LinkedIn link markup',
);
expect(
  aboutHtml.includes('https://www.linkedin.com/in/julieajbrown/'),
  'about/index.html is missing Julie Brown LinkedIn markup',
);
expect(
  !aboutHtml.includes('https://www.linkedin.com/in/cody-danet/'),
  'about/index.html still includes Cody Danet LinkedIn link markup',
);
expect(
  matchAll(contactHtml, /class="pathway-card"/g).length === 3,
  'contact/index.html is missing one or more audience pathway cards',
);

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

for (const selector of retiredSelectors) {
  expect(!css.includes(selector), `Built CSS still ships retired selector ${selector}`);
}

const robots = read('robots.txt');
expect(
  robots.includes(`Sitemap: ${siteUrl}/sitemap-index.xml`),
  'robots.txt is missing the production sitemap reference',
);

const sitemapXml = collectRelativePaths(distDir, (relativePath) => /sitemap-.*\.xml$/.test(relativePath))
  .map((relativePath) => read(relativePath))
  .join('\n');
expect(sitemapXml.includes('/about/'), 'Sitemap output is missing the canonical /about/ route');
expect(!sitemapXml.includes('/company/'), 'Sitemap output still includes the legacy /company/ route');

const redirectsFile = read('_redirects');
expect(
  redirectsFile.includes('/company /about 301') && redirectsFile.includes('/company/ /about/ 301'),
  '_redirects is missing the company-to-about compatibility redirects',
);

if (failures.length > 0) {
  console.error('Dist validation failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Dist validation passed.');
