// components/Header.js
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react"; // Import useSession and signOut
import { useState } from "react";
import { FiHome, FiUser, FiMenu, FiX } from "react-icons/fi";
import styles from "@/styles/Header.module.css";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession(); // Get the session data
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut({
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001", // Default to localhost:3001
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.svg" alt="Hero Image" width={100} height={40} className={styles.mainLogo} priority/>
        </Link>
        <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
          <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            <FiHome /> Home
          </Link>
          <Link href="/blog" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            <FiHome /> Blogs
          </Link>
          {session && <Link href="/admin" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            <FiHome /> Admin
          </Link>}
          {/* Conditionally render the Sign In/Log Out link */}
          {session ? (
            <button
              className={styles.navLink}
              onClick={handleSignOut} // Call the handleSignOut function when clicked
            >
              <FiUser /> Log Out
            </button>
          ) : (
            <Link
              href="/signin"
              className={styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              <FiUser /> Developer Sign-In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
