import Header from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";
import "./globals.css";

const App = ({ children }) => {
  
  return (
    <section className="flex flex-col h-screen justify-between">
      <div className="fixed w-full z-50">
        <Header />
      </div>
      <main className="flex-1 pt-[var(--main-header-padding-top)]">
          {children}
      </main>
      <Footer />
    </section>
  );
};

export default App;
