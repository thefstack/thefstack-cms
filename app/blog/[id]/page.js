"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { FaList } from "react-icons/fa";
import styles from "@/styles/BlogDetail.module.css";
import Loading from "@/components/Loading";

export default function BlogDetailPage() {
  const [blog, setBlog] = useState(null);
  const [toc, setToc] = useState([]);
  const [showToc, setShowToc] = useState(false);
  const { id } = useParams();
  const tocRef = useRef(null);

  useEffect(() => {
    if (id) {
      async function fetchBlog() {
        try {
          const response = await fetch(`/api/blogs/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setBlog(data);
          generateToc(data.content);
        } catch (error) {
          console.error("Failed to fetch blog:", error);
        }
      }
      fetchBlog();
    }
  }, [id]);

  const generateToc = (content) => {
    const lines = content.split('\n');
    const toc = lines
      .filter(line => line.startsWith('#'))
      .map(line => {
        const level = line.match(/^#+/)[0].length;
        const text = line.replace(/^#+\s*/, '');
        const id = text.toLowerCase().replace(/\s+/g, '-');
        return { level, text, id };
      });
    setToc(toc);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setShowToc(false); // Hide the table of contents after clicking a link
    }
  };

  const handleClickOutside = (event) => {
    if (tocRef.current && !tocRef.current.contains(event.target)) {
      setShowToc(false);
    }
  };

  useEffect(() => {
    if (showToc) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showToc]);

  if (!blog) {
    return <div className='w-screen h-screen'><Loading size="medium" /></div>
  }

  return (
    <div className={styles.blogDetailContainer}>
      <div ref={tocRef} className={`${styles.toc} ${showToc ? styles.showToc : ''}`}>
        <h2>Table of Contents</h2>
        <ul>
          {toc.map((item, index) => (
            <li key={index} style={{ marginLeft: (item.level - 1) * 20 }}>
              <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.blogDetail}>
        <h1>{blog.title}</h1>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 id={props.children.toLowerCase().replace(/\s+/g, '-')}>{props.children}</h1>,
              h2: ({ node, ...props }) => <h2 id={props.children.toLowerCase().replace(/\s+/g, '-')}>{props.children}</h2>,
              h3: ({ node, ...props }) => <h3 id={props.children.toLowerCase().replace(/\s+/g, '-')}>{props.children}</h3>,
            }}
          >
            {String(blog.content)}
          </ReactMarkdown>
      </div>
      {!showToc && (
        <button className={styles.tocToggle} onClick={() => setShowToc(true)}>
          <FaList />
        </button>
      )}
    </div>
  );
}
