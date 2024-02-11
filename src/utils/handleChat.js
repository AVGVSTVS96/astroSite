import { userInputElem, messages, autoScroll, chatMessagesDiv } from "./chat";
import { postRequest } from "./postRequest";
import { updateSystemMessage } from "./updateSystemMessage";
import { highlightCode } from "./highlightCode";
import { renderMarkdown } from "./renderMarkdown";

renderMarkdown();

function addMessageToDiv(role, content = "") {
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


async function handleResponse(response, messageText) {
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


export function handleChatRequest() {
    window.onload = function () {
        document.getElementById("chat-form").addEventListener("submit", async function (event) {
            event.preventDefault();

            let userInput = userInputElem.value.trim();
            let systemMessage = document.getElementById("system-message").value.trim();

            updateSystemMessage(systemMessage);

            messages.push({ role: "user", content: userInput });
            addMessageToDiv("user", userInput);
            userInputElem.value = "";

            let messageText = addMessageToDiv("assistant");

            const response = await postRequest();

            handleResponse(response, messageText);
        });
    };
}

