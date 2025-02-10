import type { ReactNode } from 'react';
import type { Element } from 'hast';
import { useShikiHighlighter, isInlineCode } from 'react-shiki';
import tokyoNight from '@styles/tokyo-night.mjs';

interface CodeHighlightProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
  node?: Element | undefined;
  inline?: boolean | undefined;
}

export const CodeHighlight = ({
  className,
  children,
  node,
  inline: inlineProp,
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

  const isInline = node && isInlineCode(node);

  return (!isInline || !inlineProp) ? (
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
