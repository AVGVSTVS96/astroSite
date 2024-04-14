import * as React from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';

export function Chat() {
  const [messages, setMessages] = React.useState([
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: 'agent',
      content: 'What seems to be the problem?',
    },
    {
      role: 'user',
      content: "I can't log in.",
    },
  ]);
  const [input, setInput] = React.useState('');
  const inputLength = input.trim().length;

  return (
    <Card className="w-[clamp(260px,60vw,700px)]">
      <CardHeader className="flex flex-row items-center">
        <div className="flex-1">
          <p className="font-bold leading-none tracking-tight">ChatGPT</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
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
      <CardFooter>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (inputLength === 0) return;
            setMessages([...messages, { role: 'user', content: input }]);
            setInput('');
          }}
          className="flex w-full items-center space-x-2">
          <Input
            id="message"
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button type="submit" size="icon" disabled={inputLength === 0}>
            <PaperPlaneIcon className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
