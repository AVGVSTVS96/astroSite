import type { ReactNode } from 'react';
import type { BundledLanguage } from 'shiki';
import type { Element } from 'hast';
import { isInlineCode } from '@utils/isInlineCode';
import { useShikiHighlighter } from '@hooks/useShiki';


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
  const theme = 'houston';
  const code = String(children);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? (match[1] as BundledLanguage) : undefined;

  const isInline: boolean = isInlineCode(node);

  const highlightedCode: ReactNode | null = useShikiHighlighter(
    code,
    language,
    theme,
  );

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
