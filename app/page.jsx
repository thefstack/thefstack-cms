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
    // Prevent scroll while loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

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
        }, 1000);
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      if (!loading) {
        const scrollToSectionId = sessionStorage.getItem("scrollToSection");
        if (scrollToSectionId) {
          const el = document.getElementById(scrollToSectionId);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth" });
              sessionStorage.removeItem("scrollToSection");
            }, 100); // slight delay
          }
        }
      }
    }, [loading]);

  return (
    <>
      {loading && (
        <div
          className={`fixed inset-0 w-screen h-screen z-[1000] bg-white flex justify-center items-center transition-all duration-1000 ease-in-out transform ${
    fadeOut ? "-translate-y-full" : "translate-y-0"
  }`}
        >
          <Loader />
        </div>
      )}


          <div className={`flex flex-col gap-16 transition-all duration-800 ${styles.container}`}>
          <div id="home" className="scroll-mt-20"><Hero /></div>
            <About />
            <div id="experience" className="scroll-mt-20"><Experience /></div>
            <div id="portfolio" className="scroll-mt-20"><Portfolio projects={portfolio} /></div>
            <div id="contact" className="scroll-mt-20 py-24"><ContactForm /></div>
          </div>

    </>
  );
}
