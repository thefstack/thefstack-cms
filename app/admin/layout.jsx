"use client";
import React from 'react'
import { getSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Loading from "@/components/Loading"

// Server-side session check
export default async function AdminLayout({ children }) {
  const session = await getSession() // Fetch session on the server side

  if (!session) {
    // Redirect if no session found
    redirect("/signin")
  }

  return <div>{children}</div>
}
