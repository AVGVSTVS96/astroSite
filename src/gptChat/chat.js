import { handleChatRequest } from './handleChat';

// DOM Elements
export const chatMessagesDiv = document.getElementById('chat-messages');
export const userInputElem = document.getElementById('user-input');
const modelToggle = document.getElementById('model-toggle');
const modelLabelLeft = document.getElementById('model-label-left');
const modelLabelRight = document.getElementById('model-label-right');

// State variables
export let messages = [];

// export let modelName = modelToggle.checked ? gpt4 : gpt3;

// set to get modelname from select in chat.tsx
// export let modelName = window.modelName || window.gpt3;

export let modelName = localStorage.getItem('selectedModel') || 'gpt3';

if (modelName === 'gpt3') {
  modelName = 'gpt-3.5-turbo-0125';
} else if (modelName === 'gpt4') {
  modelName = 'gpt-4';
}
// console.log(modelName);

let autoScrollState = true;
let lastScrollTop = 0;

handleChatRequest();

export function autoScroll() {
  if (autoScrollState) {
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
  }
}

// Event listener functions
// function handleModelToggle() {
//   if (modelToggle.checked) {
//     modelLabelRight.textContent = 'GPT-4';
//     modelName = gpt4;
//   } else {
//     modelLabelLeft.textContent = 'GPT-3.5';
//     modelName = gpt3;
//   }
// }

function handleInputKeydown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    document.getElementById('submitBtn').click();
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
// modelToggle.addEventListener('change', handleModelToggle);
userInputElem.addEventListener('keydown', handleInputKeydown);
chatMessagesDiv.addEventListener('scroll', handleChatScroll);
