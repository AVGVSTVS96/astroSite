import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import expressiveCode from 'astro-expressive-code';

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const astroExpressiveCodeOptions = {
  themes: ['material-theme-ocean'],
};

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), expressiveCode(astroExpressiveCodeOptions)],
});

