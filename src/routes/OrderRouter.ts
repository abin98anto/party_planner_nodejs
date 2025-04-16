import express from "express";
import {
  addOrder,
  getAllOrders,
  getOrderDetails,
  getUserOrders,
  updateOrder,
} from "../controllers/OrderController";

const orderRouter = express.Router();

orderRouter.post("/add", addOrder);
orderRouter.put("/update/:orderId", updateOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/:userId", getUserOrders);
orderRouter.get("/:orderId", getOrderDetails);

export default orderRouter;
