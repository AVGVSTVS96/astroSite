import { useState, useEffect, type ReactNode } from 'react';
import {
  codeToHtml,
  ShikiError,
  type BundledLanguage,
  type BundledTheme,
} from 'shiki';
import parse from 'html-react-parser';
import type { Element } from 'hast';
import { isInlineCode } from '@/lib/utils';

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
  const [highlightedCode, setHighlightedCode] =
    useState<ReactNode | null>(null);
  const theme: BundledTheme = 'catppuccin-mocha';
  const code = String(children);
  const match = className?.match(/language-(\w+)/);
  const language = match ? match[1] : undefined;

  const isInline: boolean | undefined = node ? isInlineCode(node) : undefined;

  useEffect(() => {
    if (!isInline) {
      codeToHtml(code, {
        lang: language as BundledLanguage,
        theme,
      }).then((html) => setHighlightedCode(parse(html)));
    }
  }, [code]);

  return !isInline ? (
    <div className='relative'>
      {language ? (
        <span className='absolute right-3 top-2 text-xs tracking-tighter text-muted-foreground/85'>
          {language}
        </span>
      ) : null}
      <SyntaxHighlighter
        className='rounded-lg py-5!'
        language={language}
        style={rainglowAzureContrast as SyntaxHighlighterProps['style']}
        PreTag='div'
        {...props}>
        {String(children).trimEnd()}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
