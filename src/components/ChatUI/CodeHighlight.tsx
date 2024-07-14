import {
  Prism as SyntaxHighlighter,
  type SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import rainglowAzureContrast from '@/styles/rainglowAzureContrast';
import type { Element } from 'hast';
import { isInlineCode } from '@/utils/isInlineCode';

interface CodeHighlightProps {
  className?: string;
  children: React.ReactNode;
  node: Element;
}

export const CodeHighlight = ({
  className,
  children,
  node,
  ...props
}: CodeHighlightProps) => {
  const match = className?.match(/language-(\w+)/);
  const language = match ? match[1] : undefined;

  const isInline: boolean = isInlineCode(node);

  return !isInline ? (
    <div className="relative">
      {language ? (
        <span className="absolute right-3 top-2 text-xs tracking-tighter text-muted-foreground/85">
          {language}
        </span>
      ) : null}
      <SyntaxHighlighter
        className="rounded-lg !py-5"
        language={language}
        style={rainglowAzureContrast as SyntaxHighlighterProps['style']}
        PreTag="div"
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
