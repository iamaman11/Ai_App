export function setupVoiceInput() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "ru-RU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const userInput = document.getElementById("user-input");
    const voiceButton = document.createElement("button");
    voiceButton.textContent = "🎤 Голос";
    document.body.appendChild(voiceButton);

    voiceButton.addEventListener("click", () => {
        recognition.start();
    });

    recognition.addEventListener("result", (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
    });

    recognition.addEventListener("error", (event) => {
        console.error("Ошибка распознавания речи:", event.error);
    });
}