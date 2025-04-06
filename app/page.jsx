"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import styles from "@/styles/Home.module.css";
import ContactForm from "@/components/ContactForm";
import Experience from "@/components/Experience";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://www.thefstack.com";

      const fetchData = async () => {
        try {
          const res = await fetch(`${baseUrl}/api/portfolio`);
          const data = await res.json();
          setPortfolio(data);
        } catch (error) {
          console.error("Error fetching portfolio:", error);
        }
  
        // Step 1: Start fade-out after 2 seconds
        setTimeout(() => {
          setFadeOut(true);
  
          // Step 2: Remove from DOM after fade-out animation (1s duration)
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }, 2000);
      };
  
      fetchData();
    }, []);

  return (
    <>
      {loading && (
        <div
          className={`fixed inset-0 w-screen h-screen z-[1000] bg-white flex justify-center items-center transition-all duration-1000 ease-in-out transform ${
    fadeOut ? "opacity-60 -translate-y-full" : "opacity-100 translate-y-0"
  }`}
        >
          <Loader />
        </div>
      )}

      <section className="flex flex-col h-screen justify-between">
        <div className="fixed w-full z-50">
          <Header />
        </div>
        <main className="flex-1 pt-[var(--main-header-padding-top)]">
          <div className={styles.container}>
            <Hero />
            <About />
            <Experience />
            <Portfolio projects={portfolio} />
            <ContactForm />
          </div>
        </main>
        <Footer />
      </section>
    </>
  );
}
