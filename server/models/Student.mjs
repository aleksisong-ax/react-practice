import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  section: { type: String, required: true, trim: true, maxlength: 40 },
  enrolledAt: { type: Date, default: Date.now },
});

export default mongoose.model("Student", studentSchema);