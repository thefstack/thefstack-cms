import { connectToDatabase } from "@/utils/db"
import { middleware } from "@/utils/middleware"
import BlogSchedule from "@/models/BlogSchedule"
import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    await connectToDatabase()
    const schedules = await BlogSchedule.find({}).sort({ postTime: 1 })
    return NextResponse.json(schedules, { status: 200 })
  } catch (error) {
    console.error("Error fetching blog schedules:", error)
    return NextResponse.json({ error: "Failed to fetch blog schedules" }, { status: 500 })
  }
}

export async function POST(req) {
  const middlewareResponse = await middleware(req, NextResponse, async () => {
    const scheduleData = await req.json()
    try {
      await connectToDatabase()
      const schedule = new BlogSchedule(scheduleData)
      const savedSchedule = await schedule.save()
      return NextResponse.json(savedSchedule, { status: 201 })
    } catch (error) {
      console.error("Error saving blog schedule:", error)
      return NextResponse.json({ error: "Failed to save blog schedule" }, { status: 500 })
    }
  })

  if (middlewareResponse) {
    return middlewareResponse
  }
}

