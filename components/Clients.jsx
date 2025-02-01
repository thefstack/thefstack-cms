import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/Clients.module.css";

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch customer reviews from the database
    async function fetchClients() {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setClients(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    }
    fetchClients();
  }, []);

  if (clients.length === 0) {
    return null;
  }

  return (
    <section className={styles.clients}>
      <h2>Clients</h2>
      <div className={styles.grid}>
        {clients.map((client) => (
          <div key={client._id} className={styles.client}>
            <div className={styles["client-content"]}>
              <Image
                src={client.photo ? client.photo : "/customer-icon.png"}
                alt={client.name}
                width={60}
                height={60}
                layout="fixed"
              />
              <h3>{client.name}</h3>
              <p>{client.review}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

