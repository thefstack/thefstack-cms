import { connectToDatabase } from "@/utils/db";
import { middleware } from "@/utils/middleware";
import PortfolioItem from "@/models/PortfolioItem";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params;

  // Apply middleware to the DELETE method
  const middlewareResponse = await middleware(req, NextResponse, async () => {
    try {
      await connectToDatabase();
      await PortfolioItem.findByIdAndDelete(id);
      return NextResponse.json({ message: "Portfolio item deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete portfolio item" }, { status: 500 });
    }
  });

  if (middlewareResponse) {
    return middlewareResponse;
  }
}
