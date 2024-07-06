import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import {
  useChat,
  type UseChatHelpers,
} from '@ai-sdk/react';
import { ChatInput } from './ChatInput';
import { ModelSelector } from './ModelSelector';
import { Messages } from './Messages';
import { cn } from '@/lib/utils';

export const ChatBox: React.FC = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  }: UseChatHelpers = useChat();

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const styles: Record<string, string> = {
    chatCardHeight: 'min-h-72 max-h-[calc(100dvh-177px)]',
    chatCardWidth:
      'min-w-64 max-md:w-[calc(100dvw-4rem)] md:w-[clamp(700px,75vw,1000px)]',
    headerText: 'hidden text-lg font-bold leading-none tracking-tight xs:block',
  };

  return (
    <Card
      className={cn(
        'grid grid-rows-[auto,1fr,auto] rounded-2xl',
        styles.chatCardHeight,
        styles.chatCardWidth
      )}>
      <CardHeader className="h-18 flex flex-row items-center justify-between py-3">
        <span className={styles.headerText}>ChatGPT</span>
        <ModelSelector />
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
