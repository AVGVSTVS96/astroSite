import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { useChat, type UseChatHelpers, type UseChatOptions } from 'ai/react';
import { useModel } from '@hooks/useModel';
import { ChatInput } from './ChatInput';
import { ModelSelector } from './ModelSelector';
import { Messages } from './Messages';
import { cn } from '@/lib/utils';

export const ChatBox: React.FC = () => {
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

  const chatHeight = 'min-h-72 max-h-[calc(100dvh-177px)]';
  const chatWidth =
    'min-w-64 max-lg:w-[calc(100dvw-4rem)] lg:w-[clamp(600px,60vw,1000px)]';

  return (
    <Card className={cn(`grid grid-rows-[auto,1fr,auto] rounded-2xl`, chatHeight, chatWidth)}>
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
      <CardContent className="flex flex-col-reverse overflow-y-auto pb-0 pt-2">
        <Messages messages={messages} />
      </CardContent>
      <CardFooter className="mt-6">
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
