const Message = require("../models/Message");
const Chat = require("../models/Chat");

async function getMessagesByChat(id) {
  try {
    const messages = await Message.find({ chat: id }).populate("user", [
      "firstName",
      "lastName",
    ]);
    return messages;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function createMessage(data) {
  try {
    const newMessage = {
      ...data,
      time: Date.now(),
    };
    const message = await Message.create(newMessage);
    const { chat: chatId, _id: messageId } = message;
    await addMessageToChat({ chatId, messageId });
    return message;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function addMessageToChat({ chatId, messageId }) {
  try {
    console.log("addMessageToChat", chatId);
    await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: messageId } },
      { new: true, useFindAndModify: false }
    );
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  getMessagesByChat,
  createMessage,
};
