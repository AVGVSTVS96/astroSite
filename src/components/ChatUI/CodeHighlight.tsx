import type { ReactNode } from 'react';
import type { BundledLanguage } from 'shiki';
import type { Element } from 'hast';
import { isInlineCode } from '@/lib/utils';
import { ShikiHighlighter } from './ShikiHihlighter';

interface CodeHighlightProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
  node?: Element | undefined;
}

export const CodeHighlight = ({
  className,
  children,
  node,
  ...props
}: CodeHighlightProps): JSX.Element => {
  const match = className?.match(/language-(\w+)/);
  const language = match ? (match[1] as BundledLanguage) : undefined;

  const isInline: boolean | undefined = node ? isInlineCode(node) : undefined;

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
