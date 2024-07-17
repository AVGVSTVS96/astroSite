import { useState, useEffect } from 'react';
import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
  type BundledTheme,
  bundledLanguages,
} from 'shiki';

const highlighter: Promise<Highlighter> = createHighlighter({
  themes: [],
  langs: Object.keys(bundledLanguages) as BundledLanguage[],
});

export const useShikiHighlighter = (
  language: BundledLanguage,
  code: string,
  theme: BundledTheme
) => {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

  useEffect(() => {
  const highlight = async () => {
    const h = await highlighter;
    const html = h.codeToHtml(code, {
      lang: language,
      theme,
    });
    setHighlightedCode(html);
  };
  // console.time('highlight');
  highlight();
  // console.timeEnd('highlight');
}, [code]);

  return highlightedCode;
};
