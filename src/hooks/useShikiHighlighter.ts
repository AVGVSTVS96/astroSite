import { useCallback } from 'react';
import { codeToHtml, type BundledLanguage, type BundledTheme } from 'shiki';
import parse from 'html-react-parser';

export const useShikiHighlighter = (theme: BundledTheme) => {
  return useCallback(
    async (code: string, language: BundledLanguage) => {
      return codeToHtml(code, {
        lang: language,
        theme,
      }).then((html) => parse(html));
    },
    []
  );
};

// export const useShikiHighlighter = (theme: BundledTheme) => {
//   const highlightedCode = useCallback(
//     async (code: string, language: BundledLanguage) => {
//       return codeToHtml(code, {
//         lang: language,
//         theme,
//       }).then((html) => parse(html));
//     },
//     [theme]
//   );
//   return highlightedCode;
// };
