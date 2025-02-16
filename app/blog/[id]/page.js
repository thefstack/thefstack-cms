import { generateMetadata as generatePageMetadata } from "@/utils/metadata";
import BlogDetailClient from "./BlogDetailClient";
import Head from "next/head";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import Link from "next/link";

async function fetchBlog(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.thefstack.com";
    const response = await fetch(`${baseUrl}/api/blogs/${id}`);

    if (!response.ok) {
      console.error(`Blog not found: ${id}`);
      return null; // Return null instead of throwing an error
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Invalid response format.");
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}


export async function generateMetadata({ params }) {
  const { id } = params;
  const blog = await fetchBlog(id);

  if (!blog) {
    console.log("hello")
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
      keywords: "404, blog not found, error",
      thumbnail: "/default-thumbnail.jpg",
      url: `https://www.thefstack.com/blog/${id}`,
    };
  }

  const toc = [];
  const tree = await remark().use(remarkGfm).parse(blog.content);
  visit(tree, "heading", (node) => {
    const level = node.depth;
    const text = node.children.map((child) => child.value).join("");
    const id = text.toLowerCase().replace(/\s+/g, "-");
    toc.push({ level, text, id });
  });

  return await generatePageMetadata({
    id,
    title: blog.title,
    description: `${blog.content.slice(0, 300)}...`,
    keywords: blog.key,
    thumbnail: blog.thumbnail,
    url: `https://www.thefstack.com/blog/${id}`,
  });
}


export default async function BlogDetailPage({ params }) {
  const { id } = params;
  const blog = await fetchBlog(id);
  if (!blog) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>404 - Blog Not Found</h1>
        <p>The blog you are looking for does not exist.</p>
        <Link style={{ color: "blue", textDecoration: "underline" }} href="/blog">
          Go back to Blogs
        </Link>
      </div>
    );
  }
  const toc = [];
  const tree = await remark().use(remarkGfm).parse(blog.content);
  visit(tree, "heading", (node) => {
    const level = node.depth;
    const text = node.children.map((child) => child.value).join("");
    const id = text.toLowerCase().replace(/\s+/g, "-");
    toc.push({ level, text, id });
  });

  return (
    <>
      <BlogDetailClient blog={blog} toc={toc} />
    </>
  );
}
