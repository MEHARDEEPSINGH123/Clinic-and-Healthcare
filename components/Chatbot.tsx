"use client";

import Script from "next/script";

declare global {
  interface Window {
    DagsisChat?: {
      init: (config: {
        agentId: string;
        apiKey: string;
        name?: string;
        [key: string]: unknown;
      }) => void;
      [key: string]: unknown;
    };
  }
}

export default function Chatbot() {
  const initChat = () => {
    if (typeof window !== "undefined" && window.DagsisChat) {
      if (!document.getElementById("dagsis-chat-button")) {
        window.DagsisChat.init({
          agentId: "c0ad6e4e-ad69-4d6a-add6-f6fc07c332c2",
          apiKey: "38b35bed-3777-40e8-b88f-6e52b5d1484a",
        });
      }
    }
  };

  return (
    <Script
      src="https://dagsis.ai/widget.js"
      strategy="lazyOnload"
      onLoad={initChat}
      onReady={initChat}
    />
  );
}
