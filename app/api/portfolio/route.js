import { connectToDatabase } from "@/utils/db";
import { middleware } from "@/utils/middleware";
import PortfolioItem from "@/models/PortfolioItem";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Fetch portfolio items from the database
  try {
    await connectToDatabase();
    const portfolioItems = await PortfolioItem.find({});
    return NextResponse.json(portfolioItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch portfolio items" }, { status: 500 });
  }
}

export async function POST(req) {
  // Apply middleware to the POST method
  const middlewareResponse = await middleware(req, NextResponse, async () => {
    // Add a new portfolio item to the database
    const newItem = await req.json();
    try {
      await connectToDatabase();
      const portfolioItem = new PortfolioItem(newItem);
      const savedItem = await portfolioItem.save();
      return NextResponse.json(savedItem, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to add portfolio item" }, { status: 500 });
    }
  });

  if (middlewareResponse) {
    return middlewareResponse;
  }
}
