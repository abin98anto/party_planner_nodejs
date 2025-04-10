import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
  name: String,
  isActive: String,
});
