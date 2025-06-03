import { Inter } from "next/font/google";
import { Providers } from "./providers";
import App from "./App";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TheFStack | Full-Time Developer @ Ivy & Freelance Web Expert from India",
  description:
    "Raj – full-time developer at Ivy and an independent freelancer at TheFStack – offers cost-effective full-stack development, SEO, and AI integration using Next.js, React, and Node.js. Based in India. View portfolio & blog.",
  keywords:
    "thefstack, freelance web developer, full-stack developer India, React developer, Next.js developer, Node.js expert, web development India, affordable web developer, developer portfolio, thefstack raj, Raj developer ivy, raj thefstack, SEO developer India, AI website developer",
  author: "Raj",
  metadataBase: new URL("https://www.thefstack.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Full-Time Developer @ Ivy | Freelance Web Expert India – TheFStack",
    description:
      "Full-time developer at Ivy and an independent freelancer through TheFStack. Get premium full-stack development with SEO and AI features using React, Next.js, Node.js. View Raj’s portfolio & blog now.",
    url: "https://www.thefstack.com",
    siteName: "TheFStack – Full-Stack Web Development Services",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Full-Time Developer @ Ivy | Independent Freelance Web Developer – TheFStack",
    description:
      "Raj offers professional web development & SEO services via TheFStack. Full-time engineer at Ivy. Expert in React, Next.js, Node.js & AI integration.",
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
  additionalPages: {
    blog: {
      title: "Blog – TheFStack",
      description: "Latest articles on web development, SEO, and technology trends by Raj at TheFStack.",
      url: "https://www.thefstack.com/blog",
    },
    contact: {
      title: "Contact – TheFStack",
      description: "Get in touch with Raj for freelance projects, web consultations, and collaboration opportunities.",
      url: "https://www.thefstack.com/contact",
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
        {/* Favicon */}
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon/favicon.png" />

        {/* JSON-LD: Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Raj",
              "jobTitle": "Full-Time Developer & Independent Web Developer",
              "url": "https://www.thefstack.com",
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "Ivy"
                },
                {
                  "@type": "Organization",
                  "name": "TheFStack"
                }
              ],
              "sameAs": [
                "https://linkedin.com/in/thefstack",
                "https://github.com/thefstack"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "description":
                "Raj is a full-time software developer at Ivy and an independent freelancer at TheFStack. He specializes in React, Next.js, Node.js, SEO and AI-powered web development."
            }),
          }}
        />

        {/* JSON-LD: Website */}
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
                "target": "https://www.thefstack.com/"
              }
            }),
          }}
        />

        {/* JSON-LD: LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "TheFStack",
              "url": "https://www.thefstack.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ramlal mukharjee lane",
                "addressLocality": "Howrah",
                "addressRegion": "West Bengal",
                "postalCode": "711106",
                "addressCountry": "IN"
              },
              "telephone": "+91-9142892678",
              "openingHours": "Mo-Fr 09:00-18:00",
              "description":
                "TheFStack provides affordable full-stack web development, API integrations, and SEO services by Raj, an independent developer based in India."
            }),
          }}
        />

        {/* JSON-LD: Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Web Development & SEO",
              "provider": {
                "@type": "LocalBusiness",
                "name": "TheFStack",
                "url": "https://www.thefstack.com"
              },
              "areaServed": {
                "@type": "Place",
                "name": "India"
              },
              "description":
                "Affordable web development and SEO services from India by Raj, a full-time developer at Ivy and independent freelancer via TheFStack. Specializes in React, Next.js, Node.js, and AI integration."
            }),
          }}
        />
      </head>

      <body className={inter.className}>
        <Providers>
          <App>{children}</App>
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
