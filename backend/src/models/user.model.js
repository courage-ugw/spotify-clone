import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  clerkId: { type: String, required: true, unique: true },
}, { timestamps: true }); // timestamps: true is used to create a createdAt and updatedAt field.


export const User = mongoose.model("User", userSchema);