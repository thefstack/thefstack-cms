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
    const text = node.children.map((child) => child.value).join("");
    toc.push(text);
  });

  const tocKeywords = toc.join(", ");
  const keywords = `${tocKeywords}`;

  return {
    title: `${blog.title} | TheFStack`,
    description: blog.key,
    keywords: keywords,
    openGraph: {
      title: blog.title,
      description: blog.key,
      url: `https://www.thefstack.com/blog/${id}`,
      type: "article",
      images: [
        {
          url: blog.thumbnail,
          width: 800,
          height: 600,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.key,
      image: blog.thumbnail,
    },
  };
}
