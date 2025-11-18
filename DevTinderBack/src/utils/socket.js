const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
// const Chat = require("../models/chat");
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: [
        "https://devtinder-frontend-fwwl.onrender.com",
        "http://localhost:5173",
      ],
      credentials:true,
      methods:["GET","POST"],
    },
  });

  const secretRoomId = (userId, targetUserId) => {
    return crypto
      .createHash("sha256")
      .update([userId, targetUserId].sort().join("$"))
      .digest("hex");
  };

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = secretRoomId(userId, targetUserId);
      // console.log(firstName + " join room "+roomId);
      socket.join(roomId);
    });
    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        try {
          const roomId = secretRoomId(userId, targetUserId);
          // console.log(firstName+" "+text);
          io.to(roomId).emit("newMessageReceived", { firstName, text });

            let chat = await  Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();
          
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on("disconnect", () => {});
  });
};
module.exports = initializeSocket;
