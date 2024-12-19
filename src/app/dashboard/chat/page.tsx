"use client";
import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      // Here you would typically send the message to your backend
      // and handle the response
    }
  };

  return (
    <div
      className={`flex flex-col h-full bg-white rounded-md max-w-6xl mx-auto border border-gray-300`}
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              ref={chatEndRef}
              className={`max-w-xs md:max-w-md lg:max-w-xl rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-gray-200 text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 box-border">
        <div className="flex justify-center items-center space-x-2 max-w-6xl mx-auto lg:border-gray-300 lg:border p-4 rounded-md h-20">
          <Input
            type="text"
            autoFocus
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 text-black placeholder-gray-500 border-gray-300 ring-1 ring-gray-200 h-full font-medium tracking-wide focus:border-blue-500 focus:border-2 focus:ring-blue-500 focus:outline-none"
          />
          <Button
            type="submit"
            variant="outline"
            className="bg-white text-black border border-gray-300 hover:bg-gray-100 h-full focus:border-2 focus:border-blue-500 focus:outline-none"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
