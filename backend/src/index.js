import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.js";
import cors from "cors";
import {app, server} from "./lib/socket.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/message",messageRoutes);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
});
