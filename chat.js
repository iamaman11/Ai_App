import { sendMessageToAPI, sendMessageStreaming } from "./api.js";
import { setupVoiceInput } from "./voice.js";
import { renderMessage, setupUI } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    setupUI();
    setupVoiceInput();
});

document.getElementById("send-button").addEventListener("click", sendMessage);

document.getElementById("user-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();
    if (!message) return;

    renderMessage(message, "user");
    userInput.value = "";

    try {
        console.log("📩 Отправка сообщения:", message);

        // 📌 Создаем пустой элемент для ответа бота
        const botMessageElement = renderMessage("", "bot");

        await sendMessageStreaming(message, (chunk) => {
            botMessageElement.textContent += chunk; // 📌 Динамически обновляем ответ
        });

        console.log("✅ Потоковый ответ получен.");
    } catch (error) {
        console.error("⛔ Ошибка при отправке сообщения:", error);
        renderMessage(`⛔ Ошибка: ${error.message}`, "bot");
    }
}
