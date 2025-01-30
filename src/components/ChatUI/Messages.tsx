import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { CodeHighlight } from './CodeHighlight';
import { rehypeInlineCodeProperty } from '@/lib/utils/isInlineCode';
import type { Message } from '@ai-sdk/react';

const baseMessageStyles: string =
  'prose dark:prose-invert text-foreground prose-slate w-full px-4 py-2.5 prose-pre:p-0 prose-pre:bg-transparent';
const messageStyles: Record<string, Array<string>> = {
  user: [
    baseMessageStyles,
    'ml-auto bg-accent max-w-[75%] !w-fit rounded-3xl break-words',
  ],
  assistant: [
    baseMessageStyles,
    'bg-transparent min-w-full',
  ],
};

const RenderedMessage = React.memo(({ message }: { message: Message }) => (
  <div className={cn(messageStyles[message.role])}>
    <ReactMarkdown
      components={{ code: CodeHighlight }}
      rehypePlugins={[rehypeInlineCodeProperty]}
    >
      {message.content}
    </ReactMarkdown>
  </div>
));

export const ChatMessages = ({ messages }: { messages: Message[] }) => {
  return (
    <div className='space-y-6'>
      {messages.map((message) => (
        <RenderedMessage key={message.id} message={message} />
      ))}
    </div>
  );
};
