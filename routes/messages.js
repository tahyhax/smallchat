const express = require("express");
const router = express.Router();
const authMiddelware = require("../middelware/authMiddelware");

const MessagesService = require("../services/messages");
// const { route } = require("./chats");

// router.post("/chat", async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const messages = MessagesService.getMessagesByChat(chatId);
//     res.status(200).send(messages);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
router.get("/chat/:id", authMiddelware, async (req, res) => {
  try {
    const { id } = req.params;
    const messages = MessagesService.getMessagesByChat(id);
    req.status(200).send(messages);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/chat/:id", authMiddelware, async (req, res) => {
  try {
    console.log(req);
    const { id: chatId } = req.params;
    const data = {
      // email: req.locals.email,
      chat: chatId,
      ...req.body,
    };
    console.log(data);
    const message = MessagesService.createMessage(data);
    req.status(200).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
