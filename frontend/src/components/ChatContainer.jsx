import React, { useState } from 'react';
import { useChatStore } from '../store/useChatstore';

const ChatContainer = () => {
  const { activeUser, sendMessage } = useChatStore();
  const [message, setMessage] = useState('');
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-black">
      {/* Message header */}
      <div className="bg-[#1a1a1a] py-3.5 px-4 flex items-center border-b border-black">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
          {activeUser.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-bold text-purple-400">{activeUser.name}</h2>
          <p className="text-xs text-gray-500">Active now</p>
        </div>
      </div>

      {/* Messages container - Set to flex-1 to take available space and overflow-y-auto to scroll */}
      <div className="p-4 overflow-y-auto flex-1 flex flex-col space-y-4">
        {activeUser.messages && activeUser.messages.length > 0 ? (
          activeUser.messages.map((msg, index) => (
            <div 
              key={index} 
              className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-purple-700 text-white ml-auto' 
                  : 'bg-[#1a1a1a] text-white mr-auto'
              }`}
            >
              {msg.text}
              <div className="text-xs text-gray-400 mt-1">
                {msg.timestamp}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 my-auto">
            No messages yet. Start a conversation!
          </div>
        )}
      </div>

      {/* Message input - Fixed at bottom */}
      <form onSubmit={handleSendMessage} className="bg-black p-4 border-t border-black mt-auto">
        <div className="flex">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 bg-[#111] border border-black rounded-l-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button 
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 rounded-r-full transition duration-200"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatContainer;