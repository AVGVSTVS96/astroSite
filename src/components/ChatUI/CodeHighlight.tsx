import { useState, useEffect, type ReactNode } from 'react';
import { codeToHtml, type BundledLanguage, type BundledTheme } from 'shiki';
import parse from 'html-react-parser';
import type { Element } from 'hast';
import { isInlineCode } from '@utils/isInlineCode';
import { removeTabIndexFromPre } from '@utils/shikiTransformers';

interface CodeHighlightProps {
  className?: string;
  children: ReactNode;
  node: Element;
}

export const CodeHighlight = ({
  className,
  children,
  node,
  ...props
}: CodeHighlightProps) => {
  const [highlightedCode, setHighlightedCode] = useState<ReactNode | null>(
    null
  );
  const theme: BundledTheme = 'catppuccin-mocha';
  const code = String(children);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : undefined;

  const isInline: boolean = isInlineCode(node);

  useEffect(() => {
    if (!isInline) {
      codeToHtml(code, {
        lang: language as BundledLanguage,
        theme,
        transformers: [removeTabIndexFromPre],
      }).then((html) => setHighlightedCode(parse(html)));
    }
  }, [code]);

  return !isInline ? (
    <div
      className={`shiki not-prose relative [&_pre]:overflow-auto [&_pre]:px-6 [&_pre]:py-5 ${className || ''}`}>
      {language ? (
        <span className="absolute right-3 top-2 text-xs tracking-tighter text-muted-foreground/85">
          {language}
        </span>
      ) : null}
      {highlightedCode}
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
