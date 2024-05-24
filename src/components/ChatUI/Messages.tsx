import React from 'react';
import ReactMarkdown from 'react-markdown';
import { type UseChatHelpers } from 'ai/react';

interface MessagesProps {
  messages: UseChatHelpers['messages'];
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`prose prose-slate prose-invert flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2 prose-ul:mt-0  ${message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'}`}>
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
