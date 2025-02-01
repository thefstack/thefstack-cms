import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "@/styles/ServiceManager.module.css";
import Link from "next/link";

export default function ServiceManager() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ title: "", description: "", link: "", logo: "", startingPrice: "" });
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch services from the database
    async function fetchServices() {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    }
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevService) => ({ ...prevService, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save new service to the database
    const response = await fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.authToken}`, // Use the token from the session
      },
      body: JSON.stringify(newService),
    });
    if (!response.ok) {
      console.error(`Failed to add service: ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setServices((prevServices) => [...prevServices, data]);
    setNewService({ title: "", description: "", link: "", logo: "", startingPrice: "" });
    setShowAddPopup(false);
  };

  const handleView = (service) => {
    setSelectedService(service);
    setShowViewPopup(true);
  };

  const handleDelete = async (id) => {
    // Delete service from the database
    const response = await fetch(`/api/services/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${session.authToken}`, // Use the token from the session
      },
    });
    if (response.ok) {
      setServices((prevServices) => prevServices.filter((service) => service._id !== id));
      setShowViewPopup(false);
    } else {
      console.error("Failed to delete service");
    }
  };

  return (
    <div className={styles.manager}>
      <h2>Service Manager</h2>
      <button className={styles.addButton} onClick={() => setShowAddPopup(true)}>Add Service</button>
      <ul className={styles.serviceList}>
        {Array.isArray(services) && services.map((service) => (
          <li key={service.id} className={styles.serviceItem} onClick={() => handleView(service)}>
            <div className={styles.serviceContent}>
              <h3>{service.title}</h3>
            </div>
          </li>
        ))}
      </ul>

      {showAddPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Add Service</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="title"
                value={newService.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className={styles.input}
              />
              <textarea
                name="description"
                value={newService.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className={styles.textarea}
              />
              <input
                type="text"
                name="link"
                value={newService.link}
                onChange={handleChange}
                placeholder="Link"
                
                className={styles.input}
              />
              <input
                type="text"
                name="logo"
                value={newService.logo}
                onChange={handleChange}
                placeholder="Logo react-icon/fi logo name only"
                required
                className={styles.input}
              />
              <input
                type="number"
                name="startingPrice"
                value={newService.startingPrice}
                onChange={handleChange}
                placeholder="Starting Price"
                required
                className={styles.input}
              />
              <button type="submit" className={styles.button}>Add Service</button>
              <button type="button" className={styles.button} onClick={() => setShowAddPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showViewPopup && selectedService && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.popupContentData}>
            <h3>{selectedService.title}</h3>
            <p>{selectedService.description}</p>
            <p>Starting Price: ${selectedService.startingPrice}</p>
            <div className={styles.links}>
              <Link href={selectedService.link.startsWith('http') ? selectedService.link : `https://${selectedService.link}`} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" className={styles.anchor}>Service Link</a>
              </Link>
            </div>
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.button} onClick={() => setShowViewPopup(false)}>Close</button>
              <button type="button" className={styles.button} onClick={() => handleDelete(selectedService._id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
