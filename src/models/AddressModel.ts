import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  venue: String,
  place: String,
  landmark: String,
  city: String,
  district: String,
  State: String,
  pincode: Number,
});
