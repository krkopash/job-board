import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coverLetter: { type: String },
  status: { type: String, default: "pending", enum: ["pending", "shortlisted", "accepted", "rejected"] },
}, { timestamps: true });

ApplicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);