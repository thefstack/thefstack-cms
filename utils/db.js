import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "thefstack",
      });
    }
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection failed");
  }
}
