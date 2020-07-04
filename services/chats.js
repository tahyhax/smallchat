const Chat = require("../models/Chat");
const CHAT_GLOBAL_NAME = "Global";
const CHAT_TYPES = {
  public: "public",
  private: "private",
};

async function isGlobalChatExist() {
  try {
    const chat = await Chat.findOne({ name: CHAT_GLOBAL_NAME });
    return chat;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function createChat(data) {
  try {
    const chat = await Chat.create(data);
    return chat;
  } catch (error) {
    return Promise.reject(error);
  }
}
async function getChatById(id) {
  try {
    const chat = await Chat.findById(id).populate({
      path: "messages",
      populate: {
        path: "user",
        model: "User",
      },
    });
    return chat;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getChats(type) {
  try {
    const chat = await Chat.find({ type: type });
    return chat;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  CHAT_GLOBAL_NAME,
  CHAT_TYPES,
  isGlobalChatExist,
  createChat,
  getChatById,
  getChats,
};
