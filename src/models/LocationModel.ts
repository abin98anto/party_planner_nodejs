import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const LocationModel = mongoose.model("Location", LocationSchema);
export default LocationModel;
