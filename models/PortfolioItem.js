import mongoose from "mongoose";

const PortfolioItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  demoLink: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    required: true,
  },
},{timestamps: true});

const PortfolioItem = mongoose.models.PortfolioItem || mongoose.model("PortfolioItem", PortfolioItemSchema);

export default PortfolioItem;
