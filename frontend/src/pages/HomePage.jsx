import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatstore';
import SideBar from '../components/SideBar';
import ChatContainer from '../components/ChatContainer';
import NoChatContainer from '../components/NoChatContainer';

const HomePage = () => {
  const { fetchUsers, activeUser } = useChatStore();

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="flex h-screen bg-black text-white">
      <SideBar />
      {activeUser ? <ChatContainer /> : <NoChatContainer />}
    </div>
  );
};

export default HomePage;