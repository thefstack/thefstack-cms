"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import styles from "@/styles/AddBlog.module.css";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";
import dynamic from "next/dynamic";

const ToastEditor = dynamic(() => import("@/components/ToastEditor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function AddBlog() {
  const [newBlog, setNewBlog] = useState({ title: "", key: "", category: "", subcategory: "", content: "", thumbnail: "" });
  const [subcategories, setSubcategories] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  const editorRef = useRef(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (newBlog.category) {
      setSubcategories(categories[newBlog.category] || []);
    } else {
      setSubcategories([]);
    }
  }, [newBlog.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleEditorChange = (value) => {
    setNewBlog((prevBlog) => ({ ...prevBlog, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save new blog to the database
    console.log("newBlog", newBlog);
    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.authToken}`, // Use the token from the session
      },
      body: JSON.stringify(newBlog),
    });
    if (!response.ok) {
      console.error(`Failed to add blog: ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    router.push("/"); // Redirect to the blog manager page
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.addBlog}>
      <h1>Add Blog</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className={styles.input}
        />
        <input
          type="text"
          name="key"
          value={newBlog.key}
          onChange={handleChange}
          placeholder="Key"
          required
          className={styles.input}
        />
        <select
          name="category"
          value={newBlog.category}
          onChange={handleChange}
          required
          className={styles.input}
        >
          <option value="">Select Category</option>
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          name="subcategory"
          value={newBlog.subcategory}
          onChange={handleChange}
          required
          className={styles.input}
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="thumbnail"
          value={newBlog.thumbnail}
          onChange={handleChange}
          placeholder="Thumbnail URL"
          className={styles.input}
          required
        />
        <ToastEditor
          ref={editorRef}
          initialValue={newBlog.content || ""}
          onChange={handleEditorChange}
        />
        <button type="submit" className={styles.button}>Add Blog</button>
      </form>
    </div>
  );
}
