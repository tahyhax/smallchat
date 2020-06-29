const express = require("express");
const router = express.Router();
const authMiddelware = require("../middelware/authMiddelware");

const userService = require("../services/users");

// router.get("/", authMiddelware, async (req, res) => {
//   res.status(200).send(`Email: ${req.locals.email}`);
// });
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

module.exports = router;
