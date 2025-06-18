// This line tells Next.js to always render this page dynamically.
// It prevents static optimization issues when using dynamic functions like request.json().
export const dynamic = 'force-dynamic'; 

import { NextResponse } from "next/server";
import sendMail from "@/lib/mail"; // Assuming this path is correct



export async function POST(req) {
  try {
    const formData = await req.json();

    const name = formData.name;
    const email = formData.email;
    const phone = formData.phone || "Not provided"; // Ensure phone is handled
    const subject = formData.subject || "No subject provided"; // Get subject from frontend
    const message = formData.message;

    // Your Admin Email Address (replace with an environment variable in production for security)
    const ADMIN_EMAIL = "rajsharmahwh19@gmail.com"; 

    // Admin email content
    const subjectAdmin = `New Contact Form Submission - thefstack: ${subject}`; // Include user subject in admin email subject
    const htmlAdmin = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <h2 style="color: #333;">You have a new message from the contact form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #fff; padding: 10px; border-radius: 5px;">${message}</p>
      </div>
    `;

    // User thank-you email content
    const subjectUser = "Thanks for contacting thefstack 🙌";
    const htmlUser = `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <h2 style="color: #333;">Hi ${name} 👋</h2>
        <p>Thanks for contacting <strong>thefstack</strong>! I've received your message and <strong>will reach out to you shortly</strong>.</p>
        <p>Here's a copy of your message for your reference:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Subject:</strong> ${subject}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>I really appreciate your interest and look forward to connecting with you soon!</p>
        <br />
        <p>Warm regards,</p>
        <p><strong>theFstack</strong></p>
      </div>
    `;

    // Send email to admin (using your business email)
    const adminRes = await sendMail(ADMIN_EMAIL, subjectAdmin, htmlAdmin); // Corrected recipient

    // Send thank-u email to user - await this to ensure it's sent
    const userRes = await sendMail(email, subjectUser, htmlUser); // User's email

    // Check if both emails were sent successfully
    const success = adminRes && userRes;
    const status = success ? 201 : 500; // Use 500 for server-side failure

    return NextResponse.json(
      {
        success,
        message: success
          ? "Message sent successfully! Check your email for confirmation."
          : "Failed to send message. Please try again.",
      },
      { status },
    );
  } catch (error) {
    console.error("Error sending message:", error); // Use console.error for errors
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}