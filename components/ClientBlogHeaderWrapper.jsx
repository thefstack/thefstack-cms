// components/ClientBlogHeaderWrapper.tsx
"use client";
import { useRouter } from "next/navigation";
import BlogHeader from "./BlogHeader";

export default function ClientBlogHeaderWrapper() {
  const router = useRouter();

  const handleCategorySelect = (category, subcategory) => {
    const query = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;

    router.push(`/blog?${new URLSearchParams(query).toString()}`);
  };

  return <BlogHeader onCategorySelect={handleCategorySelect} />;
}
