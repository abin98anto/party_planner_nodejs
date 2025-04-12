import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    categoryId: String,
    images: [String],
    price: Number,
    datesAvailable: [Date],
    isActive: Boolean,
  },
  {
    timestamps: true,
  }
);

const ProductModal = mongoose.model("Service", ProductSchema);
export default ProductModal;
