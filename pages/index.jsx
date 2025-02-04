import Hero from "@/components/Hero"
import About from "@/components/About"
import Portfolio from "@/components/Portfolio"
import Services from "@/components/Services"
import Clients from "@/components/Clients"
import styles from "@/styles/Home.module.css"

export async function getStaticProps() {
  const [portfolioRes, servicesRes, clientsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`)
  ]);

  const [portfolio, services, clients] = await Promise.all([
    portfolioRes.json(),
    servicesRes.json(),
    clientsRes.json()
  ]);

  return {
    props: {
      portfolio,
      services,
      clients
    }
  };
}

export default function Home({ portfolio, services, clients }) {
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
