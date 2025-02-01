// app/admin/layout.js
"use client";
import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Loading from "@/components/Loading"

// Client-side session check
export default function AdminLayout({ children }) {
  const { data: session, status } = useSession() // Use useSession hook to get session
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false) // Once session is determined, stop loading
    }
  }, [status])

  // Show loading spinner while checking session
  if (isLoading) {
    return <Loading size="medium" />
  }

  if (!session) {
    // Redirect if no session found
    redirect("/signin")
  }

  return <div>{children}</div>
}
