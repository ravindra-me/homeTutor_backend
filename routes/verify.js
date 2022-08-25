import express from "express";
import Token from "../models/Token.js";
import User from "../models/User.js";
var router = express.Router();

router.get("/:id", async (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const token = await Token.findById(id);
    if (!token) {
      return res.status(400).send({
        msg: "Your verification link may have expired. Please click on resend for verify your Email.",
      });
    } else {
      const user = await User.findById(token.userId);
      if (!user) {
        return res.status(401).send({
          msg: "We were unable to find a user for this verification. Please SignUp!",
        });
      } else if (user.isVerified) {
        return res
          .status(200)
          .send("User has been already verified. Please Login");
      } else {
        // change isVerified to true
        user.isActive = true;
        user.save(function (err) {
          // error occur
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          // account successfully verified
          else {
            return res
              .status(200)
              .send("Your account has been successfully verified");
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
