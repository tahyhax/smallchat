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
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    info: {
      description: {
        type: String,
      },

      phone: {
        type: String,
      },
      country: {
        type: String,
      },
      city: {
        type: String,
      },
    },

    // chats: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Chat",
    //   },
    // ],
    newMessages: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

// module.exports = mongoose.model("User");
// https://core.telegram.org/bots/api#getchatmember