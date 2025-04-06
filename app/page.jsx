import Hero from "@/components/Hero"
import About from "@/components/About"
import Portfolio from "@/components/Portfolio"
import styles from "@/styles/Home.module.css"
import ContactForm from "@/components/ContactForm"
import Experience from "@/components/Experience"

async function fetchData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.thefstack.com";

  const [portfolioRes] = await Promise.all([
    fetch(`${baseUrl}/api/portfolio`),
  ]);

  const [portfolio] = await Promise.all([
    portfolioRes.json(),
  ]);

  return {
    portfolio,
  };
}

export default async function Home() {
  const { portfolio, clients } = await fetchData();

  return (
    <div className={styles.container}>
      <Hero />
      <About />
      <Experience />
      <Portfolio projects={portfolio} />
      <ContactForm/>
    </div>
  )
}

