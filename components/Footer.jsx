import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"
import styles from "@/styles/Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socialLinks}>
          <a href="https://github.com/thefstack" target="_blank" rel="noopener noreferrer">
            <FiGithub />
          </a>
          <a href="www.linkedin.com/in/thefstack" target="_blank" rel="noopener noreferrer">
            <FiLinkedin />
          </a>
          <a href="mailto:thefstack@gmail.com">
            <FiMail />
          </a>
        </div>
        <div className={styles.footerLinks}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </div>
        <p>&copy; {new Date().getFullYear()} thefstack. All rights reserved.</p>
      </div>
    </footer>
  )
}

