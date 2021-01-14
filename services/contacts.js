const Contact = require("../models/Contact");
// const Chat = require("../models/Chat");

async function getContactsByUserId(id) {
  try {
    console.log(data);
    const user = Contact.find();
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}
// async function getUserByEmail(email) {
//   try {
//     const user = await User.findOne({ email: email });
//     return user;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }
// async function joinUserInChat({ chatId, userId }) {
//   try {
//     // const user = await User.findByIdAndUpdate(
//     //   {
//     //     _id: userId,
//     //     chats: { $nin: chatId },
//     //   },
//     //   { $push: { chats: chatId } }
//     // );
//     Promise.all([
//       await User.findByIdAndUpdate(
//         {
//           _id: userId,
//           chats: { $nin: chatId },
//         },
//         { $push: { chats: chatId } }
//       ),
//       await asigneUserToChat({ chatId, userId }),
//     ]);
//     return true;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }
// async function asigneUserToChat({ chatId, userId }) {
//   try {
//     console.log("asigneUserToChat", chatId);
//     await Chat.findByIdAndUpdate(
//       chatId,
//       { $set: { users: userId } },
//       { new: true, useFindAndModify: false }
//     );
//     return true;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }
// async function addUserNewMessage({ userId, chatId, messageId }) {
//   try {
//     const chatIdKey = `newMessages.${chatId}`;
//     const user = await User.findByIdAndUpdate(
//       {
//         _id: userId,
//       },
//       {
//         $push: { [chatIdKey]: messageId },
//       }
//     );
//     return user;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

module.exports = {
  createUser,
  getUserByEmail,
  joinUserInChat,
  addUserNewMessage,
};
