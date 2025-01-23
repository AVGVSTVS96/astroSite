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

type Language = BundledLanguage | any;

// Store all created highlighter instances
const highlighters = new Map<Language, Promise<Highlighter>>();

const getOrCreateHighlighter = async (
  lang: Language,
  theme: CustomTheme
): Promise<Highlighter> => {
  if (!highlighters.has(lang)) {
    highlighters.set(lang,
      createHighlighter({
        themes: [theme],
        langs: [lang]
      })
    );
  }
  return highlighters.get(lang)!;
};

// Throttle management utilities
let lastHighlightTime = 0;

const scheduleThrottledHighlight = (
  perform: () => Promise<void>,
  pendingRef: React.MutableRefObject<NodeJS.Timeout | undefined>,
  throttleMs: number
) => {
  const now = Date.now();
  const timeSinceLast = now - lastHighlightTime;
  const delay = Math.max(0, throttleMs - timeSinceLast);

  clearTimeout(pendingRef.current);
  pendingRef.current = setTimeout(async () => {
    await perform();
    lastHighlightTime = Date.now();
  }, delay);
};

// Highlighting logic
const convertCodeToHtml = (
  highlighter: Highlighter,
  code: string,
  lang: Language,
  theme: CustomTheme
): ReactNode => {
  const html = highlighter.codeToHtml(code, {
    lang,
    theme: theme.name,
    transformers: [removeTabIndexFromPre],
  });
  return parse(html || code);
};

export const useShikiHighlighter = (
  lang: Language,
  code: string,
  theme: CustomTheme,
  options: HighlighterOptions = {}
) => {
  const [highlightedCode, setHighlightedCode] = useState<ReactNode | null>(null);
  const pendingHighlight = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const performHighlight = async () => {
      try {
        const highlighter = await getOrCreateHighlighter(lang, theme);
        setHighlightedCode(convertCodeToHtml(highlighter, code, lang, theme));
      } catch (error) {
        console.error('Error highlighting code:', error);
        setHighlightedCode(code);
      }
    };

    const executeHighlight = () => {
      if (options.debounceMs) {
        scheduleThrottledHighlight(performHighlight, pendingHighlight, options.debounceMs);
      } else {
        performHighlight().catch(console.error);
      }
    };

    executeHighlight();

    return () => clearTimeout(pendingHighlight.current);
  }, [code, lang, theme, options.debounceMs]);

  return highlightedCode;
};
