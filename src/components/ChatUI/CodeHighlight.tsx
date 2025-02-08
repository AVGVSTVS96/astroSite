import {
  PrismAsync as SyntaxHighlighter,
  type SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import rainglowAzureContrast from '@/styles/rainglowAzureContrast';
import type { Element } from 'hast';
import { isInlineCode } from '@/lib/utils';

interface CodeHighlightProps {
  className?: string | undefined;
  children?: React.ReactNode | undefined;
  node?: Element | undefined;
}

export const CodeHighlight = ({
  className,
  children,
  node,
  ...props
}: CodeHighlightProps): JSX.Element => {
  const match = className?.match(/language-(\w+)/);
  const language = match ? match[1] : undefined;

  const isInline: boolean | undefined = node ? isInlineCode(node) : undefined;

  return !isInline ? (
    <div className='relative'>
      {language ? (
        <span className='absolute right-3 top-2 text-xs tracking-tighter text-muted-foreground/85'>
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
