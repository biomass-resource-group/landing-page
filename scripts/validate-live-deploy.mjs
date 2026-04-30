import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { normalizeHeaderValue, parseHeadersBlocks } from './headers-utils.mjs';

const siteUrl = (process.env.SITE_URL ?? 'https://biomassresourcegroup.com').replace(/\/$/, '');
const repoRoot = process.cwd();
const distHeadersFile = join(repoRoot, 'dist', '_headers');
const sourceHeadersFile = join(repoRoot, 'public', '_headers');
const headersFile = existsSync(distHeadersFile) ? distHeadersFile : sourceHeadersFile;
const headerBlocks = parseHeadersBlocks(readFileSync(headersFile, 'utf8'));

const failures = [];
const warnings = [];
const toleratedHeaderValues = new Map([
  ['x-frame-options', new Set(['DENY', 'SAMEORIGIN'])],
  ['referrer-policy', new Set(['strict-origin-when-cross-origin', 'same-origin'])],
]);

const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const isToleratedHeaderValue = (name, actualValue) => {
  const toleratedValues = toleratedHeaderValues.get(name);
  if (!toleratedValues) return false;

  return Array.from(toleratedValues).some(
    (candidate) => candidate.toLowerCase() === actualValue.toLowerCase(),
  );
};

const rootHeaders = headerBlocks.get('/*') ?? new Map();
const assetHeaders = headerBlocks.get('/_astro/*') ?? new Map();
const homeHeaders = headerBlocks.get('/') ?? new Map();

const fetchText = async (url) => {
  const response = await fetch(url, { redirect: 'follow' });
  const text = await response.text();

  return { response, text };
};

const expectReachablePage = async (path) => {
  const page = await fetchText(`${siteUrl}${path}`);
  expect(page.response.ok, `${path} request failed with ${page.response.status}`);
  expect(page.response.url === `${siteUrl}${path}`, `${path} unexpectedly redirected`);
  expect(
    page.text.includes(`<link rel="canonical" href="${siteUrl}${path}"`),
    `${path} canonical does not match production URL`,
  );
  expect(!/noindex/i.test(page.text), `${path} contains an unexpected noindex directive`);

  return page;
};

const compareHeaders = (response, expectedHeaders, label) => {
  for (const [name, expectedValue] of expectedHeaders.entries()) {
    const actualValue = response.headers.get(name);
    expect(actualValue !== null, `${label} is missing header ${name}`);

    if (actualValue !== null) {
      const normalizedActualValue = normalizeHeaderValue(actualValue);

      if (normalizedActualValue !== expectedValue) {
        if (isToleratedHeaderValue(name, normalizedActualValue)) {
          warnings.push(
            `${label} header ${name} is "${actualValue}", expected "${expectedValue}" in repo output`,
          );
        } else {
          failures.push(
            `${label} header ${name} is "${actualValue}", expected "${expectedValue}"`,
          );
        }
      }
    }
  }
};

