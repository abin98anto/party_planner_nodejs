import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    isActive: { type: String, default: true },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
