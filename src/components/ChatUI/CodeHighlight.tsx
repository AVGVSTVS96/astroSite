import type { ReactNode } from 'react';
import type { BundledLanguage, BundledTheme } from 'shiki';
import type { Element } from 'hast';
import parse from 'html-react-parser';
import { isInlineCode } from '@/lib/utils';
import { useShikiHighlighter } from '@hooks/useShiki';
import customTheme from '@styles/tokyo-night.mjs';

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
}: CodeHighlightProps) => {
  const theme: BundledTheme = customTheme as unknown as BundledTheme;
  const code = String(children);
  const match = className?.match(/language-(\w+)/);
  const language = match ? match[1] : undefined;

  const isInline: boolean | undefined = node ? isInlineCode(node) : undefined;

  const highlightedCode = useShikiHighlighter(
    language as BundledLanguage,
    code,
    theme
  );

  const parsedCode = highlightedCode ? parse(highlightedCode) : null;

  return !isInline ? (
    <div className="shiki not-prose relative [&_pre]:overflow-auto [&_pre]:rounded-lg [&_pre]:px-6 [&_pre]:py-5">
      {language ? (
        <span className="absolute right-3 top-2 text-xs tracking-tighter text-muted-foreground/85">
          {language}
        </span>
      ) : null}
      {parsedCode}
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
