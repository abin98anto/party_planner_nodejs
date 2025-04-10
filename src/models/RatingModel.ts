import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
  userId: String,
  serviceId: String,
  rating: Number,
  comments: String,
});

const RatingModel = mongoose.model("Rating", RatingSchema);
export default RatingModel;