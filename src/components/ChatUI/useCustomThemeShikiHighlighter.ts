import { useState, useEffect } from 'react';
import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
  type BundledTheme,
  bundledLanguages,
} from 'shiki';
import customTheme from '@styles/rainglow-azure-contrast.mjs';

const highlighter: Promise<Highlighter> = createHighlighter({
  themes: [customTheme as unknown as BundledTheme],
  langs: Object.keys(bundledLanguages) as BundledLanguage[],
});

export const useShikiHighlighter = (
  language: BundledLanguage,
  code: string
) => {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

  useEffect(() => {
    const highlight = async () => {
      const h = await highlighter;
    //   console.time('highlight');
      const html = h.codeToHtml(code, {
        lang: language,
        theme: customTheme,
      });
    //   console.timeEnd('highlight');
      setHighlightedCode(html);
    };
    highlight();
  }, [code]);

  return highlightedCode;
};