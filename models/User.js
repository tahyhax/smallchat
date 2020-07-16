const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    description: {
      type: String,
    },
    chats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    contacts: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    newMessages: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

// module.exports = mongoose.model("User");
