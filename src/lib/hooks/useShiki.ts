import { useState, useEffect, type ReactNode } from 'react';
import {
  codeToHtml,
  type BundledLanguage,
  type BundledTheme,
} from 'shiki';
import parse from 'html-react-parser';
import { removeTabIndexFromPre } from '@/lib/utils';

export const useShikiHighlighter = (
  code: string,
  lang: BundledLanguage | undefined,
  theme: BundledTheme
) => {
  const [highlightedCode, setHighlightedCode] = useState<ReactNode | null>(
    null
  );

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const html = await codeToHtml(code, {
          lang: lang as BundledLanguage,
          theme,
          transformers: [removeTabIndexFromPre],
        });
        setHighlightedCode(parse(html));
      } catch (error) {
        const fallbackHtml = await codeToHtml(code, {
          lang: 'plaintext',
          theme,
          transformers: [removeTabIndexFromPre],
        });
        setHighlightedCode(parse(fallbackHtml));
      }
    };

    highlightCode();
  }, [code]);

  return highlightedCode;
};