import { useEffect, useState, useCallback } from 'react';
import {
  createHighlighter,
  type BundledLanguage,
  type BundledTheme,
  type Highlighter,
} from 'shiki';
import parse from 'html-react-parser';

let highlighterInstance: Highlighter | null = null;
let highlighterPromise: Promise<Highlighter> | null = null;

const getHighlighterInstance = async (
  theme: BundledTheme
): Promise<Highlighter> => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [theme],
      langs: [],
    });
  }
  highlighterInstance = await highlighterPromise;
  return highlighterInstance;
};

export const useShikiHighlighter = (theme: BundledTheme) => {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);

  useEffect(() => {
    getHighlighterInstance(theme).then(setHighlighter);
  }, [theme]);

  return useCallback(
    (code: string, language: BundledLanguage): Promise<React.ReactNode> => {
      if (!highlighter) {
        return Promise.resolve(code); // Fallback to plain text if highlighter isn't ready
      }

      return (async () => {
        try {
          if (!highlighter.getLoadedLanguages().includes(language)) {
            await highlighter.loadLanguage(language);
          }
          const html = highlighter.codeToHtml(code, { lang: language, theme });
          return parse(html);
        } catch (error) {
          console.error('Failed to highlight code:', error);
          return code; // Fallback to plain text on error
        }
      })();
    },
    [highlighter, theme]
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
