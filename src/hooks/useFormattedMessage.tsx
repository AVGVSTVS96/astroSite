import ReactMarkdown from 'react-markdown';
import { CodeHighlight } from '@components/ChatUI/CodeHighlight';
import { cn } from '@/lib/utils';
import { useChat, type UseChatHelpers } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

export const useFormattedMessages = (messages) => {
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
  const [historicMessages, setHistoricMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);

  useEffect(() => {
    const message = messages.map((message, idx, array) => (
      <div key={message.id} className={cn(messageStyles[message.role])}>
        {idx !== array.length - 1 && (
          <ReactMarkdown>{message.content}</ReactMarkdown>
        )}
      </div>
    ));

    setHistoricMessages(message);

    const newMessage = messages.map((message, idx, array) => (
      <div key={message.id} className={cn(messageStyles[message.role])}>
        {idx === array.length - 1 && (
          <ReactMarkdown
            components={{
              code: CodeHighlight,
            }}>
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    ));

    setNewMessage(newMessage);
    setHistoricMessages([...historicMessages, ...newMessage] as any);
  }, [messages]);

  return { historicMessages };
};

export default useFormattedMessages;
