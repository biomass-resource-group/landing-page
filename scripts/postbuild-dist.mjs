import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = process.cwd();
const distDir = join(repoRoot, 'dist');
const headersPath = join(distDir, '_headers');

if (!existsSync(distDir)) {
  throw new Error(`Missing dist directory at ${distDir}. Run the Astro build first.`);
}

if (!existsSync(headersPath)) {
  throw new Error(`Missing _headers file at ${headersPath}.`);
}

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

const hashScript = (content) => createHash('sha256').update(content).digest('base64');

const buildContentSecurityPolicy = (hashes) => {
  const scriptSources = [`'self'`, ...hashes.map((hash) => `'sha256-${hash}'`)].join(' ');

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self'",
    "font-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "img-src 'self' data:",
    "manifest-src 'self'",
    "object-src 'none'",
    `script-src ${scriptSources}`,
    "style-src 'self'",
    "worker-src 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
};

const htmlPaths = collectRelativePaths(distDir, (relativePath) => relativePath.endsWith('.html'));
const routeSections = htmlPaths.map((relativePath) => {
  const html = readFileSync(join(distDir, relativePath), 'utf8');
  const hashes = Array.from(html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi))
    .filter(([_, attributes]) => !/\bsrc\s*=/.test(attributes))
    .map(([_, __, content]) => hashScript(content))
    .filter((hash, index, collection) => collection.indexOf(hash) === index);

  return `${toRoutePattern(relativePath)}\n  Content-Security-Policy: ${buildContentSecurityPolicy(hashes)}`;
});

const baseHeaders = readFileSync(headersPath, 'utf8').trimEnd();
const nextHeaders = `${baseHeaders}\n\n${routeSections.join('\n\n')}\n`;

writeFileSync(headersPath, nextHeaders);

console.log(`Wrote route-specific CSP headers for ${routeSections.length} HTML routes.`);
