import express from "express";
import userController from "../controller/user.js";
var router = express.Router();

router.post("/signup", userController.newUser);
router.post("/login", userController.loginUser);

router.get("/:slug", (req, res) => {
  console.log(req.params);
});

export default router;
