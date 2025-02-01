import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "@/styles/PortfolioManager.module.css";
import Link from "next/link";

export default function PortfolioManager() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", description: "", image: "", demoLink: "", githubLink: "" });
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Fetch portfolio items from the database
    async function fetchPortfolioItems() {
      try {
        const response = await fetch("/api/portfolio");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPortfolioItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch portfolio items:", error);
      }
    }
    fetchPortfolioItems();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setNewItem((prevItem) => ({ ...prevItem, [name]: files[0] }));
    } else {
      setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert image to base64
    const imageFile = document.querySelector('input[name="image"]').files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      const newItemWithBase64Image = { ...newItem, image: base64Image };
      // Save new portfolio item to the database
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.authToken}`, // Use the token from the session
        },
        body: JSON.stringify(newItemWithBase64Image),
      });
      if (!response.ok) {
        if (response.status === 401) {
          signOut();
          router.push("/signin");
        } else {
          console.error(`Failed to add portfolio item: ${response.statusText}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      const data = await response.json();
      setPortfolioItems((prevItems) => [...prevItems, data]);
      setNewItem({ title: "", description: "", image: "", demoLink: "", githubLink: "" });
      setShowAddPopup(false);
    };
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setShowViewPopup(true);
  };

  const handleDelete = async (id) => {
    // Delete portfolio item from the database
    const response = await fetch(`/api/portfolio/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${session.authToken}`, // Use the token from the session
      },
    });
    if (response.ok) {
      setPortfolioItems((prevItems) => prevItems.filter((item) => item._id !== id));
      setShowViewPopup(false);
    } else {
      if (response.status === 401) {
        signOut();
        router.push("/signin");
      } else {
        console.error("Failed to delete portfolio item");
      }
    }
  };

  return (
    <div className={styles.manager}>
      <h2>Portfolio Manager</h2>
      <button className={styles.addButton} onClick={() => setShowAddPopup(true)}>Add Portfolio Item</button>
      <ul className={styles.portfolioList}>
        {Array.isArray(portfolioItems) && portfolioItems.map((item) => (
          <li key={item.id} className={styles.portfolioItem} onClick={() => handleView(item)} style={{ backgroundImage: item.image ? `url(${item.image})` : 'none', backgroundColor: item.image ? 'transparent' : '#b0c4de' }}>
            <div className={styles.portfolioContent} style={{ color: 'white' }}>
              <h3>{item.title.slice(0,18)}</h3>
            </div>
          </li>
        ))}
      </ul>

      {showAddPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Add Portfolio Item</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="title"
                value={newItem.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className={styles.input}
              />
              <textarea
                name="description"
                value={newItem.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className={styles.textarea}
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="demoLink"
                value={newItem.demoLink}
                onChange={handleChange}
                placeholder="Demo Link"
                required
                className={styles.input}
              />
              <input
                type="text"
                name="githubLink"
                value={newItem.githubLink}
                onChange={handleChange}
                placeholder="GitHub Link"
                required
                className={styles.input}
              />
              <button type="submit" className={styles.button}>Add Portfolio Item</button>
              <button type="button" className={styles.button} onClick={() => setShowAddPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showViewPopup && selectedItem && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.popupContentData}>
            <h3>{selectedItem.title}</h3>
            <p>{selectedItem.description}</p>
            <img src={selectedItem.image} alt={selectedItem.title} className={styles.portfolioImage} />
            <div className={styles.links}>
              <Link href={selectedItem.demoLink.startsWith('http') ? selectedItem.demoLink : `https://${selectedItem.demoLink}`} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" className={styles.anchor}>Project Demo</a>
              </Link>
              <Link href={selectedItem.githubLink.startsWith('http') ? selectedItem.githubLink : `https://${selectedItem.githubLink}`} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" className={styles.anchor}>GitHub Repo</a>
              </Link>
            </div>
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.button} onClick={() => setShowViewPopup(false)}>Close</button>
              <button type="button" className={styles.button} onClick={() => handleDelete(selectedItem._id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

