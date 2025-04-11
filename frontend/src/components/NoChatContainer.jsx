import React from 'react';
import { MessageCircle } from 'lucide-react';

const NoChatContainer = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-black">
      <MessageCircle className="text-purple-500 mb-4" size={64} />
      <h2 className="text-2xl font-bold text-purple-400 mb-2">No Chat Selected</h2>
      <p className="text-lg">Select a conversation from the sidebar to start messaging</p>
    </div>
  );
};

export default NoChatContainer;