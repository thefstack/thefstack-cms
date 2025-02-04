import * as FiIcons from "react-icons/fi"; // Import all icons
import styles from "@/styles/Services.module.css";
import Markdown from "react-markdown";

export default function Services({ services }) {
  if (services.length === 0) {
    return null;
  }

  return (
    <section className={styles.services}>
      <h2>My Services</h2>
      <div className={styles.grid}>
        {services.map((service) => {
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
