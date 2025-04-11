import React from 'react';
import { MessageCircle } from 'lucide-react';

const NoChatContainer = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-black">
      <div className="text-purple-600 mb-4">
        <MessageCircle size={64} />
      </div>
      <h2 className="text-2xl font-bold text-purple-400 mb-2">No Chat Selected</h2>
      <p className="text-gray-500">Select a conversation from the sidebar to start messaging</p>
    </div>
  );
};

export default NoChatContainer;