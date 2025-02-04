import { generateMetadata as generatePageMetadata } from "@/utils/metadata";
import BlogDetailClient from "./BlogDetailClient";
import Head from "next/head";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

async function fetchBlog(id) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.thefstack.com";
  const response = await fetch(`${baseUrl}/api/blogs/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Received non-JSON response");
  }
  return await response.json();
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const blog = await fetchBlog(id);

  const toc = [];
  const tree = await remark().use(remarkGfm).parse(blog.content);
  visit(tree, "heading", (node) => {
    const level = node.depth;
    const text = node.children.map((child) => child.value).join("");
    const id = text.toLowerCase().replace(/\s+/g, "-");
    toc.push({ level, text, id });
  });

  const metadata = await generatePageMetadata({
    id,
    title: blog.title,
    description: blog.key,
    keywords: toc,
    thumbnail: blog.thumbnail,
    url: `https://www.thefstack.com/blog/${id}`,
  });

  return metadata;
}

export default async function BlogDetailPage({ params }) {
  const { id } = params;
  const blog = await fetchBlog(id);

  const toc = [];
  const tree = await remark().use(remarkGfm).parse(blog.content);
  visit(tree, "heading", (node) => {
    const level = node.depth;
    const text = node.children.map((child) => child.value).join("");
    const id = text.toLowerCase().replace(/\s+/g, "-");
    toc.push({ level, text, id });
  });

  const metadata = await generatePageMetadata({
    id,
    title: blog.title,
    description: blog.key,
    content: blog.content,
    thumbnail: blog.thumbnail,
    url: `https://www.thefstack.com/blog/${id}`,
  });

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0]?.url} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
      </Head>
      <BlogDetailClient blog={blog} toc={toc} />
    </>
  );
}
