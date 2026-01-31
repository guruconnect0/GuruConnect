import mongoose from "mongoose";

const skillTestSchema = new mongoose.Schema(
  {
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor"
    },
    field: String,
    experience: String,
    questions: String,
    mentorAnswers: String,
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    },
    pass: Boolean,
    score: Number
  },
  { timestamps: true }
);

export default mongoose.model("SkillTest", skillTestSchema);
