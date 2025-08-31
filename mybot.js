// ==UserScript==
// @name          Zen Agentic Find Bar Full Mod
// @description   Floating AI Find Bar with agentic commands for Zen Browser
// @version       1.0
// ==/UserScript==

(function() {
  "use strict";

  // Reference to the find bar UI and logic
  const agenticFindBar = {
    expanded: false,
    container: null,
    input: null,
    messages: null,

    init() {
      // Create UI container
      this.container = document.createElement("div");
      Object.assign(this.container.style, {
        position: "fixed",
        top: "15px",
        right: "15px",
        width: "320px",
        height: "420px",
        backgroundColor: "rgba(30, 30, 30, 0.9)",
        color: "white",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        fontSize: "14px",
        borderRadius: "8px",
        padding: "12px",
        boxSizing: "border-box",
        display: "none",
        flexDirection: "column",
        zIndex: 9999999,
      });

      // Messages container
      this.messages = document.createElement("div");
      Object.assign(this.messages.style, {
        flexGrow: "1",
        overflowY: "auto",
        marginBottom: "10px",
        padding: "6px",
        backgroundColor: "rgba(50, 50, 50, 0.6)",
        borderRadius: "6px",
      });
      this.container.appendChild(this.messages);

      // Input box
      this.input = document.createElement("input");
      this.input.type = "text";
      this.input.placeholder = "Ask AI or enter command...";
      Object.assign(this.input.style, {
        width: "100%",
        padding: "8px",
        borderRadius: "6px",
        border: "none",
        outline: "none",
        fontSize: "14px",
      });
      this.container.appendChild(this.input);

      // Enter key event to send message
      this.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && this.input.value.trim()) {
          this.sendMessage(this.input.value.trim());
          this.input.value = "";
        } else if (e.key === "Escape") {
          this.toggle();
        }
      });

      document.body.appendChild(this.container);

      // Toggle visibility with Ctrl+Shift+F
      window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "f") {
          this.toggle();
        }
      });
    },

    show() {
      this.container.style.display = "flex";
      this.input.focus();
      this.expanded = true;
    },

    hide() {
      this.container.style.display = "none";
      this.expanded = false;
    },

    toggle() {
      if (this.expanded) this.hide();
      else this.show();
    },

    addMessage(text, sender = "ai") {
      const msgDiv = document.createElement("div");
      msgDiv.style.margin = "6px 0";
      msgDiv.style.padding = "8px";
      msgDiv.style.borderRadius = "6px";
      msgDiv.style.maxWidth = "90%";
      msgDiv.style.wordBreak = "break-word";
      if (sender === "user") {
        msgDiv.style.backgroundColor = "#007acc";
        msgDiv.style.alignSelf = "flex-end";
        msgDiv.style.color = "#fff";
      } else {
        msgDiv.style.backgroundColor = "#444";
        msgDiv.style.color = "#ddd";
        msgDiv.style.alignSelf = "flex-start";
      }
      msgDiv.textContent = text;
      this.messages.appendChild(msgDiv);
      this.messages.scrollTop = this.messages.scrollHeight;
    },

    async sendMessage(prompt) {
      this.addMessage(prompt, "user");

      // Show loading indicator
      const loadingDiv = document.createElement("div");
      loadingDiv.textContent = "Thinking...";
      loadingDiv.style.fontStyle = "italic";
      this.messages.appendChild(loadingDiv);
      this.messages.scrollTop = this.messages.scrollHeight;

      try {
        // Replace with your real API call here:
        // Simulated response delay and echo example:
        const simulatedReply = await new Promise((res) => {
          setTimeout(() => res("You asked: " + prompt), 1200);
        });

        loadingDiv.remove();

        this.addMessage(simulatedReply, "ai");

        // Agentic command parsing:
        const text = simulatedReply.toLowerCase();

        if (text.includes("open youtube")) {
          const query = text.split("open youtube")[1]?.trim() || prompt;
          const url = "https://www.youtube.com/results?search_query=" + encodeURIComponent(query);
          window.open(url, "_blank");
        } else if (text.includes("open reddit")) {
          const query = text.split("open reddit")[1]?.trim() || prompt;
          const url = "https://www.reddit.com/search/?q=" + encodeURIComponent(query);
          window.open(url, "_blank");
        } else if (text.includes("open new tab") || text.includes("open tab")) {
          const urlMatch = simulatedReply.match(/(https?:\/\/[^\s]+)/i);
          if (urlMatch) window.open(urlMatch[0], "_blank");
        }
        // Add more agentic commands here as desired...

      } catch (error) {
        loadingDiv.remove();
        this.addMessage("Error: " + error.message, "ai");
      }
    },
  };

  // Initialize on DOM ready
  if (document.readyState === "complete" || document.readyState === "interactive") {
    agenticFindBar.init();
  } else {
    window.addEventListener("DOMContentLoaded", () => agenticFindBar.init());
  }

  // Expose for debugging
  window.agenticFindBar = agenticFindBar;
})();
