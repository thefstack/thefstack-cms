import { connectToDatabase } from "@/utils/db"
import BlogSchedule from "@/models/BlogSchedule"
import Blog from "@/models/Blog"
import { NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET(req) {
  // Check for secret to confirm this is a valid request
  const secret = req.headers.get("x-cron-secret")

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectToDatabase()

    // Find all pending schedules where postTime is in the past
    const now = new Date()
    const pendingSchedules = await BlogSchedule.find({
      status: "pending",
      postTime: { $lte: now },
    })

    const results = []

    // Process each pending schedule
    for (const schedule of pendingSchedules) {
      try {
        // Update status to processing
        schedule.status = "processing"
        await schedule.save()

        // Generate blog content using OpenAI
        const prompt = `Write a comprehensive blog post about ${schedule.topic}. 
        Focus specifically on ${schedule.subtopic}. 
        ${schedule.details ? `Include these details: ${schedule.details}` : ""}
        The blog should be well-structured with headings, subheadings, and paragraphs.
        Include practical examples and insights.
        The content should be at least 1000 words.
        Format the content in Markdown.`

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a professional blog writer with expertise in creating engaging, informative content. Your writing is clear, well-structured, and optimized for SEO.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 4000,
        })

        const content = completion.choices[0].message.content

        // Generate a title using OpenAI
        const titleCompletion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "Generate a catchy, SEO-friendly title for a blog post." },
            {
              role: "user",
              content: `Generate a title for a blog post about ${schedule.topic}, specifically focusing on ${schedule.subtopic}.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 100,
        })

        const title = titleCompletion.choices[0].message.content.replace(/"/g, "")

        // Generate a slug from the title
        const slug = title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-")

        // Create and save a new blog post
        const blog = new Blog({
          title,
          key: `${schedule.topic}, ${schedule.subtopic}`,
          category: schedule.category,
          subcategory: schedule.subcategory,
          content,
          slug,
          thumbnail: "https://source.unsplash.com/random/800x600/?blog",
        })

        const savedBlog = await blog.save()

        // Update the schedule status
        schedule.status = "completed"
        await schedule.save()

        results.push({
          scheduleId: schedule._id,
          blogId: savedBlog._id,
          status: "success",
        })
      } catch (error) {
        console.error(`Error processing schedule ${schedule._id}:`, error)

        // Update the schedule status
        schedule.status = "failed"
        schedule.error = error.message
        await schedule.save()

        results.push({
          scheduleId: schedule._id,
          status: "failed",
          error: error.message,
        })
      }
    }

    return NextResponse.json(
      {
        message: "Scheduled blogs processed",
        processed: results.length,
        results,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing scheduled blogs:", error)
    return NextResponse.json({ error: "Failed to process scheduled blogs", details: error.message }, { status: 500 })
  }
}

