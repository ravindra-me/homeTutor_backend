const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = {
  verifyToken: async (req, res, next) => {
    var token = req.headers.authorization;
    try {
      if (token) {
        const payload = await jwt.verify(token, process.env.SECRET);
        req.user = payload;
        next();
      } else {
        res.status(400).json({ error: "You are not login, please login " });
      }
    } catch (error) {
      next(error);
    }
  },
  hash: async function (password) {
    try {
      const hashed = await bcrypt.hash(password, 10);
      return hashed;
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
