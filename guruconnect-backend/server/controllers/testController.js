import SkillTest from "../models/SkillTest.js";
import Mentor from "../models/Mentor.js";
import { generateTest, evaluateTest } from "../services/geminiService.js";

export const createTest = async (req, res) => {
  try {
    console.log("CREATE TEST BODY:", req.body);
    console.log("USER:", req.user);

    const { field, experience } = req.body;

    const questions = await generateTest(field, experience);

    console.log("QUESTIONS GENERATED");

    const test = await SkillTest.create({
      mentorId: "661e9c2d9b6a1e3a4f9a8b72", // safe access
      field,
      experience,
      questions
    });

    res.json(test);
  } catch (error) {
    console.error("CREATE TEST ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


export const submitTest = async (req, res) => {
  try {
    const { testId, mentorAnswers } = req.body;

    const test = await SkillTest.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    const evaluation = await evaluateTest(
      test.questions,
      mentorAnswers
    );

    const pass = evaluation.includes("Pass");

    test.mentorAnswers = mentorAnswers;
    test.status = "completed";
    test.pass = pass;
    test.score = pass ? 80 : 50;
    await test.save();

    if (pass) {
      await Mentor.findByIdAndUpdate(test.mentorId, {
        isSkillVerified: true
      });
    }

    res.json({ evaluation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
