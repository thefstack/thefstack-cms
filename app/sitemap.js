import { getAllBlogPosts } from "@/lib/blogService";


export async function GET() {
  const blogs = await getAllBlogPosts();
  console.log(blogs)

  const blogUrls = blogs
    .map((post) => `
      <url>
        <loc>https://www.thefstack.com/blog/${post.slug}</loc>
        <lastmod>${new Date(post.updatedAt || post.createdAt).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `)
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
      ${blogUrls}
    </urlset>`,
    {
      headers: { "Content-Type": "application/xml" },
    }
  );
}
