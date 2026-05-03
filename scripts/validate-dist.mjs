import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parseHeadersBlocks } from './headers-utils.mjs';

const repoRoot = process.cwd();
const distDir = join(repoRoot, 'dist');
const siteUrl = 'https://biomassresourcegroup.com';
const failures = [];

const requiredFiles = [
  'index.html',
  join('about', 'index.html'),
  join('platform', 'index.html'),
  join('markets', 'index.html'),
  join('company', 'index.html'),
  join('contact', 'index.html'),
  join('privacy', 'index.html'),
  '404.html',
  'robots.txt',
  'sitemap-index.xml',
  '_headers',
  '_redirects',
  'og-default.jpg',
  join('scripts', 'company-redirect.js'),
  join('scripts', 'site-ui.js'),
];

const routeExpectations = new Map([
  ['index.html', {
    canonical: `${siteUrl}/`,
    title: 'Biochar Carbon Removal Infrastructure | Biomass Resource Group',
    description: 'BRG builds operator-led biochar infrastructure across active biomass corridors.',
  }],
  [join('platform', 'index.html'), {
    canonical: `${siteUrl}/platform/`,
    title: 'Operating Platform | Biomass Resource Group',
    description: 'How BRG connects feedstock, kiln deployment, buyer channels, and project documentation.',
  }],
  [join('markets', 'index.html'), {
    canonical: `${siteUrl}/markets/`,
    title: 'Active Biochar Markets | Biomass Resource Group',
    description: 'Active BRG operating corridors and additional regions under disciplined development.',
  }],
  [join('about', 'index.html'), {
    canonical: `${siteUrl}/about/`,
    title: 'About BRG | Biomass Resource Group',
    description: 'The leadership, operating discipline, and verification posture behind Biomass Resource Group.',
  }],
  [join('contact', 'index.html'), {
    canonical: `${siteUrl}/contact/`,
    title: 'Contact BRG | Biomass Resource Group',
    description: 'Contact BRG for investment, carbon offtake, project delivery, or general inquiries.',
  }],
  [join('company', 'index.html'), {
    canonical: `${siteUrl}/about/`,
    title: 'About BRG | Biomass Resource Group',
    noindex: true,
  }],
  [join('privacy', 'index.html'), {
    canonical: `${siteUrl}/privacy/`,
    title: 'Privacy | Biomass Resource Group',
    description: 'How BRG handles inquiry information on this static website.',
  }],
  ['404.html', {
    canonical: `${siteUrl}/404.html`,
    title: 'Page not found | Biomass Resource Group',
    noindex: true,
  }],
]);

const forbiddenContent = [
  'FORM_ID_PLACEHOLDER',
  'Affiliations and standards',
  'ICVCM-approved',
  'Each production run can generate verified credits',
  'Converting waste biomass into verified carbon removal',
  '/cdn-cgi/l/email-protection',
  '__cf_email__',
  'Toggle navigation',
  'https://www.linkedin.com/in/cody-danet/',
  'Markets under evaluation',
  'Under evaluation',
  'Pipeline markets are not presented as active projects',
  'no active operating claim is made from this label alone',
  'Verification claims stay narrow',
  'A concise view of who leads',
  'Focus:',
  'Pathways, not endorsements',
  'careful verification language',
  'Verification-ready',
  'Under verification',
];

const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const expectFile = (relativePath) => {
  const absolutePath = join(distDir, relativePath);
  expect(existsSync(absolutePath), `Missing dist artifact: ${relativePath}`);
  return absolutePath;
};

const read = (relativePath) => readFileSync(join(distDir, relativePath), 'utf8');

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

    if (predicate(relativePath)) matches.push(relativePath);
  }

  return matches;
};

