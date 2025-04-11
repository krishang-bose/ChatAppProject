import React, { useState } from 'react';
import { useChatStore } from '../store/useChatstore';

const ChatContainer = () => {
  const { activeUser } = useChatStore();
  const [message, setMessage] = useState('');
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Implement message sending logic
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex-1 bg-black flex flex-col">
      {/* Message header */}
      <div className="bg-[#1a1a1a] p-4 flex items-center border-b border-purple-800">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
          {activeUser.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-purple-400">{activeUser.name}</h2>
          <p className="text-sm text-gray-500">Active now</p>
        </div>
      </div>

      {/* Messages container */}
      <div className="p-4 overflow-y-auto flex-1 flex flex-col space-y-4">
        {activeUser.messages && activeUser.messages.length > 0 ? (
          activeUser.messages.map((msg, index) => (
            <div 
              key={index} 
              className={`max-w-3/4 p-3 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-purple-800 text-white ml-auto' 
                  : 'bg-gray-800 text-white mr-auto'
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

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="bg-[#1a1a1a] p-4 border-t border-purple-800">
        <div className="flex">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 bg-black border border-purple-800 rounded-l-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button 
            type="submit"
            className="bg-purple-700 hover:bg-purple-600 text-white px-6 rounded-r-full transition duration-200"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatContainer;