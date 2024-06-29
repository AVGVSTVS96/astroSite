import React, { useEffect, useState } from 'react';
import { type BundledTheme, type BundledLanguage, codeToHtml } from 'shiki';
import parse from 'html-react-parser';

interface ShikiHighlighterProps {
  language: BundledLanguage;
  children: string;
  theme: BundledTheme;
  preTag?: keyof JSX.IntrinsicElements;
}

export const ShikiHighlighter: React.FC<ShikiHighlighterProps> = ({
  language,
  children,
  theme,
  preTag = 'pre',
}) => {
  const [highlightedCode, setHighlightedCode] =
    useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (language) {
      codeToHtml(children, { lang: language, theme }).then((html) => {
        setHighlightedCode(parse(html));
      });
    }
  }, [children]);

  if (!highlightedCode) {
    return React.createElement(
      preTag,
      null,
      React.createElement('code', null, children)
    );
  }

  return React.createElement(preTag, {
    className: 'shiki not-prose',
    children: highlightedCode,
  });
};
