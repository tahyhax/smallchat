const auth = require("../external-services/firebase/auth");

async function authMiddelware(req, res, next) {
  try {
    const { authorization = "" } = req.headers;
    const [, token] = authorization.split(" ");

    const decodedToken = await auth.verifyToken(token);
    // console.log(decodedToken);
    req.locals = { email: decodedToken.email };
    return next();
  } catch (error) {
    return res.status(401).send(error);
  }
}

module.exports = authMiddelware;
