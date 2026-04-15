import connectDB from "@/app/db";
import Application from "@/models/Application";
import Job from "@/models/Job";
import { getUserFromReq } from "@/lib/getUser";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const user = getUserFromReq(req);

  if (user.role !== "recruiter") {
    return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
  }

  const { id } = await params;
  const job = await Job.findById(id);
  if (!job) {
    return new Response(JSON.stringify({ message: "Job not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
  }

  if (job.recruiterId.toString() !== user.id) {
    return new Response(JSON.stringify({ message: "Not your job" }), { status: 403, headers: { "Content-Type": "application/json" } });
  }

  const apps = await Application.find({ jobId: id }).populate("candidateId");

  return new Response(JSON.stringify(apps), { headers: { "Content-Type": "application/json" } });
}