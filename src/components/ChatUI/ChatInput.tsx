import React, { useEffect } from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Square } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';
import type { UseChatHelpers } from '@ai-sdk/react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  handleSubmit: UseChatHelpers['handleSubmit'];
  handleInputChange: UseChatHelpers['handleInputChange'];
  input: UseChatHelpers['input'];
  isLoading: UseChatHelpers['isLoading'];
  stop: UseChatHelpers['stop'];
}

export const ChatInput = ({
  handleSubmit,
  input,
  isLoading,
  stop,
  handleInputChange,
}: ChatInputProps): React.ReactElement => {
  const disabled = !isLoading && input.length === 0;
  const formRef = React.useRef<HTMLFormElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!disabled) {
        formRef.current?.requestSubmit();
      }
    }
  };

  const useAutosizeTextArea = (
    textAreaRef: HTMLTextAreaElement | null,
    value: string
  ) => {
    useEffect(() => {
      if (textAreaRef) {
        textAreaRef.style.height = '0px';
        textAreaRef.style.height = `${textAreaRef.scrollHeight}px`;
      }
    }, [textAreaRef, value]);
  };

  useAutosizeTextArea(textAreaRef.current, input);

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className='relative flex w-full items-center'>
      <Textarea
        ref={textAreaRef}
        id='input'
        name='prompt'
        rows={1}
        placeholder='Message GPT'
        className='max-h-52 flex-1 resize-none rounded-xl py-4 pr-10 text-[1rem] focus-visible:ring-ring/20'
        autoComplete='off'
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        type='submit'
        size='icon'
        variant='secondary'
        disabled={disabled}
        onClick={isLoading ? stop : undefined}
        className={cn(
          'absolute bottom-3 right-3 transition-colors duration-200 ease-out [&_svg]:size-[17px]'
        )}>
        {isLoading ? <Square /> : <PaperPlaneIcon />}
        <span className='sr-only'>Send</span>
      </Button>
    </form>
  );
};
