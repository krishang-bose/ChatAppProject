import React from 'react';
import { Users } from 'lucide-react';
import { useChatStore } from '../store/useChatstore';

const SideBar = () => {
  const { users, activeUser, handleUserSelect, isUserLoading } = useChatStore();

  return (
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
  );
};

export default SideBar;