import mongoose from "mongoose";

const ProviderSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
    contact: Number,
    locations: [String],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ProviderModal = mongoose.model("Provider", ProviderSchema);
export default ProviderModal;
