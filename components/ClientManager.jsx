import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "@/styles/ClientManager.module.css";

export default function ClientManager() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", photo: "", review: "", rating: "" });
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch customer reviews from the database
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    }
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReview((prevReview) => ({ ...prevReview, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save new review to the database
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.authToken}`, // Use the token from the session
      },
      body: JSON.stringify(newReview),
    });
    if (!response.ok) {
      console.error(`Failed to add review: ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setReviews((prevReviews) => [...prevReviews, data]);
    setNewReview({ name: "", photo: "", review: "", rating: "" });
    setShowAddPopup(false);
  };

  const handleView = (review) => {
    setSelectedReview(review);
    setShowViewPopup(true);
  };

  const handleDelete = async (id) => {
    // Delete review from the database
    const response = await fetch(`/api/reviews/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${session.authToken}`, // Use the token from the session
      },
    });
    if (response.ok) {
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));
      setShowViewPopup(false);
    } else {
      console.error("Failed to delete review");
    }
  };

  return (
    <div className={styles.manager}>
      <h2>Client Manager</h2>
      <button className={styles.addButton} onClick={() => setShowAddPopup(true)}>Add Review</button>
      <ul className={styles.reviewList}>
        {Array.isArray(reviews) && reviews.map((review) => (
          <li key={review._id} className={styles.reviewItem} onClick={() => handleView(review)}>
            <div className={styles.reviewContent}>
              <h3>{review.name}</h3>
            </div>
          </li>
        ))}
      </ul>

      {showAddPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Add Review</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="name"
                value={newReview.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className={styles.input}
              />
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className={styles.input}
              />
              <textarea
                name="review"
                value={newReview.review}
                onChange={handleChange}
                placeholder="Review"
                required
                className={styles.textarea}
              />
              <input
                type="number"
                name="rating"
                value={newReview.rating}
                onChange={handleChange}
                placeholder="Rating"
                required
                className={styles.input}
                min="1"
                max="5"
              />
              <button type="submit" className={styles.button}>Add Review</button>
              <button type="button" className={styles.button} onClick={() => setShowAddPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showViewPopup && selectedReview && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.popupContentData}>
              <h3>{selectedReview.name}</h3>
              <img 
                src={selectedReview.photo ? `data:image/jpeg;base64,${selectedReview.photo}` : "/customer-icon.png"} 
                alt={selectedReview.name} 
                className={styles.reviewImage} 
              />
              <p>{selectedReview.review}</p>
              <p>Rating: {selectedReview.rating}</p>
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.button} onClick={() => setShowViewPopup(false)}>Close</button>
              <button type="button" className={styles.button} onClick={() => handleDelete(selectedReview._id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
