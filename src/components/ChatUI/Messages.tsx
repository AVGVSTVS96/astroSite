import React from 'react';
import ReactMarkdown from 'react-markdown';
import { type UseChatHelpers } from 'ai/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { cn } from '@/lib/utils';

interface MessagesProps {
  messages: UseChatHelpers['messages'];
}

interface CodeComponentProps {
  inline: boolean;
  className: string;
  children: React.ReactNode;
}

const CodeHighlight = ({
  inline,
  className,
  children,
  ...props
}: CodeComponentProps) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'plaintext';

  return !inline && language !== 'plaintext' ? (
    <SyntaxHighlighter
      language={language}
      style={nightOwl}
      PreTag="div"
      {...props}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const baseMessageStyles =
    'prose prose-slate prose-invert flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2 prose-pre:bg-transparent prose-pre:p-0 prose-ul:mt-0';
  const userMessageStyles =
    'ml-auto bg-primary text-primary-foreground prose-code:text-primary-foreground';
  const assistantMessageStyles = 'bg-muted text-foreground';

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            baseMessageStyles,
            message.role === 'user' ? userMessageStyles : assistantMessageStyles
          )}>
          <ReactMarkdown
            components={{
              code: CodeHighlight,
            }}>
            {message.content}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
};
