import { connectToDatabase } from "@/utils/db";
import { middleware } from "@/utils/middleware";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Establish a connection to the database
    await connectToDatabase();
    // Fetch blogs from the database
    const blogs = await Blog.find({});
    // console.log("api:",blogs)
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req) {
  // Apply middleware to the POST method
  const middlewareResponse = await middleware(req, NextResponse, async () => {
    // Add a new blog to the database
    const newBlog = await req.json();
    try {
      await connectToDatabase();
      const blog = new Blog(newBlog);
      const savedBlog = await blog.save();
      return NextResponse.json(savedBlog, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to add blog" }, { status: 500 });
    }
  });

  if (middlewareResponse) {
    return middlewareResponse;
  }
}
