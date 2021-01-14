const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const differenceInMinutes = require("date-fns/differenceInMinutes");

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
    lastSeen: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

UserSchema.virtual("isOnline").get(function () {
  return differenceInMinutes(new Date().toISOString(), this.lastSeen) < 5;
});

module.exports = mongoose.model("User", UserSchema);

// module.exports = mongoose.model("User");
