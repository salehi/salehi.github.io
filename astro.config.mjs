// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://salehi.github.io',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  // Old pages; everything now lives on the home page.
  redirects: { '/cv': '/', '/projects': '/', '/writing': '/' },
  build: { inlineStylesheets: 'always' },
});
