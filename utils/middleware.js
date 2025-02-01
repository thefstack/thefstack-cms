import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export async function middleware(req, res, next) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.redirect("/auth/signin");
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, SECRET_KEY);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return NextResponse.redirect("/auth/signin");
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
