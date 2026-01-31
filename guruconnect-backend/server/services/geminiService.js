import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

console.log(
  "Gemini API Key:",
  process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌"
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// =====================
// CREATE TEST
// =====================
export const generateTest = async (field, experience) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are a senior technical interviewer.

Create a professional skill test for a ${field}
with ${experience} experience.

Rules:
- 5 multiple choice questions
- 3 scenario-based questions
- Clear numbering
- No answers
- No explanations
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (!text) throw new Error("Empty Gemini response");

    return text;
  } catch (error) {
    console.error("Gemini generateTest error:", error.message);
    throw error;
  }
};

// =====================
// EVALUATE TEST
// =====================
export const evaluateTest = async (questions, mentorAnswers) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are a strict technical evaluator.

Questions:
${questions}

Mentor Answers:
${mentorAnswers}

Evaluate the answers and respond ONLY in this format:
Result: Pass or Fail
Score: number out of 100
Reason: short explanation
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (!text) throw new Error("Empty evaluation response");

    return text;
  } catch (error) {
    console.error("Gemini evaluateTest error:", error.message);
    throw error;
  }
};
