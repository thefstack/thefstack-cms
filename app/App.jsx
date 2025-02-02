"use client";
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import Footer from "@/components/Footer"
import Loading from '@/components/Loading'
import { useSession } from 'next-auth/react'

const App = ({children}) => {

    const { data: session, status } = useSession() // Use useSession hook to get session
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false) // Once session is determined, stop loading
    }

    //  Timeout to prevent infinite loading
    const timeout = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, [status])

  // Show loading spinner while checking session
  if (isLoading) {
    return <div className='w-screen h-screen'><Loading size="medium" /></div>
  }

  return (
    <section className="flex flex-col h-screen justify-between">
    <div style={{position:'absolute', width:"100%", zIndex:999}}><Header /></div>
    <main className="flex-1 pt-[var(--main-header-padding-top)]">{children}</main>
    <Footer />
    </section>
  )
}

export default App
