import express from "express";
import {
  addToCart,
  deleteCart,
  getCart,
  removeFromCart,
} from "../controllers/CartController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const cartRouter = express.Router();

cartRouter.use(AuthMiddleware);
cartRouter.post("/add/:userId", addToCart);
cartRouter.put("/remove/:userId", removeFromCart);
cartRouter.delete("/:cartId", deleteCart);
cartRouter.get("/user/:userId", getCart);

export default cartRouter;
