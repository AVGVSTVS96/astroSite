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
}: CodeHighlightProps): JSX.Element => {
  const [highlightedCode, setHighlightedCode] = useState<ReactNode | null>(
    null
  );
  const theme: BundledTheme = 'catppuccin-mocha';
  const code = String(children);
  const match = className?.match(/language-(\w+)/);
  const language = match ? match[1] : undefined;

  const isInline: boolean | undefined = node ? isInlineCode(node) : undefined;

  useEffect(() => {
    if (!isInline) {
      const highlightCode = async () => {
        try {
          const html = await codeToHtml(code, {
            lang: language as BundledLanguage,
            theme,
            transformers: [removeTabIndexFromPre],
          });
          setHighlightedCode(parse(html));
        } catch (error) {
          if (
            error instanceof ShikiError &&
            error.message.includes('Language')
          ) {
            const fallbackHtml = await codeToHtml(code, {
              lang: 'plaintext',
              theme,
              transformers: [removeTabIndexFromPre],
            });
            setHighlightedCode(parse(fallbackHtml));
          } else {
            console.error('Unexpected Shiki error:', error);
            throw error;
          }
        }
      };

      highlightCode();
    }
  }, [code]);

  return !isInline ? (
    <div className="shiki not-prose relative [&_pre]:overflow-auto [&_pre]:rounded-lg [&_pre]:px-6 [&_pre]:py-5">
      {language ? (
        <span className="absolute right-3 top-2 text-xs tracking-tighter text-muted-foreground/85">
          {language}
        </span>
      ) : null}
      <SyntaxHighlighter
        className='rounded-lg py-5!'
        language={language}
        style={rainglowAzureContrast as SyntaxHighlighterProps['style']}
        PreTag='div'
        {...props}>
        {String(children).trimEnd()}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
