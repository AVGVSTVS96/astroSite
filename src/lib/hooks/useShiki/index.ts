import { useEffect, useRef, useState, type ReactNode } from 'react';
import parse from 'html-react-parser';

import {
  createHighlighter,
  ShikiError,
  type BundledLanguage,
  type Highlighter
} from 'shiki';

import type {
  CustomTheme,
  Language,
  HighlighterOptions,
  ThrottleState
} from './types';

import { removeTabIndexFromPre } from '@/lib/utils';

// Singleton highlighter instance
let highlighterPromise: Promise<Highlighter> | null = null;

const makeHighlighter = async (theme: CustomTheme): Promise<Highlighter> => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [theme],
      langs: []
    });
  }
  return highlighterPromise;
};

// Determine and load language
const loadLanguage = async (
  highlighter: Highlighter,
  lang: Language
): Promise<string> => {
  // Shiki can manage undefined languages, but we fallback to plaintext just in case
  const resolvedLanguage: Language = (typeof lang === 'string' ? lang : lang?.id) ?? 'plaintext';

  try {
    await highlighter.loadLanguage(resolvedLanguage as BundledLanguage);
    return resolvedLanguage;
  } catch (error) {
    if (error instanceof ShikiError && error.message.includes('not included in this bundle')) {
      console.warn(`Language '${resolvedLanguage}' not supported, falling back to plaintext`);
    }
    return 'plaintext';
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

    const highlightCode = async () => {
      const highlighter = await makeHighlighter(theme);
      const language = await loadLanguage(highlighter, lang);

      const html = highlighter.codeToHtml(code, {
        lang: language,
        theme: theme.name,
        transformers: [removeTabIndexFromPre],
      });

      if (isMounted) {
        setHighlightedCode(parse(html));
      }
    };

    const runHighlight = () => {
      const { throttleMs } = options;

      if (throttleMs) {
        scheduleThrottledHighlight(
          highlightCode,
          pendingHighlight,
          throttleMs,
          throttleStateRef
        );
      } else {
        highlightCode().catch(console.error);
      }
    };

    runHighlight();

    return () => {
      isMounted = false;
      clearTimeout(pendingHighlight.current);
    };
  }, [code]);

  return highlightedCode;
};
