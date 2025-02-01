import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Link from "next/link";
import styles from "@/styles/Portfolio.module.css";
import { useState, useEffect } from "react";
import Markdown from 'react-markdown'
import Loading from "./Loading";


export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]=useState(true);

  useEffect(() => {
    // Fetch portfolio items from the database
    async function fetchPortfolioItems() {
      try {
        const response = await fetch("/api/portfolio");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch portfolio items:", error);
      }
    }
    fetchPortfolioItems();
  }, []);

  if(!loading && projects.length === 0) {
    return null;
  }

  if(loading) {
    return <Loading size="medium" />
  }

  return (
    <section className={styles.portfolio}>
      <h2>My Portfolio</h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.project}>
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.name}
              width={300}
              height={200}
              layout="responsive"
              lazyLoad
            />
            <h3>{project.title}</h3>
            <Markdown>{project.description}</Markdown>
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

