import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"
import styles from "@/styles/Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socialLinks}>
          <a href="https://github.com/thefstack" target="_blank" rel="noopener noreferrer" title="Github">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/thefstack" target="_blank" rel="noopener noreferrer" title="Linkedin">
            <FiLinkedin />
          </a>
          <a href="mailto:thefstack@gmail.com" title="Mail">
            <FiMail />
          </a>
        </div>
        <div className={styles.footerLinks}>
          <a href="/privacy-policy" title="Privacy Policy">Privacy Policy</a>
          <a href="/terms" title="Terms">Terms</a>
          <a href="/contact" title="Contact">Contact</a>
        </div>
        <p>&copy; {new Date().getFullYear()} thefstack. All rights reserved.</p>
      </div>
    </footer>
  )
}

