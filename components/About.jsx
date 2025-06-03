"use client"
import styles from "@/styles/About.module.css";
import { motion } from "framer-motion";


export default function About() {
  return (
    <section className={styles.about}>
      <motion.div className={styles.content}
      initial={{ scale: 0.6 }} // ✅ Start small & invisible
            whileInView={{ scale: 1 }} // ✅ Animate to normal on scroll
            transition={{ duration: 0.5, ease: "easeOut" }} // ✅ Smooth transition
            viewport={{ once: false, amount: 0.4 }} 
      >
  <h2>About Me</h2>
  <div className={styles.text}>
    <p>
      Hi, I'm Raj Sharma — a passionate Full Stack Web Developer focused on building fast, modern, and responsive websites and applications.
    </p>

    <p>
      With 1+ years of hands-on experience, I’ve helped startups and small businesses bring their digital ideas to life through clean code and intuitive design.
    </p>

    <p>
      My tech stack includes HTML, CSS, JavaScript, React, Next.js, Node.js, Express.js, RESTful APIs, and OpenAI API integration. I’m driven by curiosity, always exploring the latest in web development, AI, and serverless architecture.
    </p>
  </div>
</motion.div>

<motion.div className={styles.content}
initial={{ scale: 0.6 }} // ✅ Start small & invisible
            whileInView={{ scale: 1 }} // ✅ Animate to normal on scroll
            transition={{ duration: 0.5, ease: "easeOut" }} // ✅ Smooth transition
            viewport={{ once: false, amount: 0.4 }} 
            >
  <h2>Experience</h2>
  <div className={styles.text}>
    <p>
      I’m currently working as a Full Stack Developer at Ivy Knowledge Services, where I develop AI-powered tools for an advanced learning platform.
    </p>

    <p>
      My contributions include an AI chatbot for student interaction, a dynamic quiz generator using OpenAI, and a lesson planning system that supports structured learning.
    </p>

    <p>
      I also led the development of a smart resume builder with real-time AI feedback, and supported payment gateway integration for smooth user transactions.
    </p>
  </div>
</motion.div>


<motion.div className={styles.content}
initial={{ scale: 0.6 }} // ✅ Start small & invisible
            whileInView={{ scale: 1 }} // ✅ Animate to normal on scroll
            transition={{ duration: 0.5, ease: "easeOut" }} // ✅ Smooth transition
            viewport={{ once: false, amount: 0.4 }} 
>
  <h2>Current Status</h2>
  <div className={styles.text}>
    <p>
      Alongside my full-time role, I'm currently working on a freelance project for a client who needs a robust backend system for both web and mobile platforms.
    </p>

    <p>
      I'm responsible for designing and developing a scalable RESTful API using Node.js and Express.js, with a focus on security, modular structure, and performance optimization.
    </p>

    <p>
      The system is built to handle data flow, authentication, and smooth integration with a cross-platform frontend — ensuring reliability and future-ready scalability.
    </p>
  </div>
</motion.div>



    </section>
  );
}
