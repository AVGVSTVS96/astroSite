import { useState, useEffect, type ReactNode } from 'react';
import { codeToHtml, type BundledLanguage, type BundledTheme } from 'shiki';
import parse from 'html-react-parser';

export const useShikiHighlighter = (
  code: string,
  lang: BundledLanguage | null,
  theme: BundledTheme
) => {
  const [highlightedCode, setHighlightedCode] = useState<ReactNode | null>(
    null
  );

  useEffect(() => {
    if (lang) {
      codeToHtml(code, { lang, theme }).then((html) => {
        setHighlightedCode(parse(html));
      });
    }
  }, [code, lang, theme]);

  return highlightedCode;
};
