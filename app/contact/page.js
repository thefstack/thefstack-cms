import styles from "@/styles/Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.contact}>
      <h1>Contact Us</h1>
      <p>If you have any questions, comments, or concerns, please feel free to reach out to us. We are here to help!</p>
      
      <h2>Email</h2>
      <p>You can email us at <a href="mailto:thefstack@gmail.com">thefstack@gmail.com</a>.</p>
      
      {/* <h2>Social Media</h2>
      <p>Follow us on our social media channels:</p> */}
      <ul>
        <li><a href="https://github.com/thefstack" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/thefstack" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
      </ul>
      
      {/* <h2>Mailing Address</h2>
      <p>thefstack<br />
      1234 Example Street<br />
      City, State, ZIP Code<br />
      Country</p> */}
    </div>
  );
}
