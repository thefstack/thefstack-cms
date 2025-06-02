"use client";
import * as FiIcons from "react-icons/fi"; // Import all icons
import styles from "@/styles/Services.module.css";
import Markdown from "react-markdown";
import { motion } from "framer-motion";

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
            <motion.div key={service._id} className={styles.service}
            initial={{ scale: 0.6 }} // ✅ Start small & invisible
            whileInView={{ scale: 1 }} // ✅ Animate to normal on scroll
            transition={{ duration: 0.5, ease: "easeOut" }} // ✅ Smooth transition
            viewport={{ once: false, amount: 0.4 }} 
            >
              <div>
                {Icon ? (
                <Icon className={styles.icon} />
              ) : (
                <p>Icon Not Found</p>
              )}
              <h3>{service.title}</h3>
              </div>
              <div className={styles.description}>
                <Markdown>{service.description}</Markdown>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
