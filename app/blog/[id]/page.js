import { generateMetadata } from "./metadata";
import BlogDetailClient from "./BlogDetailClient";

export { generateMetadata };

export default function BlogDetailPage({ params }) {
  const { id } = params;

  return <BlogDetailClient id={id} />;
}
