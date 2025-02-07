export async function sendMessageStreaming(message, onData) {
    try {
        const apiKey = await fetchApiKeyFromServer();

        if (!apiKey) {
            throw new Error("❌ API-ключ отсутствует на сервере!");
        }

        console.log("📌 Используем API-ключ:", apiKey);

        const requestBody = {
            model: "deepseek-chat",
            messages: [{ role: "user", content: message }],
            temperature: 0.7,
            max_tokens: 1000,
            stream: true // 📌 Включаем потоковый режим
        };

        const response = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Ошибка API (${response.status}): ${response.statusText}`);
        }

        // 📌 Читаем потоковые данные
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            onData(chunk); // 📌 Передаем данные в UI
        }

        console.log("✅ Потоковые данные успешно обработаны.");
    } catch (error) {
        console.error("⛔ Ошибка API (Streaming):", error);
        throw new Error(`Ошибка API (Streaming): ${error.message}`);
    }
}
