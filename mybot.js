(function() {
  // Use existing global browserBotfindbar object or create your own
  if (!window.browserBotfindbar) return;

  const originalSendMessage = window.browserBotfindbar.sendMessage;

  window.browserBotfindbar.sendMessage = async function(prompt) {
    // Call the original method
    await originalSendMessage.call(this, prompt);

    // Parse the last AI answer from chat messages
    const lastMessage = this.chatContainer.querySelector(".chat-message.chat-message-ai:last-child .message-content");
    if (!lastMessage) return;

    const text = lastMessage.textContent.toLowerCase();

    if (text.includes("open youtube")) {
      const searchTerm = text.split("open youtube")[1]?.trim() || "";
      const url = "https://www.youtube.com/results?search_query=" + encodeURIComponent(searchTerm);
      window.open(url, "_blank");
    } else if (text.includes("open reddit")) {
      const searchTerm = text.split("open reddit")[1]?.trim() || "";
      const url = "https://www.reddit.com/search/?q=" + encodeURIComponent(searchTerm);
      window.open(url, "_blank");
    }
    // Add more platform checks as needed
  };
})();
