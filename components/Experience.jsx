import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Link from "next/link";
import styles from "@/styles/Experience.module.css";
import Markdown from "react-markdown";

export default function Experience() {
  return (
    <section className={styles.portfolio}>
      <h2>My Experience</h2>
      <div className={styles.grid}>
        <div className={styles.project}>
          <div>
            <Image
              src="/company1.webp"
              alt="Ivy"
              width={100}
              height={80}
              style={{ objectFit: "cover" }}
            />
            <p className="absolute right-0 top-0">sep-2024 - present</p>
            <h3>Ivy Knowledge Service Pvt Ltd </h3>
            <ul className={styles.experienceList}>
              <li>
                Integrated <strong>AI-powered chatbot</strong> features where
                users can select specific topics related to{" "}
                <strong>Data Science</strong>, <strong>Data Engineering</strong>
                , and <strong>Power BI</strong> to resolve their queries.
              </li>
              <li>
                Developed an <strong>AI-based quiz system</strong> where users
                can test their knowledge, with AI-generated questions based on
                selected topics and subtopics.
              </li>
              <li>
                Implemented an <strong>AI-driven review system</strong> to
                analyze quiz performance, highlighting strengths and weak points
                with personalized improvement suggestions.
              </li>
              <li>
                Built a <strong>dynamic lesson plan</strong> feature that
                unlocks quizzes after completing daily lessons, ensuring
                progressive learning.
              </li>
              <li>
                Developed an <strong>AI-powered resume builder</strong> with{" "}
                <strong>ATS score analysis</strong> and{" "}
                <strong>skill scoring</strong>, allowing users to optimize their
                resumes effectively.
              </li>
              <li>
                Collaborated in <strong>Agile teams</strong>, managing projects
                via <strong>GitHub</strong>.
              </li>
            </ul>
          </div>
          <div className={styles.links}>
            <Link href="https://ivyaitutor.azurewebsites.net/" legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <FiExternalLink /> Project Demo
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
