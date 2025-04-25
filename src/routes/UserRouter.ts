import express from "express";
import {
  login,
  logout,
  refreshAccessToken,
  signup,
} from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/authMiddleware";
const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/logout", AuthMiddleware, logout);
userRouter.post("/refresh-token", refreshAccessToken);

export default userRouter;
