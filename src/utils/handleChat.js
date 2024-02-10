import { addMessageToDiv } from "./addMessageToDiv";
import { handleResponse } from "./handleResponse";
import { postRequest } from "./postRequest";
import { updateSystemMessage } from "./updateSystemMessage";
import { userInputElem, messages } from "./chat";

export function handleChat() {
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

