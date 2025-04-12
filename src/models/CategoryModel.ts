import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
