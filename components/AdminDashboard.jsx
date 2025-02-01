"use client";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FiFolder, FiUsers, FiSettings, FiBook } from "react-icons/fi"
import PortfolioManager from "./PortfolioManager"
import ServiceManager from "./ServiceManager"
import ClientManager from "./ClientManager"
import BlogManager from "./BlogManager"
import styles from "@/styles/AdminDashboard.module.css"
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("portfolio")
  const { data: session, status } = useSession(); // ✅ Get session from NextAuth
  const router = useRouter();

  // If session is still loading, show nothing
  if (status === "loading") return null;

  // If no session, redirect to sign-in
  if (!session) {
    router.push("/signin");
    return null;
  }
  return (
    <div className={styles.dashboard}>
      <nav className={styles.nav}>
        <button
          className={`${styles.navButton} ${activeTab === "portfolio" ? styles.active : ""}`}
          onClick={() => setActiveTab("portfolio")}
        >
          <FiFolder /> Portfolio
        </button>
        <button
          className={`${styles.navButton} ${activeTab === "services" ? styles.active : ""}`}
          onClick={() => setActiveTab("services")}
        >
          <FiSettings /> Services
        </button>
        <button
          className={`${styles.navButton} ${activeTab === "clients" ? styles.active : ""}`}
          onClick={() => setActiveTab("clients")}
        >
          <FiUsers /> Clients
        </button>
        <button
          className={`${styles.navButton} ${activeTab === "blogs" ? styles.active : ""}`}
          onClick={() => setActiveTab("blogs")}
        >
          <FiBook /> Blogs
        </button>
      </nav>
      <div className={styles.content}>
        {activeTab === "portfolio" && <PortfolioManager />}
        {activeTab === "services" && <ServiceManager />}
        {activeTab === "clients" && <ClientManager />}
        {activeTab === "blogs" && <BlogManager />}
      </div>
    </div>
  )
}

