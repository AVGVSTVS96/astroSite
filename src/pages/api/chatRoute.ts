import type { APIContext } from 'astro';
import type { CoreMessage } from 'ai'
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

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
  });

  const result = await streamText({
    model: openai(modelName),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toAIStreamResponse();
}
