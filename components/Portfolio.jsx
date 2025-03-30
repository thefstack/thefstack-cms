import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Link from "next/link";
import styles from "@/styles/Portfolio.module.css";
import Markdown from 'react-markdown';

export default function Portfolio({ projects }) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className={styles.portfolio}>
      <h2>My Portfolio</h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <div className={styles.project}>
          <div key={project._id} >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={300}
              height={200}
              style={{ width: "auto", objectFit: "cover"}}
            />
            <h3>{project.title}</h3>
            <Markdown>{project.description}</Markdown>
            
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
        ))}
      </div>
    </section>
  );
}

