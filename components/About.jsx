import Image from "next/image"
import styles from "@/styles/About.module.css"

export default function About() {
  return (
    <section className={styles.about}>
      <h2>About Me</h2>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image src="/profile-picture.png" alt="Profile Picture" width={300} height={200} priority />
        </div>
        <div className={styles.text}>
          <p>
          Hey, I'm Raj — a web development enthusiast currently interning at Ivy. I enjoy building user-friendly
            interfaces and interactive web applications that solve real problems.
          </p>
          <p>
          I've worked on several personal and collaborative projects using technologies like HTML, CSS, JavaScript,
          Node.js, Express.js, MongoDB, React, and Next.js. Lately, I've also been exploring AI integration using OpenAI APIs.
          </p>
          <p>I'm always curious, constantly learning, and excited about growing as a full-stack developer.</p>
        </div>
      </div>
    </section>
  )
}

