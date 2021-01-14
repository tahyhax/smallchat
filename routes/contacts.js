const express = require("express");
const router = express.Router();
const ContactModel = require("../models/Contact");
const UserModel = require("../models/User");

const contactsData = require("../data");

/**
 * @route /api/chats/
 * @description ...
 * @private
 */
router.post("/seeder", async (req, res) => {
  try {
    const usersList = await UserModel.find();
    for (let i = 0; i < usersList.length; i++) {
      const user = usersList[i];
      const tmpArr = new Array(25).fill(1);
      const userIds = tmpArr.map(() => {
        return usersList[Math.floor(Math.random() * usersList.length)]._id;
      });
      await UserModel.findByIdAndUpdate(
        {
          _id: user._id,
        },
        {
          $push: { contacts: userIds },
        }
      );
    }
    res.status(200).send({ success: true });
  } catch (error) {
    console.log("error", error);
    res.send(400).send(error);
  }
});

module.exports = router;
