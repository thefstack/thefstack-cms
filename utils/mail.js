import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
  },
})

const sendMail = async (email, subject, html) => {
  const mailOption = {
    from: process.env.EMAIL_ID,
    to: email,
    subject,
    html,
  }

  try {
    const info = await transporter.sendMail(mailOption)
    console.log(`Email sent to ${email}: ${info.messageId}`)
    return true
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error)
    return false
  }
}

export default sendMail
