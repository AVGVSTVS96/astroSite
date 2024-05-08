import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });

  const result = await streamText({
    model: openai.openai('gpt-4'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toAIStreamResponse();
}