const toRoutePattern = (relativePath) => {
  const normalizedPath = relativePath.replaceAll('\\', '/');
  if (normalizedPath === 'index.html') return '/';
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

if (!existsSync(distDir)) {
  throw new Error(`Missing dist directory at ${distDir}. Run npm run build first.`);
}

for (const file of requiredFiles) expectFile(file);

expect(!existsSync(join(distDir, 'updates')), 'dist still contains a public updates directory');

const redirects = read('_redirects');
expect(redirects.includes('/company /about 301'), '_redirects is missing /company 301');
expect(redirects.includes('/company/ /about/ 301'), '_redirects is missing /company/ 301');
expect(redirects.includes('/updates /'), '_redirects is missing /updates redirect');
expect(redirects.includes('/updates/* /'), '_redirects is missing /updates/* redirect');

const headersBlocks = parseHeadersBlocks(read('_headers'));
const rootHeaders = headersBlocks.get('/*') ?? new Map();
const assetHeaders = headersBlocks.get('/_astro/*') ?? new Map();

expect(rootHeaders.get('x-frame-options') === 'DENY', '_headers is missing X-Frame-Options: DENY');
expect(rootHeaders.get('referrer-policy') === 'strict-origin-when-cross-origin', '_headers is missing Referrer-Policy');
expect(rootHeaders.get('cross-origin-opener-policy') === 'same-origin', '_headers is missing COOP');
expect(rootHeaders.get('cross-origin-resource-policy') === 'same-origin', '_headers is missing CORP');
expect(assetHeaders.get('cache-control') === 'public, max-age=31536000, immutable', '_headers is missing immutable asset cache policy');

const cssAssets = collectRelativePaths(join(distDir, '_astro'), (relativePath) =>
  relativePath.endsWith('.css'),
);
for (const cssAsset of cssAssets) {
  const stylesheet = readFileSync(join(distDir, '_astro', cssAsset), 'utf8');
  expect(!stylesheet.includes('data:font/'), `${cssAsset} contains inlined font data URLs`);
  expect(stylesheet.includes('prefers-reduced-motion'), `${cssAsset} is missing reduced-motion rules`);
  expect(!/a\{[^}]*text-decoration:none/.test(stylesheet), `${cssAsset} globally removes link underlines`);
  expect(/@media[^{]*max-width:\s*820px/.test(stylesheet), `${cssAsset} is missing a 820px responsive breakpoint`);
  expect(
    /\.site-menu-toggle\{[^}]*display:inline-flex/.test(stylesheet) ||
      /html\.js\s+\.site-menu-toggle\{[^}]*display:inline-flex/.test(stylesheet),
    `${cssAsset} is missing a mobile display rule for .site-menu-toggle`,
  );
  expect(!/\.schematic-map(__|[^a-z])/.test(stylesheet), `${cssAsset} still contains schematic-map selectors`);
  expect(!/\.section-intro-block__label::before/.test(stylesheet), `${cssAsset} still applies a decorative ::before to section labels`);
  expect(
    !/\.metric-card,[\s\S]{0,200}\.audience-card,[\s\S]{0,400}\.corridor-card\{/.test(stylesheet),
    `${cssAsset} still groups many unrelated components into one card-shell selector`,
  );
  expect(
    !/\.no-js-nav\{[^}]*display:\s*none/.test(stylesheet),
    `${cssAsset} hides .no-js-nav by default; the noscript fallback must remain visible`,
  );

  // Stale class families: must not retain CSS after they leave source markup
  const staleFamilies = [
    'info-card',
    'proof-summary',
    'pipeline-card',
    'metric-card',
    'audience-card',
    'principle-card',
    'technology-row',
    'corridor-card',
    'email-card',
    'contact-route-card',
    'status-legend',
  ];
  for (const family of staleFamilies) {
    const re = new RegExp('\\.' + family + '(__|--|[^a-zA-Z0-9_-])', 'g');
    expect(!re.test(stylesheet), `${cssAsset} still contains stale .${family} CSS`);
  }

  // Orphan selector fragments: bare > *, > span, h3, or p inside a comma-separated grouped selector list.
  // These appear when a selector was deleted mid-list and a trailing comma+next-line was left dangling.
  expect(
    !/,\s*>\s*\*\s*,/.test(stylesheet) && !/,\s*>\s*\*\s*\{/.test(stylesheet),
    `${cssAsset} contains an orphan "> *" selector inside a grouped rule`,
  );
  expect(
    !/,\s*>\s*span\s*,/.test(stylesheet) && !/,\s*>\s*span\s*\{/.test(stylesheet),
    `${cssAsset} contains an orphan "> span" selector inside a grouped rule`,
  );
  // Bare element fragments (h1-h6 or p) inside a grouped class-rule are nearly always orphans
  // left behind by selector deletion. > * and > span are caught by the rules above.
  expect(
    !/(?:^|,)\s*[hH][1-6]\s*,\s*\.[a-zA-Z_-]/.test(stylesheet),
    `${cssAsset} contains a bare heading element inside a grouped class selector list (likely an orphan)`,
  );
  expect(
    !/(?:,)\s*p\s*,\s*\.[a-zA-Z_-]/.test(stylesheet) && !/(?:,)\s*p\s*\{[^}]*max-width/.test(stylesheet),
    `${cssAsset} contains a bare <p> element inside a grouped class selector list (likely an orphan)`,
  );
  // Selector lists that end with a comma immediately before another rule body — e.g. `.foo,.bar,{` — are clearly broken.
  expect(
    !/,\s*\{/.test(stylesheet),
    `${cssAsset} contains a selector list ending with a trailing comma before \`{\``,
  );
  // Pseudo-diagram residue: motif/pip/line/legend selectors are decorative dossier
  // micro-diagrams that must not regress into either source or built CSS.
  const pseudoDiagramSelectors = [
    'corridor-dossier__motif',
    'corridor-dossier__pip',
    'corridor-dossier__line',
    'corridor-dossier__legend',
    'home-hero__schematic',
    'schematic-map',
  ];
  for (const sel of pseudoDiagramSelectors) {
    expect(
      !new RegExp('\\.' + sel + '(__|--|[^a-zA-Z0-9_-])').test(stylesheet),
      `${cssAsset} still contains pseudo-diagram selector .${sel}`,
    );
  }
}

const htmlPaths = collectRelativePaths(distDir, (relativePath) => relativePath.endsWith('.html'));

for (const relativePath of htmlPaths) {
  const html = read(relativePath);
  const routePattern = toRoutePattern(relativePath);
  const expectation = routeExpectations.get(relativePath);
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
  expect(executableInlineScripts.length === 0, `${relativePath} contains inline executable scripts`);
  expect(routeHeaders instanceof Map, `${relativePath} is missing a route-specific CSP block`);
  expect(html.includes(`<meta property="og:image" content="${siteUrl}/og-default.jpg"`), `${relativePath} is missing og:image`);
  expect(html.includes(`<meta name="twitter:image" content="${siteUrl}/og-default.jpg"`), `${relativePath} is missing twitter:image`);
  expect(html.includes('<meta name="twitter:card" content="summary_large_image"'), `${relativePath} is missing Twitter summary_large_image`);
  expect(!html.includes('/updates/'), `${relativePath} still links to removed /updates route`);

  if (expectation) {
    expect(html.includes(`<link rel="canonical" href="${expectation.canonical}"`), `${relativePath} has the wrong canonical`);
    expect(html.includes(`<title>${expectation.title}</title>`), `${relativePath} has the wrong title`);
    if (expectation.description) {
      expect(html.includes(`<meta name="description" content="${expectation.description}"`), `${relativePath} has the wrong description`);
    }
    expect(
      expectation.noindex ? html.includes('content="noindex, nofollow"') : !/noindex/i.test(html),
      `${relativePath} has the wrong robots indexing state`,
    );
  }

  for (const forbidden of forbiddenContent) {
    expect(!html.includes(forbidden), `${relativePath} still contains forbidden content: ${forbidden}`);
  }

  if (!routeHeaders) continue;

  expect(csp.includes("default-src 'self'"), `${relativePath} CSP is missing default-src 'self'`);
  expect(csp.includes("script-src 'self'"), `${relativePath} CSP is missing script-src 'self'`);
  expect(csp.includes("style-src 'self'"), `${relativePath} CSP is missing style-src 'self'`);
  expect(csp.includes("object-src 'none'"), `${relativePath} CSP is missing object-src 'none'`);
  expect(csp.includes("base-uri 'self'"), `${relativePath} CSP is missing base-uri 'self'`);
  expect(csp.includes("frame-ancestors 'none'"), `${relativePath} CSP is missing frame-ancestors 'none'`);
  expect(csp.includes("form-action 'self' https://formspree.io mailto:"), `${relativePath} CSP is missing static contact form-action support`);

  for (const script of jsonLdScripts) {
    const hash = hashScript(script.content);
    expect(csp.includes(`'sha256-${hash}'`), `${relativePath} CSP is missing JSON-LD hash ${hash}`);
  }
}

const homeHtml = read('index.html');
const platformHtml = read(join('platform', 'index.html'));
const marketsHtml = read(join('markets', 'index.html'));
const aboutHtml = read(join('about', 'index.html'));
const contactHtml = read(join('contact', 'index.html'));
const notFoundHtml = read('404.html');
const siteUi = read(join('scripts', 'site-ui.js'));
const sitemap = read('sitemap-0.xml');

expect(homeHtml.includes('Operator-led biochar infrastructure for carbon removal.'), 'Home page is missing the operator-led hero');
expect(homeHtml.includes('Active corridors'), 'Home page is missing the compact status rail');
expect(homeHtml.includes('Operating corridors'), 'Home page is missing the active corridor preview');
expect(homeHtml.indexOf('Active corridors') < homeHtml.indexOf('Operating corridors'), 'Home page status rail is out of order');
expect(!homeHtml.includes('Live infrastructure'), 'Home page still duplicates the old live infrastructure section');
expect(!homeHtml.includes('Why the platform scales'), 'Home page still contains the removed platform-scale section');
expect(!homeHtml.includes('home-metrics'), 'Home page still contains duplicate metric section markup');
expect(!/What\\s+BRG\\s+does/i.test(homeHtml), 'Home page still renders the operating loop section (moved to Platform)');
expect(!/Route\\s+the\\s+right\\s+conversation/i.test(homeHtml), 'Home page still renders the audience routing section (moved to Contact)');
expect(!homeHtml.includes('schematic-map'), 'Home page still renders the schematic-map');
expect(!homeHtml.includes('home-hero__schematic'), 'Home page still renders the schematic visual wrapper');

expect(platformHtml.includes('Operating model'), 'Platform page is missing the operating model section');
expect(platformHtml.includes('Technology fit'), 'Platform page is missing the technology fit section');
expect(platformHtml.includes('Review posture'), 'Platform page is missing the review posture note');
expect(!/revenue/i.test(platformHtml), 'Platform page still exposes investor-oriented revenue language');
expect(!platformHtml.includes('Carbon removal statements follow the project stage'), 'Platform page still exposes awkward standards heading');
expect(!platformHtml.includes('End-to-end biochar projects.'), 'Platform page still exposes awkward hero heading');
expect(!platformHtml.includes('Technology matrix'), 'Platform page still contains the removed technology matrix');
expect(!platformHtml.includes('eligible carbon credits to buyers'), 'Platform page still implies eligible credits routed to buyers');

expect(marketsHtml.includes('Active operating corridors'), 'Markets page is missing active corridors');
expect(marketsHtml.includes('Operating entity'), 'Markets page is missing the operating entity fact label');
expect(marketsHtml.includes('Development regions'), 'Markets page is missing the development regions section');
expect(marketsHtml.includes('Active') && marketsHtml.includes('In development') && marketsHtml.includes('Future corridor'), 'Markets page is missing the public status hierarchy');
expect(marketsHtml.includes('Pakistan') && marketsHtml.includes('MENA') && marketsHtml.includes('Sub-Saharan Africa'), 'Markets page is missing additional regions');
expect(!marketsHtml.includes('Corridor detail'), 'Markets page still contains the removed duplicate corridor-detail section');
{
  const dossiers = marketsHtml.match(/<article class="corridor-dossier[\s\S]*?<\/article>/g) || [];
  for (const dossier of dossiers) {
    const reviewPathwayMatches = (dossier.match(/Review pathway/g) || []).length;
    expect(reviewPathwayMatches <= 1, 'Markets dossier duplicates the "Review pathway" label inside one card');
  }
}

expect(aboutHtml.includes('Biochar infrastructure is built in the field.'), 'About page is missing the operating story');
expect(aboutHtml.includes('Operating principles'), 'About page is missing operating principles');
expect(aboutHtml.includes('Claims discipline'), 'About page is missing the compact claims discipline note');
expect(aboutHtml.includes('Julie Brown') && aboutHtml.includes('https://www.linkedin.com/in/julieajbrown/'), 'About page is missing Julie Brown LinkedIn');
expect(!aboutHtml.includes('future direct jobs potential'), 'About page still contains the removed evidence snapshot');
expect(!aboutHtml.includes('Evidence is tied to operating stage.'), 'About page still renders the removed evidence snapshot section');
expect(!aboutHtml.includes('Carbon claims stay tied to project evidence.'), 'About page still renders the removed standalone verification section');

expect(contactHtml.includes('data-contact-form'), 'Contact page is missing the always-rendered inquiry form');
expect(contactHtml.includes('data-contact-route="investor"') && contactHtml.includes('data-contact-route="carbon"') && contactHtml.includes('data-contact-route="partner"') && contactHtml.includes('data-contact-route="general"'), 'Contact page is missing route cards for all inquiry types');
expect(contactHtml.includes('data-form-mode="mailto"'), 'Contact form is not configured for static mailto fallback');
expect(contactHtml.includes('Copy inquiry summary'), 'Contact page is missing inquiry summary copy action');
expect(contactHtml.includes('If your email app does not open'), 'Contact page is missing mailto fallback guidance');
expect((contactHtml.match(/If your email app does not open/g) || []).length <= 1, 'Contact page repeats the mailto fallback explanation more than once');
expect(contactHtml.includes('/privacy/'), 'Contact page is missing privacy notice link');
expect(contactHtml.includes('info@biomassresourcegroup.com'), 'Contact page is missing visible info email');
expect(contactHtml.includes('invest@biomassresourcegroup.com'), 'Contact page is missing visible investor email');
expect(contactHtml.includes('carbon@biomassresourcegroup.com'), 'Contact page is missing visible carbon email');
expect(contactHtml.includes('partnerships@biomassresourcegroup.com'), 'Contact page is missing visible partnerships email');
expect(!contactHtml.includes('Copy buttons add convenience'), 'Contact page still exposes internal progressive-enhancement language');
{
  const buttons = contactHtml.match(/<button[^>]*data-contact-route[\s\S]*?<\/button>/g) || [];
  for (const btn of buttons) {
    expect(!/@biomassresourcegroup\.com/.test(btn), 'Contact route buttons still expose raw email addresses');
  }
}
expect(homeHtml.includes('<!--email_off-->'), 'Home page footer email is not protected from Cloudflare email obfuscation');
expect(contactHtml.includes('<!--email_off-->'), 'Contact page email routes are not protected from Cloudflare email obfuscation');

expect(notFoundHtml.includes('Page not found.'), '404 page is missing the required heading');
expect(notFoundHtml.includes('/platform/') && notFoundHtml.includes('/markets/') && notFoundHtml.includes('/contact/') && notFoundHtml.includes('href="/"'), '404 page is missing recovery links');
const privacyHtml = read(join('privacy', 'index.html'));
expect(privacyHtml.includes('Privacy notice'), 'Privacy page is missing its heading');
expect(privacyHtml.includes('This website does not store inquiry form data in mailto mode'), 'Privacy page is missing static site behavior');
expect(privacyHtml.includes('If a form endpoint is configured later'), 'Privacy page is missing future endpoint disclosure');
expect(homeHtml.includes('/privacy/') || contactHtml.includes('/privacy/'), 'Site pages do not link to the privacy page');

expect(siteUi.includes('hidden = !isOpen'), 'site-ui does not manage hidden state for the mobile menu');
expect(siteUi.includes("toggleAttribute('inert'"), 'site-ui does not manage inert state for the mobile menu');
expect(siteUi.includes('Close navigation') && siteUi.includes('Open navigation'), 'site-ui does not update menu labels');
expect(siteUi.includes('window.location.href = `mailto:'), 'site-ui does not implement the mailto form fallback');
expect(siteUi.includes('navigator.clipboard.writeText'), 'site-ui does not implement copy-to-clipboard behavior');

expect(!sitemap.includes('/company/'), 'sitemap includes duplicate /company/');
expect(!sitemap.includes('/404/'), 'sitemap includes /404/');
expect(sitemap.includes('/privacy/'), 'sitemap is missing /privacy/');

// ProcessFlow numbering must not be spoken twice (once by <ol> and once by .process-flow__index).
for (const relativePath of htmlPaths) {
  const html = read(relativePath);
  const indices = html.match(/<span class="process-flow__index"[^>]*>/g) || [];
  for (const indexEl of indices) {
    expect(
      indexEl.includes('aria-hidden="true"'),
      `${relativePath} renders a .process-flow__index without aria-hidden="true"`,
    );
  }
}

// Pseudo-diagram residue must not appear in rendered HTML either.
for (const relativePath of htmlPaths) {
  const html = read(relativePath);
  for (const cls of ['corridor-dossier__motif', 'corridor-dossier__pip', 'corridor-dossier__line', 'corridor-dossier__legend', 'home-hero__schematic', 'schematic-map']) {
    expect(!html.includes(cls), `${relativePath} renders pseudo-diagram class ${cls}`);
  }
}

// Source/CSS parity: required current component families must have dedicated CSS.
{
  const requiredFamilies = [
    'status-rail',
    'corridor-preview',
    'pipeline-strip',
    'process-flow',
    'tech-fit',
    'review-posture',
    'leadership-row',
    'doctrine-list',
    'contact-route__button',
    'email-row',
    'privacy-notice',
  ];
  const allCss = cssAssets.map((asset) => readFileSync(join(distDir, '_astro', asset), 'utf8')).join('\n');
  for (const family of requiredFamilies) {
    const re = new RegExp('\\.' + family.replace(/__/g, '__') + '(?:[^a-zA-Z0-9_-]|$)');
    expect(re.test(allCss), `Built CSS is missing a dedicated rule for .${family}`);
  }
}

// Carbon-claim discipline: forbid uncaveated overstatements in any rendered HTML.
const uncaveatedCarbon = [
  /\bverified\s+carbon\s+removal/i,
  /\bissued\s+credits/i,
  /\bdelivered\s+carbon\s+removal/i,
  /\bregistry[-\s]approved/i,
  /\bcertified\s+credits/i,
  /\bguaranteed\s+carbon/i,
  /\bpermanent\s+carbon/i,
  /\bindustrial\s+scale/i,
];
for (const relativePath of htmlPaths) {
  const html = read(relativePath);
  for (const pattern of uncaveatedCarbon) {
    expect(!pattern.test(html), `${relativePath} contains uncaveated carbon claim matching ${pattern}`);
  }
}

if (failures.length > 0) {
  console.error('Distribution validation failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Distribution validation passed for ${htmlPaths.length} HTML routes.`);
