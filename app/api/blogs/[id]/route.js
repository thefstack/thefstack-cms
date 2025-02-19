import { connectToDatabase } from "@/utils/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  console.log("id in api route", id)
  try {
    // Establish a connection to the database
    await connectToDatabase();
    // Fetch the blog from the database
    const blog = await Blog.findOne({slug:id});
    console.log(blog)
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    // Establish a connection to the database
    await connectToDatabase();
    // Delete the blog from the database
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
