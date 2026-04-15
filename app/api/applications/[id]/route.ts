import connectDB from "@/app/db";
import Application from "@/models/Application";
import Job from "@/models/Job";
import { getUserFromReq } from "@/lib/getUser";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const user = getUserFromReq(req);

  if (user.role !== "recruiter") {
    return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
  }

  const { status } = await req.json();
  const { id } = await params;

  const app = await Application.findById(id);
  if (!app) {
    return new Response(JSON.stringify({ message: "Application not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
  }

  const job = await Job.findById(app.jobId);
  if (!job || job.recruiterId.toString() !== user.id) {
    return new Response(JSON.stringify({ message: "Not allowed" }), { status: 403, headers: { "Content-Type": "application/json" } });
  }

  app.status = status;
  await app.save();

  return new Response(JSON.stringify(app), { headers: { "Content-Type": "application/json" } });
}