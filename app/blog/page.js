import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkToc from "remark-toc";
import styles from "@/styles/BlogPage.module.css";
import { generateMetadata as generatePageMetadata } from "@/utils/metadata";

async function fetchBlogs() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.thefstack.com";
  const response = await fetch(`${baseUrl}/api/blogs`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

// ✅ Correct metadata generation
export async function generateMetadata() {
  const blogs = await fetchBlogs();
  const allKeywords = blogs.map((blog) => blog.title.trim()).join(", ");

  return await generatePageMetadata({
    title: "Blogs",
    description:
      "Explore the latest blogs on web development, JavaScript, React, Next.js, and more at TheFStack. Stay updated with programming tutorials, best practices, and industry insights to enhance your coding skills.",
    keywords: allKeywords,
    url: "https://www.thefstack.com/blog",
    thumbnail: blogs[0]?.thumbnail || "", // fallback to first blog thumbnail
  });
}

// ✅ The page component itself
export default async function BlogPage() {
  const blogs = await fetchBlogs();

  return (
    <div style={{ padding: "1rem 2rem" }}>
    <h1>Latest Blog Posts</h1>
      <ul className={styles.blogList}>
        {Array.isArray(blogs) &&
          blogs.map((blog) => {
            const contentLength = blog.title.length > 20 ? 120 : 100;
            return (
              <li key={blog._id} className={styles.blogItem}>
                {blog.thumbnail && (
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className={styles.thumbnail}
                  />
                )}
                <h3>{blog.title}</h3>
                <ReactMarkdown remarkPlugins={[remarkToc]}>
                  {`${blog.content.substring(0, contentLength)}...`}
                </ReactMarkdown>
                <Link href={`/blog/${blog.slug}`} className={styles.readMore}>
                  Read More
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
