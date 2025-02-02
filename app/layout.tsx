import { Inter } from "next/font/google";
import { Providers } from "./providers";
import App from "./App";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TheFStack | Top Freelancer in India | Low Cost Web Development & SEO Services",
  description:
    "Hire India's #1 affordable full-stack developer specializing in Next.js, React, Node.js & AI integration. 60% cost-effective web solutions. View portfolio, read the blog, and get a free consultation today!",
  keywords:
    "freelancer, freelance web developer India, freelance India, low cost developer, web development, SEO services, digital marketing, React.js developer, Node.js expert, Next.js developer, full-stack development, affordable freelancer, TheFStack, hire freelancer, India freelancer, responsive design, API development, OpenAI integration, blog, portfolio, professional web developer, AI integration, full-stack developer India, low cost SEO services",
  author: "Raj",
  metadataBase: new URL("https://www.thefstack.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Full-Stack Developer India | React & Node.js Specialist - TheFStack",
    description:
      "Discover premium web development, professional web development services with AI integration & modern animations, and blog insights at TheFStack. Our expert freelancer offers top-notch full-stack development, Next.js solutions, responsive design, and cost-effective services in India.",
    url: "https://www.thefstack.com",
    siteName: "TheFStack - Full-Stack Web Development Services",
    // images: [
    //   {
    //     url: "https://www.thefstack.com/og-thefstack-freelancer.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "TheFStack Freelance Services - Premium Quality at Indian Rates",
    //   },
    // ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "India's Top Affordable Freelancer | TheFStack Web Development, SEO & Blog",
    description:
      "Hire an expert freelancer offering comprehensive web development, expert in Next.js, Node.js & AI integration, and cutting-edge blog insights. Affordable, high-quality, and professional services with TheFStack. 24/7 support & competitive pricing.",
    creator: "@TheFStack",
    // images: ["https://www.thefstack.com/twitter-thefstack-card.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Raj",
              "jobTitle": "Professional Freelance Developer",
              "url": "https://www.thefstack.com",
              "sameAs": [
                "https://linkedin.com/in/thefstack",
                "https://github.com/thefstack",
                // "https://twitter.com/TheFStack"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              // "image": "https://www.thefstack.com/logo-thefstack-schema.jpg",
              "description":
                "India-based freelance developer offering high-quality web development, SEO, digital marketing, API development, and blog content creation at competitive rates through TheFStack."
            }),
          }}
        />
        {/* Structured Data: Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TheFStack",
              "url": "https://www.thefstack.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.thefstack.com/",
              }
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <App>{children}</App>
        </Providers>
      </body>
    </html>
  );
}
