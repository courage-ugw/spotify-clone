import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL,
            credentials: true,
        },
    });

    const userSockets = new Map(); // {userId: socketId}
    const userActivities = new Map(); // {userId: {lastActivity: Date.now()}}

    io.on("connection", (socket) => {
        socket.on("user_connected", (userId) => {
            // add the user to the online users list and set their activity to idle
            userSockets.set(userId, socket.id);
            userActivities.set(userId, "idle");

            // broadcast to all users that a new user has connected
            io.emit("user_connected", userId);

            // send the list of online users to the new user
            socket.emit("users_online", Array.from(userSockets.keys()));

            // send the list of activities to the new user
            io.emit("activities", Array.from(userActivities.entries()));
        })

        socket.on("update_activity", (userId, activity) => {

            userActivities.set(userId, activity);
            io.emit("activity_updated", { userId, activity });
        })

        socket.on("send_message", async (message) => {
            try {
                const { senderId, receiverId, content } = message;

                // create the message and save it to the database
                const newMessage = await Message.create({
                    senderId,
                    receiverId,
                    content
                })

                // send to the receiver in real time if they are online
                const receiverSocketId = userSockets.get(receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("new_message", newMessage);
                }
                
                socket.emit("message_sent", newMessage);
                
            } catch (error) {
                console.error("Error sending message:", error);
                socket.emit("error", error.message);
            }
        })

        socket.on("disconnect", () => {
            let disconnectedUserId
            for (const [userId, socketId] of userSockets.entries()) {
                // find the user who disconnected
                if (socketId === socket.id) {
                    // remove the user from the online users list
                    userSockets.delete(userId);
                    userActivities.delete(userId);
                    break;
                }
            }
            
            if (disconnectedUserId) {
                // broadcast to all users that the user has disconnected
                io.emit("user_disconnected", disconnectedUserId);
            }
        })
    });
};