"use client";
import SignInForm from "@/components/SignInForm"
import styles from "@/styles/SignIn.module.css"
import { useSession } from "next-auth/react"
import Loading from "@/components/Loading"
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation"

export default function SignIn() {

  const { data: session, status } = useSession() // Use useSession hook to get session
  const [isLoading, setIsLoading] = useState(true)
  const router=useRouter()

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false) // Once session is determined, stop loading
    }
  }, [status])

  // Show loading spinner while checking session
  if (isLoading) {
    return <Loading size="medium" />
  }

  if (session) {
    // Redirect if no session found
   router.push("/admin")
  }

  if(!session){
    return <div className={styles.container}>
    <h1>Developer Sign-In</h1>
    <SignInForm />
  </div>
  }
}

