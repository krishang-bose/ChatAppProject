import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

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
      set({ users: res.data.users });
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