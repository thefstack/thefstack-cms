import { generateMetadata as generatePageMetadata } from "@/utils/metadata";
import Head from "next/head";
import styles from "@/styles/Contact.module.css";
import ContactForm from "@/components/ContactForm";

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
    <div className={styles.contact}>
      <p>If you have any questions, comments, or concerns, please feel free to reach out to me. I'm here to help!</p>

      <h2>Email</h2>
      <p>
        You can email me at <a href="mailto:thefstack@gmail.com">thefstack@gmail.com</a>
        or fill the contact form.
      </p>

      <ContactForm />

    </div>
  );
}
