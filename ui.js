// ui.js - Управление пользовательским интерфейсом

import { clearChatHistory } from "./storage.js";

export function renderMessage(content, sender) {
    const chatMessages = document.getElementById("chat-messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender === "user" ? "user-message" : "bot-message");

    // 📌 Проверяем, доступен ли marked, иначе используем обычный текст
    if (typeof marked !== "undefined") {
        messageElement.innerHTML = marked.parse(content);
    } else {
        messageElement.textContent = content;
    }

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Функция инициализации UI
export function setupUI() {
    // 📌 Проверяем существование кнопки перед добавлением обработчика
    const clearHistoryBtn = document.getElementById("clear-history");
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener("click", () => {
            clearChatHistory();
            document.getElementById("chat-messages").innerHTML = "";
        });
    }
}
