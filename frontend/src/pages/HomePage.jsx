import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatstore';
import { Users, MessageCircle } from 'lucide-react';

const HomePage = () => {
  const { users, selectedUser, isUserLoading, getUsers, getMessages } = useChatStore();
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const handleUserSelect = (user) => {
    setActiveUser(user);
    getMessages(user.id);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Users Sidebar */}
      <div className="w-1/4 bg-[#1a1a1a] border-r border-purple-800 p-4 overflow-y-auto">
        <div className="flex items-center mb-6">
          <Users className="mr-2 text-purple-500" />
          <h2 className="text-xl font-bold text-purple-400">Chats</h2>
        </div>

        {isUserLoading ? (
          <div className="text-center text-gray-500">Loading users...</div>
        ) : (
          <div className="space-y-2">
            {users.map((user) => (
              <div 
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className={`
                  flex items-center p-3 rounded-lg cursor-pointer 
                  transition duration-200 ease-in-out
                  ${activeUser?.id === user.id 
                    ? 'bg-purple-800 text-white' 
                    : 'hover:bg-purple-900 hover:text-purple-200'}
                `}
              >
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {user.lastMessage || 'No messages yet'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-black flex flex-col">
        {activeUser ? (
          <div className="flex-1">
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

            {/* Messages container - you'll replace this with actual message rendering */}
            <div className="p-4 overflow-y-auto flex-1">
              {/* Placeholder for messages */}
              <div className="text-center text-gray-500">
                No messages selected
              </div>
            </div>

            {/* Message input - placeholder */}
            <div className="bg-[#1a1a1a] p-4 border-t border-purple-800">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="w-full bg-black border border-purple-800 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <MessageCircle className="mr-2 text-purple-500" size={48} />
            <p className="text-xl">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;