const jwt = require("jsonwebtoken");

const checkTokenMiddleware = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  try {
    const token = bearerHeader.split(" ")[1];
    if (token === null) return res.sendStatus(401);
    console.log(token);
    jwt.verify(token, "mysecret__!", (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token. Forbidden" });
      }
      console.log("user inside auth", user);
      next();
    });
  } catch (e) {
    res.status(403).json({ message: "Send token", error: e });
  }
};

module.exports = checkTokenMiddleware;
