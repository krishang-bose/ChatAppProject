import { create } from 'zustand';

// Sample data - replace with real API calls in a production app
const sampleUsers = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    messages: [
      { sender: 'user', text: 'Hey, how are you?', timestamp: '10:30 AM' },
      { sender: 'other', text: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    lastMessage: 'Let\'s meet tomorrow',
    messages: [
      { sender: 'other', text: 'Can we meet tomorrow?', timestamp: '9:15 AM' },
      { sender: 'user', text: 'Let\'s meet tomorrow', timestamp: '9:20 AM' }
    ]
  },
  {
    id: 3,
    name: 'Alex Johnson',
    lastMessage: 'The project is going well',
    messages: [
      { sender: 'user', text: 'How\'s the project going?', timestamp: 'Yesterday' },
      { sender: 'other', text: 'The project is going well', timestamp: 'Yesterday' }
    ]
  }
];

export const useChatStore = create((set, get) => ({
  users: [],
  activeUser: null,
  isUserLoading: false,
  
  fetchUsers: () => {
    set({ isUserLoading: true });
    // Simulate API call
    setTimeout(() => {
      set({ 
        users: sampleUsers,
        isUserLoading: false
      });
    }, 1000);
  },
  
  handleUserSelect: (user) => {
    set({ activeUser: user });
  },
  
  sendMessage: (text) => {
    const { activeUser } = get();
    if (!activeUser) return;
    
    const newMessage = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedUser = {
      ...activeUser,
      lastMessage: text,
      messages: [...(activeUser.messages || []), newMessage]
    };
    
    set({
      activeUser: updatedUser,
      users: get().users.map(user => 
        user.id === activeUser.id ? updatedUser : user
      )
    });
  }
}));