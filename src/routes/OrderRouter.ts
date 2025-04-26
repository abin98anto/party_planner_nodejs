import express from "express";
import {
  addOrder,
  getAllOrders,
  getOrderDetails,
  getUserOrders,
  updateOrder,
} from "../controllers/OrderController";
import { AuthMiddleware, Authorize } from "../middlewares/authMiddleware";

const orderRouter = express.Router();

orderRouter.use(AuthMiddleware);
orderRouter.get("/:orderId", getOrderDetails);
orderRouter.get("/user/:userId", getUserOrders);
orderRouter.post("/add", addOrder);
orderRouter.put("/update/:orderId", updateOrder);

orderRouter.use(Authorize("admin"));
orderRouter.get("/", getAllOrders);

export default orderRouter;
