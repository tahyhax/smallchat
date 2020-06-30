const express = require("express");
const router = express.Router();
const authMiddelware = require("../middelware/authMiddelware");

const MessagesService = require("../services/messages");

/**
 * @route /api/messages/chat/:id
 * @description ...
 * @private
 */
router.get("/chat/:id", authMiddelware, async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await MessagesService.getMessagesByChat(id);
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send(error);
  }
});
/**
 * @route /api/messages/chat/:id 5ef931c6fbb16f22f32b692c
 * @description ...
 * @private
 */
router.post("/chat/:id", authMiddelware, async (req, res) => {
  try {
    const { id: chatId } = req.params;
    const data = {
      chat: chatId,
      ...req.body,
    };
    const message = await MessagesService.createMessage(data);
    res.status(200).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
