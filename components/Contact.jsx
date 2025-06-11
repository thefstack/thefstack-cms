"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState({
    type: null,
    message: "",
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [animationState, setAnimationState] = useState("idle")
  const [failedFormData, setFailedFormData] = useState(null)

  // Animation states: idle, wrapping, manAppears, manTakes, manLeaves, processing, manReturns, envelopeOpens, success, error, reset

  // Check form validity
  useEffect(() => {
    const isValid =
      formData.name.trim().length > 0 &&
      formData.email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.message.trim().length > 0

    setIsFormValid(isValid)
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid || isLoading) return

    setIsLoading(true)
    setStatus({ type: null, message: "" })

    // Start complex animation sequence
    setAnimationState("wrapping")

    setTimeout(() => setAnimationState("manAppears"), 1000)
    setTimeout(() => setAnimationState("manTakes"), 2000)
    setTimeout(() => setAnimationState("manLeaves"), 3000)
    setTimeout(() => setAnimationState("processing"), 4000)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Success flow - ensure man returns
      setTimeout(() => setAnimationState("manReturns"), 6000)
      setTimeout(() => setAnimationState("envelopeOpens"), 8000)
      setTimeout(() => {
        setStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        })
        setAnimationState("success")
        setIsLoading(false)
      }, 9500)
    } catch (error) {
      // Error flow - ensure man returns
      setFailedFormData({ ...formData })
      setTimeout(() => setAnimationState("manReturns"), 6000)
      setTimeout(() => setAnimationState("envelopeOpens"), 8000)
      setTimeout(() => {
        setStatus({
          type: "error",
          message: error.message || "Something went wrong. Please try again.",
        })
        setAnimationState("error")
        setIsLoading(false)
      }, 9500)
    }
  }

  const handleSendAnother = () => {
    setAnimationState("reset")
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" })
      setStatus({ type: null, message: "" })
      setAnimationState("idle")
    }, 500)
  }

  const handleTryAgain = () => {
    if (failedFormData) {
      setFormData(failedFormData)
    }
    setStatus({ type: null, message: "" })
    setAnimationState("idle")
    setFailedFormData(null)
  }

  return (
    <motion.div
      id="contact"
      className="p-2 xs:p-4 sm:p-6 w-full max-w-[800px] mx-auto scroll-mt-24"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="secondaryBackground backdrop-blur-[10px] border border-[rgba(255,255,255,0.2)] rounded-[12px] shadow-lg p-3 xs:p-4 sm:p-6 lg:p-8 relative min-h-[500px] xs:min-h-[600px] sm:min-h-[700px] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 backdrop-blur-sm rounded-[8px]" />

        {/* Man Animation - Responsive positioning */}
        <AnimatePresence>
          {(animationState === "manAppears" ||
            animationState === "manTakes" ||
            animationState === "manLeaves" ||
            animationState === "manReturns") && (
            <motion.div
              className="absolute bottom-2 xs:bottom-4 sm:bottom-10 z-20"
              initial={{
                x: animationState === "manReturns" ? "100vw" : "-150px",
                opacity: 0,
              }}
              animate={{
                x:
                  animationState === "manLeaves"
                    ? "100vw"
                    : animationState === "manReturns"
                      ? "calc(50vw - 60px)"
                      : "calc(25vw - 30px)",
                opacity: 1,
              }}
              exit={{
                x: animationState === "manLeaves" ? "100vw" : "-150px",
                opacity: 0,
              }}
              transition={{
                duration: animationState === "manLeaves" ? 1.5 : 1,
                ease: "easeInOut",
              }}
            >
              {/* The Man - Extra responsive scaling */}
              <div className="man-container relative scale-50 xs:scale-75 sm:scale-100 lg:scale-125">
                {/* Head */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-200 rounded-full border-2 border-gray-800 mx-auto mb-2 relative">
                  {/* Eyes */}
                  <motion.div
                    className="absolute top-3 sm:top-5 left-3 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"
                    animate={{ scaleY: [1, 0.1, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 3, duration: 0.2 }}
                  />
                  <motion.div
                    className="absolute top-3 sm:top-5 right-3 sm:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"
                    animate={{ scaleY: [1, 0.1, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 3, duration: 0.2 }}
                  />
                  {/* Mouth - happy */}
                  <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-1.5 sm:w-4 sm:h-2 border-2 border-black border-t-0 rounded-b-full" />
                </div>

                {/* Body */}
                <div className="w-9 h-15 sm:w-12 sm:h-20 bg-blue-500 rounded-[8px] mx-auto mb-2 relative">
                  {/* Left Arm */}
                  <motion.div
                    className="absolute -left-4 sm:-left-6 top-1.5 sm:top-2 w-4 h-9 sm:w-5 sm:h-12 bg-yellow-200 rounded-full border-2 border-gray-800"
                    animate={{
                      rotate: animationState === "manTakes" ? 45 : 12,
                    }}
                    style={{ transformOrigin: "top" }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-200 rounded-full border-2 border-gray-800" />
                  </motion.div>

                  {/* Right Arm */}
                  <motion.div
                    className="absolute -right-4 sm:-right-6 top-1.5 sm:top-2 w-4 h-9 sm:w-5 sm:h-12 bg-yellow-200 rounded-full border-2 border-gray-800"
                    animate={{
                      rotate: animationState === "manTakes" ? -45 : -12,
                    }}
                    style={{ transformOrigin: "top" }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-200 rounded-full border-2 border-gray-800">
                      {/* Envelope in hand when taking or returning - Extra responsive sizing */}
                      {(animationState === "manTakes" ||
                        animationState === "manLeaves" ||
                        animationState === "manReturns") && (
                        <motion.div
                          className="absolute -top-4 xs:-top-6 sm:-top-8 -right-4 xs:-right-6 sm:-right-8"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: animationState === "manTakes" ? 0.5 : 0 }}
                        >
                          <div className="w-8 h-6 xs:w-12 xs:h-9 sm:w-16 sm:h-12 bg-white border-2 border-gray-400 rounded-sm relative shadow-lg">
                            <div className="absolute -top-1 left-0 w-8 h-3 xs:w-12 xs:h-4 sm:w-16 sm:h-6 bg-gray-100 border-2 border-gray-400 transform rotate-6 origin-bottom rounded-t-sm" />
                            <div className="absolute top-1 xs:top-1.5 sm:top-2 left-1 xs:left-1.5 sm:left-2 space-y-0.5 sm:space-y-1">
                              <div className="w-4 h-0.5 xs:w-6 xs:h-0.5 sm:w-8 sm:h-0.5 bg-gray-600" />
                              <div className="w-3 h-0.5 xs:w-4 xs:h-0.5 sm:w-6 sm:h-0.5 bg-gray-600" />
                              <div className="w-5 h-0.5 xs:w-7 xs:h-0.5 sm:w-10 sm:h-0.5 bg-gray-600" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Legs with walking animation - Extra responsive sizing */}
                <div className="flex justify-center space-x-1 xs:space-x-1.5 sm:space-x-2">
                  <motion.div
                    className="w-2.5 h-10 xs:w-3 xs:h-12 sm:w-4 sm:h-16 bg-gray-700 rounded-[8px]"
                    animate={{
                      y: animationState === "manLeaves" || animationState === "manReturns" ? [0, -5, 0] : 0,
                    }}
                    transition={{
                      repeat:
                        animationState === "manLeaves" || animationState === "manReturns"
                          ? Number.POSITIVE_INFINITY
                          : 0,
                      duration: 0.3,
                    }}
                  />
                  <motion.div
                    className="w-2.5 h-10 xs:w-3 xs:h-12 sm:w-4 sm:h-16 bg-gray-700 rounded-[8px]"
                    animate={{
                      y: animationState === "manLeaves" || animationState === "manReturns" ? [0, -5, 0] : 0,
                    }}
                    transition={{
                      repeat:
                        animationState === "manLeaves" || animationState === "manReturns"
                          ? Number.POSITIVE_INFINITY
                          : 0,
                      duration: 0.3,
                      delay: 0.15,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Envelope Wrapper */}
        <motion.div
          className="relative z-10"
          animate={{
            scale: animationState === "wrapping" ? 0.9 : 1,
            rotateY: animationState === "wrapping" ? 5 : 0,
          }}
          transition={{ duration: 0.8 }}
        >
          {/* Envelope Border */}
          <AnimatePresence>
            {animationState === "wrapping" && (
              <motion.div
                className="absolute inset-0 border-4 border-amber-400 rounded-[8px] bg-amber-50 bg-opacity-80"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Envelope flap */}
                <motion.div
                  className="absolute -top-3 xs:-top-4 left-0 right-0 h-4 xs:h-6 sm:h-8 bg-amber-200 border-4 border-amber-400 rounded-t-lg"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: -20 }}
                  style={{ transformOrigin: "bottom" }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                />

                {/* Envelope address - Extra responsive sizing */}
                <div className="absolute top-1.5 xs:top-2 sm:top-4 left-1.5 xs:left-2 sm:left-4 space-y-0.5 xs:space-y-1 sm:space-y-2">
                  <motion.div
                    className="w-12 xs:w-16 sm:w-24 h-0.5 sm:h-1 bg-amber-600 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: "3rem" }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  />
                  <motion.div
                    className="w-8 xs:w-12 sm:w-20 h-0.5 sm:h-1 bg-amber-600 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: "2rem" }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  />
                  <motion.div
                    className="w-14 xs:w-20 sm:w-28 h-0.5 sm:h-1 bg-amber-600 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: "3.5rem" }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="text-center mb-4 xs:mb-6 sm:mb-8 relative z-10">
            <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Let's Connect</h1>
            <p className="text-xs xs:text-sm sm:text-base secondaryText mt-1 xs:mt-2 px-2">
              Fill out the form and watch the delivery process!
            </p>
          </div>

          {/* Form Section */}
          <div className="max-w-md mx-auto relative z-10 px-2 xs:px-0">
            <AnimatePresence mode="wait">
              {(animationState === "idle" || animationState === "wrapping") && (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-3 xs:space-y-4 sm:space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs xs:text-sm font-medium secondaryText mb-1 xs:mb-2">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      disabled={isLoading}
                      className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-white bg-opacity-70 backdrop-blur-sm border border-gray-300 rounded-[8px] shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors text-xs xs:text-sm sm:text-base"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs xs:text-sm font-medium secondaryText mb-1 xs:mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      disabled={isLoading}
                      className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-white bg-opacity-70 backdrop-blur-sm border border-gray-300 rounded-[8px] shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors text-xs xs:text-sm sm:text-base"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs xs:text-sm font-medium secondaryText mb-1 xs:mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      disabled={isLoading}
                      className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-white bg-opacity-70 backdrop-blur-sm border border-gray-300 rounded-[8px] shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors text-xs xs:text-sm sm:text-base"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs xs:text-sm font-medium secondaryText mb-1 xs:mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows={3}
                      required
                      disabled={isLoading}
                      className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-white bg-opacity-70 backdrop-blur-sm border border-gray-300 rounded-[8px] shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors resize-vertical text-xs xs:text-sm sm:text-base"
                    />
                  </div>

                  {/* Send Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading || !isFormValid}
                    className="w-full primaryBackground  disabled:accentBackground text-white font-bold py-2 xs:py-3 px-3 xs:px-4 rounded-[8px] shadow-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed text-xs xs:text-sm sm:text-base"
                    whileHover={{ scale: isFormValid && !isLoading ? 1.03 : 1 }}
                    whileTap={{ scale: isFormValid && !isLoading ? 0.97 : 1 }}
                  >
                    <svg className="w-3 h-3 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span>Send Message</span>
                  </motion.button>
                </motion.form>
              )}

              {/* Processing State */}
              {animationState === "processing" && (
                <motion.div
                  className="text-center py-12 xs:py-16 sm:py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="inline-block w-8 h-8 xs:w-12 xs:h-12 sm:w-16 sm:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </motion.div>
              )}

              {/* Response Envelope - Ultra responsive sizing for 300px screens */}
              {(animationState === "envelopeOpens" || animationState === "success" || animationState === "error") && (
                <motion.div
                  className="text-center py-4 xs:py-6 sm:py-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Response Envelope - Much smaller for tiny screens */}
                  <motion.div
                    className="relative mx-auto w-[280px] h-[180px] xs:w-64 xs:h-48 sm:w-80 sm:h-60 mb-3 xs:mb-4 sm:mb-6 max-w-[calc(100vw-40px)]"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: animationState === "envelopeOpens" ? [0, 10, -10, 0] : 0 }}
                    transition={{ duration: 1, repeat: animationState === "envelopeOpens" ? 2 : 0 }}
                  >
                    <div className="w-full h-full bg-white border-2 xs:border-4 border-gray-400 rounded-[8px] relative shadow-xl">
                      {/* Envelope flap opening */}
                      <motion.div
                        className="absolute -top-2 xs:-top-3 sm:-top-4 left-0 right-0 h-8 xs:h-12 sm:h-16 bg-gray-100 border-2 xs:border-4 border-gray-400 rounded-t-lg"
                        initial={{ rotateX: 0 }}
                        animate={{
                          rotateX: animationState === "envelopeOpens" ? -120 : 0,
                        }}
                        style={{ transformOrigin: "bottom" }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />

                      {/* Message content - Ultra compact for tiny screens */}
                      <AnimatePresence>
                        {(animationState === "success" || animationState === "error") && (
                          <motion.div
                            className="absolute inset-2 xs:inset-3 sm:inset-4 flex flex-col items-center justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                          >
                            {status.type === "success" ? (
                              <>
                                <motion.div
                                  className="w-8 h-8 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-2 xs:mb-3 sm:mb-4"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 1.7, duration: 0.3 }}
                                >
                                  <svg
                                    className="w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-green-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </motion.div>
                                <h3 className="text-sm xs:text-base sm:text-lg font-bold text-green-800 mb-1 xs:mb-2 text-center">
                                  Message Delivered!
                                </h3>
                                <p className="text-[10px] xs:text-xs sm:text-sm text-green-600 text-center mb-2 xs:mb-3 sm:mb-4 px-1 xs:px-2 leading-tight">
                                  Message sent successfully!
                                </p>
                                <motion.button
                                  onClick={handleSendAnother}
                                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 xs:py-2 px-2 xs:px-3 sm:px-4 rounded-[8px] transition-colors text-[10px] xs:text-xs sm:text-sm"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Send Another Message
                                </motion.button>
                              </>
                            ) : (
                              <>
                                <motion.div
                                  className="w-8 h-8 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-2 xs:mb-3 sm:mb-4"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 1.7, duration: 0.3 }}
                                >
                                  <svg
                                    className="w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-red-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </motion.div>
                                <h3 className="text-sm xs:text-base sm:text-lg font-bold text-red-800 mb-1 xs:mb-2 text-center">
                                  Delivery Failed
                                </h3>
                                <p className="text-[10px] xs:text-xs sm:text-sm text-red-600 text-center mb-2 xs:mb-3 sm:mb-4 px-1 xs:px-2 leading-tight">
                                  Please try again
                                </p>
                                <motion.button
                                  onClick={handleTryAgain}
                                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 xs:py-2 px-2 xs:px-3 sm:px-4 rounded-[8px] transition-colors text-[10px] xs:text-xs sm:text-sm"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Try Sending Again
                                </motion.button>
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Visual indicator without text - Extra responsive positioning */}
        <div className="absolute bottom-1 xs:bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            className={`inline-flex items-center px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full ${
              animationState === "success"
                ? "bg-green-100"
                : animationState === "error"
                  ? "bg-red-100"
                  : animationState === "processing"
                    ? "bg-blue-100"
                    : "bg-gray-100"
            }`}
            animate={{
              scale:
                animationState !== "idle" && animationState !== "success" && animationState !== "error"
                  ? [1, 1.05, 1]
                  : 1,
            }}
            transition={{
              duration: 0.5,
              repeat:
                animationState !== "idle" && animationState !== "success" && animationState !== "error"
                  ? Number.POSITIVE_INFINITY
                  : 0,
              repeatDelay: 1,
            }}
          >
            <motion.div
              className={`w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full ${
                animationState === "success"
                  ? "bg-green-500"
                  : animationState === "error"
                    ? "bg-red-500"
                    : animationState === "processing"
                      ? "bg-blue-500"
                      : "bg-gray-500"
              }`}
              animate={{
                scale: animationState === "processing" ? [1, 1.5, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: animationState === "processing" ? Number.POSITIVE_INFINITY : 0,
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
