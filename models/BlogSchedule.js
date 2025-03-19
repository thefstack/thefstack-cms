import mongoose from "mongoose"

const BlogScheduleSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    subtopic: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    postTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    error: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
)

export default mongoose.models.BlogSchedule || mongoose.model("BlogSchedule", BlogScheduleSchema)
