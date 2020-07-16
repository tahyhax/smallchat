const Chat = require("../models/Chat");
const User = require("../models/User");

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
    // console.log("createChat", data);
    const chat = await Chat.create(data);
    await asigneChatToUser(chat._id, data.users);
    return chat;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function asigneChatToUser(chatId, usersIds) {
  try {
    await User.updateMany(
      { _id: { $in: usersIds } },
      { $addToSet: { chats: chatId } }
    );
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}
async function getChatById(id) {
  try {
    // const perPage = 10;
    const chat = await Chat.findById(id).populate([
      {
        path: "messages",
        // match: { _id: { $nin: 21 } },
        // options: { sort: { $natural: 1 }, limit: perPage },
        populate: {
          path: "user",
          model: "User",
          select: "firstName lastName",
        },
      },
      // {
      //   path: "users",
      //   select: "firstName lastName",
      //   model: "User",
      // },
    ]);

    return chat;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getChats(type = "") {
  try {
    const chat = await Chat.find().populate({
      path: "lastMessage",
      model: "Message",
      select: "text updatedAt createdAt",
    });

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
