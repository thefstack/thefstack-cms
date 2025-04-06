// app/blog/layout.tsx (Server component)

import ClientBlogHeaderWrapper from "@/components/ClientBlogHeaderWrapper"

export default function BlogLayout({ children }) {
  return (
    <div className="overflow-x-hidden">
      <div className="fixed z-50">
      <ClientBlogHeaderWrapper />
      </div>
      <div className="w-screen overflow-hidden pt-[var(--blog-header-padding-top)]">
        {children}
      </div>
    </div>
  );
}
