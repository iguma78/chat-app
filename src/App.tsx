import React, { useState } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import type { Message, ChatState } from './types/chat';
import {Chat} from './components/Chat'

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        content: 'Welcome to the chat! 👋',
        sender: 'System',
        timestamp: new Date(),
      },
    ],
    currentUser: 'User',
  });

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: chatState.currentUser,
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4">
        {/* {chatState.messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwnMessage={message.sender === chatState.currentUser}
          />
        ))}
      </div> */}

      <Chat chatState={chatState} setChatState={setChatState}></Chat>

      
    </div>
    </div>
  );
}


export default App;