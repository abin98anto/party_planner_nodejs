import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    categoryId: { type: String, ref: "Category" },
    providerId: { type: String, ref: "Provider" },
    images: [String],
    price: Number,
    datesAvailable: [Date],
    isActive: Boolean,
  },
  {
    timestamps: true,
  }
);

const ProductModal = mongoose.model("Product", ProductSchema);
export default ProductModal;
