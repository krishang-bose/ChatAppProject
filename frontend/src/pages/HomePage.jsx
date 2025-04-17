import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatstore';
import SideBar from '../components/SideBar';
import ChatContainer from '../components/ChatContainer';
import NoChatContainer from '../components/NoChatContainer';

const HomePage = () => {
  const { getUsers, selectedUser } = useChatStore();

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="flex h-[calc(100vh-50px)] bg-black text-white ">
      <SideBar />
      { selectedUser? <ChatContainer /> : <NoChatContainer />}
    </div>
  );
};

export default HomePage;