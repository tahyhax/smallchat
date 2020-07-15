const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { url } = require("./config/db");
const app = express();
const http = require("http").createServer(app);

const io = require("socket.io")(http);

// const io = require("socket.io")(http);

const PORT = 3000;
const ROUTES = {
  users: "/api/users",
  chats: "/api/chats",
  messages: "/api/messages",
};

// services
const ChatsService = require("./services/chats");
const UserService = require("./services/users");
const MessagesService = require("./services/messages");

// routes
const UserController = require("./routes/users");
const ChatController = require("./routes/chats");
const MessagesController = require("./routes/messages");

//Sockets
const SocketListeners = require("./socket/listeners");
const SocketEmitters = require("./socket/emitters");

// init  app
async function initApp() {
  try {
    console.log("initApp");
    const globalChat = await ChatsService.isGlobalChatExist();
    if (globalChat) {
      return Promise.resolve();
    }
    await ChatsService.createChat({ name: ChatsService.CHAT_GLOBAL_NAME });
  } catch (error) {
    Promise.reject(error);
  }
}

//Db  connect
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb is  connected"))
  .then(() => initApp())
  .then(() => console.log("App init  successfull"))

  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

//Regiter routes
app.use(ROUTES.users, UserController);
app.use(ROUTES.chats, ChatController);
app.use(ROUTES.messages, MessagesController);
app.use("/api/contacts/", require("./routes/contacts"));

io.on("connection", (socket) => {
  console.log(`Socket is connected1`, socket.id);
  //*join chat
  socket.on(SocketListeners.JOIN_CHAT, async ({ chatId, userId, userName }) => {
    try {
      await UserService.joinUserInChat({ chatId, userId });
      // socket.join(chatId);
      io.in(chatId).emit(SocketEmitters.NEW_USER_JOIN, { userName, userId });
      // socket
      //   .broadcast
      //   .to(chatId)
      //   .emit(SocketEmitters.NEW_USER_JOIN, { userName, userId });
      console.log(SocketListeners.JOIN_CHAT);
    } catch (error) {
      console.log(error);
    }
  });
  //*select chat непонятно зачем?
  socket.on(SocketListeners.SELECT_CHAT, ({ chatId }) => {
    socket.join(chatId);
    console.log(socket);
  });
  //* user Typing
  socket.on(SocketListeners.USER_TYPING, ({ chatId, userId }) => {
    // io.in(chatId).emit(SocketEmitters.USER_TYPING, { chatId, userId });
    socket.broadcast
      .to(chatId)
      .emit(SocketEmitters.USER_TYPING, { chatId, userId });

    console.log("userId", userId);
  });

  //* new message
  socket.on(SocketListeners.NEW_MESSAGE, async ({ chatId, userId, text }) => {
    try {
      const data = {
        chat: chatId,
        user: userId,
        text,
      };
      const message = await MessagesService.createMessage(data);
      io.in(chatId).emit(SocketEmitters.NEW_MESSAGE, message);
      // socket.broadcast.to(chatId).emit(SocketEmitters.NEW_MESSAGE, message);
    } catch (error) {
      console.log(error);
    }
    console.log(SocketListeners.NEW_MESSAGE);
  });
  socket.on(SocketListeners.NEW_CHAT, async (data) => {
    try {
      // const data = {
      //   chat: chatId,
      //   user: userId,
      //   text,
      // };
      const chat = await ChatsService.createChat(data);
      io.in(chatId).emit(SocketEmitters.NEW_CHAT, chat);
      // socket.broadcast.to(chatId).emit(SocketEmitters.NEW_MESSAGE, message);
    } catch (error) {
      console.log(error);
    }
    console.log(SocketListeners.NEW_MESSAGE);
  });
});

http.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
