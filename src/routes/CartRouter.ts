import express from "express";
import {
  addToCart,
  deleteCart,
  getCart,
  removeFromCart,
} from "../controllers/CartController";

const cartRouter = express.Router();

cartRouter.post("/add/:userId", addToCart);
cartRouter.put("/remove/:userId", removeFromCart);
cartRouter.delete("/:cartId", deleteCart);
cartRouter.get("/:userId", getCart);

export default cartRouter;