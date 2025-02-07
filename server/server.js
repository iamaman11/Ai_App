require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const API_PROVIDERS = {
    deepseek: "https://api.deepseek.com/chat/completions",
    openai: "https://api.openai.com/v1/chat/completions",
};

// ✅ Логируем запросы, чтобы видеть, какие данные приходят на сервер
app.post("/api/chat", async (req, res) => {
    console.log("📩 Новый запрос:", req.body); // Лог входящих данных

    const { message, model, provider } = req.body;
    const apiKey = provider === "deepseek" ? process.env.DEEPSEEK_API_KEY : process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error("❌ Ошибка: API-ключ отсутствует!");
        return res.status(400).json({ error: "API-ключ отсутствует" });
    }

    try {
        const response = await axios.post(API_PROVIDERS[provider], {
            model: model || "deepseek-chat",
            messages: [{ role: "user", content: message }],
            temperature: 0.7,
            max_tokens: 1000
        }, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        });

        console.log("✅ API-ответ:", response.data);
        res.json({ response: response.data.choices[0].message.content });

    } catch (error) {
        console.error("⛔ Ошибка при запросе к API:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// ✅ Добавляем эндпоинт для передачи API-ключа в расширение
app.get("/api/getApiKey", (req, res) => {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
        console.error("❌ Ошибка: API-ключ не найден в .env!");
        return res.status(500).json({ error: "API-ключ не найден на сервере" });
    }
    res.json({ apiKey });
});

// ✅ Добавляем обработку корневого запроса (для проверки работы сервера)
app.get("/", (req, res) => {
    res.send("✅ Сервер работает!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Сервер запущен на http://localhost:${PORT}`));
