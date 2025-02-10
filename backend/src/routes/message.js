import { protectRouter } from '../middleware/auth.js';
import { getUsers, getMessages,sendMessage } from '../controller/message.js';
import express from 'express';

const router = express.Router();

router.get("/users", protectRouter, getUsers);
router.get("/:id", protectRouter, getMessages);
router.post("/send/:id", protectRouter, sendMessage);

export default router;