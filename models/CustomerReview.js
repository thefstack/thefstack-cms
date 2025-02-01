import { time } from "console";
import mongoose from "mongoose";

const CustomerReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false, // Changed to optional
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
},{timeStamps: true});

export default mongoose.models.CustomerReview || mongoose.model("CustomerReview", CustomerReviewSchema);
