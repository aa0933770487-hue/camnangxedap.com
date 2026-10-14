import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://camnangxedap.pages.dev',
  integrations: [
    tailwind(),
  ],
});
