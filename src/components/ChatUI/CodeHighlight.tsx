import React, { useState, useEffect } from 'react';
import { codeToHtml, type BundledLanguage, type BundledTheme } from 'shiki';

interface CodeHighlightProps {
  inline: boolean;
  className?: string;
  children: React.ReactNode;
  theme?: BundledTheme;
  lang?: BundledLanguage;
}

export const CodeHighlight = ({
  inline,
  className,
  children,
  lang,
  theme = 'catppuccin-mocha',
  ...props
}: CodeHighlightProps) => {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
  const code = String(children);
  const match = /language-(\w+)/.exec(className || '');

  useEffect(() => {
    if (match) {
      codeToHtml(code, {
        lang: match[1],
        theme,
      }).then(setHighlightedCode);
    }
  }, [code]);

  if (!match || !highlightedCode) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <div
      className={`shiki not-prose ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
      {...props}
    />
  );
};
