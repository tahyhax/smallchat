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

    //todo сделать нормальным способом а  не кустарным
    const createdMessage = await Message.findById(message._id).populate(
      "user",
      ["firstName", "lastName"]
    );

    const { chat: chatId, _id: messageId } = message;
    Promise.all([
      await addMessageToChat({ chatId, messageId }),
      await setLastMessage({ chatId, messageId }),
    ]);
    return createdMessage;
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
//TODO непонятно кудо писать етот метода в chat или здесь
async function setLastMessage({ chatId, messageId }) {
  try {
    await Chat.findByIdAndUpdate(chatId, { lastMessage: messageId });
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  getMessagesByChat,
  createMessage,
};
