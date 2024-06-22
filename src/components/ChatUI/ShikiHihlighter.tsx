import React, { useEffect, useState } from 'react';
import type { BundledTheme, BundledLanguage } from 'shiki';
import { useShikiHighlighter } from '@hooks/useShikiHighlighter';

interface ShikiHighlighterProps {
  language: BundledLanguage;
  children: string;
  theme?: BundledTheme;
  PreTag?: keyof JSX.IntrinsicElements;
}

export const ShikiHighlighter: React.FC<ShikiHighlighterProps> = ({
  language,
  children,
  theme = 'github-dark',
  PreTag = 'pre',
}) => {
  const highlight = useShikiHighlighter(theme);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

  useEffect(() => {
    highlight(children, language).then(setHighlightedCode);
  }, [highlight, children, language]);

  if (!highlightedCode) {
    return React.createElement(
      PreTag,
      null,
      React.createElement('code', null, children)
    );
  }

  return React.createElement(PreTag, {
    className: 'shiki not-prose',
    dangerouslySetInnerHTML: { __html: highlightedCode },
  });
};
