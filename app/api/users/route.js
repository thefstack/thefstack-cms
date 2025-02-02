import User from "@/models/User";
import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     await connectToDatabase();
//     const users = await User.find({});
//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   const newUser = await req.json();
//   try {
//     await connectToDatabase();
//     const user = new User(newUser);
//     const savedUser = await user.save();
//     return NextResponse.json(savedUser, { status: 201 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
//   }
// }

// export async function DELETE(request) {
//   await connectToDatabase();
//   const { email } = await request.json();
//   try {
//     await User.findOneAndDelete({ email });
//     return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
