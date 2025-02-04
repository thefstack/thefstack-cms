import Image from "next/image";
import styles from "@/styles/Clients.module.css";

export default function Clients({ clients }) {
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

