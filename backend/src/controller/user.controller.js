import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUser = req.auth.userId;
        const users = await User.find({ clerkId: { $ne: currentUser } }); // exclude current user
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }           
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const currentUser = req.auth.userId;
        const otherUserId = req.params.userId;

        const messages = await Message.find({
            $or: [
                { senderId: currentUser, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: currentUser }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.log("error:: ", error);
        next(error);
    }
}