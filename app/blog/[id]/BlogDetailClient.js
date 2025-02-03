"use client";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { FaList } from "react-icons/fa";
import styles from "@/styles/BlogDetail.module.css";
import Loading from "@/components/Loading";
import rehypeRaw from "rehype-raw";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import Image from "next/image";

export default function BlogDetailClient({ id }) {
  const [blog, setBlog] = useState(null);
  const [toc, setToc] = useState([]);
  const [showToc, setShowToc] = useState(false);
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

  const generateToc = async (content) => {
    const toc = [];
  
    const tree = await remark().use(remarkGfm).parse(content);
    visit(tree, "heading", (node) => {
      const level = node.depth; // Get heading level (h1, h2, h3, etc.)
      const text = node.children.map((child) => child.value).join(""); // Extract text
      const id = text.toLowerCase().replace(/\s+/g, "-"); // Generate ID
  
      toc.push({ level, text, id });
    });
  
    setToc(toc);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - (window.innerHeight / 2) + (element.clientHeight / 2);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
            <li key={index} style={{ marginLeft: (item.level - 1) * 5 }}>
              <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.blogDetail}>
        <Image src={blog.thumbnail} alt={blog.title} width={400} height={400} style={{}} />
        <div>
          <h1>{blog.title}</h1>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]} // Enable raw HTML parsing
            components={{
              h1: ({ node, ...props }) => <h1 id={props.children.toLowerCase().replace(/\s+/g, '-')}>{props.children}</h1>,
              h2: ({ node, ...props }) => <h2 id={props.children.toLowerCase().replace(/\s+/g, '-')}>{props.children}</h2>,
              h3: ({ node, ...props }) => <h3 id={props.children.toLowerCase().replace(/\s+/g, '-')}>{props.children}</h3>,
              h4: ({ node, ...props }) => <h4 id={props.children.toLowerCase().replace(/\s+/g, '-')}>{props.children}</h4>,
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  <pre>
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {String(blog.content)}
          </ReactMarkdown>
        </div>
      </div>
      {!showToc && (
        <button className={styles.tocToggle} onClick={() => setShowToc(true)}>
          <FaList />
        </button>
      )}
    </div>
  );
}
