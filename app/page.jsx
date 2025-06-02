import Hero from "@/components/Hero"
import About from "@/components/About"
import Portfolio from "@/components/Portfolio"
import Services from "@/components/Services"
import Clients from "@/components/Clients"
import styles from "@/styles/Home.module.css"

async function fetchData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.thefstack.com";
  const [portfolioRes, servicesRes, clientsRes] = await Promise.all([
    fetch(`${baseUrl}/api/portfolio`,{ cache: "no-store" }),
    fetch(`${baseUrl}/api/services`,{ cache: "no-store" }),
    fetch(`${baseUrl}/api/reviews`,{ cache: "no-store" })
  ]);

  const [portfolio, services, clients] = await Promise.all([
    portfolioRes.json(),
    servicesRes.json(),
    clientsRes.json()
  ]);

  return {
    portfolio,
    services,
    clients 
  };
}

export default async function Home() {
  const { portfolio, services, clients } = await fetchData();

  return (
    <div className={styles.container}>
      <Hero />
      <About />
      <Portfolio projects={portfolio} />
      <Services services={services} />
      <Clients clients={clients} />
    </div>
  )
}

