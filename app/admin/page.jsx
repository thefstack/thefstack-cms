// app/admin/page.jsx

import AdminDashboard from "@/components/AdminDashboard"
import styles from "@/styles/Admin.module.css"

export default async function AdminPage() {
  

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  )
}

