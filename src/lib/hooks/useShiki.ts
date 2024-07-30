import { useState, useEffect, type ReactNode } from 'react';
import {
  createHighlighter,
  type BundledLanguage,
  type BundledTheme,
  type Highlighter,
} from 'shiki';
import parse from 'html-react-parser';
import { removeTabIndexFromPre } from '@/lib/utils';

// This will store all created highlighter instances
const highlighters = new Map<BundledLanguage, Promise<Highlighter>>();

export const useShikiHighlighter = (
  lang: BundledLanguage | undefined,
  code: string,
  theme: {
    name: BundledTheme;
    displayName: string;
  }
) => {
  const [highlightedCode, setHighlightedCode] = useState<ReactNode | null>(
    null
  );

  useEffect(() => {
    if (!lang) return;

    const highlight = async () => {
      if (!highlighters.has(lang)) {
        // Create a new highlighter for this language
        highlighters.set(
          lang,
          createHighlighter({
            themes: [theme],
            langs: [lang],
          })
        );
      }

      const highlighter = await highlighters.get(lang);

      const html = highlighter?.codeToHtml(code, {
        lang: lang as BundledLanguage,
        theme: theme.name as BundledTheme,
        transformers: [removeTabIndexFromPre],
      });
      // console.time('shiki');
      setHighlightedCode(parse(html ? html : code));
      // console.timeEnd('shiki');
    };

    highlight();
  }, [code, lang]);

  return highlightedCode;
};
