"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FiHome, FiUser, FiMenu, FiX } from "react-icons/fi";
import styles from "@/styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [manualScroll, setManualScroll] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001",
    });
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      setManualScroll(true);
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      sessionStorage.removeItem("scrollToSection"); // ✅ now removed after scroll
      setTimeout(() => setManualScroll(false), 1000);
    } else {
      requestAnimationFrame(() => scrollToSection(sectionId));
    }
  };
  

  const handleNavigation = (sectionId) => {
    setIsMenuOpen(false);
    sessionStorage.setItem("scrollToSection", sectionId);

    if (pathname === "/") {
      scrollToSection(sectionId);
    } else {
      router.push("/");
    }
  };
  

  useEffect(() => {
    if (pathname === "/") {
      const scrollToSectionId = sessionStorage.getItem("scrollToSection");
  
      if (scrollToSectionId) {
        setTimeout(() => {
          scrollToSection(scrollToSectionId);
          sessionStorage.removeItem("scrollToSection");
        }, 300); // Give enough time for DOM to mount
      } else {
        setActiveSection("home");
      }
    } else {
      setActiveSection("");
    }
  
    const handleScroll = () => {
      if (manualScroll || pathname !== "/") return;
  
      const sections = ["home", "experience", "portfolio", "contact"];
      for (let id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 500) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
  
  
  

  const navItems = [
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.svg" alt="Logo" width={100} height={40} className={styles.mainLogo} priority />
        </Link>
        <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
          {navItems.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => handleNavigation(id)}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
              >
                {label}
              </button>
            );
          })}

          <Link
  href="/blog"
  className={`${styles.navLink} ${pathname === "/blog" ? styles.active : ""}`}
  onClick={() => setIsMenuOpen(false)}
>
  <FiHome /> Blogs
</Link>

{session && (
  <Link
    href="/admin"
    className={`${styles.navLink} ${pathname === "/admin" ? styles.active : ""}`}
    onClick={() => setIsMenuOpen(false)}
  >
    <FiHome /> Admin
  </Link>
)}

          {session && (
            <button className={styles.navLink} onClick={handleSignOut}>
              <FiUser /> Log Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
