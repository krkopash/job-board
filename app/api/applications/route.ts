import connectDB from "@/app/db";

import Application from "@/models/Application";
import { getUserFromReq } from "@/lib/getUser";

export async function GET(req: Request) {
  await connectDB();

  const user = getUserFromReq(req);

  if (user.role !== "candidate") {
    return new Response("Forbidden", { status: 403 });
  }

  const apps = await Application.find({
    candidateId: user.id,
  }).populate("jobId");

  return Response.json(apps);
}