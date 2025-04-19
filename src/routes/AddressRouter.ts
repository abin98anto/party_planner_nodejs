import express from "express";
import {
  addAddress,
  deleteAddress,
  getUserAddress,
  updateAddress,
} from "../controllers/AddressController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const addressRouter = express.Router();

addressRouter.use(AuthMiddleware);
addressRouter.post("/add", addAddress);
addressRouter.put("/update", updateAddress);
addressRouter.get("/:userId", getUserAddress);
addressRouter.delete("/:addressId", deleteAddress);

export default addressRouter;
