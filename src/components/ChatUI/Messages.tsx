import React from 'react';
import ReactMarkdown from 'react-markdown';
import { type UseChatHelpers } from 'ai/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MessagesProps {
  messages: UseChatHelpers['messages'];
}

interface CodeComponentProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`prose prose-slate prose-invert flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2 prose-ul:mt-0  ${message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
          <ReactMarkdown
            components={{
              code({
                inline,
                className,
                children,
                ...props
              }: CodeComponentProps) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : 'plaintext';
                return !inline ? (
                  <SyntaxHighlighter
                    language={language}
                    style={atomDark}
                    PreTag="div"
                    {...props}>
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}>
            {message.content}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
};
