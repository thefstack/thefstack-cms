import { useEffect, useState } from "react";
import * as FiIcons from "react-icons/fi"; // Import all icons
import styles from "@/styles/Services.module.css";
import Markdown from "react-markdown";
import Loading from "./Loading";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading]=useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Service items:", error);
      }
    }

    fetchServices();
  }, []);

  if (!loading && services.length === 0) {
    return null;
  }
  if(loading) {
    return <div className=" mt-14"><Loading size="medium" /></div>
  }

  return (
    <section className={styles.services}>
      <h2>My Services</h2>
      <div className={styles.grid}>
        {services &&
          services.map((service) => {
            const Icon = FiIcons[service.logo]; // Get the icon component dynamically

            return (
              <div key={service._id} className={styles.service}>
                {Icon ? (
                  <Icon className={styles.icon} />
                ) : (
                  <p>Icon Not Found</p>
                )}
                <h3>{service.title}</h3>
                <Markdown>{service.description}</Markdown>
              </div>
            );
          })}
      </div>
    </section>
  );
}
