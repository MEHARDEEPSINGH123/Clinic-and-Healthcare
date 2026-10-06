"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, X, Sparkles } from "lucide-react";

interface DagsisConfig {
  agentId: string;
  apiKey: string;
  name?: string;
}

declare global {
  interface Window {
    DagsisChat?: {
      init: (config: DagsisConfig) => void;
      open?: () => void;
      close?: () => void;
      toggle?: () => void;
      [key: string]: unknown;
    };
  }
}

const DEFAULT_CONFIG: DagsisConfig = {
  agentId: "dfc457e1-a0b6-43b4-8170-c79d13334a25",
  apiKey: "2d3146fd-1c33-4347-a550-90127f770ea2",
  name: "Vitalis Health Concierge",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<DagsisConfig>(DEFAULT_CONFIG);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Expose window.DagsisChat for external programmatic control
    window.DagsisChat = {
      init: (newConfig: DagsisConfig) => {
        if (newConfig?.agentId && newConfig?.apiKey) {
          setConfig({
            agentId: newConfig.agentId,
            apiKey: newConfig.apiKey,
            name: newConfig.name || "Vitalis Health Concierge",
          });
        }
      },
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
    };
  }, []);

  const embedUrl = `https://dagsis.ai/embed/${config.agentId}?name=${encodeURIComponent(
    config.name || "Vitalis Health"
  )}#apiKey=${encodeURIComponent(config.apiKey)}`;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setHasInteracted(true);
  };

  return (
    <>
      {/* Floating Chat Container Window */}
      <div
        id="dagsis-chat-container"
        className={`fixed z-[999999] transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{
          bottom: "92px",
          right: "24px",
          width: "min(420px, calc(100vw - 32px))",
          height: "min(620px, calc(100vh - 120px))",
        }}
      >
        <div className="w-full h-full bg-white rounded-2xl shadow-2xl border border-stone-200/80 overflow-hidden flex flex-col">
          {/* Header Bar */}
          <div className="bg-[#264653] text-white px-4 py-3 flex items-center justify-between select-none shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2A9D8F]/25 border border-[#2A9D8F]/40 flex items-center justify-center text-[#E9C46A]">
                <Sparkles className="w-4 h-4 text-[#E9C46A]" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight text-white leading-tight">
                  Vitalis AI Concierge
                </div>
                <div className="text-[11px] text-[#2A9D8F] flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  Active • 24/7 Care Guidance
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Iframe Loading Container */}
          <div className="flex-1 w-full relative bg-stone-50">
            <iframe
              src={embedUrl}
              allow="clipboard-write; microphone"
              title="Vitalis Health AI Assistant"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>

      {/* Floating Launcher Button */}
      <div
        id="dagsis-chat-button"
        className="fixed z-[999999] flex items-center gap-2"
        style={{ bottom: "24px", right: "24px" }}
      >
        {/* Helper Tooltip Badge (visible before interaction) */}
        {!isOpen && !hasInteracted && (
          <div
            onClick={handleToggle}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-stone-200 text-xs font-medium text-stone-700 cursor-pointer hover:bg-stone-50 transition-all animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Need medical advice? Chat with AI</span>
          </div>
        )}

        <button
          onClick={handleToggle}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-white ${
            isOpen
              ? "bg-[#264653] hover:bg-[#1f3842]"
              : "bg-gradient-to-tr from-[#264653] to-[#2A9D8F] hover:shadow-2xl hover:shadow-[#2A9D8F]/30"
          }`}
          aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-6 h-6 transition-transform duration-200" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E76F51] border-2 border-white" />
            </div>
          )}
        </button>
      </div>
    </>
  );
}
