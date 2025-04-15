import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User" },
    venue: String,
    place: String,
    landmark: String,
    city: String,
    district: String,
    state: String,
    pincode: Number,
    phone: Number,
    isDeleted: Boolean,
  },
  {
    timestamps: true,
  }
);

const AddressModel = mongoose.model("Address", AddressSchema);
export default AddressModel;
