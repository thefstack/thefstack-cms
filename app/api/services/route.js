import { connectToDatabase } from "@/utils/db";
import { middleware } from "@/utils/middleware";
import Service from "@/models/Service";
import CustomerReview from "@/models/CustomerReview"; // Import the CustomerReview model
import { NextResponse } from "next/server";

export async function GET(req) {
  // Fetch services from the database
  try {
    await connectToDatabase();
    const services = await Service.find({}).populate("customerReviews");
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req) {
  // Apply middleware to the POST method
  const middlewareResponse = await middleware(req, NextResponse, async () => {
    // Add a new service to the database
    const newService = await req.json();
    try {
      await connectToDatabase();
      const service = new Service(newService);
      const savedService = await service.save();
      return NextResponse.json(savedService, { status: 201 });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "Failed to add service" }, { status: 500 });
    }
  });

  if (middlewareResponse) {
    return middlewareResponse;
  }
}
