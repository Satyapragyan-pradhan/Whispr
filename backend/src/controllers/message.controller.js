import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId,io } from "../lib/socket.js";
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        //fetches every user except the current LoggedInUser and dont give password
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers)
    }
    catch (error) {
        console.log("Error in getUsersForSidebar:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
    
export const getMessages = async (req, res) => {
    try {
        const { Id: userToChatId } = req.params
        const senderId = req.user._id; //lets say myId

        const messages = await Message.find({
            $or: [
                //to load all previous messages
                { senderId: senderId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: senderId }
            ],
        });
        res.status(200).json(messages);
    }
    catch (error) {
        console.log("Error in getMessages:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const sendMessages = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { id: receiverId } = req.params
        const { text, image } = req.body;

        let imageUrl;
        if (image) {
            //upload base64 image to cloudinary
            const uploadresponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadresponse.secure_url;
        }

        const newMessage = new Message(
            {
                senderId,
                receiverId,
                text,
                image: imageUrl,
            }
        );
        await newMessage.save();

        //realtime chat functionality
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
           io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    }
    catch (error) {
         console.log("Error in sendMessages:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}