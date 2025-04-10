import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  senderId: { type: String, required: true }, // clearkId of the sender
  receiverId: { type: String, required: true }, // clearkId of the receiver
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);