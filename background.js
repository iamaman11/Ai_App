chrome.runtime.onInstalled.addListener(() => {
    console.log("DeepSeek AI Assistant установлен");

    chrome.storage.local.set({
        temperature: 0.7,
        maxTokens: 1000,
        model: "deepseek-chat",
        chatHistory: []
    }, () => {
        console.log("Настройки по умолчанию установлены");
    });
});

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: chrome.runtime.getURL("chat.html") });
});
