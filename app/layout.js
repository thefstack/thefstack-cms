import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  // --- PRIMARY TITLE CHANGE ---
  title: "TheFStack | Raj Sharma - Full Stack Developer from India", // Changed
  description:
    "Raj Sharma – offers full-stack web development, SEO, and AI integration using Next.js, React, and Node.js. Based in India. View portfolio & blog.", // Adjusted description
  keywords:
    "thefstack, web developer, full-stack developer India, React developer, Next.js developer, Node.js expert, web development India, developer portfolio, thefstack raj, Raj developer, raj thefstack, SEO developer India, AI website developer, Raj Sharma", // Adjusted keywords
  author: "Raj Sharma",
  metadataBase: new URL("https://www.thefstack.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    // --- OPEN GRAPH TITLE CHANGE ---
    title: "TheFStack | Full Stack Web Development & AI Solutions – Raj Sharma", // Changed
    description:
      "Get premium full-stack development with SEO and AI features using React, Next.js, Node.js. View Raj Sharma’s portfolio & blog now.", // Adjusted description
    url: "https://www.thefstack.com",
    siteName: "TheFStack – Full-Stack Web Development Services",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    // --- TWITTER TITLE CHANGE ---
    title:
      "Full Stack Web Developer & AI Expert from India – TheFStack", // Changed
    description:
      "Raj Sharma offers professional web development & SEO services via TheFStack. Expert in React, Next.js, Node.js & AI integration.", // Adjusted description
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

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* Favicon - Crucial for brand recognition and user experience */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        {/* JSON-LD Structured Data - Highly Recommended for SEO */}

        {/* JSON-LD: Person Schema - Describes Raj Sharma as a person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Raj Sharma",
              // --- JOB TITLE CHANGE ---
              "jobTitle": "Full Stack Developer & AI Solutions Specialist", // Changed
              "url": "https://www.thefstack.com",
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "TheFStack" // Removed Ivy here, focusing on your own brand
                }
              ],
              "sameAs": [
                "https://linkedin.com/in/thefstack",
                "https://github.com/thefstack",
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              // --- PERSON DESCRIPTION CHANGE ---
              "description":
                "Raj Sharma is a Full Stack Developer from India, specializing in React, Next.js, Node.js, SEO, and AI-powered web development.", // Changed
            }),
          }}
        />

        {/* JSON-LD: WebSite Schema - Describes your website as a whole */}
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
                "target": "https://www.thefstack.com/{search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />

        {/* JSON-LD: LocalBusiness Schema - If TheFStack operates as a business locally */}
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
              // --- LOCALBUSINESS DESCRIPTION CHANGE ---
              "description":
                "TheFStack provides expert full-stack web development, AI integration, and SEO services by Raj Sharma, a Full Stack Developer from India. Specializes in React, Next.js, Node.js, and AI integration.", // Changed
            }),
          }}
        />

        {/* JSON-LD: Service Schema - Describes the services you offer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Full-Stack Web Development, AI Integration, SEO",
              "provider": {
                "@type": "LocalBusiness",
                "name": "TheFStack",
                "url": "https://www.thefstack.com"
              },
              "areaServed": {
                "@type": "Place",
                "name": "India"
              },
              // --- SERVICE DESCRIPTION CHANGE ---
              "description":
                "Expert web development and SEO services from India by Raj Sharma, a Full Stack Developer via TheFStack. Specializes in React, Next.js, Node.js, and AI integration.", // Changed
            }),
          }}
        />
      </head>

      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}