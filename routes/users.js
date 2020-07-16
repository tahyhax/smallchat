const express = require("express");
const router = express.Router();
const authMiddelware = require("../middelware/authMiddelware");

const userService = require("../services/users");

/**
 * @route /api/users/
 * @description ...
 * @private
 */
router.post("/", authMiddelware, async (req, res) => {
  try {
    const data = {
      email: req.locals.email,
      ...req.body,
    };
    const user = await userService.createUser(data);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @route /api/users/:email
 * @description ...
 * @private
 */
router.get("/:email", authMiddelware, async (req, res) => {
  try {
    const { email } = req.params;

    console.log(email);
    const user = await userService.getUserByEmail(email);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
/**
 * @route /api/users/:email
 * @description ...
 * @private
 */
router.get("/:userId/contacts", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId", userId);

    const user = await userService.getUserContacts(userId);
    console.log("user", user);

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @route /api/users/add-new-messages
 * @description ...
 * @private
 */
router.post("/add-new-messages", authMiddelware, async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const user = await userService.addUserNewMessage(data);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
