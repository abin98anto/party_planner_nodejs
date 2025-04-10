import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    isActive: String,
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
