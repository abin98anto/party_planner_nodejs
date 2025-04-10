import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    venue: String,
    place: String,
    landmark: String,
    city: String,
    district: String,
    State: String,
    pincode: Number,
  },
  {
    timestamps: true,
  }
);

const AddressModel = mongoose.model("Address", AddressSchema);
export default AddressModel;
