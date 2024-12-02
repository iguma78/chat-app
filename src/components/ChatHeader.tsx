import React from 'react';
import { MessageCircle } from 'lucide-react';

export const ChatHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white border-b">
      <MessageCircle className="w-6 h-6 text-blue-500" />
      <h1 className="text-xl font-semibold">Chat App</h1>
    </div>
  );
};