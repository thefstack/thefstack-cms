import { connectToDatabase } from "@/utils/db";
import { middleware } from "@/utils/middleware";
import CustomerReview from "@/models/CustomerReview";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Fetch customer reviews from the database
  try {
    await connectToDatabase();
    const reviews = await CustomerReview.find({});
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req) {
  // Apply middleware to the POST method
  const middlewareResponse = await middleware(req, NextResponse, async () => {
    // Add a new review to the database
    const newReview = await req.json();
    try {
      await connectToDatabase();
      if (newReview.photo) {
        const photoBuffer = Buffer.from(newReview.photo.split(",")[1], "base64");
        newReview.photo = photoBuffer.toString("base64");
      }
      const review = new CustomerReview(newReview);
      const savedReview = await review.save();
      return NextResponse.json(savedReview, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
    }
  });

  if (middlewareResponse) {
    return middlewareResponse;
  }
}
