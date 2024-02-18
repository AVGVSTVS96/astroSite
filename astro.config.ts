import { defineConfig } from 'astro/config';
import remarkSectionize from 'remark-sectionize';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import expressiveCode, {
  type AstroExpressiveCodeOptions,
} from 'astro-expressive-code';

const astroExpressiveCodeOptions: AstroExpressiveCodeOptions = {
  themes: ['rose-pine-moon', 'rose-pine'],
  themeCssSelector: (theme) => `.${theme.type}`,
  useThemedSelectionColors: true,
  styleOverrides: {
    textMarkers: {
      markBackground: 'hsla(220, 25.00%, 30%, 0.4)',
      markBorderColor: 'hsla(220, 30.00%, 30%, 1)',
    }
  },
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
