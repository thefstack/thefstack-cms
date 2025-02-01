import { Inter } from "next/font/google"
import { Providers } from "./providers"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import App from "./App"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Freelance Portfolio",
  description: "Professional freelance services and portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <App>{children}</App>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'