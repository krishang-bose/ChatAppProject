import Message from "../models/message.js";
import User from "../models/user.js";

export const getUsers = async (req, res) => {
    try{
        const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        res.status(200).json({users});
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
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    }
    catch(error){
        console.log("Error at sendMessage controller", error);
        res.status(500).json({message: "Something went wrong"});
    }
}