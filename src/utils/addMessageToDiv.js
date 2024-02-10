import { highlightCode } from "./highlightCode";
import { chatMessagesDiv, autoScroll } from "./chat";

export function addMessageToDiv(role, content = "") {
    let messageDiv = document.createElement("div");
    messageDiv.className =
        role === "user" ? "message user-message" : "message assistant-message";

    let messageText = document.createElement("p");
    messageDiv.appendChild(messageText);

    if (content) {
        let renderedContent = window.renderMarkdown(content).trim();
        messageText.innerHTML = renderedContent;
        highlightCode(messageDiv);
    }

    chatMessagesDiv.appendChild(messageDiv);
    autoScroll();

    return messageText;
}
