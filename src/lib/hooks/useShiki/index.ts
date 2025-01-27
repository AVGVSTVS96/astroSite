import { useEffect, useRef, useState, type ReactNode } from 'react';
import parse from 'html-react-parser';

import {
  createHighlighter,
  ShikiError,
  type BundledLanguage,
  type Highlighter
} from 'shiki';

import type {
  Theme,
  Language,
  HighlighterOptions,
  TimeoutState,
} from './types';

import { removeTabIndexFromPre } from '@/lib/utils';

// Singleton highlighter instance
let highlighterPromise: Promise<Highlighter> | null = null;

// Make singleton highlighter with given theme
const makeHighlighter = async (theme: Theme): Promise<Highlighter> => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [theme],
      langs: []
    });
  }
  return highlighterPromise;
};

// Resolve and load languages on demand
const loadLanguage = async (
  highlighter: Highlighter,
  lang: Language
): Promise<string> => {
  // Shiki can manage null or undefined languages, but we fallback to plaintext to be explicit
  const resolvedLanguage = lang ?? 'plaintext';

  try {
    // Type assertion needed because Shiki expects a BundledLanguage
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
const throttleHighlighting = (
  performHighlight: () => Promise<void>,
  timeoutControl: React.MutableRefObject<TimeoutState>,
  throttleMs: number
) => {
  const now = Date.now();

  clearTimeout(timeoutControl.current.timeoutId);
  const delay = Math.max(0, timeoutControl.current.nextAllowedTime - now);

  timeoutControl.current.timeoutId = setTimeout(() => {
    performHighlight().catch(console.error);
    timeoutControl.current.nextAllowedTime = now + throttleMs;
  }, delay);
};

export const useShikiHighlighter = (
  lang: Language,
  code: string,
  theme: Theme,
  options: HighlighterOptions = {}
) => {
  const [highlightedCode, setHighlightedCode] = useState<ReactNode | null>(null);
  const delayRef = useRef<TimeoutState>({
    nextAllowedTime: 0,
    timeoutId: undefined
  });

  useEffect(() => {
    let isMounted = true;

    const highlightCode = async () => {
      const highlighter = await makeHighlighter(theme);
      const language = await loadLanguage(highlighter, lang);

      const html = highlighter.codeToHtml(code, {
        lang: language,
        theme: theme,
        transformers: [removeTabIndexFromPre],
      });

      if (isMounted) {
        setHighlightedCode(parse(html));
      }
    };

    const runHighlight = () => {
      const { delay } = options;

      if (delay) {
        throttleHighlighting(highlightCode, delayRef, delay);
      } else {
        highlightCode().catch(console.error);
      }
    };

    runHighlight();

    return () => {
      isMounted = false;
      clearTimeout(delayRef.current.timeoutId);
    };
  }, [code, lang]);

  return highlightedCode;
};
