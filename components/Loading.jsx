import React from "react"
import styles from "@/styles/Loading.module.css"

const Loading = ({ size = "medium" }) => {
  return (
    <div className={`${styles.loadingContainer} ${styles[size]}`}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Loading

