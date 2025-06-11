import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import ContactForm from "@/components/Contact";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import Skills from "@/components/Skills"

// // ✅ Dynamically import Skills to ensure it's client-side only
// const Skills = dynamic(() => import("@/components/Skills"), { ssr: false });

async function fetchData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.thefstack.com";

  const [portfolioRes, servicesRes, clientsRes] = await Promise.all([
    fetch(`${baseUrl}/api/portfolio`),
    fetch(`${baseUrl}/api/services`),
    fetch(`${baseUrl}/api/reviews`)
  ]);

  // ✅ Handle non-OK responses
  if (!portfolioRes.ok) {
    const errText = await portfolioRes.text();
    console.error("Portfolio API Error:", errText);
    throw new Error("Failed to fetch portfolio data.");
  }

  if (!servicesRes.ok) {
    const errText = await servicesRes.text();
    console.error("Services API Error:", errText);
    throw new Error("Failed to fetch services data.");
  }

  if (!clientsRes.ok) {
    const errText = await clientsRes.text();
    console.error("Clients API Error:", errText);
    throw new Error("Failed to fetch clients data.");
  }

  const [portfolio, services, clients] = await Promise.all([
    portfolioRes.json(),
    servicesRes.json(),
    clientsRes.json()
  ]);

  return { portfolio, services, clients };
}

export default async function Home() {
  const { portfolio, services, clients } = await fetchData();

  return (
    <div className={styles.container}>
      <Hero />
      <About />
      <Skills /> {/* ✅ Rendered only on client */}
      <Portfolio projects={portfolio} />
      <Services services={services} />
      <Clients clients={clients} />
      <ContactForm />
    </div>
  );
}
