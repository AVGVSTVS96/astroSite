import { defineConfig } from 'astro/config';
import remarkSectionize from '@avgvstvs96/remark-sectionize';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import icon from 'astro-icon';
import expressiveCode, {
  type AstroExpressiveCodeOptions,
  ExpressiveCodeTheme,
} from 'astro-expressive-code';
import fs from 'node:fs';
import vercel from '@astrojs/vercel/serverless';

const themeFile = fs.readFileSync(
  new URL('./src/styles/rainglowAzure.jsonc', import.meta.url),
  'utf-8'
);
const codeTheme = ExpressiveCodeTheme.fromJSONString(themeFile);

const astroExpressiveCodeOptions: AstroExpressiveCodeOptions = {
  themes: [codeTheme],
  themeCssSelector: (theme) => `.${theme.type}`,
  useThemedSelectionColors: true,
  styleOverrides: {
    textMarkers: {
      markBackground: 'hsla(220, 25.00%, 30%, 0.4)',
      markBorderColor: 'hsla(220, 30.00%, 30%, 1)',
    },
    frames: {
      inlineButtonBorderOpacity: '0.0',
    },
  },
};

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkSectionize],
  },
  prefetch: {
    defaultStrategy: 'load',
    prefetchAll: true,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    expressiveCode(astroExpressiveCodeOptions),
    icon(),
    react(),
  ],
  output: 'hybrid',
  adapter: vercel(),
});
