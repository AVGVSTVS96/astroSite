import { useState, useEffect, useRef, type ReactNode } from 'react';
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

type HighlighterOptions = {
  debounceMs?: number;
};

// Store all created highlighter instances
const highlighters = new Map<BundledLanguage, Promise<Highlighter>>();

// Track last highlight time for rate limiting
let lastHighlightTime = 0;

export const useShikiHighlighter = (
  lang: any,
  code: string,
  theme: CustomTheme,
  options: HighlighterOptions = {}
) => {
  const [highlightedCode, setHighlightedCode] = useState<ReactNode | null>(null);
  const pendingHighlight = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const highlight = async () => {
      const performHighlight = async () => {
        if (!highlighters.has(lang)) {
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

        lastHighlightTime = Date.now();
        setHighlightedCode(parse(html ? html : code));
      };

      // If debouncing is enabled, handle timing
      if (options.debounceMs) {
        const now = Date.now();
        const timeSinceLastHighlight = now - lastHighlightTime;
        const delayNeeded = Math.max(0, options.debounceMs - timeSinceLastHighlight);

        if (pendingHighlight.current) {
          clearTimeout(pendingHighlight.current);
        }

        pendingHighlight.current = setTimeout(performHighlight, delayNeeded);
      } else {
        // No debouncing, just highlight immediately
        await performHighlight();
      }
    };

    highlight();

    return () => {
      if (pendingHighlight.current) {
        clearTimeout(pendingHighlight.current);
      }
    };
  }, [code, lang, theme.name, options.debounceMs]);

  return highlightedCode;
};
