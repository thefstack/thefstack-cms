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
      dont add any heading at starting because heading will be added by me just start with the blog.
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

      const content = completion.choices[0].message.content;

let markdownContent = content.trim(); // Default to full trimmed content

// Check if the content contains ```markdown and extract only that part
const markdownMatch = content.match(/```markdown\s([\s\S]*?)```/);
if (markdownMatch) {
  markdownContent = markdownMatch[1].trim();
}

console.log(markdownContent);


      // Generate a title using OpenAI
      const titleCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
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

        const imageResponse = await openai.responses.create({
          model: "gpt-4o-mini",
          input: [
            {
              role: "system",
              content: `You are an intelligent assistant that finds publicly available image links on google images related to a blog topic. 
              Search for relevant images and return only the direct URL of a valid, publicly accessible image in JSON format:
              {"imageLink": "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"}`,
            },
            {
              role: "user",
              content: `Find a public image link for the blog 
              Title: ${title} 
              Content: ${markdownContent}`,
            },
          ],
          temperature: 0.7,
        });

        console.log(imageResponse)
        let jsonText = imageResponse.output_text.trim(); // Trim any whitespace

// Extract JSON inside ```json``` if present
const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/);

if (jsonMatch) {
  jsonText = jsonMatch[1].trim(); // Extract JSON content only
}

// Safely parse JSON
let imageData;
try {
  imageData = JSON.parse(jsonText);
} catch (error) {
  console.error("Error parsing JSON:", error);
  imageData = null;
}


      // Create a new blog post
      const blog = new Blog({
        title,
        key: `${schedule.topic}, ${schedule.subtopic}`,
        category: schedule.category,
        subcategory: schedule.subcategory,
        content:markdownContent,
        slug,
        thumbnail: imageData.imageLink,
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

