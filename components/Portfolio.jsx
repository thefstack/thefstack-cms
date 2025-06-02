"use client"
import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Link from "next/link";
import styles from "@/styles/Portfolio.module.css";
import Markdown from 'react-markdown';
import { motion } from "framer-motion";

export default function Portfolio({ projects }) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className={styles.portfolio}>
      <h2>My Portfolio</h2>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
           className={styles.project}
           initial={{ scale: 0.6 }} // ✅ Start small & invisible
            whileInView={{ scale: 1 }} // ✅ Animate to normal on scroll
            transition={{ duration: 0.5, ease: "easeOut" }} // ✅ Smooth transition
            viewport={{ once: false, amount: 0.4 }}  
           >
          
          <div  className={styles.projectCard}> 
            <div>
              <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={300}
              height={200}
            />

            <h3>{project.title}</h3>
            </div>

            <div className={styles.links}>
              <Link href={project.demoLink.startsWith('http') ? project.demoLink : `https://${project.demoLink}`} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  <FiExternalLink /> Demo
                </a>
              </Link>
              <Link href={project.githubLink.startsWith('http') ? project.githubLink : `https://${project.githubLink}`} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  <FiGithub /> GitHub
                </a>
              </Link>
            </div>            
          </div>
          <div className={styles.description}><Markdown>{project.description}</Markdown></div>
          
          </motion.div>
        ))}
      </div>
    </section>
  );
}

