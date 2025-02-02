import { connectToDatabase } from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

// export async function GET(req, { params }) {
//   const { id } = params;
//   try {
//     await connectToDatabase();
//     const user = await User.findById(id);
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
//     const { password, token, ...userWithoutSensitiveInfo } = user.toObject();
//     return NextResponse.json(userWithoutSensitiveInfo, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
//   }
// }

// export async function DELETE(req, { params }) {
//   const { id } = params;
//   try {
//     await connectToDatabase();
//     await User.findByIdAndDelete(id);
//     return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
//   }
// }
