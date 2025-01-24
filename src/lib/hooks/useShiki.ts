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

const makeHighlighter = async (theme: CustomTheme): Promise<Highlighter> => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [theme],
      // Initialize with plaintext as our fallback language
      langs: ['plaintext']
    });
  }
  return highlighterPromise;
};

// Determine and load language
const resolveLanguage = async (
  highlighter: Highlighter,
  lang: Language
): Promise<string> => {
  const effectiveLang = typeof lang === 'string' ? lang : lang.id;

  try {
    await highlighter.loadLanguage(effectiveLang);
    return effectiveLang;
  } catch (error) {
    if (error instanceof ShikiError && error.message.includes('not included in this bundle')) {
      console.warn(`Language '${effectiveLang}' not supported, falling back to plaintext`);
      return 'plaintext';
    }
    throw error;
  }
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
      const highlighter = await makeHighlighter(theme);
      const effectiveLang = await resolveLanguage(highlighter, lang);

      const html = highlighter.codeToHtml(code, {
        lang: effectiveLang,
        theme: theme.name,
        transformers: [removeTabIndexFromPre],
      });

      if (isMounted) {
        setHighlightedCode(parse(html));
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
