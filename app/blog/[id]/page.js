import { generateMetadata as generatePageMetadata } from "@/utils/metadata";
import BlogDetailClient from "./BlogDetailClient";
import Head from "next/head";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

export async function generateMetadata({ params }) {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.thefstack.com";
  const response = await fetch(`${baseUrl}/api/blogs/${id}`);
  const blog = await response.json();

  const toc = [];
    
      const tree = await remark().use(remarkGfm).parse(blog.content);
      visit(tree, "heading", (node) => {
        const level = node.depth; // Get heading level (h1, h2, h3, etc.)
        const text = node.children.map((child) => child.value).join(""); // Extract text
        const id = text.toLowerCase().replace(/\s+/g, "-"); // Generate ID
    
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
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.thefstack.com";
  const response = await fetch(`${baseUrl}/api/blogs/${id}`);
  const blog = await response.json();

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
      <BlogDetailClient blog={blog} />
    </>
  );
}
