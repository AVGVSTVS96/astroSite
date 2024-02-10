import { highlightCode } from "./highlightCode";
import { messages, autoScroll } from "./chat";

export async function handleResponse(response, messageText) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let assistantMessage = "";

    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            messages.push({
                role: "assistant",
                content: assistantMessage,
            });
            break;
        }

        const text = decoder.decode(value);
        assistantMessage += text;
        messageText.innerHTML = window.renderMarkdown(assistantMessage).trim();
        highlightCode(messageText);
        autoScroll();
    }
}
