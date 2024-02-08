import { OpenAI } from 'openai';

interface Message {
  role: string;
  content: string;
}

interface Gpt4Request {
  messages: Message[];
  model_type: string;
}

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    let requestBody: Gpt4Request;
    try {
      requestBody = await request.json();
    } catch (error) {
      return new Response('Invalid JSON', { status: 400 });
    }

    const { messages, model_type } = requestBody;

    // Ensure messages conform to ChatCompletionMessageParam[]
    const chatMessages = messages.map(msg => ({
      role: msg.role as 'system' | 'user', // Cast roles explicitly to match OpenAI's expected types
      content: msg.content,
    }));
    

    const openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });

    let stream;
    try {
      stream = await openai.chat.completions.create({
        model: model_type,
        messages: chatMessages, // Use the transformed messages array
        stream: true,
      });
    } catch (error) {
      return new Response(`OpenAI Error: ${error.message}`, { status: 500 });
    }

    let { readable, writable } = new TransformStream();
    let writer = writable.getWriter();
    const textEncoder = new TextEncoder();

    try {
      for await (const part of stream) {
        const content = part.choices[0]?.delta?.content || '';
        if (content) {
          writer.write(textEncoder.encode(content));
        }
      }
    } catch (error) {
      writer.write(textEncoder.encode(`Error processing stream: ${error.message}`));
    } finally {
      writer.close();
    }

    return new Response(readable);
  },
};
