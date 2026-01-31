import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: String,
  email: String,
  field: String,
  experience: String,
  isSkillVerified: { type: Boolean, default: false }
});

export default mongoose.model("Mentor", mentorSchema);
