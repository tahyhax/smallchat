const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new mongoose.Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "message",
    },
  ],
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "public",
  },
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: "message",
  },
});

mongoose.model("Chat", ChatSchema);
module.exports = mongoose.model("Chat");
