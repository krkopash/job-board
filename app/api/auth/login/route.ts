import connectDB from "@/app/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return new Response(JSON.stringify({ message: "Invalid password" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }

    const token = signToken({
      id: user._id.toString(),
      role: user.role,
    });

    return new Response(JSON.stringify({ token, role: user.role, id: user._id.toString(), message: "Login successful" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: error.message || "Login failed" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}