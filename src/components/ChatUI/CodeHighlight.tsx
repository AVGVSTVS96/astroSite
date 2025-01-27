import type { ReactNode } from 'react';
import type { Element } from 'hast';
import { isInlineCode } from '@/lib/utils';
import { useShikiHighlighter } from 'react-shiki';
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
  const code = String(children);
  const language = className?.match(/language-(\w+)/)?.[1];

  const highlightedCode = useShikiHighlighter(
    code,
    language,
    tokyoNight,
    { delay: 150 }
  );

  // TODO: Long inline code blocks are not wrapped
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
