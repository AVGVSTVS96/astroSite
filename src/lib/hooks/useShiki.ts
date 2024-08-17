import { useState, useEffect, type ReactNode } from 'react';
import {
  createHighlighter,
  type BundledLanguage,
  type Highlighter,
} from 'shiki';
import parse from 'html-react-parser';
import { removeTabIndexFromPre } from '@/lib/utils';

type HexColor = string;

type CustomTheme = {
    name: string;
    displayName: string;
    colors: Record<string, HexColor>;
    tokenColors: {
      scope: string | string[];
      settings: {
        fontStyle?: string;
        foreground?: HexColor;
      };
    }[];
  };

// Store all created highlighter instances
const highlighters = new Map<BundledLanguage, Promise<Highlighter>>();

export const useShikiHighlighter = (
  lang: any,
  code: string,
  theme: CustomTheme
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
            langs: [lang as BundledLanguage],
          })
        );
      }

      const highlighter = await highlighters.get(lang);

      const html = highlighter?.codeToHtml(code, {
        lang: lang as BundledLanguage,
        theme: theme.name as CustomTheme['name'],
        transformers: [removeTabIndexFromPre],
      });

      setHighlightedCode(parse(html ? html : code));
    };

    highlight();
  }, [code, lang]);

  return highlightedCode;
};
