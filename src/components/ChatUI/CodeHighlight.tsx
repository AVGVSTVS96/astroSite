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
import { removeTabIndexFromPre } from '@/lib/utils/shikiTransformers';
import { useShikiHighlighter } from './useCustomThemeShikiHighlighter';

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
  // const [highlightedCode, setHighlightedCode] = useState<ReactNode | null>(null);
  const theme: BundledTheme = 'catppuccin-mocha';
  const code = String(children);
  const match = className?.match(/language-(\w+)/);
  const language = match ? match[1] : undefined;

  const isInline: boolean | undefined = node ? isInlineCode(node) : undefined;

  // console.time('hook call');
  const highlightedCode = useShikiHighlighter(language as BundledLanguage, code);
  // console.timeEnd('hook call');

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
