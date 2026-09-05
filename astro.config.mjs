// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://biomassresourcegroup.com',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/company/'),
    }),
  ],
  vite: {
    build: {
      assetsInlineLimit: 0,
      // Preserve the existing CSS/JS output contract through the Vite 8 upgrade.
      // In particular, mobile media queries and inert-state calls stay in the
      // syntax checked by validate:dist and the deployment monitor.
      minify: 'esbuild',
      cssMinify: 'esbuild',
    },
  },
});
