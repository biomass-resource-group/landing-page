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
    },
  },
});
