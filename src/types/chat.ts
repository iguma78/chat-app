export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  currentUser: string;
}