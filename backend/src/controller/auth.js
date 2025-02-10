import User from "../models/user.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req, res) => {
    const {fullName, email, password } = req.body;
    try{
        if(password.length < 8){
            return res.status(400).json({message: "Password should be atleast 8 characters long"});
        }
        const user = await User.findOne({email});
        if(user)    return res.status(400).json({message: "User already exists with this email"});


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullName,email,
            password: hashedPassword
        });
        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
        else res.status(400).json({message: "Invalid credentials"});
    }
    catch(error){
        console.log("Error at signup controller", error);
        res.status(500).json({message: "Something went wrong"});
    }
}
export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user)   return res.status(400).json({message: "Invalid credentials"});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect)    return res.status(400).json({message: "Invalid credentials"});

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
    }
    catch(error){
        console.log("Error at login controller", error);
        res.status(500).json({message: "Something went wrong"});
    }
}
export const logout = (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development" });
    //res.clearCookie("jwt", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development" });
    res.send("Logged out successfully");
}
export const updateProfile = async (req, res) => {
    try{
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic) return res.status(400).json({message: "Profile picture is required"});

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});

        res.status(200).json(updatedUser);
    }
    catch(error){
        console.log("Error at updateProfile controller", error);
        res.status(500).json({message: "Something went wrong"});
    }
}
export const checkAuth = async (req, res) => {
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.log("Error at checkAuth controller", error);
        res.status(500).json({message: "Something went wrong"});
    }
}