import { useCallback } from 'react';
import { codeToHtml, type BundledLanguage, type BundledTheme } from 'shiki';

export const useShikiHighlighter = (theme: BundledTheme) => {
  const highlight = useCallback(
    async (code: string, lang: BundledLanguage): Promise<string> => {
      return codeToHtml(code, {
        lang,
        theme,
      });
    },
    [theme]
  );

  return highlight;
};
