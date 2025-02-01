"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FiMail, FiLock } from "react-icons/fi"
import styles from "@/styles/SignInForm.module.css"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      console.error(result.error)
    } else {
      console.log("Sign-in successful, navigating to /admin");
    router.push("/admin");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <FiMail className={styles.icon} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      </div>
      <div className={styles.inputGroup}>
        <FiLock className={styles.icon} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Sign In
      </button>
    </form>
  )
}

