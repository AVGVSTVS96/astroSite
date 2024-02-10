import { highlightCode } from "./highlightCode";
import { postRequest } from "./postRequest";
import { renderMarkdown } from "./renderMarkdown";

// DOM Elements
const chatMessagesDiv = document.getElementById("chat-messages");
const userInputElem = document.getElementById("user-input");
const modelToggle = document.getElementById("model-toggle");
const modelLabelLeft = document.getElementById("model-label-left");
const modelLabelRight = document.getElementById("model-label-right");

// State variables
export let messages = [];
let systemMessageRef = null;
export let modelName = modelToggle.checked ? "gpt-4-0125-preview" : "gpt-3.5-turbo";
let autoScrollState = true;
let lastScrollTop = 0;

renderMarkdown();

function autoScroll() {
  if (autoScrollState) {
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
  }
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


function updateSystemMessage(systemMessage) {
  if (
    systemMessage &&
    (!systemMessageRef || systemMessage !== systemMessageRef.content)
  ) {
    let systemMessageIndex = messages.findIndex((message) => message.role === "system");
    if (systemMessageIndex !== -1) {
      messages.splice(systemMessageIndex, 1);
    }
    systemMessageRef = { role: "system", content: systemMessage };
    messages.push(systemMessageRef);
  }
}

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

// Event listener functions
function handleModelToggle() {
  if (modelToggle.checked) {
    modelLabelRight.textContent = "GPT-4";
    modelName = "gpt-4-0125-preview";
  } else {
    modelLabelLeft.textContent = "GPT-3.5";
    modelName = "gpt-3.5-turbo";
  }
}

function handleInputKeydown(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    document.getElementById("submitBtn").click();
  }
}

function handleChatScroll() {
  const isAtBottom =
    chatMessagesDiv.scrollHeight - chatMessagesDiv.clientHeight <=
    chatMessagesDiv.scrollTop + 150;

  if (chatMessagesDiv.scrollTop < lastScrollTop) {
    autoScrollState = false;
  } else {
    autoScrollState = isAtBottom;
  }

  lastScrollTop = chatMessagesDiv.scrollTop;
}

// Event listeners
modelToggle.addEventListener("change", handleModelToggle);
userInputElem.addEventListener("keydown", handleInputKeydown);
chatMessagesDiv.addEventListener("scroll", handleChatScroll);
