import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export const prerender = false;

export async function POST(context) {
  const { prompt, messages }: { prompt: string; messages: any[] } =
    await context.request.json();

const openai = createOpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY
});

  const result = await streamText({
    model: openai('gpt-4'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toAIStreamResponse();
}
