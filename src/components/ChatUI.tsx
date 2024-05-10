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
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@components/ui/select';

import { useChat } from 'ai/react';

const GptSelect: React.FC = () => {
  const initialModel =
    typeof window !== 'undefined' && window.localStorage
      ? localStorage.getItem('selectedModel') || 'gpt-3.5-turbo'
      : 'gpt-3.5-turbo';
  const [selectedModel, setSelectedModel] = React.useState(initialModel);

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('selectedModel', value);
    }
  };
  console.log('Selected model:', selectedModel);

  return (
    <Select value={selectedModel} onValueChange={handleModelChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xs">OpenAI</SelectLabel>
          <SelectItem value="gpt-3.5-turbo">GPT-3.5</SelectItem>
          <SelectItem value="gpt-4">GPT-4-Turbo</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export function Chat() {
  let selectedModel = 'gpt-3.5-turbo'; // default value
  if (typeof window !== 'undefined' && window.localStorage) {
    selectedModel = localStorage.getItem('selectedModel') || 'gpt-3.5-turbo';
  }
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chatRoute',
    modelName: selectedModel,
  });

  return (
    <Card className="flex h-[clamp(300px,70vh,700px)] w-[clamp(260px,60vw,700px)] flex-col">
      <CardHeader className="h-18 flex flex-row items-center py-3">
        <div className="flex-1">
          <p className="font-bold leading-none tracking-tight">ChatGPT</p>
        </div>
        <GptSelect />
      </CardHeader>
      <CardContent className="grow overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${
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
