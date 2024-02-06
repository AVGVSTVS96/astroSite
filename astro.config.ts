import { defineConfig } from 'astro/config';
import remarkSectionize from 'remark-sectionize';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import expressiveCode, {
  type AstroExpressiveCodeOptions,
} from 'astro-expressive-code';

const astroExpressiveCodeOptions: AstroExpressiveCodeOptions = {
  themes: ['material-theme-palenight', 'material-theme-ocean'],
  themeCssSelector: (theme) => `.${theme.type}`,
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
