import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkToc from "remark-toc";
import styles from "@/styles/BlogPage.module.css";

async function fetchBlogs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  return (
    <div style={{ padding: "1rem 2rem" }}>
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
                <ReactMarkdown
                  remarkPlugins={[remarkToc]}
                >{`${blog.content.substring(
                  0,
                  contentLength
                )}...`}</ReactMarkdown>
                <Link href={`/blog/${blog._id}`} className={styles.readMore}>
                  Read More
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
