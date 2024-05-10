import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export const prerender = false;

interface Message {
  role: string;
  content: string;
}

interface ChatRequest {
  modelName?: string;
  prompt: string;
  messages: Message[];
}

let modelName: string;

export async function POST(context) {
  const {
    modelName: newModelName,
    prompt,
    messages,
  }: ChatRequest = await context.request.json();

  if (newModelName) {
    modelName = newModelName;
    return new Response(null, { status: 200 });

    return;
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
