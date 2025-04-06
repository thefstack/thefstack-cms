import { Inter } from "next/font/google";
import { Providers } from "./providers";
import App from "./App";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TheFStack | Full-Stack Web Developer & Developer from India",
  description:
    "Explore TheFStack - a tech blog and portfolio by Raj, a passionate full-stack web developer specializing in Next.js, React, Node.js & AI integration. Currently interning at Ivy and building modern, responsive web apps.",
  keywords:
    "thefstack, web developer India, Next.js developer, React developer, Node.js backend, full-stack web development, thefstack blog, Raj thefstack, thefstack portfolio, tech blog, internship projects, Ivy intern, AI integration, web apps India",
  author: "Raj",
  metadataBase: new URL("https://www.thefstack.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TheFStack | Raj - Full-Stack Developer & Intern from India",
    description:
      "Raj is a full-stack web developer and intern at Ivy. TheFStack showcases projects, blog posts, and insights on modern web development with React, Node.js, and AI tools.",
    url: "https://www.thefstack.com",
    siteName: "TheFStack - Web Development Blog & Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheFStack | Raj - Full-Stack Developer & Web Intern",
    description:
      "Discover projects, tutorials, and insights from Raj, a web developer and intern at Ivy, building full-stack applications with modern tech like React, Node.js, and Next.js.",
    creator: "@TheFStack",
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
        {/* Favicons */}
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon/favicon.png" />

        {/* Schema: Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Raj",
              jobTitle: "Full-Stack Web Developer & Intern",
              url: "https://www.thefstack.com",
              sameAs: [
                "https://linkedin.com/in/thefstack",
                "https://github.com/thefstack",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              description:
                "Raj is a full-stack web developer currently interning at Ivy. Passionate about building responsive websites and modern web apps using React, Node.js, Next.js, and AI tools.",
            }),
          }}
        />

        {/* Schema: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TheFStack",
              url: "https://www.thefstack.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.thefstack.com/",
              },
            }),
          }}
        />

        {/* Schema: LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "TheFStack",
              url: "https://www.thefstack.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ramlal Mukherjee Lane",
                addressLocality: "Howrah",
                addressRegion: "West Bengal",
                postalCode: "711106",
                addressCountry: "IN",
              },
              telephone: "+91-9142892678",
              openingHours: "Mo-Fr 09:00-18:00",
              description:
                "Raj is a full-stack developer offering modern web solutions and blogging about web development, AI integration, and career growth.",
            }),
          }}
        />

        {/* Schema: Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Web Development",
              provider: {
                "@type": "LocalBusiness",
                name: "TheFStack",
                url: "https://www.thefstack.com",
              },
              areaServed: {
                "@type": "Place",
                name: "India",
              },
              description:
                "Providing high-quality, modern web development using React, Node.js, Next.js, and AI integration.",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <App>{children}</App>
          <SpeedInsights />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
