import User from "../models/User.js";
import Token from "../models/Token.js";
import generateOTP from "../services/OTP.js";
import sendMail from "../services/MAIL.js";
import utils from "../utils/utils.js";
const { createToken } = utils;
const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

const userController = {
  newUser: async (req, res, next) => {
    const { user } = req.body;
    try {
      const isExisting = await findUserByEmail(user.email);
      console.log(isExisting.id);
      if (isExisting) {
        return res.status(400).send(`Already existing ${isExisting._id}`);
      }
      const createUser = await User.create(user);
      const token = await Token.create({
        userId: createUser._id,
        token: createToken({ userId: createUser._id }, "2m"),
      });
      const link = req.protocol + req.get("host") + "/verify/" + token._id;
      await sendMail({
        to: createUser.email,
        link,
      });
      res.status(200).json({ email: createUser.email });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  loginUser: async (req, res, next) => {
    const { email, password } = req.body.user;
    if (!email || !password) {
      res.status(400).json({ error: "Email/password required" });
    }
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(401).json({ error: "Email is not registered" });
      }
      if (user.isActive) {
        const result = user.verifyPassword(password);
        if (!result) {
          res.status(401).json({ error: "Invalid password" });
        }
        var token = await user.signToken();
        res.json({ user: user.userJson(token) });
      } else {
        res.status(401).json({ error: "User is not verified" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

export default userController;
