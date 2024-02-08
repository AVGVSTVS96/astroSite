import { Hono } from 'hono';
import { streamText } from 'hono/streaming';
import { env } from 'hono/adapter';

const app = new Hono();

app.post('/chat', (c) => {
  const { OPENAI_API_KEY } = env<{ OPENAI_API_KEY: string }>(c);

  return streamText(c, async (stream) => {
    try {
      const requestBody = await c.req.json();
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: requestBody.modelName, // Assuming the model name is sent in the request body
          messages: requestBody.messages,
        }),
      });

      if (openaiResponse.body) {
        const reader = openaiResponse.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          // Convert Uint8Array to string and write to stream
          const text = new TextDecoder().decode(value);
          await stream.write(text);
        }
      }
    } catch (error) {
      console.error('Error streaming OpenAI response:', error);
      stream.write('Error processing your request.');
    }
  });
});

export default app;
