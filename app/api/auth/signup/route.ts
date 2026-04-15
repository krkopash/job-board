import connectDB from "@/app/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, role } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already in use" }), { status: 409, headers: { "Content-Type": "application/json" } });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    return new Response(JSON.stringify({ message: "User created successfully", user: { id: user._id.toString(), email: user.email, role: user.role } }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ message: error.message || "Signup failed" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}