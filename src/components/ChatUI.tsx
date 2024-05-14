import * as React from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { Button } from '@components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectSeparator,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useModel } from '@/hooks/useModel';
import { useChat, type UseChatHelpers, type UseChatOptions } from 'ai/react';

const modelGroups = [
  {
    label: 'OpenAI',
    models: [
      { label: 'GPT-3.5-Turbo', value: 'gpt-3.5-turbo' },
      { label: 'GPT-4-Turbo', value: 'gpt-4-turbo' },
    ],
  },
  {
    label: 'OpenAI Legacy',
    models: [
      { label: 'GPT-3.5-Turbo-0613', value: 'gpt-3.5-turbo-0613' },
      { label: 'GPT-4-0613', value: 'gpt-4-0613' },
    ],
  },
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
}) => {
  const handleModelChange = (value: string) => {
    onModelChange(value);
  };

  return (
    <Select value={selectedModel} onValueChange={handleModelChange}>
      <SelectTrigger className="w-[180px] focus:ring-ring/20">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {modelGroups.map((group, index) => (
          <SelectGroup key={index}>
            <SelectLabel className="text-sm font-bold tracking-wide text-foreground">
              {group.label}
            </SelectLabel>
            {group.models.map((item) => (
              <SelectItem
                key={item.value}
                className="text-muted-foreground data-[state=checked]:text-foreground"
                value={item.value}>
                {item.label}
              </SelectItem>
            ))}
            {index < modelGroups.length - 1 && <SelectSeparator />}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

interface ChatInputProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  handleSubmit,
  textareaRef,
  input,
  handleInputChange,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="relative flex w-full items-center">
      <Textarea
        ref={textareaRef}
        id="input"
        name="prompt"
        rows={1}
        placeholder="Type your message..."
        className="max-h-28 flex-1 resize-none rounded-xl py-4 pr-10 text-[1rem] focus-visible:ring-ring/20"
        autoComplete="off"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        type="submit"
        size="icon"
        variant="secondary"
        className="absolute bottom-3 right-3">
        <PaperPlaneIcon className="size-[17px]" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
};

export function Chat() {
  const defaultModel = 'gpt-3.5-turbo';
  const { selectedModel, handleModelChange } = useModel(defaultModel);

  const chatOptions: UseChatOptions = {
    api: '/api/chatRoute',
  };

  const { messages, input, handleInputChange, handleSubmit }: UseChatHelpers =
    useChat(chatOptions);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <Card className="flex h-[calc(100dvh-165px)] w-[clamp(260px,60vw,1000px)] flex-col rounded-2xl">
      <CardHeader className="h-18 flex flex-row items-center py-3">
        <div className="flex-1">
          <p className="text-lg font-bold leading-none tracking-tight">
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
              className={`flex w-max max-w-[75%] flex-col gap-2 whitespace-pre-wrap rounded-lg px-3 py-2 ${
                message.role === 'user'
                  ? 'ml-auto bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}>
              {message.content}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-6 ">
        <ChatInput
          handleSubmit={handleSubmit}
          textareaRef={textareaRef}
          input={input}
          handleInputChange={handleInputChange}
        />
      </CardFooter>
    </Card>
  );
}
