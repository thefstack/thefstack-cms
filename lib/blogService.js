import { connectToDatabase } from "@/utils/db";
import Blog from "@/models/Blog";
export async function getAllBlogPosts() {
  try {
    await connectToDatabase();
    return await Blog.find({}).select("slug updatedAt").lean();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
