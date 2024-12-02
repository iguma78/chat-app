import React from 'react';
import { formatMessageTime } from '../utils/dateFormatter';
import type { Message } from '../types/chat';
import { TypeAnimation } from 'react-type-animation';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isOwnMessage
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        {message.sender === 'Bot' ? (
          <TypeAnimation
            sequence={[message.content]}
            wrapper="span"
            speed={50}
            cursor={false}
          />
        ) : (
          message.content
        )}
        <div className={`text-xs mt-1 ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};