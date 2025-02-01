import { connectToDatabase } from "@/utils/db";
import { middleware } from "@/utils/middleware";
import CustomerReview from "@/models/CustomerReview";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params;

  // Apply middleware to the DELETE method
  const middlewareResponse = await middleware(req, NextResponse, async () => {
    try {
      await connectToDatabase();
      await CustomerReview.findByIdAndDelete(id);
      return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
    }
  });

  if (middlewareResponse) {
    return middlewareResponse;
  }
}
