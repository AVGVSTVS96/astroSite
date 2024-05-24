import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { useChat, type UseChatHelpers, type UseChatOptions } from 'ai/react';
import { useModel } from '@hooks/useModel';
import { ChatInput } from './ChatInput';
import { ModelSelector } from './ModelSelector';
import ReactMarkdown from 'react-markdown';

export const Chat: React.FC = () => {
  const defaultModel = 'gpt-3.5-turbo';
  const { selectedModel, handleModelChange } = useModel(defaultModel);

  const chatOptions: UseChatOptions = {
    api: '/api/chatRoute',
  };

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  }: UseChatHelpers = useChat(chatOptions);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <Card className="flex h-full max-h-[calc(100dvh-12rem)] min-h-72 min-w-64 flex-col rounded-2xl max-lg:w-[calc(100dvw-4rem)] lg:w-[clamp(600px,60vw,1000px)]">
      <CardHeader className="h-18 flex flex-row items-center py-3">
        <div className="flex-1">
          <p className="hidden text-lg font-bold leading-none tracking-tight xs:block">
            ChatGPT
          </p>
        </div>
        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={handleModelChange}
        />
      </CardHeader>
      <CardContent className="flex grow flex-col-reverse overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`prose prose-slate prose-ul:mt-0 prose-invert flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2  ${
                message.role === 'user'
                  ? 'ml-auto bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-6 ">
        <ChatInput
          isLoading={isLoading}
          stop={stop}
          handleSubmit={handleSubmit}
          textareaRef={textareaRef}
          input={input}
          handleInputChange={handleInputChange}
        />
      </CardFooter>
    </Card>
  );
};
