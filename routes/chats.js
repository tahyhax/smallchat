const express = require("express");
const router = express.Router();
const authMiddelware = require("../middelware/authMiddelware");
const ChatsService = require("../services/chats");

/**
 * @route /api/chats/:id
 * @description ...
 * @private
 */
router.get("/:id", authMiddelware, async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await ChatsService.getChatById(id);
    res.status(200).send(chat);
  } catch (error) {
    res.send(400).send(error);
  }
});

/**
 * @route /api/chats/
 * @description ...
 * @private
 */
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

/**
 * @route /api/chats/  public | private | all
 * @description ...
 * @private
 */
router.get("/", authMiddelware, async (req, res) => {
  try {
    // const chats = await ChatsService.getChats(ChatsService.CHAT_TYPES.public);
    const chats = await ChatsService.getChats();

    res.status(200).send(chats);
  } catch (error) {
    res.send(400).send(error);
  }
});
module.exports = router;
