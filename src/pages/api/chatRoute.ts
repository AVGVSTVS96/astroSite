import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export const prerender = false;

interface Message {
  role: string;
  content: string;
}

let modelName;

export async function POST(context) {
  const requestData = await context.request.json();

  if (requestData.modelName) {
    modelName = requestData.modelName;
  } else {
    const { prompt, messages }: { prompt: string; messages: Message[] } =
      requestData;

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

  return new Response(null, { status: 200 });
}
