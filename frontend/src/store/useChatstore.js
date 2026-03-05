import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      const onlineUserIds = useAuthStore.getState().onlineUser;
      const onlineUsers = res.data.users.filter(u => onlineUserIds.includes(u._id));
      set({ users: onlineUsers });
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data.messages }); // Ensure correct property
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      if (res && res.data) {
        // Backend returns the message object directly
        set({ messages: [...(Array.isArray(messages) ? messages : []), res.data] });
      } else {
        toast.error("Unexpected server response");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      console.log("Error in sendMessage:", error);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));