import Image from "next/image"
import styles from "@/styles/Hero.module.css"

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Welcome to My Freelance Portfolio</h1>
        <p>I create beautiful and functional websites for businesses and individuals.</p>
      </div>
      <div className={styles.imageWrapper}>
        <Image src="/HeroImage.avif" alt="Hero Image" width={500} height={300} priority />
      </div>
    </section>
  )
}

