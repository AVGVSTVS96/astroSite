import { messages, modelName } from './chat';

export async function postRequest() {
  return await fetch('/chat', {
    method: 'POST',
    body: JSON.stringify({
      messages: messages,
      model_type: modelName,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
