import mongoose from "mongoose";
import LocationModel from "./LocationModel";

const ProviderSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
    contact: Number,
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ProviderModal = mongoose.model("Provider", ProviderSchema);
export default ProviderModal;
