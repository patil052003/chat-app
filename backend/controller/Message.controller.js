import Conversation from "../models/Conversation.model.js";
import Message from "../models/Message.model.js";
import User from "../models/User.model.js";
import { getReceiverSocketId } from "../socketIO/Server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;  

    if (!senderId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: []
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    const receiversocketId =getReceiverSocketId(receiverId);
    if(receiversocketId){
      io.to(receiversocketId).emit("newMessage",newMessage);
    }

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error in sending message:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user?._id;

    if (!senderId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] }
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({ message: "No conversation found" });
    }

    const messages = conversation.messages;
    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error in getting messages:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
