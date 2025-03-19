import { connectToDatabase } from "@/utils/db"
import { middleware } from "@/utils/middleware"
import BlogSchedule from "@/models/BlogSchedule"
import Blog from "@/models/Blog"
import { NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  const middlewareResponse = await middleware(req, NextResponse, async () => {
    try {
      const { scheduleId } = await req.json()

      await connectToDatabase()

      // Find the schedule
      const schedule = await BlogSchedule.findById(scheduleId)
      if (!schedule) {
        return NextResponse.json({ error: "Blog schedule not found" }, { status: 404 })
      }

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
        model: "gpt-4o",
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
        max_tokens: 50,
      })

      const title = titleCompletion.choices[0].message.content.replace(/"/g, "")

      // Generate a slug from the title
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      // Create a new blog post
      const blog = new Blog({
        title,
        key: `${schedule.topic}, ${schedule.subtopic}`,
        category: schedule.category,
        subcategory: schedule.subcategory,
        content,
        slug,
        thumbnail: "https://source.unsplash.com/random/800x600/?blog",
      })

      // If the postTime is in the future, schedule it
      const now = new Date()
      if (schedule.postTime > now) {
        // We'll handle this with a cron job or similar
        // For now, just update the status
        schedule.status = "completed"
        await schedule.save()

        return NextResponse.json(
          {
            message: "Blog generated and scheduled for posting",
            blog,
            schedule,
          },
          { status: 200 },
        )
      } else {
        // Save the blog immediately
        const savedBlog = await blog.save()

        // Update the schedule status
        schedule.status = "completed"
        await schedule.save()

        return NextResponse.json(
          {
            message: "Blog generated and posted",
            blog: savedBlog,
            schedule,
          },
          { status: 200 },
        )
      }
    } catch (error) {
      console.error("Error generating blog:", error)

      // Update the schedule status if possible
      try {
        const { scheduleId } = await req.json()
        if (scheduleId) {
          await connectToDatabase()
          const schedule = await BlogSchedule.findById(scheduleId)
          if (schedule) {
            schedule.status = "failed"
            schedule.error = error.message
            await schedule.save()
          }
        }
      } catch (updateError) {
        console.error("Error updating schedule status:", updateError)
      }

      return NextResponse.json({ error: "Failed to generate blog", details: error.message }, { status: 500 })
    }
  })

  if (middlewareResponse) {
    return middlewareResponse
  }
}

