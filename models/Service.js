import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  logo: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  customerReviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerReview",
  }],
},{timestamps: true});

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);