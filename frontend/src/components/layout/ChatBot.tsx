"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, PhoneCall, Sparkles, MapPin, Tag } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "👋 Hi! Welcome to Triptoo Travels! I'm your AI Travel Assistant. How can I help you plan your dream vacation today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      options: [
        { label: "🔥 Top Trending Packages", action: "packages" },
        { label: "🛂 Visa Services", action: "visa" },
        { label: "📞 Speak to Travel Expert", action: "contact" },
        { label: "💬 WhatsApp Us", action: "whatsapp" },
      ],
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (userText?: string) => {
    const textToSend = userText || input.trim();
    if (!textToSend) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput("");

    // Simulate Bot response
    setTimeout(() => {
      let botResponse = "Thank you for your message! Our travel specialist will assist you shortly. You can also reach us directly at +91 8767656900 or 24x7 WhatsApp support at +18046504477 / reservations@triptootravels.com.";
      let newOptions: { label: string; action: string }[] | undefined;

      const lower = textToSend.toLowerCase();

      if (lower.includes("package") || lower.includes("trending") || lower.includes("tour")) {
        botResponse = "Explore our best selling holiday packages across Kashmir, Meghalaya, Himachal, Dubai, and Bali!";
        newOptions = [
          { label: "Explore All Packages", action: "/packages" },
          { label: "Customized Itinerary Inquiry", action: "custom" },
        ];
      } else if (lower.includes("visa") || lower.includes("passport")) {
        botResponse = "We assist with fast-track Tourist & Business Visas for Dubai, Singapore, Thailand, Europe, UK, and USA.";
        newOptions = [
          { label: "View Visa Details", action: "/visa" },
          { label: "Apply Visa Online", action: "visa_apply" },
        ];
      } else if (lower.includes("contact") || lower.includes("call") || lower.includes("phone")) {
        botResponse = "📞 Call us at +91 8767656900 (India) or 24x7 WhatsApp support at +18046504477. Address: Flat/Office-201, 2nd floor, A wing Building, Vasai East, Agnes Paradise Building, Opposite Vijay Paradise, 401208. Emails: reservations@triptootravels.com, info@triptootravels.com & support@triptootravels.com";
      } else if (lower.includes("whatsapp")) {
        window.open("https://wa.me/18046504477?text=Hi%20Triptoo%20Travels,%20I%20want%20to%20inquire%20about%20a%20tour%20package", "_blank");
        botResponse = "Redirecting you to our official 24x7 WhatsApp support line (+18046504477)...";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          options: newOptions,
        },
      ]);
    }, 600);
  };

  const handleOptionClick = (option: { label: string; action: string }) => {
    if (option.action.startsWith("/")) {
      window.location.href = option.action;
    } else {
      handleSend(option.label);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-amber-500 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
          aria-label="Open ChatBot"
        >
          <Bot className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-blue-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Triptoo AI Guide
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online | Ready to assist
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm bg-slate-950/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/50"
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>

                  {/* Option Chips */}
                  {m.options && m.options.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-slate-700/50">
                      {m.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(opt)}
                          className="px-3 py-1.5 bg-slate-700 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-medium rounded-full transition-all duration-200"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about tours, flights, visa..."
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 bg-gradient-to-r from-amber-500 to-blue-600 text-white rounded-full hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
