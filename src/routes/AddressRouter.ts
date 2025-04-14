import express from "express";
import {
  addAddress,
  deleteAddress,
  getUserAddress,
  updateAddress,
} from "../controllers/AddressController";

const addressRouter = express.Router();

addressRouter.get("/:userId", getUserAddress);
addressRouter.post("/add", addAddress);
addressRouter.put("/update", updateAddress);
addressRouter.delete("/:addressId", deleteAddress);

export default addressRouter;
