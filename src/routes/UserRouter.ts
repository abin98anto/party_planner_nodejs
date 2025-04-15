import express from "express";
import { login, logout, signup } from "../controllers/UserController";
const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/logout", logout);

export default userRouter;
