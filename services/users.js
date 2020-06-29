const user = require("../models/User");
const User = require("../models/User");

async function createUser(data) {
  try {
    console.log(data);
    const user = User.updateOne({ email: data.email }, data, { upsert: true });
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}
async function getUserByEmail(email) {
  try {
    const user = User.findOne({ email });
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}
async function joinUserInChat({ chatId, userId }) {
  try {
    const user = User.updateOne(
      {
        _id: userId,
        chats: { $nin: chatId },
      },
      { $push: { chats: chatId } }
    );
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  joinUserInChat,
};
