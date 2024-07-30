import type { ReactNode } from 'react';
import type { BundledLanguage, BundledTheme } from 'shiki';
import type { Element } from 'hast';
import { isInlineCode } from '@/lib/utils';
import { useShikiHighlighter } from '@hooks/useShiki';
import tokyoNight from '@styles/tokyo-night.mjs';

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
  const theme = customTheme;
  const code = String(children);
  const match = className?.match(/language-(\w+)/);
  const language = match ? (match[1] as BundledLanguage) : undefined;

  const isInline: boolean | undefined = node ? isInlineCode(node) : undefined;

  const highlightedCode = useShikiHighlighter(language, code, theme);

  return !isInline ? (
    <div className="shiki not-prose relative [&_pre]:overflow-auto [&_pre]:rounded-lg [&_pre]:px-6 [&_pre]:py-5">
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
