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

// routes
const UserController = require("./routes/users");
const ChatController = require("./routes/chats");
const MessagesController = require("./routes/messages");

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

io.on("connection", (socket) => {
  console.log(`Socket is connected`);
  //*join chat
  socket.on(SocketListeners.JOIN_CHAT, () => {
    console.log(SocketListeners.JOIN_CHAT);
  });
  //*select chat
  socket.on(SocketListeners.SELECT_CHAT, () => {
    console.log(SocketListeners.SELECT_CHAT);
  });
  //* user Typing
  socket.on(SocketListeners.USER_TYPING, () => {
    console.log(SocketListeners.USER_TYPING);
  });
  //* new message
  socket.on(SocketListeners.NEW_MESSAGE, () => {
    console.log(SocketListeners.NEW_MESSAGE);
  });
});

http.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
