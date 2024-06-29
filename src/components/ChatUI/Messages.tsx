import type React from 'react';
import ReactMarkdown from 'react-markdown';
import type { UseChatHelpers } from '@ai-sdk/react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import rainglowAzureContrast from '@/styles/rainglowAzureContrast';
import { cn } from '@/lib/utils';
import { CodeHighlight } from './CodeHighlight';

interface MessagesProps {
  messages: UseChatHelpers['messages'];
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const baseMessageStyles: string =
    'prose prose-slate flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2 prose-p:my-0 prose-pre:my-2 prose-pre:bg-transparent prose-pre:p-0 prose-ul:mt-0';
  const messageStyles: Record<string, string | Array<string>> = {
    user: [
      baseMessageStyles,
      'ml-auto bg-primary text-primary-foreground prose-headings:text-primary-foreground prose-code:text-primary-foreground prose-blockquote:text-primary-foreground prose-a:text-primary-foreground prose-strong:text-primary-foreground',
    ],
    assistant: [
      baseMessageStyles,
      'bg-muted dark:prose-invert prose-code:text-foreground',
    ],
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={cn(messageStyles[message.role])}>
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
