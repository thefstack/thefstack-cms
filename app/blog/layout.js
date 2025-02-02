"use client";
import { useRouter, useSearchParams } from "next/navigation";
import BlogHeader from "@/components/BlogHeader";


export default function BlogLayout({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategorySelect = (category, subcategory) => {
    const query = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    router.push(`/blog?${new URLSearchParams(query).toString()}`);
  };

  return (
    <div className="overflow-x-hidden">
    <div className=" fixed z-50">
      <BlogHeader onCategorySelect={handleCategorySelect} />
      </div>
      <div className="w-screen overflow-hidden pt-[var(--blog-header-padding-top)]">{children}</div>
    </div>
  );
}
