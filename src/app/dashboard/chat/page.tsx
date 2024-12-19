"use client";
import React, { useEffect, useRef, useState } from "react";
import { ID } from "node-appwrite";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const mockMessageToAI = async (): Promise<Record<string, string>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: "Hello, I am Smart Expense AI!",
        });
      }, 5000);
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      if (inputMessage.trim()) {
        const newMessage: Message = {
          id: ID.unique(),
          text: inputMessage,
          sender: "user",
        };
        setMessages([...messages, newMessage]);
        setInputMessage("");
        // Mock message to ai here
        const respone = await mockMessageToAI();
        setMessages((prev) => {
          return [
            ...prev,
            {
              id: ID.unique(),
              text: respone.message,
              sender: "bot",
            },
          ];
        });
      }
    } catch (error) {
      console.error("Error in getting response from Smart Expense AI", error);
      setMessages([
        ...messages,
        {
          id: ID.unique(),
          text: "Sorry, I am unable to respond right now",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col h-full bg-white rounded-md max-w-6xl mx-auto border border-gray-300 relative backdrop-blur-md`}
    >
      <h1 className="mt-3 text-lg space-x-9 text-gray-400 px-3 py-2  backdrop-blur-md sticky top-0 border-b border-blue-500">
        <span className="text-3xl font-bold mb-6 text-blue-600">
          Smart Expense
        </span>{" "}
        {"  "}
        Chat
      </h1>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 backdrop-blur-md">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
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
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 box-border">
        <div className="flex justify-center items-center space-x-2 max-w-6xl mx-auto lg:border-gray-300 lg:border p-4 rounded-md h-20">
          <Input
            type="text"
            disabled={isLoading}
            autoFocus
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 text-black placeholder-gray-500 border-gray-300 ring-1 ring-gray-200 h-full font-medium tracking-wide focus:border-blue-500 focus:border-2 focus:ring-blue-500 focus:outline-none"
          />
          <Button
            type="submit"
            disabled={isLoading}
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
