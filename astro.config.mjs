import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Public URL used for canonical links, the sitemap and social previews.
// It is used for canonical links, Open Graph tags, the sitemap and robots.txt.
export const SITE_URL = 'https://umrazx.github.io';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  compressHTML: true,
  build: { inlineStylesheets: 'always', format: 'file' },
  integrations: [sitemap()],
});
