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
  const theme = 'catppuccin-mocha';
  const code = String(children);
  const match = /language-(\w+)/.exec(className || '');
  const language = match && (match[1] as BundledLanguage);
  const highlightedCode: ReactNode | null = useShikiHighlighter(
    code,
    language,
    theme
  );

  return match && highlightedCode ? (
    <div
      className={`shiki not-prose [&_pre]:overflow-auto [&_pre]:rounded-lg [&_pre]:p-4 ${className || ''}`}
      {...props}>
      {highlightedCode}
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