const main = async () => {
  const home = await fetchText(`${siteUrl}/`);
  expect(home.response.ok, `Home page request failed with ${home.response.status}`);
  compareHeaders(home.response, rootHeaders, 'home page');
  compareHeaders(home.response, homeHeaders, 'home page');

  expect(
    home.text.includes(`<link rel="canonical" href="${siteUrl}/"`),
    'Home page canonical does not match production URL',
  );
  expect(
    home.text.includes(`<meta property="og:image" content="${siteUrl}/og-default.jpg"`),
    'Home page is missing og:image for og-default.jpg',
  );
  expect(
    home.text.includes(`<meta name="twitter:image" content="${siteUrl}/og-default.jpg"`),
    'Home page is missing twitter:image for og-default.jpg',
  );
  expect(
    home.response.headers.get('content-security-policy') !== null,
    'Home page is missing Content-Security-Policy',
  );
  expect(
    home.text.includes('What BRG does') &&
      home.text.includes('Where work is active now') &&
      home.text.indexOf('What BRG does') < home.text.indexOf('Where work is active now'),
    'Home page does not expose the simplified executive-summary structure',
  );
  expect(
    home.text.includes('Start a focused conversation'),
    'Home page is missing the simplified final CTA',
  );
  expect(!home.text.includes('Choose your pathway'), 'Home page still contains the removed role-pathway section');
  expect(!home.text.includes('Why the platform scales'), 'Home page still contains the removed platform-scale section');
  expect(
    !home.text.includes('/cdn-cgi/l/email-protection') && !home.text.includes('__cf_email__'),
    'Home page still contains Cloudflare email obfuscation markup',
  );
  expect(!home.text.includes('/updates/'), 'Home page still links to a removed /updates route');
  expect(
    !/Latest Activity|View all updates|Read the update|Latest milestone|Latest update/.test(home.text),
    'Home page still exposes removed updates language',
  );
  expect(
    !home.text.includes('https://www.linkedin.com/in/cody-danet/'),
    'Home page still includes Cody Danet LinkedIn link markup',
  );

  const platform = await expectReachablePage('/platform/');
  const markets = await expectReachablePage('/markets/');
  const about = await expectReachablePage('/about/');
  const contact = await expectReachablePage('/contact/');
  expect(platform.text.includes('Project-stage carbon documentation'), 'Platform page is missing standards/verification handling');
  expect(!platform.text.includes('Carbon removal statements follow the project stage'), 'Platform page still exposes awkward standards heading');
  expect(!platform.text.includes('End-to-end biochar projects.'), 'Platform page still exposes awkward hero heading');
  expect(!platform.text.includes('Ownership model'), 'Platform page still contains the removed ownership matrix');
  expect(!platform.text.includes('Technology matrix'), 'Platform page still contains the removed technology matrix');
  expect(markets.text.includes('Operating work underway'), 'Markets page is missing active corridors');
  expect(markets.text.includes('Additional regions'), 'Markets page is missing additional regional development section');
  expect(!markets.text.includes('Markets under evaluation'), 'Markets page still exposes internal evaluation language');
  expect(!markets.text.includes('Under evaluation'), 'Markets page still exposes internal status labels');
  expect(!markets.text.includes('no active operating claim is made from this label alone'), 'Markets page still exposes internal claim-hygiene wording');
  expect(!markets.text.includes('Status legend'), 'Markets page still contains the removed status legend');
  expect(contact.text.includes('data-contact-form'), 'Contact page is missing the inquiry form');
  expect(contact.text.includes('data-form-mode="mailto"'), 'Contact page is missing the static mailto fallback');
  expect(contact.text.includes('Copy inquiry summary'), 'Contact page is missing inquiry summary copy support');
  expect(contact.text.includes('info@biomassresourcegroup.com'), 'Contact page is missing visible direct email');
  expect(!contact.text.includes('Copy buttons add convenience'), 'Contact page still exposes internal progressive-enhancement language');
  expect(
    about.text.includes('https://www.linkedin.com/in/julieajbrown/'),
    'About page is missing Julie Brown LinkedIn markup',
  );
  expect(
    about.text.includes('Built for independent review'),
    'About page is missing renamed standards and verification pathway language',
  );
  expect(!about.text.includes('A concise view of who leads'), 'About page still exposes internal leadership framing');
  expect(!about.text.includes('Focus:'), 'About page still exposes internal leadership labels');
  expect(!about.text.includes('Pathways, not endorsements'), 'About page still exposes internal standards framing');
  expect(!about.text.includes('careful verification language'), 'About page still exposes internal verification-language framing');
  expect(!about.text.includes('Verification-ready'), 'About page still exposes internal verification status labels');
  expect(!about.text.includes('Under verification'), 'About page still exposes internal verification status labels');
  expect(!about.text.includes('future direct jobs potential'), 'About page still contains the removed evidence snapshot');
  expect(!about.text.includes('Operating principles'), 'About page still contains the removed principles section');
  expect(
    !about.text.includes('https://www.linkedin.com/in/cody-danet/'),
    'About page still includes Cody Danet LinkedIn link markup',
  );

  const company = await fetchText(`${siteUrl}/company/`);
  expect(company.response.ok, `/company/ request failed with ${company.response.status}`);
  expect(company.response.url === `${siteUrl}/about/`, '/company/ did not redirect to /about/');

  const updates = await fetchText(`${siteUrl}/updates/`);
  expect(updates.response.ok, `/updates/ request failed with ${updates.response.status}`);
  expect(updates.response.url === `${siteUrl}/`, `/updates/ did not redirect to the home page`);

  const retiredUpdate = await fetchText(`${siteUrl}/updates/brg-holding-company-established/`);
  expect(
    retiredUpdate.response.ok,
    `/updates/brg-holding-company-established/ request failed with ${retiredUpdate.response.status}`,
  );
  expect(
    retiredUpdate.response.url === `${siteUrl}/`,
    '/updates/brg-holding-company-established/ did not redirect to the home page',
  );

  const robots = await fetchText(`${siteUrl}/robots.txt`);
  expect(robots.response.ok, `robots.txt request failed with ${robots.response.status}`);
  expect(
    robots.text.includes(`Sitemap: ${siteUrl}/sitemap-index.xml`),
    'robots.txt does not reference the production sitemap',
  );

  const assetMatch = home.text.match(/href="(\/_astro\/[^"]+\.css)"/);
  if (assetMatch?.[1]) {
    const asset = await fetchText(`${siteUrl}${assetMatch[1]}`);
    expect(asset.response.ok, `CSS asset request failed with ${asset.response.status}`);
    compareHeaders(asset.response, assetHeaders, 'CSS asset');
    expect(
      !asset.text.includes('data:font/'),
      'CSS asset still contains inlined font data URLs that violate the site CSP',
    );
  } else {
    failures.push('Could not find a built CSS asset in the home page HTML');
  }

  if (failures.length > 0) {
    console.error('Live deployment validation failed:\n');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn('Live deployment validation warnings:\n');
    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
    console.warn('');
  }

  console.log(`Live deployment validation passed for ${siteUrl}.`);
};

await main();
