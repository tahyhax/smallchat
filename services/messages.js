const Message = require("../models/Message");

async function getMessagesByChat(id) {
  try {
    const messages = await Message.findOne({ chat: id }).populate("user", [
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
      time: new Date.now(),
    };
    const message = await Message.create(newMessage);
    return message;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  getMessagesByChat,
  createMessage,
};
