"use client";
import Hero from "@/components/Hero"
import About from "@/components/About"
import Portfolio from "@/components/Portfolio"
import Services from "@/components/Services"
import Clients from "@/components/Clients"
import styles from "@/styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Clients />
    </div>
  )
}

