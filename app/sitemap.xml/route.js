import { getAllBlogPosts } from "@/lib/blogService";

export async function GET() {
  const blogs = await getAllBlogPosts();

  // Static pages to include
  const staticPages = [
    { loc: "https://www.thefstack.com/contact", priority: 0.7 },
    { loc: "https://www.thefstack.com/signin", priority: 0.2 },
    { loc: "https://www.thefstack.com/terms", priority: 0.2 },
    { loc: "https://www.thefstack.com/privacy-policy", priority: 0.2 },
    { loc: "https://www.thefstack.com/blog", priority: 0.6 },
  ];

  const staticUrls = staticPages
    .map(
      (page) => `
      <url>
        <loc>${page.loc}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `
    )
    .join("");

  const blogUrls = blogs
    .map((post) => {
      const lastModDate = post.updatedAt || post.createdAt;
      const lastModISO = lastModDate
        ? new Date(lastModDate).toISOString()
        : new Date().toISOString(); // Fallback to current date

      return `
        <url>
          <loc>https://www.thefstack.com/blog/${post.slug}</loc>
          <lastmod>${lastModISO}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
    })
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.thefstack.com/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      ${staticUrls}
      ${blogUrls}
    </urlset>`,
    {
      headers: { "Content-Type": "application/xml" },
    }
  );
}
