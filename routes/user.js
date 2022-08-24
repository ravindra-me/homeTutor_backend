import express from "express";
import userController from "../controller/user.js";
var router = express.Router();

router.post("/signup", userController.newUser);

export default router;
