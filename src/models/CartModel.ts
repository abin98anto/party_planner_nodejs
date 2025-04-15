import mongoose from "mongoose";

export const SelectedProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    ref: "Product",
    required: true,
  },
  selectedDates: { type: [Date], required: true },
  locationId: { type: String, ref: "Location", required: true },
});

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
    products: { type: [SelectedProductSchema], default: [] },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;
