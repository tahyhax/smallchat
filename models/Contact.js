const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const ContactSchema = Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    info: {
      social: [
        {
          type: String,
        },
      ],
      emails: [
        {
          type: String,
        },
      ],

      phones: [
        {
          type: String,
        },
      ],
      address: {
        type: String,
      },
      description: {
        type: String,
      },
    },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // text: {
    //   type: String,
    //   required: true,
    // },
    // time: {
    //   type: Number,
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = model("Contact", ContactSchema);
