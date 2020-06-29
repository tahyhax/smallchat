const express = require("express");
const router = express.Router();
const authMiddelware = require("../middelware/authMiddelware");

const ChatsService = require("../services/chats");

router.get("/:id", authMiddelware, async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await ChatsService.getChatById(id);
    res.status(200).send(chat);
  } catch (error) {
    res.send(400).send(error);
  }
});
router.post("/", authMiddelware, async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const chat = await ChatsService.createChat(data);
    res.status(200).send(chat);
  } catch (error) {
    res.send(400).send(error);
  }
});
// router.post("/", authMiddelware, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const chat = await ChatsService.getChatById(id);
//     res.status(200).send(chat);
//   } catch (error) {
//     res.send(400).send(error);
//   }
// });
router.get("/public", authMiddelware, async (req, res) => {
  try {
    const chats = await ChatsService.getChats(ChatsService.CHAT_TYPES.public);
    res.status(200).send(chats);
  } catch (error) {
    res.send(400).send(error);
  }
});
module.exports = router;
