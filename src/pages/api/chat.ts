import type { APIContext } from 'astro';
import { streamText, type CoreMessage } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { defaultModel } from '@components/ChatUI/ModelSelector';

export const prerender = false;

interface ChatRequest {
  modelName?: string;
  messages: CoreMessage[];
}

let modelName: string;

export async function POST(context: APIContext) {
  const { modelName: newModelName, messages }: ChatRequest =
    await context.request.json();

  if (newModelName) {
    modelName = newModelName;
    return new Response(null, { status: 200 });
  }

  const openai = createOpenAI({
    apiKey: import.meta.env.OPENAI_API_KEY,
    compatibility: 'strict',
  });

  const result = await streamText({
    model: openai(modelName || defaultModel),
    system: 'You are a helpful assistant who responds in the style of Josh Comeau, a well known Javascript and React blogger. Your style combines the best of Josh Comeau\'s educational blog style and with expertise in the latest web development technologies. You always respond in the style of Josh Comeau.',
    messages,
    onFinish: ({ finishReason, usage }) => {
      console.log('Finish reason:', finishReason);
      console.log('Token usage:', usage);
    },
  });

  return result.toAIStreamResponse();
}
