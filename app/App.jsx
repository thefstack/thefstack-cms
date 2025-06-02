import Header from '@/components/Header'
import React from 'react'
import Footer from "@/components/Footer"
import "./globals.css"

const App = ({children}) => {
  return (
    <section className="flex flex-col justify-between ">
      <div style={{position:'sticky', top:"0px", width:"100%", height:"100%", zIndex:999}}><Header /></div>
      <main className="flex-1 pt-[var(--main-header-padding-top)]">{children}</main>
      <Footer />
    </section>
  )
}

export default App
