const User = require("../models/User");
const Chat = require("../models/Chat");

async function createUser(data) {
  try {
    console.log(data);
    const user = User.updateOne({ email: data.email }, data, { upsert: true });
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getUserContacts(id) {
  try {
    const user = await User.find(
      { contacts: { $in: [id] } },
      { email: 1, firstName: 1, lastName: 1 }
    );
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}
async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}
async function joinUserInChat({ chatId, userId }) {
  try {
    // const user = await User.findByIdAndUpdate(
    //   {
    //     _id: userId,
    //     chats: { $nin: chatId },
    //   },
    //   { $push: { chats: chatId } }
    // );
    Promise.all([
      await User.findByIdAndUpdate(
        {
          _id: userId,
          chats: { $nin: chatId },
        },
        { $addToSet: { chats: chatId } }
      ),
      await asigneUserToChat({ chatId, userId }),
    ]);
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}
async function asigneUserToChat({ chatId, userId }) {
  try {
    console.log("asigneUserToChat", chatId);
    await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { users: userId } },
      { new: true, useFindAndModify: false }
    );
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}
async function addUserNewMessage({ userId, chatId, messageId }) {
  try {
    const chatIdKey = `newMessages.${chatId}`;
    const user = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $push: { [chatIdKey]: messageId },
      }
    );
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  createUser,
  getUserContacts,
  getUserByEmail,
  joinUserInChat,
  addUserNewMessage,
};
