"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatservice } from "@/lib/gemini/client";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // If opening the chat and no messages, add a welcome message
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          content: "Hi there! I'm ScholarBot. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Format chat history for the API
    const chatHistory = messages.map(
      (msg) =>
        `${msg.sender === "user" ? "User" : "ScholarBot"}: ${msg.content}`
    );

    try {
      const response = await chatservice(input, chatHistory);

      if (response.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.response,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Handle error
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "Sorry, I couldn't process your request at the moment. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
        console.error(response.error);
      }
    } catch (error) {
      console.error("Failed to get chatbot response:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, there was an error connecting to the chatbot. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300 flex items-center justify-center",
          isOpen && "hidden"
        )}
        aria-label="Toggle chat">
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Container */}
      <div
        className={cn(
          "fixed bottom-0 right-0 z-40 w-full sm:w-96 transition-all duration-300 transform",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}>
        <div className="flex flex-col h-[500px] mx-auto border rounded-t-lg shadow-lg bg-white">
          {/* Chat Header */}
          <div className="p-4 bg-blue-600 text-white font-medium rounded-t-lg flex justify-between items-center">
            <div>
              <h2 className="text-xl">ScholarBot</h2>
              <p className="text-sm opacity-75">Your learning assistant</p>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
              aria-label="Close chat">
              <X size={24} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}>
                <div
                  className={`inline-block p-3 rounded-lg max-w-xs md:max-w-md ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}>
                  <p className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </p>
                  <p className="text-xs mt-1 opacity-75">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-2 border-t">
            <div className="flex rounded-lg border overflow-hidden">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-4 py-2 focus:outline-none"
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`px-4 py-2 bg-blue-600 text-white font-medium flex items-center justify-center ${
                  isLoading || !input.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                aria-label="Send message">
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
