const admin = require("./admin");

async function verifyToken(token) {
  try {
    const decodeToken = await admin.auth().verifyIdToken(token);
    return decodeToken;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  verifyToken,
};
