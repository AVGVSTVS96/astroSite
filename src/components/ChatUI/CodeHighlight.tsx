import type { ReactNode } from 'react';
import type { BundledLanguage } from 'shiki';
import type { Element } from 'hast';
import { isInlineCode } from '@utils/isInlineCode';
import { ShikiHighlighter } from './ShikiHihlighter';

interface CodeHighlightProps {
  className: string;
  children: ReactNode;
  node: Element;
}

export const CodeHighlight = ({
  className,
  children,
  node,
  ...props
}: CodeHighlightProps) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? (match[1] as BundledLanguage) : undefined;

  const isInline: boolean = isInlineCode(node);

  return !isInline ? (
    <ShikiHighlighter
      language={language as BundledLanguage}
      theme={'houston'}
      {...props}>
      {String(children)}
    </ShikiHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
