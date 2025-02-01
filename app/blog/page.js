"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "@/styles/BlogPage.module.css";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [sortedBlogs, setSortedBlogs] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(Array.isArray(data) ? data : []);
        setSortedBlogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    sortBlogs(category, subcategory);
  }, [searchParams]);

  const sortBlogs = (category, subcategory) => {
    let sorted = [...blogs];
    if (category) {
      sorted = sorted.sort((a, b) => {
        if (a.category === category && b.category !== category) return -1;
        if (a.category !== category && b.category === category) return 1;
        return 0;
      });
    }
    if (subcategory) {
      sorted = sorted.sort((a, b) => {
        if (a.subcategory === subcategory && b.subcategory !== subcategory)
          return -1;
        if (a.subcategory !== subcategory && b.subcategory === subcategory)
          return 1;
        return 0;
      });
    }
    setSortedBlogs(sorted);
  };

  return (
    <div style={{ padding: "1rem 2rem" }}>
      <ul className={styles.blogList}>
        {Array.isArray(sortedBlogs) &&
          sortedBlogs.map((blog) => (
            <li key={blog.id} className={styles.blogItem}>
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
    </div>
  );
}
