import connectDB from "@/app/db";
import Application from "@/models/Application";
import { getUserFromReq } from "@/lib/getUser";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const user = getUserFromReq(req);

  if (user.role !== "candidate") {
    return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
  }

  const { coverLetter } = await req.json();
  const { id } = await params;

  try {
    const app = await Application.create({
      jobId: id,
      candidateId: user.id,
      coverLetter,
    });

    return new Response(JSON.stringify(app), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Already applied or invalid request", error: error?.message }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
}