import type { ReactNode } from 'react';
import type { Element } from 'hast';
import { isInlineCode } from '../../lib/utils/isInlineCode.ts';
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
  const theme = customTheme;
  const code = String(children);
  const match = className?.match(/language-(\w+)/);
  const language = match ? match[1] : undefined;

  const isInline = node ? isInlineCode(node) : false;

<<<<<<< HEAD
<<<<<<< HEAD
  const highlightedCode = useShikiHighlighter(language, code, theme, { debounceMs: 150 });
||||||| parent of 04a22eb (perf: Remove HTML parsing, instead sanitize and set dangerously)
  const highlightedCode = useShikiHighlighter(language, code, theme);
=======
<<<<<<< HEAD
  const highlightedCode = useShikiHighlighter(language, code, theme);
>>>>>>> 04a22eb (perf: Remove HTML parsing, instead sanitize and set dangerously)

||||||| parent of 0584649 (perf: Remove HTML parsing, instead sanitize and set dangerously)
||||||| parent of dfbea96 (fix conflict markers, break code)
<<<<<<< HEAD
  const highlightedCode = useShikiHighlighter(language, code, theme);

||||||| parent of 0584649 (perf: Remove HTML parsing, instead sanitize and set dangerously)
=======
>>>>>>> dfbea96 (fix conflict markers, break code)
  const highlightedCode = useShikiHighlighter(
    language,
    code,
    theme
  );

  return !isInline ? (
    <div className="shiki not-prose relative [&_pre]:overflow-auto [&_pre]:rounded-lg [&_pre]:px-6 [&_pre]:py-5">
      {language ? (
        <span className="absolute right-3 top-2 text-xs tracking-tighter text-muted-foreground/85">
          {language}
        </span>
      ) : null}
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is sanitized by DOMPurify */}
      {/* biome-ignore lint/style/useNamingConvention: __html is correct for trusted HTML */}
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </div >
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
