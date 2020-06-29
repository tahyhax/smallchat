const admin = require("firebase-admin");

const serviceAccount = require("../../config/firebaseAdminConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://small-chat-3842e.firebaseio.com",
});

module.exports = admin;
