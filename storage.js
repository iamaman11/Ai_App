// storage.js - Управление данными

// 📌 Функция загрузки API-ключа с сервера
export async function getStoredApiKey() {
    try {
        const response = await fetch("http://localhost:3001/api/getApiKey");
        if (!response.ok) {
            throw new Error(`Ошибка сервера (${response.status}): ${await response.text()}`);
        }
        const data = await response.json();
        console.log("🔑 API-ключ получен с сервера:", data.apiKey);
        return data.apiKey;
    } catch (error) {
        console.error("⛔ Ошибка получения API-ключа:", error);
        return null;
    }
}

// 📌 Сохранение сообщений в чате
export function saveMessage(message, sender) {
    chrome.storage.local.get("chatHistory", (data) => {
        let chatHistory = data.chatHistory || [];
        chatHistory.push({ sender, message });
        chrome.storage.local.set({ chatHistory });
    });
}

// 📌 Загрузка истории сообщений
export function loadChatHistory(callback) {
    chrome.storage.local.get("chatHistory", (data) => {
        callback(data.chatHistory || []);
    });
}

// 📌 Очистка истории чата
export function clearChatHistory() {
    chrome.storage.local.remove("chatHistory", () => {
        console.log("🧹 История чата очищена!");
    });
}
