import React, { useState, useEffect } from 'react';
import { codeToHtml, type BundledLanguage, type BundledTheme } from 'shiki';
import parse from 'html-react-parser';

interface CodeHighlightProps {
  inline: boolean;
  className?: string;
  children: React.ReactNode;
  theme: BundledTheme;
  lang: BundledLanguage;
}

export const CodeHighlight = ({
  inline,
  className,
  children,
  lang,
  theme = 'catppuccin-mocha',
  ...props
}: CodeHighlightProps) => {
  const [highlightedCode, setHighlightedCode] =
    useState<React.ReactNode | null>(null);
  const code = String(children);
  const match = /language-(\w+)/.exec(className || '');

  useEffect(() => {
    if (match) {
      codeToHtml(code, {
        lang: match[1],
        theme,
      }).then((html) => setHighlightedCode(parse(html)));
    }
  }, [code]);

  return match && highlightedCode ? (
    <div className={`shiki not-prose ${className || ''}`} {...props}>
      {highlightedCode}
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
