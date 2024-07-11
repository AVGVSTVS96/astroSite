import { useState, useEffect, type ReactNode } from 'react';
import {
  createHighlighter,
  type BundledLanguage,
  type BundledTheme,
  type Highlighter,
} from 'shiki';
import parse from 'html-react-parser';
import { removeTabIndexFromPre } from '@/lib/utils';
import customTheme from '@styles/rainglow-azure-constrast.mjs';

export const useShikiHighlighter = (
  code: string,
  lang: BundledLanguage | undefined,
  theme: BundledTheme
) => {
  const [highlightedCode, setHighlightedCode] = useState<ReactNode | null>(
    null
  );
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeHighlighter = async () => {
      if (!highlighter) {
        const newHighlighter = await createHighlighter({
          langs: [lang as BundledLanguage],
          themes: [customTheme as unknown as BundledTheme],
        });
        setHighlighter(newHighlighter);
        setIsReady(true);
      }
    };

    initializeHighlighter();
  }, [lang]);

  useEffect(() => {
    if (isReady && highlighter && lang) {
      console.time('shiki');
      const html = highlighter.codeToHtml(code, {
        lang: lang,
        theme: customTheme.name as BundledTheme,
        transformers: [removeTabIndexFromPre],
      });
      setHighlightedCode(parse(html));
    }
    console.timeEnd('shiki');
  }, [code, lang, highlighter, isReady]);

  return isReady ? highlightedCode : null;
};