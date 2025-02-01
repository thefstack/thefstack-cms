import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "@/styles/BlogManager.module.css";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Fetch blogs from the API
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    }
    fetchBlogs();
  }, []);

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setShowViewPopup(true);
  };

  const handleDelete = async (id) => {
    // Delete blog from the database
    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${session.authToken}`, // Use the token from the session
      },
    });
    if (response.ok) {
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      setShowViewPopup(false);
    } else {
      console.error("Failed to delete blog");
    }
  };

  const handleAddBlog = () => {
    window.open('/add-blog', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.blogManager}>
      <h1>Blog Manager</h1>
      <button className={styles.addButton} onClick={handleAddBlog}>Add Blog</button>
      <ul className={styles.blogList}>
        {Array.isArray(blogs) && blogs.map((blog) => (
          <li key={blog.id} className={styles.blogItem} onClick={() => handleView(blog)}>
            {blog.thumbnail && (
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className={styles.thumbnail}
                />
              )}
              <h3>{blog.title}</h3>
              <ReactMarkdown>{`${blog.content.substring(
                0,
                100
              )}...`}</ReactMarkdown>
              <Link href={`/blog/${blog._id}`} className={styles.readMore}>
                Read More
              </Link>
          </li>
        ))}
      </ul>

      {showViewPopup && selectedBlog && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.popupContentData}>
              {selectedBlog.thumbnail && <img src={selectedBlog.thumbnail} alt={selectedBlog.title} className={styles.thumbnail} />}
              <h3>{selectedBlog.title}</h3>
              <ReactMarkdown>{selectedBlog.content}</ReactMarkdown>
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.button} onClick={() => setShowViewPopup(false)}>Close</button>
              <button type="button" className={styles.button} onClick={() => handleDelete(selectedBlog._id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
