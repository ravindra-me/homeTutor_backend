import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.SECRET, {
    expiresIn,
  });
};

const utils = {
  createToken,
};
export default utils;
