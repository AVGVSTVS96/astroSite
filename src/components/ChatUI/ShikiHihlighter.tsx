import React, { useEffect, useState } from 'react';
import type { BundledTheme, BundledLanguage } from 'shiki';
import { useShikiHighlighter } from '@hooks/useShikiHighlighter';

interface ShikiHighlighterProps {
  language: BundledLanguage;
  children: string;
  theme: BundledTheme;
  PreTag: keyof JSX.IntrinsicElements;
}

export const ShikiHighlighter: React.FC<ShikiHighlighterProps> = ({
  language,
  children,
  theme,
  PreTag = 'pre',
}) => {
  const highlight = useShikiHighlighter(theme);
  const [highlightedCode, setHighlightedCode] =
    useState<React.ReactNode>(children);

  useEffect(() => {
    let isMounted = true;
    highlight(children, language).then((result) => {
      if (isMounted) {
        setHighlightedCode(result);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [highlight, children, language]);

  return React.createElement(PreTag, {
    className: 'shiki not-prose',
    children: highlightedCode,
  });
};
