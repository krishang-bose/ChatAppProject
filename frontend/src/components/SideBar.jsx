import React from 'react';
import { useChatStore } from '../store/useChatstore';

const SideBar = () => {
  const { users, activeUser, handleUserSelect, isUserLoading } = useChatStore();

  return (
    <div className="w-64 bg-black border-r border-black h-full overflow-y-auto">
      {isUserLoading ? (
        <div className="text-center text-gray-500 p-4">Loading users...</div>
      ) : (
        <div>
          {users.map((user) => (
            <div 
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className={`
                flex items-center p-3 cursor-pointer 
                border-b border-black
                ${activeUser?.id === user.id 
                  ? 'bg-[#1a1a1a]' 
                  : 'hover:bg-[#111]'}
              `}
            >
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3 text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-semibold text-white">{user.name}</h3>
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