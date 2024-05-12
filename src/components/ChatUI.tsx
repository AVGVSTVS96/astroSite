import * as React from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
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
      <SelectTrigger className="w-[180px]">
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

export function Chat() {
  const defaultModel: string = 'gpt-3.5-turbo';
  const localStorageAvailable =
    typeof window !== 'undefined' && window.localStorage;

  const model = localStorageAvailable
    ? localStorage.getItem('selectedModel') || defaultModel
    : defaultModel;

  const [selectedModel, setSelectedModel] = React.useState<string>(model);

  const chatOptions: UseChatOptions = {
    api: '/api/chatRoute',
  };

  const { messages, input, handleInputChange, handleSubmit }: UseChatHelpers =
    useChat(chatOptions);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    localStorageAvailable ? localStorage.setItem('selectedModel', model) : null;
  };

  React.useEffect(() => {
    const sendModelName = async () => {
      await fetch('/api/chatRoute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelName: selectedModel }),
      });
    };

    sendModelName();
  }, [selectedModel]);

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
      <CardFooter className="mt-6">
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center space-x-2">
          <Input
            id="input"
            name="prompt"
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" size="icon">
            <PaperPlaneIcon className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
