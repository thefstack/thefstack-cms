"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import styles from "@/styles/BlogScheduleManager.module.css"
import { categories } from "@/data/categories"
import { FiCalendar, FiClock, FiCheck, FiLoader, FiAlertTriangle } from "react-icons/fi"

export default function BlogScheduleManager() {
  const [schedules, setSchedules] = useState([])
  const [newSchedule, setNewSchedule] = useState({
    topic: "",
    subtopic: "",
    details: "",
    category: "",
    subcategory: "",
    postTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // Default to 24 hours from now
  })
  const [subcategories, setSubcategories] = useState([])
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [showViewPopup, setShowViewPopup] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationMessage, setGenerationMessage] = useState("")
  const { data: session } = useSession()

  useEffect(() => {
    // Fetch blog schedules from the API
    async function fetchSchedules() {
      try {
        const response = await fetch("/api/blog-schedules")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setSchedules(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Failed to fetch blog schedules:", error)
      }
    }
    fetchSchedules()
  }, [])

  useEffect(() => {
    if (newSchedule.category) {
      setSubcategories(categories[newSchedule.category] || [])
    } else {
      setSubcategories([])
    }
  }, [newSchedule.category])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewSchedule((prevSchedule) => ({ ...prevSchedule, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Save new blog schedule to the database
    const response = await fetch("/api/blog-schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.authToken}`,
      },
      body: JSON.stringify(newSchedule),
    })
    if (!response.ok) {
      console.error(`Failed to add blog schedule: ${response.statusText}`)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    setSchedules((prevSchedules) => [...prevSchedules, data])
    setNewSchedule({
      topic: "",
      subtopic: "",
      details: "",
      category: "",
      subcategory: "",
      postTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    })
    setShowAddPopup(false)
  }

  const handleView = (schedule) => {
    setSelectedSchedule(schedule)
    setShowViewPopup(true)
  }

  const handleDelete = async (id) => {
    // Delete blog schedule from the database
    const response = await fetch(`/api/blog-schedules/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.authToken}`,
      },
    })
    if (response.ok) {
      setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule._id !== id))
      setShowViewPopup(false)
    } else {
      console.error("Failed to delete blog schedule")
    }
  }

  const handleGenerateNow = async (scheduleId) => {
    setIsGenerating(true)
    setGenerationMessage("Generating blog content... This may take a minute.")

    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.authToken}`,
        },
        body: JSON.stringify({ scheduleId }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setGenerationMessage("Blog generated successfully!")

      // Update the schedule in the list
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule._id === scheduleId ? { ...schedule, status: "completed" } : schedule,
        ),
      )

      // If viewing the schedule, update it
      if (selectedSchedule && selectedSchedule._id === scheduleId) {
        setSelectedSchedule({ ...selectedSchedule, status: "completed" })
      }
    } catch (error) {
      console.error("Failed to generate blog:", error)
      setGenerationMessage(`Error generating blog: ${error.message}`)
    } finally {
      setTimeout(() => {
        setIsGenerating(false)
        setGenerationMessage("")
      }, 3000)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock className={styles.pendingIcon} />
      case "processing":
        return <FiLoader className={styles.processingIcon} />
      case "completed":
        return <FiCheck className={styles.completedIcon} />
      case "failed":
        return <FiAlertTriangle className={styles.failedIcon} />
      default:
        return null
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className={styles.manager}>
      <h2>Blog Schedule Manager</h2>
      <button className={styles.addButton} onClick={() => setShowAddPopup(true)}>
        Schedule New Blog
      </button>

      {isGenerating && (
        <div className={styles.generationMessage}>
          <FiLoader className={styles.spinningIcon} /> {generationMessage}
        </div>
      )}

      {!isGenerating && generationMessage && (
        <div className={styles.generationMessage}>
          {generationMessage.includes("Error") ? (
            <FiAlertTriangle className={styles.failedIcon} />
          ) : (
            <FiCheck className={styles.completedIcon} />
          )}{" "}
          {generationMessage}
        </div>
      )}

      <div className={styles.scheduleList}>
        {schedules.length === 0 ? (
          <p className={styles.noSchedules}>No blog schedules found. Create one to get started!</p>
        ) : (
          schedules.map((schedule) => (
            <div key={schedule._id} className={styles.scheduleItem} onClick={() => handleView(schedule)}>
              <div className={styles.scheduleHeader}>
                <h3>{schedule.topic}</h3>
                {getStatusIcon(schedule.status)}
              </div>
              <p className={styles.subtopic}>{schedule.subtopic}</p>
              <div className={styles.scheduleFooter}>
                <div className={styles.scheduleTime}>
                  <FiCalendar /> {formatDate(schedule.postTime)}
                </div>
                <div className={styles.scheduleStatus}>
                  Status: <span className={styles[schedule.status]}>{schedule.status}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Schedule New Blog</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="topic">Topic</label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={newSchedule.topic}
                  onChange={handleChange}
                  placeholder="Main topic (e.g., JavaScript)"
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subtopic">Subtopic</label>
                <input
                  type="text"
                  id="subtopic"
                  name="subtopic"
                  value={newSchedule.subtopic}
                  onChange={handleChange}
                  placeholder="Specific focus (e.g., Promises)"
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newSchedule.category}
                  onChange={handleChange}
                  required
                  className={styles.select}
                >
                  <option value="">Select Category</option>
                  {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subcategory">Subcategory</label>
                <select
                  id="subcategory"
                  name="subcategory"
                  value={newSchedule.subcategory}
                  onChange={handleChange}
                  required
                  className={styles.select}
                  disabled={!newSchedule.category}
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="details">Additional Details (Optional)</label>
                <textarea
                  id="details"
                  name="details"
                  value={newSchedule.details}
                  onChange={handleChange}
                  placeholder="Any specific points to include in the blog"
                  className={styles.textarea}
                  rows={4}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="postTime">Post Time</label>
                <input
                  type="datetime-local"
                  id="postTime"
                  name="postTime"
                  value={newSchedule.postTime}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>

              <div className={styles.buttonContainer}>
                <button type="button" className={styles.cancelButton} onClick={() => setShowAddPopup(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveButton}>
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewPopup && selectedSchedule && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.popupHeader}>
              <h3>{selectedSchedule.topic}</h3>
              <div className={`${styles.statusBadge} ${styles[selectedSchedule.status]}`}>
                {selectedSchedule.status}
              </div>
            </div>

            <div className={styles.popupBody}>
              <div className={styles.detailItem}>
                <strong>Subtopic:</strong> {selectedSchedule.subtopic}
              </div>

              <div className={styles.detailItem}>
                <strong>Category:</strong> {selectedSchedule.category}
              </div>

              <div className={styles.detailItem}>
                <strong>Subcategory:</strong> {selectedSchedule.subcategory}
              </div>

              {selectedSchedule.details && (
                <div className={styles.detailItem}>
                  <strong>Additional Details:</strong>
                  <p className={styles.details}>{selectedSchedule.details}</p>
                </div>
              )}

              <div className={styles.detailItem}>
                <strong>Scheduled Post Time:</strong> {formatDate(selectedSchedule.postTime)}
              </div>

              <div className={styles.detailItem}>
                <strong>Created At:</strong> {formatDate(selectedSchedule.createdAt)}
              </div>

              {selectedSchedule.error && (
                <div className={styles.errorMessage}>
                  <strong>Error:</strong> {selectedSchedule.error}
                </div>
              )}
            </div>

            <div className={styles.buttonContainer}>
              <button type="button" className={styles.closeButton} onClick={() => setShowViewPopup(false)}>
                Close
              </button>

              {selectedSchedule.status === "pending" && (
                <>
                  <button
                    type="button"
                    className={styles.generateButton}
                    onClick={() => handleGenerateNow(selectedSchedule._id)}
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Generating..." : "Generate Now"}
                  </button>

                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDelete(selectedSchedule._id)}
                  >
                    Delete
                  </button>
                </>
              )}

              {selectedSchedule.status === "failed" && (
                <button
                  type="button"
                  className={styles.retryButton}
                  onClick={() => handleGenerateNow(selectedSchedule._id)}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Retry Generation"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

