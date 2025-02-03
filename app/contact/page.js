import { generateMetadata as generatePageMetadata } from "@/utils/metadata";
import Head from "next/head";
import styles from "@/styles/Contact.module.css";

export async function generateMetadata() {
  const metadata = await generatePageMetadata({
    id: "contact",
    title: "Contact Us",
    description: "Contact TheFStack for any questions, comments, or concerns. We are here to help!",
    content: "",
    thumbnail: "",
    url: "https://www.thefstack.com/contact",
  });

  return metadata;
}

export default function Contact() {
  const metadata = generateMetadata();

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <div className={styles.contact}>
        <h1>Contact Us</h1>
        <p>If you have any questions, comments, or concerns, please feel free to reach out to us. We are here to help!</p>
        
        <h2>Email</h2>
        <p>You can email us at <a href="mailto:thefstack@gmail.com">thefstack@gmail.com</a>.</p>
        
        <ul>
          <li><a href="https://github.com/thefstack" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/thefstack" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </>
  );
}
