import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "TheFStack | Raj Sharma - Full-Time Developer @ Ivy & Web Expert from India",
  description:
    "Raj Sharma – full-time developer at Ivy through TheFStack – offers full-stack web development, SEO, and AI integration using Next.js, React, and Node.js. Based in India. View portfolio & blog.",
  keywords:
    "thefstack, web developer, full-stack developer India, React developer, Next.js developer, Node.js expert, web development India, developer portfolio, thefstack raj, Raj developer ivy, raj thefstack, SEO developer India, AI website developer, Raj Sharma",
  author: "Raj Sharma", // Consistent with your current metadata
  metadataBase: new URL("https://www.thefstack.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Full-Time Developer @ Ivy | Web Expert India – TheFStack",
    description:
      "Full-time developer at Ivy through TheFStack. Get premium full-stack development with SEO and AI features using React, Next.js, Node.js. View Raj Sharma’s portfolio & blog now.",
    url: "https://www.thefstack.com",
    siteName: "TheFStack – Full-Stack Web Development Services",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Full-Time Developer @ Ivy | Web Developer – TheFStack",
    description:
      "Raj Sharma offers professional web development & SEO services via TheFStack. Full-time engineer at Ivy. Expert in React, Next.js, Node.js & AI integration.",
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

        {/* JSON-LD Structured Data - Highly Recommended for SEO
            This helps search engines understand the content on your page contextually,
            potentially leading to rich snippets in search results. */}

        {/* JSON-LD: Person Schema - Describes Raj Sharma as a person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Raj Sharma", // Consistent with your current metadata
              "jobTitle": "Full-Time Developer @ Ivy & Web Expert", // Adapted to current metadata
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
                "https://github.com/thefstack",
                // Add other social profiles like Twitter if applicable
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "description":
                "Raj Sharma is a full-time software developer at Ivy and a web expert, specializing in React, Next.js, Node.js, SEO, and AI-powered web development." // Adapted description
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
                "target": "https://www.thefstack.com/{search_term_string}", // Best practice for search actions
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
              "openingHours": "Mo-Fr 09:00-18:00", // Adjust as per your business hours
              "description":
                "TheFStack provides expert full-stack web development, AI integration, and SEO services by Raj Sharma, a full-time developer at Ivy and independent expert based in India." // Adapted description
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
              "serviceType": "Full-Stack Web Development, AI Integration, SEO", // More specific service type
              "provider": {
                "@type": "LocalBusiness", // or Person if directly by you as a person
                "name": "TheFStack",
                "url": "https://www.thefstack.com"
              },
              "areaServed": {
                "@type": "Place",
                "name": "India" // Can also specify global or other regions if applicable
              },
              "description":
                "Expert web development and SEO services from India by Raj Sharma, a full-time developer at Ivy and independent web expert via TheFStack. Specializes in React, Next.js, Node.js, and AI integration." // Adapted description
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
      </body>
    </html>
  );
}