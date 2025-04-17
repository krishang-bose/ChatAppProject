import React, { useEffect, useState, useRef } from 'react';
import { useChatStore } from '../store/useChatstore';

const ChatContainer = () => {
  const [message, setMessage] = useState("");
  const { messages, getMessages, sendMessage, isMessagesLoading, selectedUser } = useChatStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage({ text: message });
    setMessage("");
  };
  if (!selectedUser) return (
    <div className="flex-1 flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="text-purple-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-purple-400 mb-2">No Chat Selected</h2>
        <p className="text-gray-500">Select a conversation from the sidebar to start messaging</p>
      </div>
    </div>
  );

  if (isMessagesLoading) return (
    <div className="flex-1 flex items-center justify-center bg-black">
      <div className="text-purple-600 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-black">
      {/* Message header */}
      <div className="bg-[#1a1a1a] py-3.5 px-4 flex items-center border-b border-purple-800">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3 text-white">
          {selectedUser.fullName?.charAt(0).toUpperCase() || selectedUser.name?.charAt(0).toUpperCase() || '?'}
        </div>
        <div>
          <h2 className="font-bold text-purple-400">{selectedUser.fullName || selectedUser.name}</h2>
        </div>
      </div>

      {/* Messages container */}
      <div className="p-4 overflow-y-auto flex-1 flex flex-col space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                msg.senderId !== selectedUser._id
                  ? 'bg-purple-700 text-white ml-auto' 
                  : 'bg-[#1a1a1a] text-white mr-auto'
              }`}
            >
              {msg.text}
              {msg.image && <img src={msg.image} alt="message" className="mt-2 rounded-lg" />}
              <div className="text-xs text-gray-400 mt-1">
                {msg.createdAt}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 my-auto">
            No messages yet. Start a conversation!
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="bg-black p-4 border-t border-purple-800 mt-auto">
        <div className="flex">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 bg-[#111] border border-purple-800 rounded-l-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
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