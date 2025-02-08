import type { APIContext } from 'astro';
import { streamText, type CoreMessage } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { defaultModel } from '@components/ChatUI/ModelSelector';

export const prerender = false;

interface ChatRequest {
  modelName?: string;
  messages?: CoreMessage[];
}

export async function POST(context: APIContext) {
  const { modelName, messages } = await context.request.json() as ChatRequest;

  // Ensure that messages are provided
  if (!messages) {
    return new Response(
      JSON.stringify({ error: 'Messages not provided' }),
      { status: 400 }
    );
  }

  // Use the provided model or fall back to the default
  const chosenModel = modelName || defaultModel;

  // For the new o3-mini model, set provider options for reasoning effort
  const additionalOptions =
    chosenModel === 'o3-mini'
      ? { providerOptions: { openai: { reasoningEffort: 'high' } } }
      : {};

  const openai = createOpenAI({
    apiKey: import.meta.env.OPENAI_API_KEY,
    compatibility: 'strict',
  });

  const result = streamText({
    model: openai(chosenModel),
    // system: 'You are a helpful assistant.',
    messages,
    ...additionalOptions,
    onFinish: ({ finishReason, usage }) => {
      console.log('model:', chosenModel);
      console.log('Finish reason:', finishReason);
      console.log('Token usage:', usage);
    },
  });

  return result.toDataStreamResponse();
}

