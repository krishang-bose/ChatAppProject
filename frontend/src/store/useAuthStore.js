import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import { toast } from "react-hot-toast";
import {io} from "socket.io-client";

export const useAuthStore = create((set, get) => ({
    authUser: null,

    isSigningIn: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    socket: null,
    onlineUser: [],
    isCheckingAuth: true,

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
            get().connectSocket();
        }
        catch(error){
            console.error("error in checkAuth:", error);
            set({authUser: null});
        }
        finally{
            set({isCheckingAuth: false});
        }
    },
    signup: async (data) => {
        set({isSigningIn: true});
        try{
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data});
            toast.success("Signup successful");
            get().connectSocket();
        }
        catch(error){
            toast.error(error.response.data.message);
            console.error("error in signUp:", error);
        }
        finally{
            set({isSigningIn: false});
        }
    },
    logout: async () => {
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            get().disconnectSocket();
            toast.success("Logout successful");
        }
        catch(error){
            toast.success("Logout successful");
            console.error("error in logout:", error);
        }
    },
    login: async(data) =>{
        set({isLoggingIn: true});
        try{
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data});
            get().connectSocket();
            toast.success("Login successful");
        }
        catch(error){
            toast.error(error.response.data.message);
            console.error("error in login:", error);
        }
        finally{
            set({isLoggingIn: false});
        }
    },
    updateProfile: async(data) => {
        set({isUpdatingProfile: true});
        try{
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({authUser: res.data});
            toast.success("Profile updated");
        }
        catch(error){
            toast.error("error here");
            console.error("error in updateProfile:", error);
        }
        finally{
            set({isUpdatingProfile: false});
        }
    },

    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected)   return;

        const socket = io("http://localhost:5001", {
            query: {
                userId: authUser._id,
            }
        })
        socket.connect();

        set({socket: socket});

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUser: userIds});
        })
    },
    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();
    }
}));