import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkSectionize from 'remark-sectionize';
import expressiveCode, { type AstroExpressiveCodeOptions } from 'astro-expressive-code';
import icon from 'astro-icon';

const astroExpressiveCodeOptions:AstroExpressiveCodeOptions = {
  themes: ['material-theme-ocean', 'material-theme-palenight'],
  themeCssSelector: (theme) => `[data-code-theme='${theme.name}']`
};

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkSectionize],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    expressiveCode(astroExpressiveCodeOptions),
    icon(),
  ],
});