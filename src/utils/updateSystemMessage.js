import { systemMessageRef, messages, setSystemMessageRef } from "./chat";

export function updateSystemMessage(systemMessage) {
    if (systemMessage &&
        (!systemMessageRef || systemMessage !== systemMessageRef.content)) {
        let systemMessageIndex = messages.findIndex((message) => message.role === "system");
        if (systemMessageIndex !== -1) {
            messages.splice(systemMessageIndex, 1);
        }
        const newSystemMessage = { role: "system", content: systemMessage };
        setSystemMessageRef(newSystemMessage); // Update using the function
        messages.push(newSystemMessage);
    }
}
