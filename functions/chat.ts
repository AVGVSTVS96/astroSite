import { OpenAI } from 'openai';

interface Message {
  role: string;
  content: string;
}

interface ChatRequest {
  messages: Message[];
  model_type: string;
}

export async function onRequest(context: { request: any; env: any; }) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let requestBody: ChatRequest;
  try {
    requestBody = await request.json();
  } catch (error) {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { messages, model_type } = requestBody;

  const chatMessages = messages.map((msg) => ({
    role: msg.role as 'system' | 'user',
    content: msg.content,
  }));

  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });

  try {
    const stream = await openai.chat.completions.create({
      model: model_type,
      messages: chatMessages,
      stream: true,
    });

    let { readable, writable } = new TransformStream();
    let writer = writable.getWriter();
    const textEncoder = new TextEncoder();

    (async () => {
      for await (const part of stream) {
        const content = part.choices[0]?.delta?.content || '';
        if (content) {
          await writer.write(textEncoder.encode(content));
        }
      }
      writer.close();
    })();

    return new Response(readable);
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
