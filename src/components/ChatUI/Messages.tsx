import React from 'react';
import ReactMarkdown from 'react-markdown';
import { type UseChatHelpers } from '@ai-sdk/react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import rainglowAzureContrast from '@/styles/rainglowAzureContrast';
import { cn } from '@/lib/utils';
import { CodeHighlight } from './CodeHighlight';

interface MessagesProps {
  messages: UseChatHelpers['messages'];
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const baseMessageStyles =
    'prose prose-slate prose-invert flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2 prose-pre:bg-transparent prose-pre:p-0 prose-ul:mt-0 [&_pre>div]:rounded-md';
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
