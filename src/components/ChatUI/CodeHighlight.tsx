import type { ReactNode } from 'react';
import type { Element } from 'hast';
import { useShikiHighlighter, isInlineCode } from 'react-shiki';
import tokyoNight from '@styles/tokyoNight.json';
import mcfunction from './mcfunction.tmLanguage.json';
import bosque from './bsq.tmLanguage.json';

interface CodeHighlightProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
  node?: Element | undefined;
  inline?: boolean | undefined;
}

export const CodeHighlight = ({
  className,
  children,
  inline,
  node,
  ...props
}: CodeHighlightProps) => {
  const code = String(children).trim();
  const language = className?.split('language-')?.[1];

  const highlightedCode = useShikiHighlighter(
    code,
    language,
    {
      dark: tokyoNight,
      light: 'github-light'
    },
    {
      defaultColor: 'dark',
      delay: 150,
      customLanguages: [
        bosque,
        mcfunction,
      ],
    }
  );

  const isInline = node && isInlineCode(node);

  return !isInline || !inline ? (
    <div className="shiki not-prose relative [&_pre]:overflow-auto [&_pre]:rounded-lg [&_pre]:px-6 [&_pre]:py-5">
      {language ? (
        <span className="text-muted-foreground/85 absolute top-2 right-3 text-xs tracking-tighter">
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
