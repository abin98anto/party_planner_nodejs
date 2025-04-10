import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
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

const ServiceModal = mongoose.model("Service", ServiceSchema);
export default ServiceModal;