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
    home.text.indexOf('home-model-preview') !== -1 &&
      home.text.indexOf('home-destinations') !== -1 &&
      home.text.indexOf('home-model-preview') < home.text.indexOf('home-destinations'),
    'Home page does not place the commercial model ahead of the diligence-path section',
  );
  expect(
    !home.text.includes('See the full operating model'),
    'Home page still exposes the duplicate platform CTA copy',
  );
  expect(
    !home.text.includes('/cdn-cgi/l/email-protection') && !home.text.includes('__cf_email__'),
    'Home page still contains Cloudflare email obfuscation markup',
  );
  expect(!home.text.includes('/updates/'), 'Home page still links to a removed /updates route');
  expect(
    !/Latest Activity|View all updates|Read the update|Latest milestone|Latest update/.test(home.text),
    'Home page still exposes removed updates language',
  );

  await expectReachablePage('/platform/');
  await expectReachablePage('/markets/');
  await expectReachablePage('/company/');
  await expectReachablePage('/contact/');

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
