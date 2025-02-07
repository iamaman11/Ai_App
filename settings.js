document.addEventListener("DOMContentLoaded", async () => {
    const modelSelect = document.getElementById("model");
    const languageSelect = document.getElementById("language");
    const themeToggle = document.getElementById("theme-toggle");
    const saveButton = document.getElementById("save-settings");

    // Загружаем сохранённые настройки
    chrome.storage.local.get(["model", "language", "darkTheme"], (data) => {
        modelSelect.value = data.model || "deepseek-chat";
        languageSelect.value = data.language || "ru";
        themeToggle.checked = data.darkTheme === "enabled";
    });

    // Сохранение настроек при нажатии кнопки
    saveButton.addEventListener("click", async () => {
        const model = modelSelect.value;
        const language = languageSelect.value;
        const darkTheme = themeToggle.checked ? "enabled" : "disabled";

        await chrome.storage.local.set({ model, language, darkTheme });
        alert("✅ Настройки сохранены!");
    });

    // Переключение темы
    themeToggle.addEventListener("change", async () => {
        const darkTheme = themeToggle.checked ? "enabled" : "disabled";
        await chrome.storage.local.set({ darkTheme });
        document.body.classList.toggle("dark-theme", themeToggle.checked);
    });
});
