import connectDB from "@/app/db";
import Job from "@/models/Job";
import { getUserFromReq } from "@/lib/getUser";

export async function POST(req: Request) {
  await connectDB();
  const user = getUserFromReq(req);

  if (user.role !== "recruiter") {
    return new Response("Forbidden", { status: 403 });
  }

  const body = await req.json();

  const job = await Job.create({
    ...body,
    recruiterId: user.id,
  });

  return Response.json(job);
}

export async function GET() {
  await connectDB();
  const jobs = await Job.find({ closed: false });

  return Response.json(jobs);
}