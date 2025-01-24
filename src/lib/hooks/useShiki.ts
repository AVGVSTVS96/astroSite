import { useState, useEffect, useRef, type ReactNode } from 'react';
import { createHighlighter, ShikiError, type BundledLanguage, type Highlighter, } from 'shiki';
import parse from 'html-react-parser';
import { removeTabIndexFromPre } from '@/lib/utils';

type HexColor = string;

type Language = BundledLanguage | any;

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
  throttleMs?: number;
};

type ThrottleState = {
  lastHighlightTime: number;
};

// Singleton highlighter instance
let highlighterPromise: Promise<Highlighter> | null = null;

const makeHighlighter = async (
  lang: Language,
  theme: CustomTheme
): Promise<Highlighter> => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [theme],
      langs: [],
    });
  }

  const highlighter = await highlighterPromise;
  const langId = typeof lang === 'string' ? lang : lang.id;

  // Load languages on demand
  if (!highlighter.getLoadedLanguages().includes(langId)) {
    await highlighter.loadLanguage(lang);
  }

  return highlighter;
};

// Highlighter throttling
const scheduleThrottledHighlight = (
  perform: () => Promise<void>,
  pendingRef: React.MutableRefObject<NodeJS.Timeout | undefined>,
  throttleMs: number,
  throttleStateRef: React.MutableRefObject<ThrottleState>
) => {
  const timeSinceLast = Date.now() - throttleStateRef.current.lastHighlightTime;
  const delay = Math.max(0, throttleMs - timeSinceLast);

  clearTimeout(pendingRef.current);
  pendingRef.current = setTimeout(async () => {
    await perform();
    throttleStateRef.current.lastHighlightTime = Date.now();
  }, delay);
};

export const useShikiHighlighter = (
  lang: Language,
  code: string,
  theme: CustomTheme,
  options: HighlighterOptions = {}
) => {
  const [highlightedCode, setHighlightedCode] = useState<ReactNode | null>(null);
  const pendingHighlight = useRef<NodeJS.Timeout>();
  const throttleStateRef = useRef<ThrottleState>({ lastHighlightTime: 0 });

  useEffect(() => {
    let isMounted = true;

    const performHighlight = async () => {
      let highlightedCode: ReactNode | string;

      try {
        const highlighter = await makeHighlighter(lang, theme);
        const html = highlighter.codeToHtml(code, {
          lang,
          theme: theme.name,
          transformers: [removeTabIndexFromPre],
        });
        highlightedCode = parse(html);
      } catch (error) {
        if (
          error instanceof ShikiError &&
          error.message.includes('is not included in this bundle')
        ) {
          console.warn(`Language '${lang}' not supported, falling back to plaintext`);
          const highlighter = await makeHighlighter('plaintext', theme);
          const plainText = highlighter.codeToHtml(code, {
            lang: 'plaintext',
            theme: theme.name,
            transformers: [removeTabIndexFromPre]
          });
          highlightedCode = parse(plainText);
        } else {
          throw error;
        }
      }

      // Avoid setting state if unmounted
      if (isMounted) {
        setHighlightedCode(highlightedCode);
      }
    };

    const executeHighlight = () => {
      const { throttleMs } = options;

      if (throttleMs) {
        scheduleThrottledHighlight(
          performHighlight,
          pendingHighlight,
          throttleMs,
          throttleStateRef
        );
      } else {
        performHighlight().catch(console.error);
      }
    };

    executeHighlight();

    return () => {
      isMounted = false;
      clearTimeout(pendingHighlight.current);
    };
  }, [code, lang, theme, options.throttleMs]);

  return highlightedCode;
};
