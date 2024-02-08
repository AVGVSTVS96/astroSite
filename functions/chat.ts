import { Hono } from 'hono';
import { streamText } from 'hono/streaming';
import { env } from 'hono/adapter';

// Define the structure for messages as expected in the request body
interface Message {
  role: string;
  content: string;
}

const app = new Hono();

app.post('/chat', (c) => {
  const { OPENAI_API_KEY } = env<{ OPENAI_API_KEY: string }>(c);

  return streamText(c, async (stream) => {
    try {
      const requestBody = await c.req.json() as { modelName: string; messages: Message[] };
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: requestBody.modelName,
          messages: requestBody.messages,
        }),
      });

      if (!openaiResponse.ok) {
        const errorBody = await openaiResponse.json();
        // Matching the error format from the FastAPI code
        const errorMessage = `${errorBody.error.type}: ${errorBody.error.message}`;
        await stream.write(errorMessage);
        return;
      }

      if (openaiResponse.body) {
        const reader = openaiResponse.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = new TextDecoder().decode(value);
          await stream.write(text);
        }
      }
    } catch (error) {
      // Writing the error message in the format similar to FastAPI's OpenAIError handling
      await stream.write(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
});

export default app;
