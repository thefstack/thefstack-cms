"use client";
import SignInForm from "@/components/SignInForm"
import styles from "@/styles/SignIn.module.css"
import { getSession } from "next-auth/react"
import { redirect } from "next/navigation"

// Server-side session check
export default async function SignIn() {
  const session = await getSession() // Fetch session on the server side

  if (session) {
    // Redirect if session found
    redirect("/admin")
  }

  return (
    <div className={styles.container}>
      <h1>Developer Sign-In</h1>
      <SignInForm />
    </div>
  )
}

