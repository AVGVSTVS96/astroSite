import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { useChat, type UseChatHelpers } from '@ai-sdk/react';
import { ChatInput } from './ChatInput';
import { ModelSelector } from './ModelSelector';
import { ChatMessages } from './Messages';
import { cn } from '@/lib/utils';
import { useModelContext } from './ModelContext';

export const ChatBox = () => {
  const { selectedModel } = useModelContext();
  /** 
   * Custom fetch middleware that injects the current model name
   * into API requests made by the useChat hook.
   */
  const injectModel: typeof fetch = (
    input,
    init?
  ) => {
    if (init?.body && typeof init.body === "string") {
      try {
        const parsedBody = JSON.parse(init.body);
        parsedBody.modelName = selectedModel;
        init.body = JSON.stringify(parsedBody);
      } catch (err) {
        console.error("JSON parsing failed:", err);
      }
    }
    return fetch(input, init);
  };

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  }: UseChatHelpers = useChat({
    fetch: injectModel,
  });

  const styles: Record<string, string> = {
    chatCardHeight: 'min-h-72 max-h-[calc(100dvh-177px)]',
    chatCardWidth:
      'min-w-64 max-md:w-[calc(100dvw-4rem)] md:w-[clamp(700px,75vw,1000px)]',
    headerText: 'hidden text-lg font-bold leading-none tracking-tight xs:block',
  };

  return (
    <Card
      className={cn(
        'grid grid-rows-[auto_1fr_auto] rounded-2xl',
        styles.chatCardHeight,
        styles.chatCardWidth
      )}>
      <CardHeader className="h-18 flex flex-row items-center justify-between py-3">
        <span className={styles.headerText}>ChatGPT</span>
        <ModelSelector />
      </CardHeader>
      <CardContent className="flex flex-col-reverse overflow-y-auto pb-0 pt-2">
        <ChatMessages messages={messages} />
      </CardContent>
      <CardFooter className="mt-6">
        <ChatInput
          isLoading={isLoading}
          stop={stop}
          handleSubmit={handleSubmit}
          input={input}
          handleInputChange={handleInputChange}
        />
      </CardFooter>
    </Card>
  );
};

