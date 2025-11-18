const express = require("express");
const userAuth = require("../middlewares/auth");
const { Chat } = require("../models/chat");
const chatRouter = express.Router();

// GET or create a chat between the authenticated user and targetUserId
chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
    // req.user._id is the user's ObjectId — don't destructure from it
    const userId = req.user && req.user._id;
    const { targetUserId } = req.params;

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    try {
        // Await the query and populate the nested senderId inside messages
        let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
        }).populate({
            path: "messages.senderId",
            select: "firstName lastName",
        });

        if (!chat) {
            chat = new Chat({
                participants: [userId, targetUserId],
                messages: [],
            });
            await chat.save();

            // populate the saved chat before returning so client has sender info
            chat = await Chat.findById(chat._id).populate({
                path: "messages.senderId",
                select: "firstName lastName",
            });
        }

        return res.json(chat);
    } catch (err) {
        console.error("/chat/:targetUserId error:", err);
        return res.status(500).json({ error: "Failed to fetch or create chat" });
    }
});

module.exports = chatRouter;