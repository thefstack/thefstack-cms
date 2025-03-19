import { connectToDatabase } from "@/utils/db"
import { middleware } from "@/utils/middleware"
import BlogSchedule from "@/models/BlogSchedule"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  const { id } = params
  try {
    await connectToDatabase()
    const schedule = await BlogSchedule.findById(id)
    if (!schedule) {
      return NextResponse.json({ error: "Blog schedule not found" }, { status: 404 })
    }
    return NextResponse.json(schedule, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog schedule" }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  const { id } = params

  const middlewareResponse = await middleware(req, NextResponse, async () => {
    try {
      await connectToDatabase()
      await BlogSchedule.findByIdAndDelete(id)
      return NextResponse.json({ message: "Blog schedule deleted successfully" }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete blog schedule" }, { status: 500 })
    }
  })

  if (middlewareResponse) {
    return middlewareResponse
  }
}

export async function PUT(req, { params }) {
  const { id } = params

  const middlewareResponse = await middleware(req, NextResponse, async () => {
    const updateData = await req.json()
    try {
      await connectToDatabase()
      const updatedSchedule = await BlogSchedule.findByIdAndUpdate(id, updateData, { new: true })
      if (!updatedSchedule) {
        return NextResponse.json({ error: "Blog schedule not found" }, { status: 404 })
      }
      return NextResponse.json(updatedSchedule, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: "Failed to update blog schedule" }, { status: 500 })
    }
  })

  if (middlewareResponse) {
    return middlewareResponse
  }
}

