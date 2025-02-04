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
            Hi, I'm Raj. I'm a passionate web developer with expertise in creating modern, responsive websites
            using the latest technologies. With 2 years of experience, I've helped few clients bring their
            digital visions to life.
          </p>
          <p>
            My skills include HTML, CSS, JavaScript, NodeJs, ExpressJs, Restful Api, React, Next.js and OpenAi Integration. I'm always eager to learn new technologies and
            stay up-to-date with the latest web development trends.
          </p>
        </div>
      </div>
    </section>
  )
}

