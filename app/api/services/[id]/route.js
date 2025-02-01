import { connectToDatabase } from "@/utils/db";
import { middleware } from "@/utils/middleware";
import Service from "@/models/Service";
import CustomerReview from "@/models/CustomerReview"; // Import the CustomerReview model
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params;

  // Apply middleware to the DELETE method
  const middlewareResponse = await middleware(req, NextResponse, async () => {
    try {
      await connectToDatabase();
      await Service.findByIdAndDelete(id);
      return NextResponse.json({ message: "Service deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
    }
  });

  if (middlewareResponse) {
    return middlewareResponse;
  }
}
