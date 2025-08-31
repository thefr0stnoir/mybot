// ==UserScript==
// @name            Agentic Find Bar Mod
// @description     Full new floating AI-powered find bar with agentic commands for Zen Browser
// @author          Custom Integration
// @version         1.0
// ==/UserScript==

(function () {
  "use strict";

  // Your full browse-bot_browse-bot.uc.js code goes here...
  // For brevity, here's the most important parts with modifications for agentic commands:

  const browserBotfindbar = {
    expanded: false,
    chatContainer: null,
    findbar: null,

    // Initialization - create UI, attach to DOM, events, etc.
    init() {
      // Create floating chat/findbar container here (recreate full UI structure)
      // This part should replicate original browse-bot findbar initialization

      // Sample UI setup (expand with real original code as needed)
      this.chatContainer = document.createElement("div");
      this.chatContainer.id = "agentic-findbar";
      this.chatContainer.style.position = "fixed";
      this.chatContainer.style.top = "10px";
      this.chatContainer.style.right = "10px";
      this.chatContainer.style.width = "300px";
      this.chatContainer.style.height = "400px";
      this.chatContainer.style.background = "rgba(0,0,0,0.8)";
      this.chatContainer.style.color = "white";
      this.chatContainer.style.zIndex = 999999;
      this.chatContainer.style.display = "none";
      this.chatContainer.style.flexDirection = "column";
      this.chatContainer.style.borderRadius = "8px";
      this.chatContainer.style.padding = "10px";
      this.chatContainer.style.fontFamily = "Arial, sans-serif";
      this.chatContainer.style.fontSize = "14px";

      // Append UI to document body
      document.body.appendChild(this.chatContainer);

      // Build input box and messages container:
      this.inputBox = document.createElement("input");
      this.inputBox.type = "text";
      this.inputBox.placeholder = "Ask AI here...";
      this.inputBox.style.width = "100%";
      this.inputBox.style.padding = "8px";
      this.inputBox.style.marginBottom = "10px";
      this.chatContainer.appendChild(this.inputBox);

      this.messagesDiv = document.createElement("div");
      this.messagesDiv.style.flex = "1 1 auto";
      this.messagesDiv.style.overflowY = "auto";
      this.messagesDiv.style.background = "rgba(255,255,255,0.1)";
      this.messagesDiv.style.borderRadius = "6px";
      this.messagesDiv.style.padding = "10px";
      this.chatContainer.appendChild(this.messagesDiv);

      // Input enter key will trigger sendMessage
      this.inputBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && this.inputBox.value.trim().length) {
          this.sendMessage(this.inputBox.value.trim());
          this.inputBox.value = "";
        }
      });

      // To toggle findbar by shortcut (Ctrl+Shift+F for example)
      window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "f") {
          this.toggle();
        }
      });

      // Initial hidden state
      this.hide();
    },

    show() {
      this.chatContainer.style.display = "flex";
      this.inputBox.focus();
      this.expanded = true;
    },

    hide() {
      this.chatContainer.style.display = "none";
      this.expanded = false;
    },

    toggle() {
      if(this.expanded) this.hide();
      else this.show();
    },

    addChatMessage(text, sender = "ai") {
      const msgDiv = document.createElement("div");
      msgDiv.style.padding = "6px";
      msgDiv.style.margin = "4px 0";
      msgDiv.style.borderRadius = "4px";
      if(sender === "user") {
        msgDiv.style.backgroundColor = "#2a8fbd";
        msgDiv.style.alignSelf = "flex-end";
      } else {
        msgDiv.style.backgroundColor = "#555";
        msgDiv.style.alignSelf = "flex-start";
      }
      msgDiv.textContent = typeof text === "string" ? text : JSON.stringify(text);
      this.messagesDiv.appendChild(msgDiv);
      this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
    },

    async sendMessage(prompt) {
      if (!prompt) return;

      this.addChatMessage(prompt, "user");

      // Show loading message (optional)
      const loadingMsg = document.createElement("div");
      loadingMsg.textContent = "Loading...";
      loadingMsg.style.fontStyle = "italic";
      this.messagesDiv.appendChild(loadingMsg);
      this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;

      try {
        // Simulate or replace with real AI backend call (Gemini, Mistral)
        // For demo, delay & echo:
        const simulatedResponse = await new Promise(res => setTimeout(() => res(`You said: ${prompt}`), 1200));

        // Remove loading message
        loadingMsg.remove();

        this.addChatMessage(simulatedResponse, "ai");

        const text = simulatedResponse.toLowerCase();

        // Agentic commands parse example
        if (text.includes("open youtube")) {
          const searchTerm = text.split("open youtube")[1]?.trim() || "";
          const url = "https://www.youtube.com/results?search_query=" + encodeURIComponent(searchTerm);
          window.open(url, "_blank");
        }
        // TODO: Add other agentic commands here...

      } catch (e) {
        this.addChatMessage(`Error: ${e.message}`, "ai");
      }
    },
  };

  // Initialize the findbar on page load
  window.addEventListener("load", () => {
    browserBotfindbar.init();
  });

  // Expose for console testing or manual toggle
  window.browserBotfindbar = browserBotfindbar;

})();
