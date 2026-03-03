import Message from "../models/message.js";
import User from "../models/user.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsers = async (req, res) => {
    try{
        // Exclude the currently logged-in user from the list
        const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");

        // Attach the last message text for each user in the sidebar
        const usersWithLastMessage = await Promise.all(
            users.map(async (user) => {
                const lastMsg = await Message.findOne({
                    $or: [
                        { senderId: req.user._id, recieverId: user._id },
                        { senderId: user._id, recieverId: req.user._id }
                    ]
                }).sort({ createdAt: -1 });

                return {
                    ...user.toObject(),
                    lastMessage: lastMsg?.text || null,
                };
            })
        );

        res.status(200).json({ users: usersWithLastMessage });
    }
    catch(error){
        console.log("Error at getUsers controller", error);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const getMessages = async (req, res) => {
    try{
        const { id: recieverId } = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or: [
              { senderId: senderId, recieverId: recieverId },
              { senderId: recieverId, recieverId: senderId }
            ]
        });

        res.status(200).json({messages});
    }
    catch(error){
        console.log("Error at getMessages controller", error);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const sendMessage = async (req, res) => {
    try{
        const {text, image} = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        });
        await newMessage.save();
        // Return the message object directly (flat) so the frontend can append with correct timestamps
        res.status(201).json(newMessage);
    }
    catch(error){
        console.log("Error at sendMessage controller", error);
        res.status(500).json({message: "Something went wrong"});
    }
}