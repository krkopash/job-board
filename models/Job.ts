import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String },
  description: { type: String },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  closed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model("Job", JobSchema);