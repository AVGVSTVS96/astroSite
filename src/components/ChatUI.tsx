import React from 'react';
import { Bird, Rabbit, Turtle } from 'lucide-react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

import { useChat, type UseChatHelpers, type UseChatOptions } from 'ai/react';
import { useModel } from '@/hooks/useModel';
import { cn } from '@/lib/utils';

const modelGroups = [
  {
    label: 'OpenAI',
    models: [
      { label: 'GPT-3.5-Turbo', value: 'gpt-3.5-turbo' },
      { label: 'GPT-4-Turbo', value: 'gpt-4-turbo' },
      { label: 'GPT-4o', value: 'gpt-4o' },
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
  handleSubmit: UseChatHelpers['handleSubmit'];
  handleInputChange: UseChatHelpers['handleInputChange'];
  input: UseChatHelpers['input'];
  isLoading?: UseChatHelpers['isLoading'];
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  handleSubmit,
  textareaRef,
  input,
  isLoading,
  handleInputChange,
}) => {
  const disabled = isLoading || input.length === 0;
  const formRef = React.useRef<HTMLFormElement>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.requestSubmit();
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
        disabled={disabled}
        className={cn('absolute bottom-3 right-3', disabled && 'opacity-50 ')}>
        <PaperPlaneIcon className="size-[17px]" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
};

const Chat: React.FC = () => {
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
  }: UseChatHelpers = useChat(chatOptions);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <Card className="flex h-[calc(100dvh-165px)] w-[calc(100dvw-162px)] lg:w-[clamp(260px,60vw,1000px)] flex-col rounded-2xl">
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
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          textareaRef={textareaRef}
          input={input}
          handleInputChange={handleInputChange}
        />
      </CardFooter>
    </Card>
  );
};

const SettingsModelSelect: React.FC = () => (
  <div className="grid gap-3">
    <Label htmlFor="model">Model</Label>
    <Select>
      <SelectTrigger
        id="model"
        className="items-start [&_[data-description]]:hidden">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="genesis">
          <div className="flex items-start gap-3 text-muted-foreground">
            <Rabbit className="size-5" />
            <div className="grid gap-0.5">
              <p>
                Neural{' '}
                <span className="font-medium text-foreground">Genesis</span>
              </p>
              <p className="text-xs" data-description>
                Our fastest model for general use cases.
              </p>
            </div>
          </div>
        </SelectItem>
        <SelectItem value="explorer">
          <div className="flex items-start gap-3 text-muted-foreground">
            <Bird className="size-5" />
            <div className="grid gap-0.5">
              <p>
                Neural{' '}
                <span className="font-medium text-foreground">Explorer</span>
              </p>
              <p className="text-xs" data-description>
                Performance and speed for efficiency.
              </p>
            </div>
          </div>
        </SelectItem>
        <SelectItem value="quantum">
          <div className="flex items-start gap-3 text-muted-foreground">
            <Turtle className="size-5" />
            <div className="grid gap-0.5">
              <p>
                Neural{' '}
                <span className="font-medium text-foreground">Quantum</span>
              </p>
              <p className="text-xs" data-description>
                The most powerful model for complex computations.
              </p>
            </div>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
);

const TemperatureInput: React.FC = () => (
  <div className="grid gap-3">
    <Label htmlFor="temperature">Temperature</Label>
    <Input id="temperature" type="number" placeholder="0.4" />
  </div>
);

const TopPInput: React.FC = () => (
  <div className="grid gap-3">
    <Label htmlFor="top-p">Top P</Label>
    <Input id="top-p" type="number" placeholder="0.7" />
  </div>
);

const TopKInput: React.FC = () => (
  <div className="grid gap-3">
    <Label htmlFor="top-k">Top K</Label>
    <Input id="top-k" type="number" placeholder="0.0" />
  </div>
);

const SystemMessagePanel: React.FC = () => (
  <fieldset className="grid gap-6 rounded-lg border p-4">
    <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
    <div className="grid gap-3">
      <Label htmlFor="role">Role</Label>
      <Select defaultValue="system">
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="system">System</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="assistant">Assistant</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="grid gap-3">
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        placeholder="You are a..."
        className="min-h-[9.5rem]"
      />
    </div>
  </fieldset>
);

const SettingsPanel: React.FC = () => (
  <form className="hidden ml-6 lg:grid w-full items-start gap-6 md:w-1/3">
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
      <SettingsModelSelect />
      <TemperatureInput />
      <div className="grid grid-cols-2 gap-4">
        <TopPInput />
        <TopKInput />
      </div>
      <SystemMessagePanel />
    </fieldset>
  </form>
);

const ChatUI: React.FC = () => {
  return (
    <div className="relative flex flex-row gap-4">
      <SettingsPanel />
      <div>
        <Chat />
      </div>
    </div>
  );
};

export default ChatUI;
