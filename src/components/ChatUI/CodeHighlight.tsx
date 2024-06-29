import { type ReactNode } from 'react';
import { type BundledLanguage } from 'shiki';
import { ShikiHighlighter } from './ShikiHihlighter';

interface CodeHighlightProps {
  className: string;
  children: ReactNode;
}

export const CodeHighlight = ({
  className,
  children,
  ...props
}: CodeHighlightProps) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? (match[1] as BundledLanguage) : undefined;

  return language ? (
    <ShikiHighlighter
      language={language}
      theme={'catppuccin-mocha'}
      {...props}>
      {String(children)}
    </ShikiHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
