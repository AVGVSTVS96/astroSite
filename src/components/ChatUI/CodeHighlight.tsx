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
  const language = match ? match[1] : undefined;

  useEffect(() => {
    if (language) {
      codeToHtml(code, {
        lang: language,
        theme,
      }).then((html) => setHighlightedCode(parse(html)));
    }
  }, [code]);

  return language && highlightedCode ? (
    <div
      className={`shiki not-prose relative [&_pre]:overflow-auto [&_pre]:px-6 [&_pre]:py-5 ${className || ''}`}>
      <span className="absolute right-3 top-2 text-xs tracking-tighter text-muted-foreground/85">
        {language}
      </span>
      {highlightedCode}
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
