import { useShikiHighlighter } from '@hooks/useShiki';
import { type ReactNode } from 'react';
import { type BundledLanguage, type BundledTheme } from 'shiki';

interface CodeHighlightProps {
  className: string;
  children: ReactNode;
}

export const CodeHighlight = ({
  className,
  children,
  ...props
}: CodeHighlightProps) => {
  const theme = 'houston';
  const code = String(children);
  const match = /language-(\w+)/.exec(className || '');
  const language = match && (match[1] as BundledLanguage);
 
  const highlightedCode: ReactNode | null = useShikiHighlighter(
    code,
    language,
    theme
  );

  return language && highlightedCode ? (
    <div
      className={`shiki not-prose relative [&_pre]:overflow-auto [&_pre]:px-6 [&_pre]:py-5 ${className || ''}`}>
      <span className="absolute right-3 top-2 text-xs tracking-tighter text-muted-foreground/85">
        {language}
      </span>
      {highlightedCode}
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
