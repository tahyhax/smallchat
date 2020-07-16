const Message = require("../models/Message");
const Chat = require("../models/Chat");

const mongoose = require("mongoose");

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
    // const newMessage = {
    //   ...data,
    //   time: Date.now(),
    // };
    const message = await Message.create(data);

    //todo сделать нормальным способом а  не кустарным и перенести в  all
    const createdMessage = await Message.findById(message._id).populate(
      "user",
      ["firstName", "lastName"]
    );

    const { chat: chatId, _id: messageId } = message;
    Promise.all([
      await asigneMessageToChat({ chatId, messageId }),
      await setLastMessage({ chatId, messageId }), // todo  делать ето в контролере после того как зашло новое  сообщение
    ]);
    return createdMessage;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function asigneMessageToChat({ chatId, messageId }) {
  try {
    // console.log("asigneMessageToChat", chatId);
    await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { messages: messageId } },
      { new: true, useFindAndModify: false }
    );
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}
//TODO непонятно кудо писать етот метода в chat или здесь .. в чат
async function setLastMessage({ chatId, messageId }) {
  try {
    await Chat.findByIdAndUpdate(chatId, { lastMessage: messageId });
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getMessagesByPoolId(poolId) {
  try {
    // quick solution need  fix
    const objectPoolId = poolId.map(function (id) {
      return mongoose.Types.ObjectId(id);
    });
    const messages = await Message.find({
      _id: { $in: objectPoolId },
    }).populate("user", ["firstName", "lastName"]);
    console.log(objectPoolId);
    return messages;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  getMessagesByChat,
  getMessagesByPoolId,
  createMessage,
};
