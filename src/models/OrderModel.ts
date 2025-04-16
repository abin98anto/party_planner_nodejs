import mongoose from "mongoose";
import { SelectedProductSchema } from "./CartModel";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    productIds: {
      type: [SelectedProductSchema],
      required: true,
    },
    providerIds: {
      type: [String],
      ref: "Provider",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CANCELLED", "COMPLETED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
