import { NextResponse } from "next/server";
import sendMail from "@/utils/mail";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    console.log("Contact Form Data:", { email, phone, message });

    // Admin email content
    const subjectAdmin = "New Contact Form Submission - thefstack";
    const htmlAdmin = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <h2 style="color: #333;">You have a new message from the contact form</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #fff; padding: 10px; border-radius: 5px;">${message}</p>
      </div>
    `;

    // User thank-you email content
    const subjectUser = "Thanks for contacting thefstack 🙌";
    const htmlUser = `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <h2 style="color: #333;">Hi there 👋</h2>
    <p>Thanks for contacting <strong>thefstack</strong>! I’ve received your message and <strong>will reach out to you shortly</strong>.</p>
    <p>Here’s a copy of your message for your reference:</p>
    <ul>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone:</strong> ${phone}</li>
      <li><strong>Message:</strong> ${message}</li>
    </ul>
    <p>I really appreciate your interest and look forward to connecting with you soon!</p>
    <br />
    <p>Warm regards,</p>
    <p><strong>Raj from thefstack</strong></p>
  </div>
`;

    // Send email to admin (await)
    const adminRes = await sendMail(
      "rajsharmahwh19@gmail.com",
      subjectAdmin,
      htmlAdmin
    );

    // Respond to user immediately
    const success = !!adminRes;
    const status = success ? 201 : 400;

    // Fire-and-forget: send thank-you email to sender (non-blocking)
    sendMail(email, subjectUser, htmlUser).catch(console.error);

    return NextResponse.json(
      {
        success,
        message: success
          ? "Message sent successfully!"
          : "Failed to send message.",
      },
      { status }
    );
  } catch (error) {
    console.log("Error sending message:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
