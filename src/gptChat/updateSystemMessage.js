import { messages } from './chat';

let systemMessageRef = null;

export function updateSystemMessage(systemMessage) {
  if (
    systemMessage &&
    (!systemMessageRef || systemMessage !== systemMessageRef.content)
  ) {
    let systemMessageIndex = messages.findIndex(
      (message) => message.role === 'system'
    );
    if (systemMessageIndex !== -1) {
      messages.splice(systemMessageIndex, 1);
    }
    systemMessageRef = { role: 'system', content: systemMessage };
    messages.push(systemMessageRef);
  }
}
