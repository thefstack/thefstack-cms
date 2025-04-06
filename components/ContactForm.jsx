"use client";

import { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formResponse, setFormResponse] = useState(null);

  const phoneRegex = /^\+?[0-9\s\-]{7,20}$/;

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.target);
      console.log(formData);

      const phone = formData.get("phone");
      const digitsOnly = phone.replace(/\D/g, "");

      if (
        !/^\+?[0-9\s\-]{7,20}$/.test(phone) ||
        digitsOnly.length < 7 ||
        digitsOnly.length > 15
      ) {
        setFormResponse({
          success: false,
          message: "Please enter a valid phone number with 7–15 digits.",
        });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json(); // 👈 Parse JSON
      setFormResponse(result);

      // Reset form if submission was successful
      if (result.success) {
        event.target.reset();
      }
    } catch (error) {
      console.error("Error:", error);
      setFormResponse({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Me</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="^\+?[0-9\s\-]{7,15}$"
            title="Enter a valid phone number (with or without country code)"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+91 9876543210"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="How can I help you?"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {formResponse && (
          <div
            className={`p-4 mt-4 rounded-md text-center text-sm ${
              formResponse.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {formResponse.message}
          </div>
        )}
      </form>
    </div>
  );
}
