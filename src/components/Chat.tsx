import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import type { Message } from '../types/chat';
import { motion, AnimatePresence } from 'framer-motion';
// import { TypeAnimation } from 'react-type-animation';
import { BeatLoader } from 'react-spinners';
import confetti from 'canvas-confetti';

const mockResponses = [
  "I'd be happy to help you with that! 🌟",
  "That's a great question! Let me explain... ✨",
  "Thanks for asking! Here's what I think... 🎯",
//   "I've got just the solution for you! 🚀",
//   "Interesting point! Let me elaborate... 💡",
//   "Here's what you need to know... 📚",
//   "I've analyzed your request... 🔍",
//   "Let me share my thoughts on this... 💭",
];

interface ChatProps {
  chatState: {
    messages: Message[];
    currentUser: string;
  };
  setChatState: React.Dispatch<React.SetStateAction<{
    messages: Message[];
    currentUser: string;
  }>>;
}

export const Chat: React.FC<ChatProps> = ({ chatState, setChatState }) => {
  const [responseIndex, setResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: chatState.currentUser,
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));

    setIsStreaming(true);

    // Simulate API delay and response
    setTimeout(() => {
      // Get next response and increment index
      const nextResponse = mockResponses[responseIndex];
      const isLastMockResponse = responseIndex === mockResponses.length - 1;

      setResponseIndex((prevIndex) => 
        prevIndex >= mockResponses.length - 1 ? 0 : prevIndex + 1
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: nextResponse,
        sender: 'Bot',
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
      setIsStreaming(false);

      // Only trigger confetti on the last mock response
      if (isLastMockResponse) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0, y: 0.5 }
        });
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 1, y: 0.5 }
        });
      }
    }, 1500);
  };

  // Add scroll to bottom effect
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatState.messages]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-lg border border-gray-100">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
        <h2 className="text-xl font-semibold text-gray-800">AI Assistant</h2>
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          Online
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {chatState.messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage
                message={message}
                isOwnMessage={message.sender === chatState.currentUser}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Streaming indicator */}
        {isStreaming && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-gray-500"
          >
            <BeatLoader size={8} color="#6B7280" />
            <span className="text-sm">AI is typing...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-4 bg-white border-t border-gray-200 rounded-b-lg"
      >
        <ChatInput onSendMessage={handleSendMessage} />
      </motion.div>
    </div>
  );
}; 