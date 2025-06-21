import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/", // Update to backend server's URL
    withCredentials: true,
});
